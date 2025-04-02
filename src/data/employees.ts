
// Basic employee data
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
