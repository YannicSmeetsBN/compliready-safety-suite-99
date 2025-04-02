
import { Calendar, Plus, Edit, Trash, Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmployeeTrainingsProps {
  trainings: any[];
  handleAdd: (section: string) => void;
  handleEdit: (section: string, item: string) => void;
  handleDelete: (section: string, item: string) => void;
}

export const EmployeeTrainings = ({ 
  trainings,
  handleAdd,
  handleEdit,
  handleDelete
}: EmployeeTrainingsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Calendar className="mr-2" size={20} />
          Trainingen
        </CardTitle>
        <Button 
          className="bg-compliblue hover:bg-compliblue/90" 
          size="sm" 
          onClick={() => handleAdd('training')}
        >
          <Plus className="mr-2" size={16} />
          Training plannen
        </Button>
      </CardHeader>
      <CardContent>
        {trainings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Geen trainingen gevonden
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.name}</TableCell>
                  <TableCell>{training.date}</TableCell>
                  <TableCell>
                    <EmployeeStatusBadge status={training.status} />
                  </TableCell>
                  <TableCell>
                    {training.time && training.location && training.trainer ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Info size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="p-3 max-w-xs">
                            <div className="space-y-1 text-sm">
                              <p><strong>Tijd:</strong> {training.time}</p>
                              <p><strong>Locatie:</strong> {training.location}</p>
                              <p><strong>Trainer:</strong> {training.trainer}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-gray-400 text-sm">Geen details</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit('training', training.name)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete('training', training.name)}
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
