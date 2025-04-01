
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Download, 
  Filter, 
  FileText, 
  Search, 
  Edit, 
  Trash,
  Clock,
  Bell
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Tachograph card types
type TachographStatus = "actief" | "verlopen" | "binnenkort-verlopen";

type TachographCard = {
  id: string;
  employeeName: string;
  department: string;
  cardNumber: string;
  issuedDate: string;
  expiryDate: string;
  proofUrl?: string;
  status: TachographStatus;
};

// Sample tachograph card data
const sampleTachographCards: TachographCard[] = [
  {
    id: "card-1",
    employeeName: "Jan Jansen",
    department: "Transport Amsterdam",
    cardNumber: "NL1234567890",
    issuedDate: "2022-06-15",
    expiryDate: "2025-06-15",
    proofUrl: "#",
    status: "actief"
  },
  {
    id: "card-2",
    employeeName: "Piet Pietersen",
    department: "Transport Rotterdam",
    cardNumber: "NL0987654321",
    issuedDate: "2020-03-10",
    expiryDate: "2024-05-01",
    proofUrl: "#",
    status: "binnenkort-verlopen"
  },
  {
    id: "card-3",
    employeeName: "Klaas Klaassen",
    department: "Transport Utrecht",
    cardNumber: "NL1122334455",
    issuedDate: "2019-11-20",
    expiryDate: "2023-11-20",
    status: "verlopen"
  },
  {
    id: "card-4",
    employeeName: "Anna Jansma",
    department: "Transport Amsterdam",
    cardNumber: "NL5544332211",
    issuedDate: "2023-01-05",
    expiryDate: "2026-01-05",
    proofUrl: "#",
    status: "actief"
  }
];

// Status Badge component for tachograph card status
const StatusBadge = ({ status }: { status: TachographStatus }) => {
  const statusConfig = {
    "actief": { color: "bg-green-100 text-green-800", label: "Actief" },
    "verlopen": { color: "bg-red-100 text-red-800", label: "Verlopen" },
    "binnenkort-verlopen": { color: "bg-amber-100 text-amber-800", label: "Binnenkort verlopen" }
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

// Format date to Dutch format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

const Tachograph = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<TachographStatus | "all">("all");
  
  // Filter cards based on search query and status
  const filteredCards = sampleTachographCards.filter(card => {
    const matchesSearch = card.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          card.cardNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || card.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <div className="flex justify-between items-center mb-6">
            <h1 className="page-title">Tachograaf</h1>
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <Plus size={16} className="mr-2" />
              Nieuwe Tachograafkaart
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <Clock className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Actieve Tachograafkaarten</p>
                  <p className="text-xl font-bold">{sampleTachographCards.filter(c => c.status === "actief").length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 rounded-full bg-amber-100 mr-3">
                  <Bell className="text-amber-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Binnenkort verlopen</p>
                  <p className="text-xl font-bold">{sampleTachographCards.filter(c => c.status === "binnenkort-verlopen").length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <AlertTriangle className="text-red-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Verlopen kaarten</p>
                  <p className="text-xl font-bold">{sampleTachographCards.filter(c => c.status === "verlopen").length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tachograafkaarten Overzicht</CardTitle>
              <CardDescription>
                Beheer alle tachograafkaarten van uw medewerkers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input 
                    placeholder="Zoek op naam of kaartnummer" 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={filterStatus === "all" ? "default" : "outline"}
                    className={filterStatus === "all" ? "bg-compliblue hover:bg-compliblue/90" : ""}
                    onClick={() => setFilterStatus("all")}
                  >
                    Alle
                  </Button>
                  <Button 
                    variant={filterStatus === "actief" ? "default" : "outline"}
                    className={filterStatus === "actief" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setFilterStatus("actief")}
                  >
                    Actief
                  </Button>
                  <Button 
                    variant={filterStatus === "binnenkort-verlopen" ? "default" : "outline"}
                    className={filterStatus === "binnenkort-verlopen" ? "bg-amber-500 hover:bg-amber-600" : ""}
                    onClick={() => setFilterStatus("binnenkort-verlopen")}
                  >
                    Binnenkort Verlopen
                  </Button>
                  <Button 
                    variant={filterStatus === "verlopen" ? "default" : "outline"}
                    className={filterStatus === "verlopen" ? "bg-red-600 hover:bg-red-700" : ""}
                    onClick={() => setFilterStatus("verlopen")}
                  >
                    Verlopen
                  </Button>
                </div>
              </div>
              
              {/* Tachograph Cards Table */}
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
                  {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
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
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Tachograph;
