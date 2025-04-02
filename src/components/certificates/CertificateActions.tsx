
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface CertificateActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const CertificateActions: React.FC<CertificateActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="icon" onClick={onEdit}>
        <Edit size={16} />
      </Button>
      <Button variant="outline" size="icon" onClick={onDelete}>
        <Trash size={16} />
      </Button>
    </div>
  );
};
