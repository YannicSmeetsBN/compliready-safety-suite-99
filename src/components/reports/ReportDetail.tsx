
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BHVCoverageReport } from "./BHVCoverageReport";
import { ComplianceScorecard } from "./ComplianceScorecard";
import { TrainingPlanningReport } from "./TrainingPlanningReport";
import { PartnerIntegrationFlow } from "./PartnerIntegrationFlow";

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
      case "partner-integration":
        return <PartnerIntegrationFlow />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (openReportDialog === "bhv-coverage") return "BHV-dekking per locatie";
    if (openReportDialog === "compliance-scorecard") return "Compliance Scorecard";
    if (openReportDialog === "training-planning") return "Opleidingsplanning rapport";
    if (openReportDialog === "partner-integration") return "Opleider Integratie Workflow";
    return "";
  };

  const getDescription = () => {
    if (openReportDialog === "partner-integration") {
      return "Demonstratie van de workflow voor certificaatkoppeling met opleiders";
    }
    return "Gedetailleerd overzicht van de rapportgegevens";
  };

  return (
    <Dialog open={!!openReportDialog} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        {renderReportDetail()}
      </DialogContent>
    </Dialog>
  );
};
