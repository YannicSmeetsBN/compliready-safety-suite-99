
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

// Demo certificaten
export const employeeCertificates = {
  "1": [
    { id: "1", name: "BHV Certificaat", type: "BHV", issueDate: "01-06-2022", expiryDate: "01-06-2024", status: "active" },
    { id: "2", name: "VCA Basis", type: "VCA", issueDate: "15-03-2021", expiryDate: "15-03-2023", status: "expired" },
    { id: "3", name: "Heftruck Certificaat", type: "Heftruck", issueDate: "10-10-2022", expiryDate: "10-10-2024", status: "active" },
    { id: "4", name: "EHBO Diploma", type: "EHBO", issueDate: "05-05-2022", expiryDate: "05-05-2024", status: "active" },
  ],
  "2": [
    { id: "5", name: "VCA VOL", type: "VCA", issueDate: "20-02-2022", expiryDate: "20-02-2025", status: "active" },
    { id: "6", name: "BHV Certificaat", type: "BHV", issueDate: "12-12-2022", expiryDate: "12-12-2024", status: "active" },
  ]
};

// Demo PBM's
export const employeePBMs = {
  "1": [
    { id: "1", type: "Veiligheidshelm", issueDate: "01-01-2023", expiryDate: "01-01-2025", status: "active" },
    { id: "2", type: "Veiligheidsschoenen", issueDate: "01-01-2023", expiryDate: "01-01-2024", status: "active" },
    { id: "3", type: "Werkhandschoenen", issueDate: "01-03-2023", expiryDate: "01-03-2024", status: "active" },
  ],
  "2": [
    { id: "4", type: "Veiligheidshelm", issueDate: "15-02-2023", expiryDate: "15-02-2025", status: "active" },
    { id: "5", type: "Veiligheidsschoenen", issueDate: "15-02-2023", expiryDate: "15-02-2024", status: "expiring" },
  ]
};

// Demo trainingen
export const employeeTrainings = {
  "1": [
    { id: "1", name: "BHV Herhaling", date: "15-05-2023", status: "completed" },
    { id: "2", name: "Valbeveiliging", date: "20-09-2023", status: "planned" },
  ],
  "2": [
    { id: "3", name: "Leidinggeven aan een BHV-team", date: "10-08-2023", status: "planned" },
  ]
};

// Demo e-learning
export const employeeElearnings = {
  "1": [
    { id: "1", name: "Basisveiligheid VCA", date: "10-04-2023", progress: "100%", status: "completed" },
    { id: "2", name: "EHBO Basis", date: "03-07-2023", progress: "75%", status: "in-progress" },
  ],
  "2": [
    { id: "3", name: "Leidinggeven en veiligheid", date: "15-05-2023", progress: "100%", status: "completed" },
  ]
};

// Demo notities
export const employeeNotes = {
  "1": [
    { id: "1", date: "10-06-2023", author: "P. de Vries", text: "Gesprek gehad over nieuwe BHV-training. Jan heeft aangegeven interesse te hebben." },
    { id: "2", date: "02-05-2023", author: "M. Willemsen", text: "Nieuwe PBM's uitgedeeld voor project X." },
  ],
  "2": [
    { id: "3", date: "05-06-2023", author: "D. van Dam", text: "Pieter heeft aangegeven VCA VOL te willen verlengen voor einde van het jaar." },
  ]
};
