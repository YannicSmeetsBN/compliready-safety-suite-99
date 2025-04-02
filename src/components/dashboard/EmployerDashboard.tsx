
import React from "react";
import { useNavigate } from "react-router-dom";
import { CertificateStatusChart } from "./CertificateStatusChart";
import { EquipmentStatusChart } from "./EquipmentStatusChart";
import { NotificationCard } from "./NotificationCard";
import { DashboardStatistics } from "./DashboardStatistics";
import { FileText, Shield, Calendar, Bell } from "lucide-react";
import { 
  certificateNotifications,
  safetyNotifications,
  exerciseNotifications,
  incidentNotifications
} from "@/data/notificationData";

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  filterValue: string;
}

interface CriticalRisk {
  risk: string;
  severity: string;
  link: string;
}

interface ActionItem {
  action: string;
  deadline: string;
  status: string;
  link: string;
}

interface EmployerDashboardProps {
  certificateStatusData: ChartDataItem[];
  equipmentStatusData: ChartDataItem[];
  criticalRisks: CriticalRisk[];
  actionItems: ActionItem[];
  complianceScore: number;
}

export const EmployerDashboard = ({
  certificateStatusData,
  equipmentStatusData,
  criticalRisks,
  actionItems,
  complianceScore
}: EmployerDashboardProps) => {
  const navigate = useNavigate();

  const handleNotificationClick = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CertificateStatusChart data={certificateStatusData} />
          <EquipmentStatusChart data={equipmentStatusData} />
        </div>

        <div className="mt-6">
          <h2 className="page-subtitle mb-4">Recente signaleringen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <NotificationCard
              title="Certificaten"
              icon={<FileText size={20} />}
              notifications={certificateNotifications}
              viewAllLink="/certificates"
              onClick={handleNotificationClick}
            />
            <NotificationCard
              title="Veiligheidsmiddelen & PBM's"
              icon={<Shield size={20} />}
              notifications={safetyNotifications}
              viewAllLink="/safety?tab=pbm"
              onClick={handleNotificationClick}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NotificationCard
              title="Geplande oefeningen"
              icon={<Calendar size={20} />}
              notifications={exerciseNotifications}
              viewAllLink="/safety?tab=exercises"
              onClick={handleNotificationClick}
            />
            <NotificationCard
              title="Recente incidenten"
              icon={<Bell size={20} />}
              notifications={incidentNotifications}
              viewAllLink="/safety?tab=incidents"
              onClick={handleNotificationClick}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <DashboardStatistics 
          complianceScore={complianceScore}
          criticalRisks={criticalRisks}
          actionItems={actionItems}
        />
      </div>
    </div>
  );
};
