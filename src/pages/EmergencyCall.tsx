
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { toast } from "@/hooks/use-toast";
import { EmergencyCallTabs } from "@/components/emergency/EmergencyCallTabs";
import { ConfirmEndDialog } from "@/components/emergency/ConfirmEndDialog";
import { BhvMember, CallHistoryItem } from "@/components/emergency/types";

const EmergencyCall = () => {
  const [emergencyInProgress, setEmergencyInProgress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  
  // Demo BHV'ers
  const bhvMembers: BhvMember[] = [
    { id: "1", name: "Jan Janssen", department: "Administratie", certified: true, status: "available" },
    { id: "2", name: "Pieter Pietersen", department: "Productie", certified: true, status: "available" },
    { id: "3", name: "Maria Willemsen", department: "HR", certified: true, status: "unavailable" },
    { id: "4", name: "Klaas Klaassen", department: "Logistiek", certified: true, status: "available" },
  ];
  
  // Demo BHV-oproepen
  const callHistory: CallHistoryItem[] = [
    { 
      id: "1", 
      date: "15-06-2023", 
      time: "14:32", 
      location: "Kantoor - 1e verdieping", 
      type: "EHBO",
      status: "Afgehandeld",
      responded: 3,
      details: "Medewerker onwel geworden, EHBO verleend."
    },
    { 
      id: "2", 
      date: "10-05-2023", 
      time: "09:15", 
      location: "Productiehal", 
      type: "Brand",
      status: "Afgehandeld",
      responded: 4,
      details: "Kleine brand bij machine 3, geblust met brandblusser."
    },
    { 
      id: "3", 
      date: "20-04-2023", 
      time: "11:45", 
      location: "Parkeerplaats", 
      type: "EHBO",
      status: "Afgehandeld",
      responded: 2,
      details: "Bezoeker gevallen, EHBO verleend."
    },
  ];
  
  const handleCancelEmergency = () => {
    setShowConfirmDialog(false);
    setEmergencyInProgress(false);
    toast({
      title: "BHV-oproep beëindigd",
      description: "De BHV-oproep is succesvol beëindigd.",
    });
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">BHV-Oproepsysteem</h1>
          
          <EmergencyCallTabs 
            emergencyInProgress={emergencyInProgress}
            setEmergencyInProgress={setEmergencyInProgress}
            setShowConfirmDialog={setShowConfirmDialog}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            bhvMembers={bhvMembers}
            callHistory={callHistory}
          />
          
          <ConfirmEndDialog 
            showConfirmDialog={showConfirmDialog}
            setShowConfirmDialog={setShowConfirmDialog}
            handleCancelEmergency={handleCancelEmergency}
          />
        </main>
      </div>
    </div>
  );
};

export default EmergencyCall;
