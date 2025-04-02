
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileIcon, FileSpreadsheet, PieChart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  updated: string;
  type: string;
  icon: ReactNode;
  onViewClick: (reportId: string) => void;
  isDemo?: boolean;
}

export const ReportCard = ({ id, title, description, updated, type, icon, onViewClick, isDemo = false }: ReportCardProps) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${isDemo ? 'border-2 border-blue-300' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-gray-500">{updated}</p>
        {isDemo && (
          <div className="mt-2 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            Demo functionaliteit
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewClick(id)}
          >
            <PieChart className="mr-2" size={16} />
            Bekijken
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="mr-2" size={16} />
                Exporteren
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileIcon className="mr-2" size={16} />
                  Exporteren als PDF
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileSpreadsheet className="mr-2" size={16} />
                  Exporteren als Excel
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  );
};
