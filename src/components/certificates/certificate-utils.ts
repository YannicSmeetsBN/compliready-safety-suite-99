
import { Certificate, SortConfig } from "./types";

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

// Sample certificate data
export const sampleCertificates: Certificate[] = [
  {
    id: "1",
    name: "BHV Certificaat",
    employee: "Jan Janssen",
    type: "BHV",
    issueDate: "01-06-2023",
    expiryDate: "01-06-2025",
    status: "active",
  },
  {
    id: "2",
    name: "VCA Basis",
    employee: "Pieter Pietersen",
    type: "VCA",
    issueDate: "15-03-2022",
    expiryDate: "15-03-2024",
    status: "expiring",
  },
  {
    id: "3",
    name: "EHBO Diploma",
    employee: "Maria Willemsen",
    type: "EHBO",
    issueDate: "10-01-2021",
    expiryDate: "10-01-2023",
    status: "expired",
  },
  {
    id: "4",
    name: "Heftruck Certificaat",
    employee: "Klaas Klaassen",
    type: "Heftruck",
    issueDate: "05-09-2022",
    expiryDate: "05-09-2024",
    status: "active",
  },
  {
    id: "5",
    name: "ISO 9001",
    employee: "Organisatie",
    type: "ISO",
    issueDate: "20-11-2021",
    expiryDate: "20-11-2024",
    status: "active",
  },
];
