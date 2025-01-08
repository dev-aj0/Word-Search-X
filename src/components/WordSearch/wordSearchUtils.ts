export const generateWordSearch = (words: string[], size: number): string[][] => {
  // Initialize grid with empty spaces
  const grid: string[][] = Array(size).fill(null).map(() => 
    Array(size).fill(''));
  
  // Directions for word placement (horizontal, vertical, diagonal)
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal right-down
    [-1, 1],  // diagonal right-up
  ];

  // Try to place each word
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      // Random starting position and direction
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      // Check if word fits at this position and direction
      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        placed = true;
      }
      attempts++;
    }
  }

  // Fill remaining spaces with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return grid;
};

const canPlaceWord = (
  grid: string[][], 
  word: string, 
  row: number, 
  col: number, 
  [dy, dx]: number[]
): boolean => {
  if (
    row + dy * (word.length - 1) < 0 || 
    row + dy * (word.length - 1) >= grid.length ||
    col + dx * (word.length - 1) < 0 || 
    col + dx * (word.length - 1) >= grid[0].length
  ) {
    return false;
  }

  for (let i = 0; i < word.length; i++) {
    const currentCell = grid[row + dy * i][col + dx * i];
    if (currentCell !== '' && currentCell !== word[i]) {
      return false;
    }
  }

  return true;
};

const placeWord = (
  grid: string[][], 
  word: string, 
  row: number, 
  col: number, 
  [dy, dx]: number[]
): void => {
  for (let i = 0; i < word.length; i++) {
    grid[row + dy * i][col + dx * i] = word[i];
  }
};