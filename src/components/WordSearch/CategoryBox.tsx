import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DifficultyButton from "./DifficultyButton";
import { Button } from "../ui/button";
import { WordCategory } from "./types";

interface CategoryBoxProps {
  category: WordCategory;
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
  isRandom?: boolean;
  isExpanded: boolean;
  onExpandToggle: () => void;
}

const CategoryBox = ({ category, onSelect, isRandom = false, isExpanded, onExpandToggle }: CategoryBoxProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    onSelect(difficulty);
    onExpandToggle();
    setSelectedDifficulty(null);
  };

  return (
    <motion.div
      layout
      className="relative h-24"
      onClick={() => !isExpanded && onExpandToggle()}
    >
      <Button
        variant="outline"
        className={cn(
          "w-full h-full text-lg font-medium transition-all hover:bg-secondary hover:text-secondary-foreground",
          isExpanded && "ring-2 ring-primary"
        )}
      >
        {isRandom ? "Random Mode" : category.name}
      </Button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 flex items-center justify-center bg-background border rounded-md"
          >
            <div className="flex gap-2 bg-secondary rounded-md p-2">
              {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                <DifficultyButton
                  key={difficulty}
                  difficulty={difficulty}
                  isSelected={selectedDifficulty === difficulty}
                  onClick={() => handleDifficultySelect(difficulty)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CategoryBox;