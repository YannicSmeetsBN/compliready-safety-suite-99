
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { FileText, Users, Bell, Calendar, BarChart, Shield, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Demo certificaat notificaties
  const certificateNotifications = [
    {
      title: "BHV Certificaat - Jan Janssen",
      date: "Verloopt over 30 dagen",
      status: "warning" as const,
    },
    {
      title: "VCA Basis - Pieter Pietersen",
      date: "Verloopt over 14 dagen",
      status: "warning" as const,
    },
    {
      title: "EHBO Diploma - Maria Willemsen",
      date: "Verlopen sinds 10-01-2023",
      status: "danger" as const,
    },
  ];

  // Demo PBM notificaties
  const safetyNotifications = [
    {
      title: "Veiligheidshelm - Klaas Klaassen",
      date: "Keuring vereist binnen 7 dagen",
      status: "warning" as const,
    },
    {
      title: "Brandblusser - Magazijn",
      date: "Keuring verlopen sinds 15-05-2023",
      status: "danger" as const,
    },
    {
      title: "AED - Receptie",
      date: "Keuring succesvol afgerond op 01-06-2023",
      status: "success" as const,
    },
  ];

  // Demo oefening notificaties
  const exerciseNotifications = [
    {
      title: "BHV Oefening",
      date: "Gepland op 15-07-2023",
      status: "info" as const,
    },
    {
      title: "Ontruimingsoefening",
      date: "Gepland op 22-07-2023",
      status: "info" as const,
    },
    {
      title: "Brandoefening",
      date: "Succesvol afgerond op 01-05-2023",
      status: "success" as const,
    },
  ];

  // Status bepalen voor kleurcodering van de tegels
  const getStatusColor = (warningCount: number, dangerCount: number) => {
    if (dangerCount > 0) return "red";
    if (warningCount > 0) return "orange";
    return "green";
  };

  // Telling van waarschuwingen en kritieke items
  const certificateWarnings = 2;
  const certificateDangers = 1;
  const safetyWarnings = 1;
  const safetyDangers = 1;
  const incidentWarnings = 2;
  const incidentDangers = 1;
  const exerciseWarnings = 2;
  const exerciseDangers = 0;

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Dashboard</h1>
          
          {/* Statistieken */}
          <div className="dashboard-grid mb-8">
            <StatCard
              title="Actieve certificaten"
              value={42}
              icon={<FileText size={24} />}
              trend={{ value: "8%", increase: true }}
              color={getStatusColor(certificateWarnings, certificateDangers)}
              onClick={() => navigate("/certificates")}
            />
            <StatCard
              title="Medewerkers"
              value={18}
              icon={<Users size={24} />}
              color="blue"
              onClick={() => navigate("/employees")}
            />
            <StatCard
              title="Openstaande incidenten"
              value={3}
              icon={<Bell size={24} />}
              trend={{ value: "25%", increase: false }}
              color={getStatusColor(incidentWarnings, incidentDangers)}
              onClick={() => navigate("/safety?tab=incidents")}
            />
            <StatCard
              title="Geplande oefeningen"
              value={2}
              icon={<Calendar size={24} />}
              color={getStatusColor(exerciseWarnings, exerciseDangers)}
              onClick={() => navigate("/safety?tab=exercises")}
            />
            <StatCard
              title="PBM's & Veiligheidsmiddelen"
              value={25}
              icon={<Shield size={24} />}
              trend={{ value: "5%", increase: true }}
              color={getStatusColor(safetyWarnings, safetyDangers)}
              onClick={() => navigate("/safety?tab=pbm")}
            />
            <StatCard
              title="RI&E Analyses"
              value={1}
              icon={<AlertTriangle size={24} />}
              color="purple"
              onClick={() => navigate("/risk-assessment")}
            />
            <StatCard
              title="Rapportages"
              value={12}
              icon={<BarChart size={24} />}
              color="purple"
              onClick={() => navigate("/reports")}
            />
          </div>
          
          {/* Notificaties */}
          <h2 className="page-subtitle">Recente signaleringen</h2>
          <div className="dashboard-grid">
            <NotificationCard
              title="Certificaten"
              icon={<FileText size={20} />}
              notifications={certificateNotifications}
              viewAllLink="/certificates"
            />
            <NotificationCard
              title="Veiligheidsmiddelen & PBM's"
              icon={<Bell size={20} />}
              notifications={safetyNotifications}
              viewAllLink="/safety?tab=pbm"
            />
            <NotificationCard
              title="Geplande oefeningen"
              icon={<Calendar size={20} />}
              notifications={exerciseNotifications}
              viewAllLink="/safety?tab=exercises"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
