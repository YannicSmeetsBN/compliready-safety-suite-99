
import { Certificate, SortConfig, SortDirection } from "./types";

// Apply filters to certificates
export const filterCertificates = (
  certificates: Certificate[],
  searchTerm: string,
  typeFilter: string | null,
  statusFilter: Certificate["status"] | null
): Certificate[] => {
  return certificates.filter((cert) => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter ? cert.type === typeFilter : true;
    const matchesStatus = statusFilter ? cert.status === statusFilter : true;

    return matchesSearch && matchesType && matchesStatus;
  });
};

// Filter certificates by whether they are company or employee certificates
export const filterCertificatesByCategory = (
  certificates: Certificate[],
  isCompany: boolean
): Certificate[] => {
  return certificates.filter((cert) => {
    // Company certificates have "Organisatie" as the employee
    const isCompanyCertificate = cert.employee === "Organisatie";
    return isCompany ? isCompanyCertificate : !isCompanyCertificate;
  });
};

// Sort certificates based on sort configuration
export const sortCertificates = (
  certificates: Certificate[],
  sortConfig: SortConfig
): Certificate[] => {
  if (!sortConfig.key || !sortConfig.direction) {
    return certificates;
  }

  return [...certificates].sort((a, b) => {
    const key = sortConfig.key as keyof Certificate;

    if (a[key] < b[key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

// Get next sort direction in the cycle: null -> asc -> desc -> null
export const getNextSortDirection = (
  currentKey: keyof Certificate,
  sortConfig: SortConfig
): SortDirection => {
  if (sortConfig.key !== currentKey) {
    return "asc";
  }

  if (sortConfig.direction === "asc") {
    return "desc";
  } else if (sortConfig.direction === "desc") {
    return null;
  }

  return "asc";
};

// Sample certificate data - bijgewerkt voor demo met uitbreidingen om aan te sluiten bij dashboard totalen
export const sampleCertificates: Certificate[] = [
  // Medewerker certificaten - 18 actief, 5 bijna verlopen, 3 verlopen
  {
    id: "1",
    name: "BHV Certificaat",
    employee: "Jan Janssen",
    type: "BHV",
    issueDate: "15-03-2023",
    expiryDate: "15-03-2025",
    status: "active",
  },
  {
    id: "2",
    name: "VCA Basis",
    employee: "Jan Janssen",
    type: "VCA",
    issueDate: "15-03-2023", 
    expiryDate: "15-01-2025",
    status: "expired",
  },
  {
    id: "3",
    name: "EHBO Diploma",
    employee: "Maria Willemsen",
    type: "EHBO",
    issueDate: "10-01-2021",
    expiryDate: "10-01-2025",
    status: "expired",
  },
  {
    id: "4",
    name: "Heftruck Certificaat",
    employee: "Klaas Klaassen",
    type: "Heftruck",
    issueDate: "05-09-2023",
    expiryDate: "05-09-2025",
    status: "active",
  },
  {
    id: "5",
    name: "VCA VOL",
    employee: "Pieter Pietersen",
    type: "VCA",
    issueDate: "20-02-2023",
    expiryDate: "20-02-2026",
    status: "active",
  },
  {
    id: "6",
    name: "BHV Certificaat",
    employee: "Pieter Pietersen",
    type: "BHV",
    issueDate: "12-12-2023",
    expiryDate: "12-03-2025",
    status: "expiring",
  },
  {
    id: "7",
    name: "BHV Certificaat",
    employee: "Maria Willemsen",
    type: "BHV",
    issueDate: "05-01-2023",
    expiryDate: "05-01-2025",
    status: "expired",
  },
  {
    id: "8",
    name: "EHBO Diploma",
    employee: "Maria Willemsen",
    type: "EHBO",
    issueDate: "10-03-2023",
    expiryDate: "10-03-2025",
    status: "active",
  },
  {
    id: "9",
    name: "BHV Certificaat",
    employee: "Klaas Klaassen",
    type: "BHV",
    issueDate: "15-05-2023",
    expiryDate: "15-05-2025",
    status: "active",
  },
  {
    id: "10",
    name: "VCA Basis",
    employee: "Klaas Klaassen",
    type: "VCA",
    issueDate: "20-06-2023",
    expiryDate: "20-06-2025",
    status: "active",
  },
  {
    id: "11",
    name: "Heftruck Certificaat",
    employee: "Klaas Klaassen",
    type: "Heftruck",
    issueDate: "01-07-2023",
    expiryDate: "01-07-2025",
    status: "active",
  },
  {
    id: "12",
    name: "Reachtruck Certificaat",
    employee: "Klaas Klaassen",
    type: "Reachtruck",
    issueDate: "01-07-2023",
    expiryDate: "01-07-2025",
    status: "active",
  },
  {
    id: "13",
    name: "BHV Certificaat",
    employee: "Sophie Jansen",
    type: "BHV",
    issueDate: "10-04-2023",
    expiryDate: "10-03-2025",
    status: "expiring",
  },
  {
    id: "14",
    name: "EHBO Basis",
    employee: "Sophie Jansen",
    type: "EHBO",
    issueDate: "15-05-2023",
    expiryDate: "15-05-2025",
    status: "active",
  },
  {
    id: "15",
    name: "MVK Diploma",
    employee: "Dirk van Dam",
    type: "MVK",
    issueDate: "01-01-2020",
    expiryDate: "01-01-2030",
    status: "active",
  },
  {
    id: "16",
    name: "BHV Certificaat",
    employee: "Dirk van Dam",
    type: "BHV",
    issueDate: "10-10-2023",
    expiryDate: "10-10-2025",
    status: "active",
  },
  {
    id: "17",
    name: "VCA VOL",
    employee: "Dirk van Dam",
    type: "VCA",
    issueDate: "15-11-2023",
    expiryDate: "15-11-2026",
    status: "active",
  },
  {
    id: "18",
    name: "EHBO Diploma",
    employee: "Dirk van Dam",
    type: "EHBO",
    issueDate: "20-12-2023",
    expiryDate: "20-12-2025",
    status: "active",
  },
  {
    id: "19",
    name: "Hoger Veiligheidskundige",
    employee: "Dirk van Dam",
    type: "HVK",
    issueDate: "01-01-2020",
    expiryDate: "01-01-2030",
    status: "active",
  },
  {
    id: "20",
    name: "Procesoperator A",
    employee: "Emma de Vries",
    type: "MBO",
    issueDate: "01-07-2018",
    expiryDate: "n.v.t.",
    status: "active",
  },
  {
    id: "21",
    name: "VCA Basis",
    employee: "Emma de Vries",
    type: "VCA",
    issueDate: "15-09-2023",
    expiryDate: "15-09-2025",
    status: "active",
  },
  {
    id: "22",
    name: "BHV Certificaat",
    employee: "Emma de Vries",
    type: "BHV",
    issueDate: "01-02-2023",
    expiryDate: "01-03-2025",
    status: "expiring",
  },
  {
    id: "23",
    name: "BHV Certificaat",
    employee: "Thomas Berg",
    type: "BHV",
    issueDate: "15-01-2023",
    expiryDate: "15-03-2025",
    status: "expiring",
  },
  {
    id: "24",
    name: "VCA Basis",
    employee: "Sandra Bakker",
    type: "VCA",
    issueDate: "01-01-2023",
    expiryDate: "01-03-2025",
    status: "expiring",
  },

  // Bedrijfscertificaten
  {
    id: "25",
    name: "ISO 9001",
    employee: "Organisatie",
    type: "ISO",
    issueDate: "20-11-2021",
    expiryDate: "20-11-2024",
    status: "active",
  },
  {
    id: "26",
    name: "NEN 3140",
    employee: "Organisatie",
    type: "NEN",
    issueDate: "15-04-2022",
    expiryDate: "15-04-2025",
    status: "active",
  },
  {
    id: "27",
    name: "VCA-VOL Bedrijf",
    employee: "Organisatie",
    type: "VCA",
    issueDate: "01-01-2023",
    expiryDate: "01-01-2026",
    status: "active",
  },
  {
    id: "28",
    name: "ISO 14001",
    employee: "Organisatie",
    type: "ISO",
    issueDate: "01-06-2022",
    expiryDate: "01-06-2025",
    status: "active",
  },
  {
    id: "29",
    name: "ISO 45001",
    employee: "Organisatie",
    type: "ISO",
    issueDate: "01-09-2023",
    expiryDate: "01-09-2026",
    status: "active",
  }
];
