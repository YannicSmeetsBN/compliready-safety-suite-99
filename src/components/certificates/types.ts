
export type Certificate = {
  id: string;
  name: string;
  employee: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring" | "expired";
};

export type SortDirection = "asc" | "desc" | null;

export type SortConfig = {
  key: keyof Certificate | null;
  direction: SortDirection;
};
