// src/components/admin/RegistrationDocuments.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DocumentRow {
  id: string;
  doc_type: string;
  storage_path: string; // path inside the private "registration-documents" bucket
}

interface Props {
  registrationId: string;
}

export function RegistrationDocuments({ registrationId }: Props) {
  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("registration_documents")
        .select("id, doc_type, storage_path")
        .eq("registration_id", registrationId);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setDocs(data ?? []);

      // Generate a signed URL per document, short-lived (5 min)
      const signed: Record<string, string> = {};
      for (const doc of data ?? []) {
        const { data: signedData, error: signErr } = await supabase.storage
          .from("registration-documents")
          .createSignedUrl(doc.storage_path, 300);

        if (!signErr && signedData) {
          signed[doc.id] = signedData.signedUrl;
        }
      }
      setUrls(signed);
      setLoading(false);
    };

    load();
  }, [registrationId]);

  if (loading) return <p className="text-sm text-gray-500">Loading documents...</p>;
  if (docs.length === 0) return <p className="text-sm text-gray-500">No documents uploaded.</p>;

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between border rounded-md px-3 py-2">
          <span className="text-sm capitalize">{doc.doc_type}</span>
          {urls[doc.id] ? (
            <a
              href={urls[doc.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View / Download
            </a>
          ) : (
            <span className="text-sm text-gray-400">Unavailable</span>
          )}
        </div>
      ))}
    </div>
  );
}
