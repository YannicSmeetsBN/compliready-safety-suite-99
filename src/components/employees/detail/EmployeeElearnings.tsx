
import { BookOpen, Plus, Edit, Trash } from "lucide-react";
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

interface EmployeeElearningsProps {
  elearnings: any[];
  handleAdd: (section: string) => void;
  handleEdit: (section: string, item: string) => void;
  handleDelete: (section: string, item: string) => void;
}

export const EmployeeElearnings = ({ 
  elearnings,
  handleAdd,
  handleEdit,
  handleDelete
}: EmployeeElearningsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <BookOpen className="mr-2" size={20} />
          E-learning modules
        </CardTitle>
        <Button 
          className="bg-compliblue hover:bg-compliblue/90" 
          size="sm" 
          onClick={() => handleAdd('e-learning')}
        >
          <Plus className="mr-2" size={16} />
          E-learning toewijzen
        </Button>
      </CardHeader>
      <CardContent>
        {elearnings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Geen e-learning modules gevonden
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Voortgang</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elearnings.map((elearning) => (
                <TableRow key={elearning.id}>
                  <TableCell className="font-medium">{elearning.name}</TableCell>
                  <TableCell>{elearning.date}</TableCell>
                  <TableCell>{elearning.progress}</TableCell>
                  <TableCell>
                    <EmployeeStatusBadge status={elearning.status} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit('e-learning', elearning.name)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete('e-learning', elearning.name)}
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
