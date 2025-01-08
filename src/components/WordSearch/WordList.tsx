import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordListProps {
  words: string[];
  foundWords: string[];
}

const WordList = ({ words, foundWords }: WordListProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {words.map((word) => (
        <motion.div
          key={word}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "px-4 py-2 rounded-lg font-mono text-lg transition-all duration-300",
            "bg-accent text-accent-foreground",
            foundWords.includes(word) && "bg-primary/20 font-bold animate-fade-in"
          )}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
};

export default WordList;