
export interface BhvMember {
  id: string;
  name: string;
  department: string;
  certified: boolean;
  status: "available" | "unavailable";
}

export interface CallHistoryItem {
  id: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
  responded: number;
  details: string;
}
