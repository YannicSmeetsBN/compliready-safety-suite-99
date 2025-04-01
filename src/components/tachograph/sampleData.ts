
import { TachographCard } from "./types";

export const sampleTachographCards: TachographCard[] = [
  {
    id: "card-1",
    employeeName: "Jan Jansen",
    department: "Transport Amsterdam",
    cardNumber: "NL1234567890",
    issuedDate: "2022-06-15",
    expiryDate: "2025-06-15",
    proofUrl: "#",
    status: "actief"
  },
  {
    id: "card-2",
    employeeName: "Piet Pietersen",
    department: "Transport Rotterdam",
    cardNumber: "NL0987654321",
    issuedDate: "2020-03-10",
    expiryDate: "2024-05-01",
    proofUrl: "#",
    status: "binnenkort-verlopen"
  },
  {
    id: "card-3",
    employeeName: "Klaas Klaassen",
    department: "Transport Utrecht",
    cardNumber: "NL1122334455",
    issuedDate: "2019-11-20",
    expiryDate: "2023-11-20",
    status: "verlopen"
  },
  {
    id: "card-4",
    employeeName: "Anna Jansma",
    department: "Transport Amsterdam",
    cardNumber: "NL5544332211",
    issuedDate: "2023-01-05",
    expiryDate: "2026-01-05",
    proofUrl: "#",
    status: "actief"
  }
];
