
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { EmployeeStatusBadge } from "./EmployeeStatusBadge";

interface Employee {
  id: string;
  name: string;
  function: string;
  department: string;
  email: string;
  certificateStatus: string;
  pbmStatus: string;
  activeCertificates?: number;
  expiredCertificates?: number;
}

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const navigate = useNavigate();

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employees/${employeeId}`);
  };

  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Functie</TableHead>
            <TableHead>Afdeling</TableHead>
            <TableHead>E-mailadres</TableHead>
            <TableHead>Status certificaten</TableHead>
            <TableHead>Status PBM's</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Geen medewerkers gevonden
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow 
                key={employee.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleEmployeeClick(employee.id)}
              >
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.function}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <EmployeeStatusBadge status={employee.certificateStatus} />
                </TableCell>
                <TableCell>
                  <EmployeeStatusBadge status={employee.pbmStatus} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
