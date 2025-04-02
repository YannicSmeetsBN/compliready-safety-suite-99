
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { EmployerDashboard } from "@/components/dashboard/EmployerDashboard";
import { 
  certificateStatusData,
  equipmentStatusData,
  criticalRisks,
  actionItems
} from "@/data/notificationData";

const Dashboard = () => {
  const { userRole, userName, userLocation } = useAuth();
  const [locationFilter, setLocationFilter] = useState('all');
  const complianceScore = 78;

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
          
          {userRole === "employee" ? (
            <EmployeeDashboard 
              userName={userName}
              userLocation={userLocation}
              complianceScore={complianceScore}
            />
          ) : (
            <EmployerDashboard 
              certificateStatusData={certificateStatusData}
              equipmentStatusData={equipmentStatusData}
              criticalRisks={criticalRisks}
              actionItems={actionItems}
              complianceScore={complianceScore}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
