
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, CheckCircle } from "lucide-react";

interface ConfirmEndDialogProps {
  showConfirmDialog: boolean;
  setShowConfirmDialog: (show: boolean) => void;
  handleCancelEmergency: () => void;
}

export const ConfirmEndDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  handleCancelEmergency
}: ConfirmEndDialogProps) => {
  return (
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>BHV-oproep beëindigen?</DialogTitle>
          <DialogDescription>
            Weet u zeker dat u de huidige BHV-oproep wilt beëindigen? 
            Dit zal alle BHV'ers informeren dat hun hulp niet meer nodig is.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
            <XCircle className="mr-2" size={16} />
            Annuleren
          </Button>
          <Button variant="destructive" onClick={handleCancelEmergency}>
            <CheckCircle className="mr-2" size={16} />
            Beëindigen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
