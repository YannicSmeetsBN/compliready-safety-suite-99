
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  Bell, 
  Calendar, 
  BarChart, 
  Shield, 
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";

// Demo data for occupancy chart
const occupancyData = [
  { month: 'Jan', bezetting: 75 },
  { month: 'Feb', bezetting: 82 },
  { month: 'Mar', bezetting: 80 },
  { month: 'Apr', bezetting: 84 },
  { month: 'Mei', bezetting: 77 },
  { month: 'Jun', bezetting: 88 },
  { month: 'Jul', bezetting: 82 },
  { month: 'Aug', bezetting: 74 },
  { month: 'Sep', bezetting: 78 },
  { month: 'Okt', bezetting: 85 },
  { month: 'Nov', bezetting: 90 },
  { month: 'Dec', bezetting: 92 },
];

// Demo data for certificate types
const certificateTypeData = [
  { name: 'BHV', aantal: 18 },
  { name: 'VCA', aantal: 12 },
  { name: 'EHBO', aantal: 8 },
  { name: 'Heftruckcertificaat', aantal: 6 },
  { name: 'ISO/NEN', aantal: 3 },
];

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

  // Criticale risico's
  const criticalRisks = [
    { risk: "Ontbrekende blusmiddelen bij magazijn", severity: "high" },
    { risk: "Verlopen BHV-certificaten (3)", severity: "high" },
    { risk: "Geen RI&E voor nieuwe productielijn", severity: "medium" },
    { risk: "Verlichting nooduitgang defect", severity: "medium" },
  ];

  // Actiepunten
  const actionItems = [
    { action: "BHV oefening inplannen", deadline: "20-08-2023", status: "open" },
    { action: "AED training organiseren", deadline: "15-09-2023", status: "open" },
    { action: "RI&E actualiseren", deadline: "30-09-2023", status: "open" },
    { action: "Vluchtwegmarkering controle", deadline: "10-08-2023", status: "open" },
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
          
          {/* Nieuwe layout met Grafiek en Risico-overzicht */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bezettingsgraad Medewerkers</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={{ bezetting: { label: "Bezetting", color: "#8099BF" } }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={occupancyData}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="bezetting"
                          stroke="var(--color-bezetting, #8099BF)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Overall Score */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Overall Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full bg-orange-100 p-6 mb-2">
                        <span className="text-4xl font-bold text-orange-600">78%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Uw veiligheidsscore</p>
                      <div className="mt-4">
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kritieke Risico's */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Kritieke Risico's</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {criticalRisks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className={`mt-1 h-2 w-2 rounded-full ${
                            risk.severity === "high" ? "bg-red-500" : "bg-orange-500"
                          }`} />
                          <span className="text-sm">{risk.risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Actiepunten */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Actiepunten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {actionItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.action}</p>
                            <p className="text-xs text-muted-foreground">Deadline: {item.deadline}</p>
                          </div>
                          <ChevronRight size={16} className="text-muted-foreground" />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Certificaattypes Grafiek */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Certificaten per Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={
                    { aantal: { label: "Aantal certificaten", color: "#F9B47C" } }
                  }>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={certificateTypeData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar 
                          dataKey="aantal" 
                          fill="var(--color-aantal, #F9B47C)" 
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Statistieken */}
          <h2 className="page-subtitle">Statistieken</h2>
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
