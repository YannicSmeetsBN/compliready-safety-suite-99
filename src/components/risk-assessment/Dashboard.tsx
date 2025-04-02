
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type DashboardProps = {
  risks: any[];
};

export const Dashboard = ({ risks }: DashboardProps) => {
  const navigate = useNavigate();
  
  // Calculate dashboard metrics
  const totalRisks = risks.length;
  const pendingMeasures = risks.filter(risk => 
    risk.measures && risk.measures.some((m: any) => m.status !== "Gereed")
  ).length;
  const highPriorityRisks = risks.filter(risk => risk.riskScore >= 7).length;
  
  // For average risk score per department, first group by department
  const departmentScores: Record<string, { total: number, count: number }> = {};
  risks.forEach(risk => {
    if (!risk.department) return;
    
    if (!departmentScores[risk.department]) {
      departmentScores[risk.department] = { total: 0, count: 0 };
    }
    
    if (risk.riskScore) {
      departmentScores[risk.department].total += risk.riskScore;
      departmentScores[risk.department].count += 1;
    }
  });
  
  // Calculate averages
  const departmentAverages = Object.entries(departmentScores).map(([dept, data]) => ({
    department: dept,
    averageScore: data.count > 0 ? data.total / data.count : 0
  })).sort((a, b) => b.averageScore - a.averageScore);

  // Navigate to department details
  const handleDepartmentClick = (department: string) => {
    // Navigate to the department filtered view
    navigate(`/risk-assessment?department=${department}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">RI&E Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total risks */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/risk-assessment")}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Totaal aantal risico's</p>
                <p className="text-2xl font-bold">{totalRisks}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-compliblue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pending measures */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/risk-assessment?status=open")}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Openstaande maatregelen</p>
                <p className="text-2xl font-bold">{pendingMeasures}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* High priority risks */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/risk-assessment?priority=high")}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Hoge prioriteit risico's</p>
                <p className="text-2xl font-bold">{highPriorityRisks}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Completion percentage */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/risk-assessment?status=completed")}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Voortgang maatregelen</p>
                <p className="text-2xl font-bold">
                  {totalRisks > 0 
                    ? `${Math.round(((totalRisks - pendingMeasures) / totalRisks) * 100)}%` 
                    : "0%"}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Department risks section */}
      {departmentAverages.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Risicoscore per afdeling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentAverages.map(dept => (
                <div 
                  key={dept.department} 
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => handleDepartmentClick(dept.department)}
                >
                  <span className="w-1/3 font-medium">{dept.department}</span>
                  <div className="w-2/3 flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          dept.averageScore >= 7 
                            ? 'bg-red-600' 
                            : dept.averageScore >= 4 
                              ? 'bg-amber-500' 
                              : 'bg-green-500'
                        }`}
                        style={{ width: `${(dept.averageScore / 9) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${
                      dept.averageScore >= 7 
                        ? 'text-red-600' 
                        : dept.averageScore >= 4 
                          ? 'text-amber-500' 
                          : 'text-green-500'
                    }`}>
                      {dept.averageScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
