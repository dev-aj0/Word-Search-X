import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

interface WinDialogContentProps {
  foundWords: string[];
  onPlayAgain: () => void;
  onHome: () => void;
}

const WinDialogContent = ({ foundWords, onPlayAgain, onHome }: WinDialogContentProps) => {
  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <h2 className="text-3xl font-bold">Congratulations!</h2>
      
      <p className="text-center text-muted-foreground text-lg">
        You correctly guessed {foundWords.length > 1 ? 'the words' : 'the word'}:
      </p>
      
      <div className="flex flex-wrap justify-center gap-2">
        {foundWords.map((word) => (
          <span key={word} className="font-mono font-bold text-xl">
            {word}
          </span>
        ))}
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Button
          variant="outline"
          onClick={onHome}
          className="w-32 gap-2 rounded-lg"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
        
        <Button
          onClick={onPlayAgain}
          className="w-32 gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4" />
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default WinDialogContent;