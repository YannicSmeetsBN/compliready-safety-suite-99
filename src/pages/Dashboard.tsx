
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  FileText, 
  Users, 
  Bell, 
  Calendar, 
  Shield, 
  ChevronRight,
  Activity
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userRole, userName, userLocation } = useAuth();
  const [locationFilter, setLocationFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(null);
  
  const certificateStatusData = [
    { name: "Actueel", value: 18, color: "#22c55e", filterValue: "active" },
    { name: "Bijna verlopen", value: 5, color: "#f97316", filterValue: "expiring" },
    { name: "Verlopen", value: 3, color: "#ef4444", filterValue: "expired" },
  ];

  const equipmentStatusData = [
    { name: "Actueel", value: 24, color: "#22c55e", filterValue: "current" },
    { name: "Bijna verlopen", value: 8, color: "#f97316", filterValue: "expiring" },
    { name: "Verlopen", value: 2, color: "#ef4444", filterValue: "expired" },
  ];

  const employeeCertificateNotifications = [
    {
      title: "BHV Certificaat - Jan Jansen",
      date: "Verloopt over 30 dagen",
      status: "warning" as const,
    }
  ];

  const employeeExerciseNotifications = [
    {
      title: "BHV Oefening",
      date: "Gepland op 15-07-2023",
      status: "info" as const,
    },
    {
      title: "Ontruimingsoefening",
      date: "Gepland op 22-07-2023",
      status: "info" as const,
    }
  ];

  const employeeIncidentNotifications = [
    {
      title: "Val van hoogte - Bouwplaats A",
      date: "Gemeld op 05-07-2023",
      status: "danger" as const,
    },
    {
      title: "Bijna-ongeval - Magazijn",
      date: "Gemeld op 12-07-2023",
      status: "warning" as const,
    }
  ];

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

  const incidentNotifications = [
    {
      title: "Val van hoogte - Bouwplaats A",
      date: "Gemeld op 05-07-2023",
      status: "danger" as const,
    },
    {
      title: "Bijna-ongeval - Magazijn",
      date: "Gemeld op 12-07-2023",
      status: "warning" as const,
    },
    {
      title: "Kleine snijwond - Werkplaats",
      date: "Gemeld op 20-07-2023",
      status: "info" as const,
    },
  ];

  const criticalRisks = [
    { risk: "Ontbrekende blusmiddelen bij magazijn", severity: "high", link: "/safety?tab=equipment" },
    { risk: "Verlopen BHV-certificaten (3)", severity: "high", link: "/certificates?status=expired&type=bhv" },
    { risk: "Geen RI&E voor nieuwe productielijn", severity: "medium", link: "/risk-assessment" },
    { risk: "Verlichting nooduitgang defect", severity: "medium", link: "/safety?tab=incidents" },
  ];

  const actionItems = [
    { action: "BHV oefening inplannen", deadline: "20-08-2023", status: "open", link: "/safety?tab=exercises" },
    { action: "AED training organiseren", deadline: "15-09-2023", status: "open", link: "/certificates?type=aed" },
    { action: "RI&E actualiseren", deadline: "30-09-2023", status: "open", link: "/risk-assessment" },
    { action: "Vluchtwegmarkering controle", deadline: "10-08-2023", status: "open", link: "/safety?tab=equipment" },
    { action: "Klaas Klaassen gaat op 30-04-2025 uit dienst, zorg voor een vervangende BHV'er.", deadline: "30-03-2025", status: "open", link: "/employees/klaas-klaassen" },
  ];

  const complianceScore = 78;

  const getComplianceScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-600";
    if (score >= 60) return "bg-orange-100 text-orange-600";
    return "bg-red-100 text-red-600";
  };

  const handleCertificateClick = (data: any, index: number) => {
    navigate(`/certificates?status=${data.filterValue}`);
  };

  const handleEquipmentClick = (data: any, index: number) => {
    navigate(`/safety?tab=pbm&status=${data.filterValue}`);
  };

  const handleNotificationClick = (link: string) => {
    navigate(link);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderEmployeeDashboard = () => (
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
          />
          <NotificationCard
            title="Geplande oefeningen"
            icon={<Calendar size={20} />}
            notifications={employeeExerciseNotifications}
            viewAllLink="/emergency-call"
          />
        </div>

        <h2 className="page-subtitle mb-4">Locatie informatie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NotificationCard
            title="Recente incidenten"
            icon={<Bell size={20} />}
            notifications={employeeIncidentNotifications}
            viewAllLink="/emergency-call"
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

  const renderEmployerDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Certificaten Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56 flex justify-center">
                <PieChart width={200} height={200}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={certificateStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    onClick={handleCertificateClick}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    style={{ cursor: 'pointer' }}
                  >
                    {certificateStatusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} certificaten`, 'Aantal']} />
                </PieChart>
              </div>
              <div className="flex justify-around text-xs text-center mt-2">
                <div onClick={() => handleCertificateClick(certificateStatusData[0], 0)} className="cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                  <p>Actueel</p>
                </div>
                <div onClick={() => handleCertificateClick(certificateStatusData[1], 1)} className="cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
                  <p>Bijna verlopen</p>
                </div>
                <div onClick={() => handleCertificateClick(certificateStatusData[2], 2)} className="cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                  <p>Verlopen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/safety?tab=pbm")}>
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
                    style={{ cursor: 'pointer' }}
                  >
                    {equipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} middelen`, 'Aantal']} />
                </PieChart>
              </div>
              <div className="flex justify-around text-xs text-center mt-2">
                <div className="cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                  <p>Actueel</p>
                </div>
                <div className="cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
                  <p>Bijna verlopen</p>
                </div>
                <div className="cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                  <p>Verlopen</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="page-subtitle mb-4">Recente signaleringen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <NotificationCard
              title="Certificaten"
              icon={<FileText size={20} />}
              notifications={certificateNotifications}
              viewAllLink="/certificates"
              onClick={() => handleNotificationClick("/certificates")}
            />
            <NotificationCard
              title="Veiligheidsmiddelen & PBM's"
              icon={<Shield size={20} />}
              notifications={safetyNotifications}
              viewAllLink="/safety?tab=pbm"
              onClick={() => handleNotificationClick("/safety?tab=pbm")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NotificationCard
              title="Geplande oefeningen"
              icon={<Calendar size={20} />}
              notifications={exerciseNotifications}
              viewAllLink="/safety?tab=exercises"
              onClick={() => handleNotificationClick("/safety?tab=exercises")}
            />
            <NotificationCard
              title="Recente incidenten"
              icon={<Bell size={20} />}
              notifications={incidentNotifications}
              viewAllLink="/safety?tab=incidents"
              onClick={() => handleNotificationClick("/safety?tab=incidents")}
            />
          </div>
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
                  <li 
                    key={index} 
                    className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => navigate(risk.link)}
                  >
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
                  <li 
                    key={index} 
                    className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => navigate(item.link)}
                  >
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
  );

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <div className="flex items-center justify-between mb-6">
            <h1 className="page-title">Dashboard</h1>
            
            {userRole === "employer" && (
              <div className="flex items-center gap-3">
                <select 
                  className="px-3 py-2 border rounded text-sm"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="all">Alle locaties</option>
                  <option value="hoofdkantoor">Hoofdkantoor</option>
                  <option value="productie">Productie</option>
                  <option value="magazijn">Magazijn</option>
                </select>
              </div>
            )}
          </div>
          
          {userRole === "employee" ? renderEmployeeDashboard() : renderEmployerDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
