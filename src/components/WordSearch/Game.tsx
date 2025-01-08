import { motion } from 'framer-motion';
import ThemeSelector from './ThemeSelector';
import GameHeader from './GameHeader';
import WordList from './WordList';
import Grid from './Grid';
import DifficultySelector from './DifficultySelector';
import { useWordSearchGame } from './hooks/useWordSearchGame';
import Categories from './Categories';
import GameControls from './GameControls';
import WinDialog from './WinDialog';

const Game = () => {
  const {
    gameState,
    handleCellSelect,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    resetGame,
    shuffleGrid,
    setDifficulty,
    setWords,
    WORDS,
    showCategories,
    setShowCategories
  } = useWordSearchGame();

  const hasWon = gameState.foundWords.length === WORDS.length && WORDS.length > 0;

  if (showCategories) {
    return <Categories onSelectCategory={setWords} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <ThemeSelector />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-[500px]"
      >
        <GameHeader title="Word Search X" />

        <DifficultySelector
          currentDifficulty={gameState.difficulty}
          onSelect={setDifficulty}
        />
        
        <WordList words={WORDS} foundWords={gameState.foundWords} />
        
        <Grid 
          grid={gameState.grid} 
          selectedCells={gameState.selectedCells}
          highlightedWords={gameState.highlightedWords}
          foundWords={gameState.foundWords}
          onCellSelect={handleCellSelect}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />

        <GameControls 
          onReset={resetGame}
          onShuffle={shuffleGrid}
          onHome={() => setShowCategories(true)}
        />
      </motion.div>

      <WinDialog 
        open={hasWon}
        onClose={() => {}}
        onPlayAgain={() => {
          shuffleGrid();
          resetGame();
        }}
        onHome={() => setShowCategories(true)}
        foundWords={gameState.foundWords}
      />

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;