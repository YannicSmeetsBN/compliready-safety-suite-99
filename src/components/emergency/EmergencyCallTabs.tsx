
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, User, Calendar } from "lucide-react";
import { useState } from "react";
import { CallTab } from "./CallTab";
import { MembersTab } from "./MembersTab";
import { HistoryTab } from "./HistoryTab";

interface EmergencyCallTabsProps {
  emergencyInProgress: boolean;
  setEmergencyInProgress: (inProgress: boolean) => void;
  setShowConfirmDialog: (show: boolean) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  bhvMembers: BhvMember[];
  callHistory: CallHistoryItem[];
}

export const EmergencyCallTabs = ({
  emergencyInProgress,
  setEmergencyInProgress,
  setShowConfirmDialog,
  selectedLocation,
  setSelectedLocation,
  bhvMembers,
  callHistory
}: EmergencyCallTabsProps) => {
  const [activeTab, setActiveTab] = useState("call");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="call" className="flex items-center gap-2">
          <Phone size={16} />
          <span>Oproep</span>
        </TabsTrigger>
        <TabsTrigger value="members" className="flex items-center gap-2">
          <User size={16} />
          <span>BHV'ers</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Historie</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="call">
        <CallTab
          emergencyInProgress={emergencyInProgress}
          setEmergencyInProgress={setEmergencyInProgress}
          setShowConfirmDialog={setShowConfirmDialog}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          bhvMembers={bhvMembers}
        />
      </TabsContent>
      
      <TabsContent value="members">
        <MembersTab bhvMembers={bhvMembers} />
      </TabsContent>
      
      <TabsContent value="history">
        <HistoryTab callHistory={callHistory} />
      </TabsContent>
    </Tabs>
  );
};
