
import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  filterValue: string;
}

interface EquipmentStatusChartProps {
  data: ChartDataItem[];
}

export const EquipmentStatusChart = ({ data }: EquipmentStatusChartProps) => {
  const navigate = useNavigate();

  const handleClick = (data: ChartDataItem) => {
    navigate(`/safety?tab=pbm&status=${data.filterValue}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/safety?tab=pbm")}>
      <CardHeader className="pb-2">
        <CardTitle>Veiligheidsmiddelen Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 flex justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              style={{ cursor: 'pointer' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} middelen`, 'Aantal']} />
          </PieChart>
        </div>
        <div className="flex justify-around text-xs text-center mt-2">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <div className="h-3 w-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }}></div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
