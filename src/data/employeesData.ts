
// Demo data
export const employees = [
  {
    id: "1",
    name: "Jan Janssen",
    function: "Technicus",
    department: "Technische dienst",
    email: "jan.janssen@example.com",
    certificateStatus: "active", // active, expiring, expired
    pbmStatus: "active",
    activeCertificates: 3,
    expiredCertificates: 1,
    phone: "06-12345678",
    birthDate: "15-05-1985",
    startDate: "01-03-2018",
    personalInfo: {
      address: "Hoofdstraat 123",
      postalCode: "1234 AB",
      city: "Amsterdam",
      emergencyContact: "Marie Janssen (vrouw)",
      emergencyPhone: "06-87654321",
    }
  },
  {
    id: "2",
    name: "Pieter Pietersen",
    function: "Teamleider",
    department: "Productie",
    email: "pieter.pietersen@example.com",
    certificateStatus: "active",
    pbmStatus: "expiring",
    activeCertificates: 2,
    expiredCertificates: 0,
    phone: "06-23456789",
    birthDate: "22-07-1979",
    startDate: "15-09-2015",
    personalInfo: {
      address: "Kerkstraat 45",
      postalCode: "5678 CD",
      city: "Rotterdam",
      emergencyContact: "Jolanda Pietersen (vrouw)",
      emergencyPhone: "06-98765432",
    }
  },
  {
    id: "3",
    name: "Maria Willemsen",
    function: "HR Manager",
    department: "HR",
    email: "maria.willemsen@example.com",
    certificateStatus: "expired",
    pbmStatus: "active",
    activeCertificates: 1,
    expiredCertificates: 1,
    phone: "06-34567890",
    birthDate: "03-11-1982",
    startDate: "01-06-2019",
    personalInfo: {
      address: "Stationsweg 67",
      postalCode: "9012 EF",
      city: "Utrecht",
      emergencyContact: "Thomas Willemsen (man)",
      emergencyPhone: "06-09876543",
    }
  },
  {
    id: "4",
    name: "Klaas Klaassen",
    function: "Magazijnmedewerker",
    department: "Logistiek",
    email: "klaas.klaassen@example.com",
    certificateStatus: "active",
    pbmStatus: "active",
    activeCertificates: 4,
    expiredCertificates: 0,
    phone: "06-45678901",
    birthDate: "18-02-1990",
    startDate: "12-04-2020",
    personalInfo: {
      address: "Marktplein 12",
      postalCode: "3456 GH",
      city: "Groningen",
      emergencyContact: "Sandra Klaassen (zus)",
      emergencyPhone: "06-21098765",
    }
  },
  {
    id: "5",
    name: "Sophie Jansen",
    function: "Front Office Medewerker",
    department: "Receptie",
    email: "sophie.jansen@example.com",
    certificateStatus: "expiring",
    pbmStatus: "active",
    activeCertificates: 2,
    expiredCertificates: 0,
    phone: "06-56789012",
    birthDate: "29-09-1992",
    startDate: "01-12-2021",
    personalInfo: {
      address: "Parkweg 89",
      postalCode: "7890 IJ",
      city: "Den Haag",
      emergencyContact: "Peter Jansen (vader)",
      emergencyPhone: "06-32109876",
    }
  },
  {
    id: "6",
    name: "Dirk van Dam",
    function: "Veiligheidskundige",
    department: "QHSE",
    email: "dirk.vandam@example.com",
    certificateStatus: "active",
    pbmStatus: "active",
    activeCertificates: 5,
    expiredCertificates: 0,
    phone: "06-67890123",
    birthDate: "07-04-1976",
    startDate: "15-01-2014",
    personalInfo: {
      address: "Lindenlaan 34",
      postalCode: "2345 KL",
      city: "Eindhoven",
      emergencyContact: "Annemiek van Dam (vrouw)",
      emergencyPhone: "06-43210987",
    }
  },
  {
    id: "7",
    name: "Emma de Vries",
    function: "Procesoperator",
    department: "Productie",
    email: "emma.devries@example.com",
    certificateStatus: "active",
    pbmStatus: "active",
    activeCertificates: 3,
    expiredCertificates: 0,
    phone: "06-12378945",
    birthDate: "12-06-1988",
    startDate: "01-04-2019",
    personalInfo: {
      address: "Boslaan 56",
      postalCode: "5431 MN",
      city: "Eindhoven",
      emergencyContact: "Tim de Vries (man)",
      emergencyPhone: "06-98712345",
    }
  },
];

