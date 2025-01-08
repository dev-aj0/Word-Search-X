import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useConfettiEffect } from "./hooks/useConfettiEffect";
import WinDialogContent from "./WinDialogContent";

interface WinDialogProps {
  open: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  onHome: () => void;
  foundWords: string[];
}

const WinDialog = ({ 
  open, 
  onClose, 
  onPlayAgain, 
  onHome, 
  foundWords 
}: WinDialogProps) => {
  useConfettiEffect(open);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-lg">
        <WinDialogContent
          foundWords={foundWords}
          onPlayAgain={onPlayAgain}
          onHome={onHome}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WinDialog;