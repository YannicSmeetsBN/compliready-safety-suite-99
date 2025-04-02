
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { PieChart } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

// Import refactored components
import { ReportFilters } from "@/components/reports/ReportFilters";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportDetail } from "@/components/reports/ReportDetail";
import { demoReports } from "@/components/reports/ReportListData";

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [openReportDialog, setOpenReportDialog] = useState<string | null>(null);
  
  const filteredReports = demoReports.filter(report => {
    if (selectedReportType && report.type !== selectedReportType) return false;
    return true;
  });

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const handleViewReport = (reportId: string) => {
    if (reportId === "9") setOpenReportDialog("bhv-coverage");
    else if (reportId === "10") setOpenReportDialog("compliance-scorecard");
    else if (reportId === "11") setOpenReportDialog("training-planning");
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Rapportages</h1>
          
          <div className="flex justify-between mb-6">
            <ReportFilters 
              selectedReportType={selectedReportType}
              setSelectedReportType={setSelectedReportType}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              dateRange={dateRange}
              handleDateRangeChange={handleDateRangeChange}
            />
            
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <PieChart className="mr-2" size={16} />
              Nieuw rapport genereren
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                id={report.id}
                title={report.title}
                description={report.description}
                updated={report.updated}
                type={report.type}
                icon={report.icon}
                onViewClick={handleViewReport}
              />
            ))}
          </div>
          
          <ReportDetail 
            openReportDialog={openReportDialog} 
            onClose={() => setOpenReportDialog(null)} 
          />
        </main>
      </div>
    </div>
  );
};

export default Reports;
