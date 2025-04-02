
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Certificate, SortConfig } from "./types";
import { CertificateStatusBadge } from "./CertificateStatusBadge";
import { CertificateTableHead } from "./CertificateTableHead";
import { CertificateActions } from "./CertificateActions";
import { CertificateToolbar } from "./CertificateToolbar";
import { 
  filterCertificates, 
  filterCertificatesByCategory,
  sortCertificates, 
  getNextSortDirection, 
  sampleCertificates 
} from "./certificate-utils";

interface CertificateListProps {
  isCompany?: boolean;
  initialStatusFilter?: string | null;
}

export const CertificateList = ({ 
  isCompany = false, 
  initialStatusFilter = null 
}: CertificateListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Certificate["status"] | null>(
    initialStatusFilter as Certificate["status"] | null
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  // Update status filter when initialStatusFilter changes
  useEffect(() => {
    if (initialStatusFilter) {
      setStatusFilter(initialStatusFilter as Certificate["status"]);
    }
  }, [initialStatusFilter]);

  // Demo data
  const certificates = sampleCertificates;

  // First filter by company/employee category
  const categorizedCertificates = filterCertificatesByCategory(certificates, isCompany);

  // Get unique certificate types for filter from the categorized certificates
  const uniqueTypes = Array.from(new Set(categorizedCertificates.map(cert => cert.type)));

  // Handle sorting when clicking on a column header
  const handleSort = (key: keyof Certificate) => {
    const direction = getNextSortDirection(key, sortConfig);
    setSortConfig({ key, direction });
  };

  // Apply filters and sorting to the certificates
  const filteredCertificates = filterCertificates(
    categorizedCertificates,
    searchTerm,
    typeFilter,
    statusFilter
  );

  const sortedCertificates = sortCertificates(filteredCertificates, sortConfig);

  return (
    <div className="space-y-6">
      <CertificateToolbar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <CertificateTableHead
                label="Certificaat"
                sortKey="name"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <CertificateTableHead
                label={isCompany ? "Bedrijf" : "Medewerker"}
                sortKey="employee"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <CertificateTableHead
                label="Type"
                sortKey="type"
                sortConfig={sortConfig}
                hasFilter={true}
                filterItems={uniqueTypes}
                activeFilter={typeFilter}
                onSort={handleSort}
                onFilter={setTypeFilter}
              />
              <CertificateTableHead
                label="Uitgiftedatum"
                sortKey="issueDate"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <CertificateTableHead
                label="Vervaldatum"
                sortKey="expiryDate"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <CertificateTableHead
                label="Status"
                sortKey="status"
                sortConfig={sortConfig}
                hasFilter={true}
                filterItems={["active", "expiring", "expired"]}
                activeFilter={statusFilter}
                onSort={handleSort}
                onFilter={(value) => setStatusFilter(value as Certificate["status"] | null)}
              />
              <TableCell className="text-right">Acties</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCertificates.length > 0 ? (
              sortedCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell className="font-medium flex items-center">
                    <FileText className="mr-2 text-compliblue" size={16} />
                    {certificate.name}
                  </TableCell>
                  <TableCell>{certificate.employee}</TableCell>
                  <TableCell>{certificate.type}</TableCell>
                  <TableCell>{certificate.issueDate}</TableCell>
                  <TableCell>{certificate.expiryDate}</TableCell>
                  <TableCell>
                    <CertificateStatusBadge status={certificate.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <CertificateActions />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Geen certificaten gevonden die voldoen aan de zoekcriteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
