
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Trash } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TachographCard } from "./types";

interface TachographTableProps {
  cards: TachographCard[];
  formatDate: (dateString: string) => string;
}

export const TachographTable = ({ cards, formatDate }: TachographTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Naam medewerker</TableHead>
          <TableHead>Afdeling / Locatie</TableHead>
          <TableHead>Kaartnummer</TableHead>
          <TableHead>Afgegeven op</TableHead>
          <TableHead>Verloopt op</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Acties</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.length > 0 ? (
          cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell className="font-medium">{card.employeeName}</TableCell>
              <TableCell>{card.department}</TableCell>
              <TableCell>{card.cardNumber}</TableCell>
              <TableCell>{formatDate(card.issuedDate)}</TableCell>
              <TableCell>{formatDate(card.expiryDate)}</TableCell>
              <TableCell>
                <StatusBadge status={card.status} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {card.proofUrl && (
                    <Button variant="ghost" size="sm">
                      <FileText size={16} />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-gray-500">
              Geen tachograafkaarten gevonden
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
