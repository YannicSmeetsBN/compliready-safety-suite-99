
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Demo data
const employees = [
  {
    id: "1",
    name: "Jan Janssen",
    function: "Technicus",
    department: "Technische dienst",
    email: "jan.janssen@example.com",
    activeCertificates: 3,
    expiredCertificates: 1,
  },
  {
    id: "2",
    name: "Pieter Pietersen",
    function: "Teamleider",
    department: "Productie",
    email: "pieter.pietersen@example.com",
    activeCertificates: 2,
    expiredCertificates: 0,
  },
  {
    id: "3",
    name: "Maria Willemsen",
    function: "HR Manager",
    department: "HR",
    email: "maria.willemsen@example.com",
    activeCertificates: 1,
    expiredCertificates: 1,
  },
  {
    id: "4",
    name: "Klaas Klaassen",
    function: "Magazijnmedewerker",
    department: "Logistiek",
    email: "klaas.klaassen@example.com",
    activeCertificates: 4,
    expiredCertificates: 0,
  },
  {
    id: "5",
    name: "Sophie Jansen",
    function: "Front Office Medewerker",
    department: "Receptie",
    email: "sophie.jansen@example.com",
    activeCertificates: 2,
    expiredCertificates: 0,
  },
  {
    id: "6",
    name: "Dirk van Dam",
    function: "Veiligheidskundige",
    department: "QHSE",
    email: "dirk.vandam@example.com",
    activeCertificates: 5,
    expiredCertificates: 0,
  },
];

const Employees = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Medewerkers</h1>
          
          <div className="flex justify-between mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="Zoeken..." className="pl-10" />
            </div>
            
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <Plus className="mr-2" size={16} />
              Nieuwe medewerker
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription>{employee.function}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Afdeling:</span>
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-compliblue">{employee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Certificaten:</span>
                      <div>
                        <span className="text-green-600">{employee.activeCertificates} actief</span>
                        {employee.expiredCertificates > 0 && (
                          <span className="text-red-600 ml-2">{employee.expiredCertificates} verlopen</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">Bekijken</Button>
                  <Button variant="outline" size="sm">Certificaten</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employees;
