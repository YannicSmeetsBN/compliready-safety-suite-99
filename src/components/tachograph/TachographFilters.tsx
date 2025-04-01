
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TachographStatus } from "./StatusBadge";

interface TachographFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: TachographStatus | "all";
  setFilterStatus: (status: TachographStatus | "all") => void;
}

export const TachographFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus 
}: TachographFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <Input 
          placeholder="Zoek op naam of kaartnummer" 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant={filterStatus === "all" ? "default" : "outline"}
          className={filterStatus === "all" ? "bg-compliblue hover:bg-compliblue/90" : ""}
          onClick={() => setFilterStatus("all")}
        >
          Alle
        </Button>
        <Button 
          variant={filterStatus === "actief" ? "default" : "outline"}
          className={filterStatus === "actief" ? "bg-green-600 hover:bg-green-700" : ""}
          onClick={() => setFilterStatus("actief")}
        >
          Actief
        </Button>
        <Button 
          variant={filterStatus === "binnenkort-verlopen" ? "default" : "outline"}
          className={filterStatus === "binnenkort-verlopen" ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => setFilterStatus("binnenkort-verlopen")}
        >
          Binnenkort Verlopen
        </Button>
        <Button 
          variant={filterStatus === "verlopen" ? "default" : "outline"}
          className={filterStatus === "verlopen" ? "bg-red-600 hover:bg-red-700" : ""}
          onClick={() => setFilterStatus("verlopen")}
        >
          Verlopen
        </Button>
      </div>
    </div>
  );
};