// Demo departments for filter
export const departments = [
  "Alle afdelingen",
  "Technische dienst",
  "Productie",
  "HR",
  "Logistiek",
  "Receptie",
  "QHSE",
];

// Demo certificaten - bijgewerkt met actuele datums
export const employeeCertificates = {
  "1": [
    { id: "1", name: "BHV Certificaat", type: "BHV", issueDate: "15-03-2023", expiryDate: "15-03-2025", status: "active" },
    { id: "2", name: "VCA Basis", type: "VCA", issueDate: "15-03-2023", expiryDate: "15-01-2025", status: "expired" },
    { id: "3", name: "Heftruck Certificaat", type: "Heftruck", issueDate: "10-10-2023", expiryDate: "10-10-2025", status: "active" },
    { id: "4", name: "EHBO Diploma", type: "EHBO", issueDate: "05-05-2023", expiryDate: "05-05-2025", status: "active" },
  ],
  "2": [
    { id: "5", name: "VCA VOL", type: "VCA", issueDate: "20-02-2023", expiryDate: "20-02-2026", status: "active" },
    { id: "6", name: "BHV Certificaat", type: "BHV", issueDate: "12-12-2023", expiryDate: "12-03-2025", status: "expiring" },
  ],
  "3": [
    { id: "7", name: "BHV Certificaat", type: "BHV", issueDate: "05-01-2023", expiryDate: "05-01-2025", status: "expired" },
    { id: "8", name: "EHBO Diploma", type: "EHBO", issueDate: "10-03-2023", expiryDate: "10-03-2025", status: "active" },
  ],
  "4": [
    { id: "9", name: "BHV Certificaat", type: "BHV", issueDate: "15-05-2023", expiryDate: "15-05-2025", status: "active" },
    { id: "10", name: "VCA Basis", type: "VCA", issueDate: "20-06-2023", expiryDate: "20-06-2025", status: "active" },
    { id: "11", name: "Heftruck Certificaat", type: "Heftruck", issueDate: "01-07-2023", expiryDate: "01-07-2025", status: "active" },
    { id: "12", name: "Reachtruck Certificaat", type: "Reachtruck", issueDate: "01-07-2023", expiryDate: "01-07-2025", status: "active" },
  ],
  "5": [
    { id: "13", name: "BHV Certificaat", type: "BHV", issueDate: "10-04-2023", expiryDate: "10-03-2025", status: "expiring" },
    { id: "14", name: "EHBO Basis", type: "EHBO", issueDate: "15-05-2023", expiryDate: "15-05-2025", status: "active" },
  ],
  "6": [
    { id: "15", name: "MVK Diploma", type: "MVK", issueDate: "01-01-2020", expiryDate: "01-01-2030", status: "active" },
    { id: "16", name: "BHV Certificaat", type: "BHV", issueDate: "10-10-2023", expiryDate: "10-10-2025", status: "active" },
    { id: "17", name: "VCA VOL", type: "VCA", issueDate: "15-11-2023", expiryDate: "15-11-2026", status: "active" },
    { id: "18", name: "EHBO Diploma", type: "EHBO", issueDate: "20-12-2023", expiryDate: "20-12-2025", status: "active" },
    { id: "19", name: "Hoger Veiligheidskundige", type: "HVK", issueDate: "01-01-2020", expiryDate: "01-01-2030", status: "active" },
  ],
  "7": [
    { id: "20", name: "Procesoperator A", type: "MBO", issueDate: "01-07-2018", expiryDate: "n.v.t.", status: "active" },
    { id: "21", name: "VCA Basis", type: "VCA", issueDate: "15-09-2023", expiryDate: "15-09-2025", status: "active" },
    { id: "22", name: "BHV Certificaat", type: "BHV", issueDate: "01-02-2023", expiryDate: "01-03-2025", status: "expiring" },
  ]
};

