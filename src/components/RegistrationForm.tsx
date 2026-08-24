import { useState, useRef } from "react";
import { publicSupabase } from "@/lib/supabaseClient"; // adjust path to your actual publicSupabase client

type BusinessCategory = "b2b_travel_agent" | "b2e_corporate_standard" | "cbt_company_platinum";

type Country = "india" | "uae";

type DocType =
  | "pan"
  | "gst"
  | "aadhaar"
  | "voter_id_passport"
  | "license"
  | "trade_license"
  | "vat"
  | "passport";

const businessCategoryOptions: { value: BusinessCategory; label: string }[] = [
  { value: "b2b_travel_agent", label: "B2B – Travel Agent" },
  { value: "b2e_corporate_standard", label: "B2E – Corporate – Standard" },
  { value: "cbt_company_platinum", label: "CBT – Company – Platinum" },
];

const documentsByCountry: Record<Country, { type: DocType; label: string }[]> = {
  india: [
    { type: "pan", label: "PAN" },
    { type: "gst", label: "GST" },
    { type: "aadhaar", label: "Aadhaar" },
    { type: "voter_id_passport", label: "Voter ID / Passport of authorized person" },
    { type: "license", label: "License" },
  ],
  uae: [
    { type: "trade_license", label: "Trade License" },
    { type: "vat", label: "VAT" },
    { type: "passport", label: "Passport of authorized person" },
  ],
};

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// Detects whether the form is being rendered on the .ae site so we can
// tweak locale-specific UI bits (currently just the phone placeholder).
function useIsUaeSite(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname.endsWith(".ae");
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  businessCategory: BusinessCategory | "";
  country: Country | "";
}

export function RegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const isUaeSite = useIsUaeSite();
  const phonePlaceholder = isUaeSite ? "+971" : "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    businessCategory: "",
    country: "",
  });

  const [files, setFiles] = useState<Partial<Record<DocType, File>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const requiredDocs = form.country ? documentsByCountry[form.country] : [];

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (docType: DocType, file: File | null) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [docType]: "Only PDF, JPG, or PNG allowed" }));
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [docType]: `File must be under ${MAX_FILE_SIZE_MB}MB` }));
      return;
    }

    setErrors((prev) => ({ ...prev, [docType]: "" }));
    setFiles((prev) => ({ ...prev, [docType]: file }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Valid email required";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Valid phone number required";
    }
    if (!form.businessCategory) newErrors.businessCategory = "Select a business category";
    if (!form.country) newErrors.country = "Select a country";

    if (form.country) {
      for (const doc of documentsByCountry[form.country]) {
        if (!files[doc.type]) {
          newErrors[doc.type] = `${doc.label} is required`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      setSubmitError("Please fix the highlighted fields below before submitting.");
      // Scroll to top of the form so the user actually sees what's wrong,
      // instead of the button silently doing nothing.
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSubmitting(true);

    try {
      // 1. Insert the registration row
      const { data: registration, error: insertError } = await publicSupabase
        .from("registrations")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          business_category: form.businessCategory,
          country: form.country,
        })
        .select()
        .single();

      if (insertError || !registration) {
        throw insertError || new Error("Failed to create registration");
      }

      const registrationId = registration.id as string;

      // 2. Upload each document to storage, then record it in registration_documents
      for (const doc of requiredDocs) {
        const file = files[doc.type];
        if (!file) continue;

        const ext = file.name.split(".").pop();
        const path = `${registrationId}/${doc.type}.${ext}`;

        const { error: uploadError } = await publicSupabase.storage
          .from("registration-documents")
          .upload(path, file, { upsert: false });

        if (uploadError) {
          throw new Error(`Failed to upload ${doc.label}: ${uploadError.message}`);
        }

        const { error: docInsertError } = await publicSupabase
          .from("registration_documents")
          .insert({
            registration_id: registrationId,
            doc_type: doc.type,
            storage_path: path,
            file_name: file.name,
          });

        if (docInsertError) {
          throw new Error(`Failed to save ${doc.label} record: ${docInsertError.message}`);
        }
      }

      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <h2 className="text-2xl font-semibold mb-3">Registration submitted</h2>
        <p className="text-gray-600">
          Thanks, {form.name}. We've received your details and documents — our team will review them
          and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto py-16 px-6 space-y-8"
      noValidate
    >
      <div>
        <h2 className="text-2xl font-semibold mb-1">Registration</h2>
        <p className="text-gray-500 text-sm">Fill in your details to get started.</p>
      </div>

      {submitError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-red-700 text-sm font-medium">{submitError}</p>
        </div>
      )}

      {/* Basic details */}
      <div className="space-y-4">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </Field>

        <Field label="Email ID" error={errors.email} required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </Field>

        <Field label="Phone Number" error={errors.phone} required>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            placeholder={phonePlaceholder}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </Field>

        <Field label="Business Category" error={errors.businessCategory}>
          <select
            value={form.businessCategory}
            onChange={(e) => handleFieldChange("businessCategory", e.target.value)}
            className="w-full border rounded-md px-3 py-2 bg-white"
          >
            <option value="">Select category</option>
            {businessCategoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Country" error={errors.country}>
          <select
            value={form.country}
            onChange={(e) => {
              handleFieldChange("country", e.target.value);
              setFiles({}); // reset docs if country changes
            }}
            className="w-full border rounded-md px-3 py-2 bg-white"
          >
            <option value="">Select country</option>
            <option value="india">India</option>
            <option value="uae">UAE</option>
          </select>
        </Field>
      </div>

      {/* Conditional documents */}
      {form.country && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Documents Required – {form.country === "india" ? "India" : "UAE"}
          </h3>

          {requiredDocs.map((doc) => (
            <Field key={doc.type} label={doc.label} error={errors[doc.type]}>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(doc.type, e.target.files?.[0] ?? null)}
                className="w-full border rounded-md px-3 py-2 bg-white text-sm"
              />
              {files[doc.type] && (
                <p className="text-xs text-green-600 mt-1">{files[doc.type]?.name} selected</p>
              )}
            </Field>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white rounded-md py-3 font-medium disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
