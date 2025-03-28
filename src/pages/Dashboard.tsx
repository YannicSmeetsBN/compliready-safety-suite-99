
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { FileText, Users, Bell, Calendar, BarChart } from "lucide-react";

const Dashboard = () => {
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
              color="blue"
            />
            <StatCard
              title="Medewerkers"
              value={18}
              icon={<Users size={24} />}
              color="orange"
            />
            <StatCard
              title="Openstaande incidenten"
              value={3}
              icon={<Bell size={24} />}
              trend={{ value: "25%", increase: false }}
              color="red"
            />
            <StatCard
              title="Geplande oefeningen"
              value={2}
              icon={<Calendar size={24} />}
              color="green"
            />
            <StatCard
              title="Vervallen certificaten"
              value={5}
              icon={<FileText size={24} />}
              trend={{ value: "12%", increase: true }}
              color="red"
            />
            <StatCard
              title="Rapportages"
              value={12}
              icon={<BarChart size={24} />}
              color="purple"
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
              viewAllLink="/safety"
            />
            <NotificationCard
              title="Geplande oefeningen"
              icon={<Calendar size={20} />}
              notifications={exerciseNotifications}
              viewAllLink="/exercises"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
