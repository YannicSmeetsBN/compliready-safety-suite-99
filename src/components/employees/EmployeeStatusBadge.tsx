
interface EmployeeStatusBadgeProps {
  status: string;
  label?: string;
}

export const EmployeeStatusBadge = ({ status, label }: EmployeeStatusBadgeProps) => {
  // If a custom label is provided, use it, otherwise determine it based on status
  const displayLabel = label || (() => {
    switch (status) {
      case "active":
        return "Actief";
      case "expiring":
        return "Bijna verlopen";
      case "expired":
        return "Verlopen";
      case "completed":
        return "Afgerond";
      case "planned":
        return "Gepland";
      case "in-progress":
        return "In uitvoering";
      case "invited":
        return "Medewerker uitgenodigd";
      default:
        return status;
    }
  })();

  switch (status) {
    case "active":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{displayLabel}</span>;
    case "expiring":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">{displayLabel}</span>;
    case "expired":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{displayLabel}</span>;
    case "completed":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{displayLabel}</span>;
    case "planned":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{displayLabel}</span>;
    case "in-progress":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{displayLabel}</span>;
    case "invited":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{displayLabel}</span>;
    default:
      return null;
  }
};
