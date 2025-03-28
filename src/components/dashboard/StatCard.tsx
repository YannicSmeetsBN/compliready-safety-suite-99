
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    increase: boolean;
  };
  color?: "blue" | "orange" | "green" | "red" | "purple";
};

export const StatCard = ({ title, value, icon, trend, color = "blue" }: StatCardProps) => {
  const colors = {
    blue: "text-compliblue bg-compliblue/10",
    orange: "text-compliorange bg-compliorange/10",
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <div className="dashboard-card dashboard-stat-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="card-header">{title}</h3>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${colors[color]}`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`mr-2 ${trend.increase ? "text-green-600" : "text-red-600"}`}>
            {trend.increase ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-gray-500 text-sm">t.o.v. vorige maand</span>
        </div>
      )}
    </div>
  );
};
