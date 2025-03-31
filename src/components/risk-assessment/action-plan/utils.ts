
/**
 * Formats a date string into a localized date format
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
};

/**
 * Returns the risk level based on the risk score
 */
export const getRiskLevel = (score: number) => {
  if (score >= 7) return { level: "Hoog", color: "bg-red-100 text-red-800" };
  if (score >= 4) return { level: "Middel", color: "bg-amber-100 text-amber-800" };
  return { level: "Laag", color: "bg-green-100 text-green-800" };
};

/**
 * Gets the earliest deadline from a risk's measures
 */
export const getEarliestDeadline = (risk: any) => {
  if (!risk.measures || risk.measures.length === 0) return "9999-12-31";
  return risk.measures
    .filter((m: any) => m.deadline)
    .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0]?.deadline || "9999-12-31";
};
