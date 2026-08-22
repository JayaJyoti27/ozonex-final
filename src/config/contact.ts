const isUAE = typeof window !== "undefined" && window.location.hostname.endsWith(".ae");

export const CONTACT = isUAE
  ? {
      whatsappNumber: "971XXXXXXXXX", // replace with real UAE number, digits only
      whatsappDisplay: "+971 XX XXX XXXX", // replace with real UAE number, formatted
      email: "tresaj@ozonegroupglobal.com", // update if UAE uses a different inbox
      officeLocations: ["Dubai", "Trivandrum", "Chennai", "Cochin", "Delhi", "Kuwait"],
    }
  : {
      whatsappNumber: "918139831118",
      whatsappDisplay: "+91 81398 31118",
      email: "tresaj@ozonegroupglobal.com",
      officeLocations: ["Trivandrum", "Chennai", "Cochin", "Delhi", "Dubai", "Kuwait"],
    };
