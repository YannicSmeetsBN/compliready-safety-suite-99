
import React from "react";

export type TachographStatus = "actief" | "verlopen" | "binnenkort-verlopen";

interface StatusBadgeProps {
  status: TachographStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    "actief": { color: "bg-green-100 text-green-800", label: "Actief" },
    "verlopen": { color: "bg-red-100 text-red-800", label: "Verlopen" },
    "binnenkort-verlopen": { color: "bg-amber-100 text-amber-800", label: "Binnenkort verlopen" }
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};