// Demo PBM's - bijgewerkt met actuele datums
export const employeePBMs = {
  "1": [
    { id: "1", type: "Veiligheidshelm", issueDate: "01-01-2024", expiryDate: "01-01-2026", status: "active" },
    { id: "2", type: "Veiligheidsschoenen", issueDate: "01-01-2024", expiryDate: "01-01-2025", status: "active" },
    { id: "3", type: "Werkhandschoenen", issueDate: "01-03-2024", expiryDate: "01-03-2025", status: "active" },
  ],
  "2": [
    { id: "4", type: "Veiligheidshelm", issueDate: "15-02-2024", expiryDate: "15-02-2026", status: "active" },
    { id: "5", type: "Veiligheidsschoenen", issueDate: "15-02-2024", expiryDate: "15-03-2025", status: "expiring" },
  ],
  "3": [
    { id: "6", type: "Veiligheidsschoenen", issueDate: "10-01-2024", expiryDate: "10-01-2025", status: "active" },
  ],
  "4": [
    { id: "7", type: "Veiligheidshelm", issueDate: "05-02-2024", expiryDate: "05-03-2025", status: "expiring" },
    { id: "8", type: "Veiligheidsschoenen", issueDate: "05-02-2024", expiryDate: "05-02-2025", status: "active" },
    { id: "9", type: "Veiligheidshandschoenen", issueDate: "05-02-2024", expiryDate: "05-02-2025", status: "active" },
    { id: "10", type: "Gehoorbescherming", issueDate: "05-02-2024", expiryDate: "05-02-2029", status: "active" },
  ],
  "5": [
    { id: "11", type: "Veiligheidsschoenen", issueDate: "01-12-2023", expiryDate: "01-12-2024", status: "active" },
  ],
  "6": [
    { id: "12", type: "Veiligheidshelm", issueDate: "15-01-2024", expiryDate: "15-01-2026", status: "active" },
    { id: "13", type: "Veiligheidsschoenen", issueDate: "15-01-2024", expiryDate: "15-01-2025", status: "active" },
    { id: "14", type: "Veiligheidsbril", issueDate: "15-01-2024", expiryDate: "15-01-2025", status: "active" },
  ],
  "7": [
    { id: "15", type: "Veiligheidshelm", issueDate: "01-04-2024", expiryDate: "01-04-2026", status: "active" },
    { id: "16", type: "Veiligheidsschoenen", issueDate: "01-04-2024", expiryDate: "01-04-2025", status: "active" },
    { id: "17", type: "Chemisch bestendige handschoenen", issueDate: "01-04-2024", expiryDate: "01-04-2025", status: "active" },
  ]
};

// Demo trainingen - bijgewerkt met actuele datums
export const employeeTrainings = {
  "1": [
    { id: "1", name: "BHV Herhaling", date: "15-03-2025", status: "planned" },
    { id: "2", name: "Valbeveiliging", date: "20-03-2025", status: "planned" },
  ],
  "2": [
    { id: "3", name: "Leidinggeven aan een BHV-team", date: "10-04-2025", status: "planned" },
    { id: "4", name: "BHV Herhaling", date: "05-03-2025", status: "planned" },
  ],
  "3": [
    { id: "5", name: "BHV Herhaling", date: "20-02-2025", status: "completed" },
  ],
  "4": [
    { id: "6", name: "Reachtruck Advanced", date: "01-04-2025", status: "planned" },
    { id: "7", name: "BHV Herhaling", date: "15-05-2025", status: "planned" },
  ],
  "5": [
    { id: "8", name: "BHV Herhaling", date: "15-03-2025", status: "planned" },
  ],
  "6": [
    { id: "9", name: "BHV Herhaling", date: "01-04-2025", status: "planned" },
    { id: "10", name: "RI&E Workshop", date: "15-03-2025", status: "planned" },
  ],
  "7": [
    { id: "11", name: "BHV Herhaling", date: "15-03-2025", status: "planned" },
    { id: "12", name: "Procesoptimalisatie", date: "10-04-2025", status: "planned" },
  ]
};

