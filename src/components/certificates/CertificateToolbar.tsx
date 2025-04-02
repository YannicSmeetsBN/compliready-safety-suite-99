
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CertificateToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const CertificateToolbar: React.FC<CertificateToolbarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="flex justify-between">
      <div className="relative w-72">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          placeholder="Zoeken..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
