
import { FileText, Plus, Edit, Trash, Download } from "lucide-react";
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

interface EmployeeCertificatesProps {
  certificates: any[];
  handleAdd: (section: string) => void;
  handleEdit: (section: string, item: string) => void;
  handleDelete: (section: string, item: string) => void;
  handleDownload: (section: string, item: string) => void;
}

export const EmployeeCertificates = ({ 
  certificates,
  handleAdd,
  handleEdit,
  handleDelete,
  handleDownload
}: EmployeeCertificatesProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2" size={20} />
          Certificaten
        </CardTitle>
        <Button 
          className="bg-compliblue hover:bg-compliblue/90" 
          size="sm" 
          onClick={() => handleAdd('certificaat')}
        >
          <Plus className="mr-2" size={16} />
          Certificaat toevoegen
        </Button>
      </CardHeader>
      <CardContent>
        {certificates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Geen certificaten gevonden
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificaat</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uitgiftedatum</TableHead>
                <TableHead>Vervaldatum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.name}</TableCell>
                  <TableCell>{cert.type}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>{cert.expiryDate}</TableCell>
                  <TableCell>
                    <EmployeeStatusBadge status={cert.status} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload('certificaat', cert.name)}
                    >
                      <Download size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit('certificaat', cert.name)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete('certificaat', cert.name)}
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
