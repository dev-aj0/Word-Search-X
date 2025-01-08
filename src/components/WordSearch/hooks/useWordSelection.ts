import { WordSearchState } from './useGameState';

export const getSelectedWord = (
  grid: string[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
) => {
  let word = '';
  let cells: number[][] = [];
  
  const rowDir = Math.sign(endRow - startRow) || 0;
  const colDir = Math.sign(endCol - startCol) || 0;
  
  let currentRow = startRow;
  let currentCol = startCol;
  
  while (true) {
    word += grid[currentRow][currentCol];
    cells.push([currentRow, currentCol]);
    
    if (currentRow === endRow && currentCol === endCol) break;
    
    currentRow += rowDir;
    currentCol += colDir;
  }
  
  return { word, cells };
};

export const isValidSelection = (startRow: number, startCol: number, endRow: number, endCol: number) => {
  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);
  
  const isDiagonal = rowDiff === colDiff;
  const isStraight = rowDiff === 0 || colDiff === 0;
  
  return isDiagonal || isStraight;
};

export const handleCellSelect = (
  row: number,
  col: number,
  gameState: WordSearchState,
  setGameState: (state: WordSearchState) => void
) => {
  const isFirstSelection = gameState.selectedCells.length === 0;
  
  if (isFirstSelection) {
    setGameState({
      ...gameState,
      selectedCells: [[row, col]]
    });
    return;
  }

  const [firstRow, firstCol] = gameState.selectedCells[0];
  
  if (!isValidSelection(firstRow, firstCol, row, col)) {
    setGameState({
      ...gameState,
      selectedCells: []
    });
    return;
  }

  setGameState({
    ...gameState,
    selectedCells: [[firstRow, firstCol], [row, col]]
  });
};