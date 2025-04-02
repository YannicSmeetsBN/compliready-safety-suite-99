
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  filterValue: string;
}

interface CertificateStatusChartProps {
  data: ChartDataItem[];
}

export const CertificateStatusChart = ({ data }: CertificateStatusChartProps) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (data: ChartDataItem) => {
    navigate(`/certificates?status=${data.filterValue}`);
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

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              onClick={(_, index) => handleClick(data[index])}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              style={{ cursor: 'pointer' }}
            >
              {data.map((entry, index) => (
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
          {data.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleClick(item)} 
              className="cursor-pointer"
            >
              <div className={`h-3 w-3 rounded-full mx-auto mb-1`} style={{ backgroundColor: item.color }}></div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
