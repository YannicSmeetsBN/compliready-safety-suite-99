
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CertificateForm } from "./CertificateForm";

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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-compliblue hover:bg-compliblue/90">
            <Plus className="mr-2" size={16} />
            Nieuw certificaat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Certificaat toevoegen</DialogTitle>
          </DialogHeader>
          <CertificateForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
