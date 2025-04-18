// Employee notifications
export const employeeCertificateNotifications = [
  {
    title: "BHV Certificaat - Jan Jansen",
    date: "Verloopt over 28 dagen",
    status: "warning" as const,
    link: "/employees/1#trainings",
  }
];

export const employeeExerciseNotifications = [
  {
    title: "BHV Oefening",
    date: "Gepland op 15-03-2025",
    status: "info" as const,
    link: "/safety?tab=exercises",
  },
  {
    title: "Ontruimingsoefening",
    date: "Gepland op 22-04-2025",
    status: "info" as const,
    link: "/safety?tab=exercises",
  }
];

export const employeeIncidentNotifications = [
  {
    title: "Val van hoogte - Bouwplaats A",
    date: "Gemeld op 05-02-2025",
    status: "danger" as const,
    link: "/safety?tab=incidents",
  },
  {
    title: "Bijna-ongeval - Magazijn",
    date: "Gemeld op 12-02-2025",
    status: "warning" as const,
    link: "/safety?tab=incidents",
  }
];

// Employer notifications
export const certificateNotifications = [
  {
    title: "BHV Certificaat - Jan Jansen",
    date: "Verloopt over 28 dagen",
    status: "warning" as const,
    link: "/employees/1#trainings",
  },
  {
    title: "VCA Basis - Pieter Pietersen",
    date: "Verloopt over 14 dagen",
    status: "warning" as const,
    link: "/employees/2#certificates",
  },
  {
    title: "EHBO Diploma - Maria Willemsen",
    date: "Verlopen sinds 10-01-2025",
    status: "danger" as const,
    link: "/employees/3#certificates",
  },
];

export const safetyNotifications = [
  {
    title: "Veiligheidshelm - Klaas Klaassen",
    date: "Keuring vereist binnen 7 dagen",
    status: "warning" as const,
    link: "/safety?tab=pbm",
  },
  {
    title: "Brandblusser - Magazijn",
    date: "Keuring verlopen sinds 15-01-2025",
    status: "danger" as const,
    link: "/safety?tab=equipment",
  },
  {
    title: "AED - Receptie",
    date: "Keuring succesvol afgerond op 01-02-2025",
    status: "success" as const,
    link: "/safety?tab=equipment",
  },
];

export const exerciseNotifications = [
  {
    title: "BHV Oefening",
    date: "Gepland op 15-03-2025",
    status: "info" as const,
    link: "/safety?tab=exercises",
  },
  {
    title: "Ontruimingsoefening",
    date: "Gepland op 22-04-2025",
    status: "info" as const,
    link: "/safety?tab=exercises",
  },
  {
    title: "Brandoefening",
    date: "Succesvol afgerond op 01-02-2025",
    status: "success" as const,
    link: "/safety?tab=exercises",
  },
];

export const incidentNotifications = [
  {
    title: "Val van hoogte - Bouwplaats A",
    date: "Gemeld op 05-02-2025",
    status: "danger" as const,
    link: "/safety?tab=incidents",
  },
  {
    title: "Bijna-ongeval - Magazijn",
    date: "Gemeld op 12-02-2025",
    status: "warning" as const,
    link: "/safety?tab=incidents",
  },
  {
    title: "Kleine snijwond - Werkplaats",
    date: "Gemeld op 20-02-2025",
    status: "info" as const,
    link: "/safety?tab=incidents",
  },
];

// Chart data - Keeping values consistent with actual certificate counts
export const certificateStatusData = [
  { name: "Actueel", value: 18, color: "#22c55e", filterValue: "active" },
  { name: "Bijna verlopen", value: 5, color: "#f97316", filterValue: "expiring" },
  { name: "Verlopen", value: 3, color: "#ef4444", filterValue: "expired" },
];

export const equipmentStatusData = [
  { name: "Actueel", value: 24, color: "#22c55e", filterValue: "current" },
  { name: "Bijna verlopen", value: 8, color: "#f97316", filterValue: "expiring" },
  { name: "Verlopen", value: 2, color: "#ef4444", filterValue: "expired" },
];

// Dashboard data
export const criticalRisks = [
  { risk: "Ontbrekende blusmiddelen bij magazijn", severity: "high", link: "/safety?tab=equipment" },
  { risk: "Verlopen BHV-certificaten (3)", severity: "high", link: "/certificates?status=expired&type=bhv" },
  { risk: "Geen RI&E voor nieuwe productielijn", severity: "medium", link: "/risk-assessment" },
  { risk: "Verlichting nooduitgang defect", severity: "medium", link: "/safety?tab=incidents" },
];

export const actionItems = [
  { action: "BHV oefening inplannen", deadline: "20-03-2025", status: "open", link: "/safety?tab=exercises" },
  { action: "AED training organiseren", deadline: "15-04-2025", status: "open", link: "/certificates?type=aed" },
  { action: "RI&E actualiseren", deadline: "30-03-2025", status: "open", link: "/risk-assessment" },
  { action: "Vluchtwegmarkering controle", deadline: "10-03-2025", status: "open", link: "/safety?tab=equipment" },
  { action: "Klaas Klaassen gaat op 30-04-2025 uit dienst, zorg voor een vervangende BHV'er.", deadline: "30-03-2025", status: "open", link: "/employees/4" },
];
