
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BHVCoverageReport } from "./BHVCoverageReport";
import { ComplianceScorecard } from "./ComplianceScorecard";
import { TrainingPlanningReport } from "./TrainingPlanningReport";

interface ReportDetailProps {
  openReportDialog: string | null;
  onClose: () => void;
}

export const ReportDetail = ({ openReportDialog, onClose }: ReportDetailProps) => {
  const renderReportDetail = () => {
    switch (openReportDialog) {
      case "bhv-coverage":
        return <BHVCoverageReport />;
      case "compliance-scorecard":
        return <ComplianceScorecard />;
      case "training-planning":
        return <TrainingPlanningReport />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (openReportDialog === "bhv-coverage") return "BHV-dekking per locatie";
    if (openReportDialog === "compliance-scorecard") return "Compliance Scorecard";
    if (openReportDialog === "training-planning") return "Opleidingsplanning rapport";
    return "";
  };

  return (
    <Dialog open={!!openReportDialog} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            Gedetailleerd overzicht van de rapportgegevens
          </DialogDescription>
        </DialogHeader>
        {renderReportDetail()}
      </DialogContent>
    </Dialog>
  );
};
