
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

type SortControlsProps = {
  sortBy: "name" | "score" | "deadline";
  sortOrder: "asc" | "desc";
  onSort: (field: "name" | "score" | "deadline") => void;
};

export const SortControls = ({ sortBy, sortOrder, onSort }: SortControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onSort("name")}
        className="text-xs"
      >
        Naam
        {sortBy === "name" && (
          sortOrder === "asc" ? 
            <ArrowUp className="ml-1" size={12} /> : 
            <ArrowDown className="ml-1" size={12} />
        )}
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onSort("score")}
        className={`text-xs ${sortBy === "score" ? "bg-gray-100" : ""}`}
      >
        Risicoscore
        {sortBy === "score" && (
          sortOrder === "asc" ? 
            <ArrowUp className="ml-1" size={12} /> : 
            <ArrowDown className="ml-1" size={12} />
        )}
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onSort("deadline")}
        className="text-xs"
      >
        Deadline
        {sortBy === "deadline" && (
          sortOrder === "asc" ? 
            <ArrowUp className="ml-1" size={12} /> : 
            <ArrowDown className="ml-1" size={12} />
        )}
      </Button>
    </div>
  );
};
