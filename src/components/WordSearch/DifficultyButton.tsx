import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface DifficultyButtonProps {
  difficulty: 'easy' | 'medium' | 'hard';
  isSelected: boolean;
  onClick: () => void;
}

const DifficultyButton = ({ difficulty, isSelected, onClick }: DifficultyButtonProps) => {
  const label = difficulty === 'easy' ? 'E' : difficulty === 'medium' ? 'M' : 'H';
  
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-10 w-10 p-0 font-mono text-base font-bold transition-all hover:bg-primary hover:text-primary-foreground",
        isSelected ? "bg-primary text-primary-foreground" : "text-primary"
      )}
    >
      {label}
    </Button>
  );
};

export default DifficultyButton;