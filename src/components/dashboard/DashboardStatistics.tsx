
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface DashboardStatisticsProps {
  complianceScore: number;
  criticalRisks: CriticalRisk[];
  actionItems: ActionItem[];
}

export const DashboardStatistics = ({
  complianceScore,
  criticalRisks,
  actionItems
}: DashboardStatisticsProps) => {
  const navigate = useNavigate();

  const getComplianceScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-600";
    if (score >= 60) return "bg-orange-100 text-orange-600";
    return "bg-red-100 text-red-600";
  };

  return (
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
  );
};