// Demo e-learning - bijgewerkt met actuele datums
export const employeeElearnings = {
  "1": [
    { id: "1", name: "Basisveiligheid VCA", date: "10-01-2025", progress: "100%", status: "completed" },
    { id: "2", name: "EHBO Basis", date: "03-02-2025", progress: "75%", status: "in-progress" },
  ],
  "2": [
    { id: "3", name: "Leidinggeven en veiligheid", date: "15-01-2025", progress: "100%", status: "completed" },
    { id: "4", name: "BHV E-learning module", date: "01-03-2025", progress: "50%", status: "in-progress" },
  ],
  "3": [
    { id: "5", name: "HR en veiligheid", date: "05-01-2025", progress: "100%", status: "completed" },
  ],
  "4": [
    { id: "6", name: "Veilig werken in het magazijn", date: "10-02-2025", progress: "100%", status: "completed" },
    { id: "7", name: "BHV E-learning module", date: "01-03-2025", progress: "25%", status: "in-progress" },
  ],
  "5": [
    { id: "8", name: "BHV E-learning module", date: "15-02-2025", progress: "90%", status: "in-progress" },
  ],
  "6": [
    { id: "9", name: "Risicomanagement Advanced", date: "10-01-2025", progress: "100%", status: "completed" },
    { id: "10", name: "ISO 45001 Introductie", date: "20-02-2025", progress: "100%", status: "completed" },
  ],
  "7": [
    { id: "11", name: "Werken met gevaarlijke stoffen", date: "15-01-2025", progress: "100%", status: "completed" },
    { id: "12", name: "BHV E-learning module", date: "01-03-2025", progress: "60%", status: "in-progress" },
  ]
};

// Demo notities - bijgewerkt met actuele datums
export const employeeNotes = {
  "1": [
    { id: "1", date: "10-02-2025", author: "P. de Vries", text: "Gesprek gehad over nieuwe BHV-training. Jan heeft aangegeven interesse te hebben." },
    { id: "2", date: "02-01-2025", author: "M. Willemsen", text: "Nieuwe PBM's uitgedeeld voor project X." },
  ],
  "2": [
    { id: "3", date: "05-02-2025", author: "D. van Dam", text: "Pieter heeft aangegeven VCA VOL te willen verlengen voor einde van het jaar." },
    { id: "4", date: "15-02-2025", author: "J. de Boer", text: "Besproken dat Pieter het BHV-team gaat leiden bij ontruimingsoefening in april." },
  ],
  "3": [
    { id: "5", date: "20-01-2025", author: "D. van Dam", text: "Maria gaat nieuwe medewerkers informeren over het BHV-plan." },
  ],
  "4": [
    { id: "6", date: "15-02-2025", author: "D. van Dam", text: "Klaas heeft aangegeven uit dienst te gaan op 30-04-2025. Vervanger voor BHV-team nodig." },
  ],
  "5": [
    { id: "7", date: "10-02-2025", author: "P. de Vries", text: "Sophie heeft interesse getoond in uitbreiding van haar BHV-taken." },
  ],
  "6": [
    { id: "8", date: "01-02-2025", author: "J. de Boer", text: "Dirk gaat RI&E workshop voorbereiden voor managementteam." },
  ],
  "7": [
    { id: "9", date: "05-02-2025", author: "D. van Dam", text: "Emma wil graag de procesoperator B opleiding volgen na afronding van haar BHV-certificaat." },
  ]
};
