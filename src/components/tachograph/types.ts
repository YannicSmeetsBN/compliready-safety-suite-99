
import { TachographStatus } from "./StatusBadge";

export type TachographCard = {
  id: string;
  employeeName: string;
  department: string;
  cardNumber: string;
  issuedDate: string;
  expiryDate: string;
  proofUrl?: string;
  status: TachographStatus;
};
