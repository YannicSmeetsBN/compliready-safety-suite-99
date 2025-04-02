
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { FileText, Calendar, Bell } from "lucide-react";
import { 
  employeeCertificateNotifications,
  employeeExerciseNotifications,
  employeeIncidentNotifications 
} from "@/data/notificationData";

interface EmployeeDashboardProps {
  userName: string;
  userLocation: string;
  complianceScore: number;
}

export const EmployeeDashboard = ({
  userName,
  userLocation,
  complianceScore
}: EmployeeDashboardProps) => {
  const navigate = useNavigate();

  const getComplianceScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-600";
    if (score >= 60) return "bg-orange-100 text-orange-600";
    return "bg-red-100 text-red-600";
  };

  const handleNotificationClick = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Welkom, {userName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Locatie: {userLocation || "Onbekend"}</p>
              <p className="mt-2">Hieronder vindt u een overzicht van uw persoonlijke signaleringen en informatie over uw locatie.</p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="page-subtitle mb-4">Mijn signaleringen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <NotificationCard
            title="Mijn certificaten"
            icon={<FileText size={20} />}
            notifications={employeeCertificateNotifications}
            viewAllLink="/employees"
            onClick={handleNotificationClick}
          />
          <NotificationCard
            title="Geplande oefeningen"
            icon={<Calendar size={20} />}
            notifications={employeeExerciseNotifications}
            viewAllLink="/emergency-call"
            onClick={handleNotificationClick}
          />
        </div>

        <h2 className="page-subtitle mb-4">Locatie informatie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NotificationCard
            title="Recente incidenten"
            icon={<Bell size={20} />}
            notifications={employeeIncidentNotifications}
            viewAllLink="/emergency-call"
            onClick={handleNotificationClick}
          />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>BHV-team {userLocation}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Jan Jansen (Hoofd BHV)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Piet Pietersen</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Maria Willemsen</span>
                </li>
              </ul>
              <button
                onClick={() => navigate("/emergency-call")}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                BHV Oproep starten
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Algemene score locatie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center rounded-full p-6 mb-2 ${getComplianceScoreColor(complianceScore)}`}>
                <span className="text-4xl font-bold">{complianceScore}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Veiligheidsscore van {userLocation}</p>
              <div className="mt-4">
                <Progress value={complianceScore} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
