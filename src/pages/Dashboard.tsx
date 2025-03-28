import React, { useState } from "react";
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
  Shield, 
  ChevronRight,
  Activity
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
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

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

const certificateTypeData = [
  { name: 'BHV', aantal: 18 },
  { name: 'VCA', aantal: 12 },
  { name: 'EHBO', aantal: 8 },
  { name: 'Heftruckcertificaat', aantal: 6 },
  { name: 'ISO/NEN', aantal: 3 },
];

const certificateStatusData = [
  { name: 'Actueel', value: 32, color: '#4ade80' },
  { name: 'Bijna verlopen', value: 8, color: '#f97316' },
  { name: 'Verlopen', value: 2, color: '#ef4444' },
];

const incidentsOverTimeData = [
  { month: 'Jan', aantal: 2 },
  { month: 'Feb', aantal: 3 },
  { month: 'Mar', aantal: 1 },
  { month: 'Apr', aantal: 4 },
  { month: 'Mei', aantal: 2 },
  { month: 'Jun', aantal: 3 },
  { month: 'Jul', aantal: 1 },
  { month: 'Aug', aantal: 0 },
  { month: 'Sep', aantal: 2 },
  { month: 'Okt', aantal: 3 },
  { month: 'Nov', aantal: 1 },
  { month: 'Dec', aantal: 2 },
];

const equipmentStatusData = [
  { name: 'Actueel', value: 20, color: '#4ade80' },
  { name: 'Bijna verlopen', value: 4, color: '#f97316' },
  { name: 'Verlopen', value: 1, color: '#ef4444' },
];

const Dashboard = () => {
  const navigate = useNavigate();

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

  const criticalRisks = [
    { risk: "Ontbrekende blusmiddelen bij magazijn", severity: "high" },
    { risk: "Verlopen BHV-certificaten (3)", severity: "high" },
    { risk: "Geen RI&E voor nieuwe productielijn", severity: "medium" },
    { risk: "Verlichting nooduitgang defect", severity: "medium" },
  ];

  const actionItems = [
    { action: "BHV oefening inplannen", deadline: "20-08-2023", status: "open" },
    { action: "AED training organiseren", deadline: "15-09-2023", status: "open" },
    { action: "RI&E actualiseren", deadline: "30-09-2023", status: "open" },
    { action: "Vluchtwegmarkering controle", deadline: "10-08-2023", status: "open" },
  ];

  const getStatusColor = (warningCount: number, dangerCount: number) => {
    if (dangerCount > 0) return "red";
    if (warningCount > 0) return "orange";
    return "green";
  };

  const certificateWarnings = 2;
  const certificateDangers = 1;
  const safetyWarnings = 1;
  const safetyDangers = 1;
  const exerciseWarnings = 2;
  const exerciseDangers = 0;

  const complianceScore = 78;

  const getComplianceScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-600";
    if (score >= 60) return "bg-orange-100 text-orange-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <div className="flex items-center justify-between mb-6">
            <h1 className="page-title">Dashboard</h1>
            
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 border rounded text-sm">
                <option>Alle werkgevers</option>
                <option>Werkgever A</option>
                <option>Werkgever B</option>
              </select>
              <select className="px-3 py-2 border rounded text-sm">
                <option>Alle locaties</option>
                <option>Hoofdkantoor</option>
                <option>Productie</option>
              </select>
              <select className="px-3 py-2 border rounded text-sm">
                <option>Alle afdelingen</option>
                <option>Administratie</option>
                <option>Logistiek</option>
              </select>
              <select className="px-3 py-2 border rounded text-sm">
                <option>Laatste 30 dagen</option>
                <option>Dit kwartaal</option>
                <option>Dit jaar</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Certificaten Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-56 flex justify-center">
                      <PieChart width={200} height={200}>
                        <Pie
                          data={certificateStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                        >
                          {certificateStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} certificaten`, 'Aantal']} />
                      </PieChart>
                    </div>
                    <div className="flex justify-around text-xs text-center mt-2">
                      <div>
                        <div className="h-3 w-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                        <p>Actueel</p>
                      </div>
                      <div>
                        <div className="h-3 w-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
                        <p>Bijna verlopen</p>
                      </div>
                      <div>
                        <div className="h-3 w-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                        <p>Verlopen</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Veiligheidsmiddelen Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-56 flex justify-center">
                      <PieChart width={200} height={200}>
                        <Pie
                          data={equipmentStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                        >
                          {equipmentStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} middelen`, 'Aantal']} />
                      </PieChart>
                    </div>
                    <div className="flex justify-around text-xs text-center mt-2">
                      <div>
                        <div className="h-3 w-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                        <p>Actueel</p>
                      </div>
                      <div>
                        <div className="h-3 w-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
                        <p>Bijna verlopen</p>
                      </div>
                      <div>
                        <div className="h-3 w-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                        <p>Verlopen</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Overall Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center rounded-full p-6 mb-2 ${getComplianceScoreColor(complianceScore)}`}>
                        <span className="text-4xl font-bold">{complianceScore}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Uw veiligheidsscore</p>
                      <div className="mt-4">
                        <Progress value={complianceScore} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Kritieke Risico's</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {criticalRisks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className={`mt-1 h-2 w-2 rounded-full ${
                            risk.severity === "high" ? "bg-red-500" : "bg-red-400"
                          }`} />
                          <span className="text-sm">{risk.risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Actiepunten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {actionItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
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
          
          <h2 className="page-subtitle">Statistieken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Actieve medewerkers"
              value={18}
              icon={<Users size={24} />}
              color="blue"
              onClick={() => navigate("/employees")}
            />
            <StatCard
              title="Actieve certificaten"
              value={42}
              icon={<FileText size={24} />}
              trend={{ value: "8%", increase: true }}
              color={getStatusColor(certificateWarnings, certificateDangers)}
              onClick={() => navigate("/certificates")}
            />
            <StatCard
              title="Veiligheidsmiddelen"
              value={25}
              icon={<Shield size={24} />}
              trend={{ value: "5%", increase: true }}
              color={getStatusColor(safetyWarnings, safetyDangers)}
              onClick={() => navigate("/safety?tab=pbm")}
            />
            <StatCard
              title="Incidenten (30 dagen)"
              value={3}
              icon={<Bell size={24} />}
              color="orange"
              onClick={() => navigate("/safety?tab=incidents")}
            />
          </div>
          
          <h2 className="page-subtitle">Recente signaleringen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NotificationCard
              title="Certificaten"
              icon={<FileText size={20} />}
              notifications={certificateNotifications}
              viewAllLink="/certificates"
            />
            <NotificationCard
              title="Veiligheidsmiddelen & PBM's"
              icon={<Shield size={20} />}
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
