import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { FileText, Building } from "lucide-react";
import { CertificateList } from "@/components/certificates/CertificateList";

const Certificates = () => {
  const [activeTab, setActiveTab] = useState("employee");

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Certificaatbeheer</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="employee" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Medewerkercertificaten</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building size={16} />
                <span>Werkgevercertificaten</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="employee" className="space-y-6">
              <CertificateList />
            </TabsContent>
            
            <TabsContent value="company" className="space-y-6">
              <div className="p-4 border rounded-md bg-gray-50">
                <p className="text-center text-gray-500">Bedrijfscertificaten worden hier weergegeven.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Certificates;
