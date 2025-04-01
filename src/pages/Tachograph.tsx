
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
import { Plus } from "lucide-react";
import { TachographStatus } from "@/components/tachograph/StatusBadge";
import { StatisticsCards } from "@/components/tachograph/StatisticsCards";
import { TachographFilters } from "@/components/tachograph/TachographFilters";
import { TachographTable } from "@/components/tachograph/TachographTable";
import { formatDate } from "@/components/tachograph/utils";
import { sampleTachographCards } from "@/components/tachograph/sampleData";

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
          <StatisticsCards tachographCards={sampleTachographCards} />

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
              <TachographFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
              
              {/* Tachograph Cards Table */}
              <TachographTable 
                cards={filteredCards}
                formatDate={formatDate}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Tachograph;
