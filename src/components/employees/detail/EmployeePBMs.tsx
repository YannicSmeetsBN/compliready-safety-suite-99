
import { Bell, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { EmployeeStatusBadge } from "../EmployeeStatusBadge";

interface EmployeePBMsProps {
  pbms: any[];
  handleAdd: (section: string) => void;
  handleEdit: (section: string, item: string) => void;
  handleDelete: (section: string, item: string) => void;
}

export const EmployeePBMs = ({ 
  pbms,
  handleAdd,
  handleEdit,
  handleDelete
}: EmployeePBMsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Bell className="mr-2" size={20} />
          Persoonlijke Beschermingsmiddelen
        </CardTitle>
        <Button 
          className="bg-compliblue hover:bg-compliblue/90" 
          size="sm" 
          onClick={() => handleAdd('PBM')}
        >
          <Plus className="mr-2" size={16} />
          PBM toevoegen
        </Button>
      </CardHeader>
      <CardContent>
        {pbms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Geen PBM's gevonden
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type PBM</TableHead>
                <TableHead>Uitgiftedatum</TableHead>
                <TableHead>Vervaldatum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pbms.map((pbm) => (
                <TableRow key={pbm.id}>
                  <TableCell className="font-medium">{pbm.type}</TableCell>
                  <TableCell>{pbm.issueDate}</TableCell>
                  <TableCell>{pbm.expiryDate}</TableCell>
                  <TableCell>
                    <EmployeeStatusBadge status={pbm.status} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit('PBM', pbm.type)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete('PBM', pbm.type)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
