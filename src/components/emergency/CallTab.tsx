
import { BhvMember } from "./types";
import { ActiveEmergencyCard } from "./ActiveEmergencyCard";
import { EmergencyForm } from "./EmergencyForm";
import { FutureDevelopmentsCard } from "./FutureDevelopmentsCard";

interface CallTabProps {
  emergencyInProgress: boolean;
  setEmergencyInProgress: (inProgress: boolean) => void;
  setShowConfirmDialog: (show: boolean) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  bhvMembers: BhvMember[];
}

export const CallTab = ({
  emergencyInProgress,
  setEmergencyInProgress,
  setShowConfirmDialog,
  selectedLocation,
  setSelectedLocation,
  bhvMembers
}: CallTabProps) => {
  return (
    <div className="space-y-6">
      {emergencyInProgress ? (
        <ActiveEmergencyCard setShowConfirmDialog={setShowConfirmDialog} />
      ) : (
        <EmergencyForm
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          setEmergencyInProgress={setEmergencyInProgress}
          bhvMembers={bhvMembers}
        />
      )}
      
      <FutureDevelopmentsCard />
    </div>
  );
};
