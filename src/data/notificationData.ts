
// Employee notifications
export const employeeCertificateNotifications = [
  {
    title: "BHV Certificaat - Jan Jansen",
    date: "Verloopt over 30 dagen",
    status: "warning" as const,
    link: "/employees/1#trainings", // Gewijzigd van "jan-jansen" naar "1"
  }
];

export const employeeExerciseNotifications = [
  {
    title: "BHV Oefening",
    date: "Gepland op 15-07-2023",
    status: "info" as const,
    link: "/safety?tab=exercises",
  },
  {
    title: "Ontruimingsoefening",
    date: "Gepland op 22-07-2023",
    status: "info" as const,
    link: "/safety?tab=exercises",
  }
];

export const employeeIncidentNotifications = [
  {
    title: "Val van hoogte - Bouwplaats A",
    date: "Gemeld op 05-07-2023",
    status: "danger" as const,
    link: "/safety?tab=incidents",
  },
  {
    title: "Bijna-ongeval - Magazijn",
    date: "Gemeld op 12-07-2023",
    status: "warning" as const,
    link: "/safety?tab=incidents",
  }
];

// Employer notifications
export const certificateNotifications = [
  {
    title: "BHV Certificaat - Jan Jansen",
    date: "Verloopt over 30 dagen",
    status: "warning" as const,
    link: "/employees/1#trainings", // Gewijzigd van "jan-jansen" naar "1"
  },
  {
    title: "VCA Basis - Pieter Pietersen",
    date: "Verloopt over 14 dagen",
    status: "warning" as const,
    link: "/employees/2#certificates", // Gewijzigd van "pieter-pietersen" naar "2"
  },
  {
    title: "EHBO Diploma - Maria Willemsen",
    date: "Verlopen sinds 10-01-2023",
    status: "danger" as const,
    link: "/employees/3#certificates", // Gewijzigd van "maria-willemsen" naar "3"
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
    date: "Keuring verlopen sinds 15-05-2023",
    status: "danger" as const,
    link: "/safety?tab=equipment",
  },
  {
    title: "AED - Receptie",
    date: "Keuring succesvol afgerond op 01-06-2023",
    status: "success" as const,
    link: "/safety?tab=equipment",
  },
];

export const exerciseNotifications = [
  {
    title: "BHV Oefening",
    date: "Gepland op 15-07-2023",
    status: "info" as const,
    link: "/safety?tab=exercises",
  },
  {
    title: "Ontruimingsoefening",
    date: "Gepland op 22-07-2023",
    status: "info" as const,
    link: "/safety?tab=exercises",
  },
  {
    title: "Brandoefening",
    date: "Succesvol afgerond op 01-05-2023",
    status: "success" as const,
    link: "/safety?tab=exercises",
  },
];

export const incidentNotifications = [
  {
    title: "Val van hoogte - Bouwplaats A",
    date: "Gemeld op 05-07-2023",
    status: "danger" as const,
    link: "/safety?tab=incidents",
  },
  {
    title: "Bijna-ongeval - Magazijn",
    date: "Gemeld op 12-07-2023",
    status: "warning" as const,
    link: "/safety?tab=incidents",
  },
  {
    title: "Kleine snijwond - Werkplaats",
    date: "Gemeld op 20-07-2023",
    status: "info" as const,
    link: "/safety?tab=incidents",
  },
];

// Chart data
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
  { action: "BHV oefening inplannen", deadline: "20-08-2023", status: "open", link: "/safety?tab=exercises" },
  { action: "AED training organiseren", deadline: "15-09-2023", status: "open", link: "/certificates?type=aed" },
  { action: "RI&E actualiseren", deadline: "30-09-2023", status: "open", link: "/risk-assessment" },
  { action: "Vluchtwegmarkering controle", deadline: "10-08-2023", status: "open", link: "/safety?tab=equipment" },
  { action: "Klaas Klaassen gaat op 30-04-2025 uit dienst, zorg voor een vervangende BHV'er.", deadline: "30-03-2025", status: "open", link: "/employees/4", // Gewijzigd van "klaas-klaassen" naar "4"
  },
];
