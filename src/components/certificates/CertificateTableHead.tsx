
import React from "react";
import { TableHead } from "@/components/ui/table";
import { Certificate, SortConfig } from "./types";
import { ArrowUp, ArrowDown, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CertificateTableHeadProps {
  label: string;
  sortKey: keyof Certificate;
  sortConfig: SortConfig;
  hasFilter?: boolean;
  filterItems?: string[] | Certificate["status"][];
  activeFilter?: string | null;
  onSort: (key: keyof Certificate) => void;
  onFilter?: (value: string | null) => void;
}

export const CertificateTableHead: React.FC<CertificateTableHeadProps> = ({
  label,
  sortKey,
  sortConfig,
  hasFilter = false,
  filterItems = [],
  activeFilter = null,
  onSort,
  onFilter,
}) => {
  const getSortIcon = () => {
    if (sortConfig.key === sortKey) {
      if (sortConfig.direction === "asc") {
        return <ArrowUp className="ml-1 h-4 w-4 inline" />;
      } else if (sortConfig.direction === "desc") {
        return <ArrowDown className="ml-1 h-4 w-4 inline" />;
      }
    }
    return null;
  };

  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFilter) {
      onFilter(null);
    }
  };

  return (
    <TableHead
      className="cursor-pointer select-none"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center">
        <span>{label}</span>
        {getSortIcon()}

        {activeFilter && hasFilter && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 ml-1 text-gray-400 hover:text-gray-600"
            onClick={handleClearFilter}
            title="Filter wissen"
          >
            <X size={14} />
          </Button>
        )}

        {hasFilter && filterItems.length > 0 && onFilter && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={(e) => e.stopPropagation()}>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilter(null);
                  }}
                >
                  Alle
                </DropdownMenuItem>
                {filterItems.map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilter(item);
                    }}
                  >
                    {sortKey === "status"
                      ? item === "active"
                        ? "Actueel"
                        : item === "expiring"
                        ? "Verloopt binnenkort"
                        : "Verlopen"
                      : item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </TableHead>
  );
};
