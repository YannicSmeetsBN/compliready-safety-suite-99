
interface EmployeeStatusBadgeProps {
  status: string;
}

export const EmployeeStatusBadge = ({ status }: EmployeeStatusBadgeProps) => {
  switch (status) {
    case "active":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actief</span>;
    case "expiring":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Bijna verlopen</span>;
    case "expired":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Verlopen</span>;
    case "completed":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Afgerond</span>;
    case "planned":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Gepland</span>;
    case "in-progress":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In uitvoering</span>;
    default:
      return null;
  }
};
