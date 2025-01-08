import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GridProps {
  grid: string[][];
  selectedCells: number[][];
  highlightedWords: number[][][];
  foundWords: string[];
  onCellSelect: (row: number, col: number) => void;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Grid = ({ 
  grid, 
  selectedCells = [],
  highlightedWords = [],
  foundWords = [],
  onCellSelect, 
  onMouseDown,
  onMouseEnter,
  onMouseUp
}: GridProps) => {
  const isCellSelected = (row: number, col: number) => {
    return selectedCells?.some(([r, c]) => r === row && c === col) || false;
  };

  const isCellInFoundWord = (row: number, col: number) => {
    return highlightedWords?.some(word => 
      word?.some(([r, c]) => r === row && c === col)
    ) || false;
  };

  const isCellInLine = (row: number, col: number) => {
    if (!selectedCells || selectedCells.length < 2) return false;
    
    const [startRow, startCol] = selectedCells[0];
    const [endRow, endCol] = selectedCells[selectedCells.length - 1];
    
    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);
    
    // For diagonal lines
    if (rowDiff === colDiff) {
      const isInDiagonalRange = 
        row >= Math.min(startRow, endRow) &&
        row <= Math.max(startRow, endRow) &&
        col >= Math.min(startCol, endCol) &&
        col <= Math.max(startCol, endCol);
      
      if (isInDiagonalRange) {
        const slope = (endRow - startRow) / (endCol - startCol);
        const expectedRow = startRow + slope * (col - startCol);
        return row === expectedRow;
      }
    }
    
    // For horizontal lines
    if (rowDiff === 0 && row === startRow) {
      return col >= Math.min(startCol, endCol) && 
             col <= Math.max(startCol, endCol);
    }
    
    // For vertical lines
    if (colDiff === 0 && col === startCol) {
      return row >= Math.min(startRow, endRow) && 
             row <= Math.max(startRow, endRow);
    }
    
    return false;
  };

  return (
    <div 
      className="grid gap-1 p-4 bg-accent rounded-lg select-none puzzle-grid"
      onMouseLeave={onMouseUp}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((cell, colIndex) => (
            <motion.button
              key={`${rowIndex}-${colIndex}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded font-mono text-lg font-bold",
                isCellInFoundWord(rowIndex, colIndex)
                  ? "found-word"
                  : isCellSelected(rowIndex, colIndex) || isCellInLine(rowIndex, colIndex)
                    ? "selected"
                    : "default"
              )}
              onMouseDown={() => onMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
              onMouseUp={onMouseUp}
              onClick={() => onCellSelect(rowIndex, colIndex)}
            >
              {cell}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;