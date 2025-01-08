import { useState } from 'react';
import { generateWordSearch } from '../wordSearchUtils';
import { WordSearchState, INITIAL_WORDS, getGridSize } from './useGameState';
import { getSelectedWord, isValidSelection } from './useWordSelection';

// Create audio element for word found sound
const wordFoundSound = new Audio('/word-found.mp3');

export const useWordSearchGame = () => {
  const [showCategories, setShowCategories] = useState(true);
  const [WORDS, setWORDS] = useState(INITIAL_WORDS);
  
  const [gameState, setGameState] = useState<WordSearchState>(() => ({
    grid: generateWordSearch(WORDS, getGridSize('medium')),
    foundWords: [],
    selectedCells: [],
    highlightedWords: [],
    isMouseDown: false,
    showWinDialog: false,
    difficulty: 'medium'
  }));

  const setWords = (newWords: string[], difficulty: 'easy' | 'medium' | 'hard') => {
    setWORDS(newWords);
    setShowCategories(false);
    setGameState(prev => ({
      ...prev,
      grid: generateWordSearch(newWords, getGridSize(difficulty)),
      foundWords: [],
      selectedCells: [],
      highlightedWords: [],
      difficulty
    }));
  };

  const handleCellSelect = (row: number, col: number) => {
    const isFirstSelection = !gameState.selectedCells?.length;
    
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

  const handleMouseDown = (row: number, col: number) => {
    setGameState(prev => ({
      ...prev,
      isMouseDown: true,
      selectedCells: [[row, col]]
    }));
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!gameState.isMouseDown || !gameState.selectedCells?.length) return;
    
    const [firstRow, firstCol] = gameState.selectedCells[0];
    
    if (isValidSelection(firstRow, firstCol, row, col)) {
      setGameState(prev => ({
        ...prev,
        selectedCells: [[firstRow, firstCol], [row, col]]
      }));
    }
  };

  const handleMouseUp = () => {
    setGameState(prev => ({
      ...prev,
      isMouseDown: false
    }));
    checkSelection();
  };

  const checkSelection = () => {
    if (!gameState.selectedCells?.length || gameState.selectedCells.length < 2) return;

    const [startRow, startCol] = gameState.selectedCells[0];
    const [endRow, endCol] = gameState.selectedCells[gameState.selectedCells.length - 1];
    
    const { word, cells } = getSelectedWord(gameState.grid, startRow, startCol, endRow, endCol);
    const reversedWord = word.split('').reverse().join('');

    if (WORDS.includes(word) && !gameState.foundWords.includes(word)) {
      wordFoundSound.play().catch(console.error);
      
      setGameState(prev => ({
        ...prev,
        foundWords: [...prev.foundWords, word],
        highlightedWords: [...prev.highlightedWords, cells],
        selectedCells: []
      }));
    } else if (WORDS.includes(reversedWord) && !gameState.foundWords.includes(reversedWord)) {
      wordFoundSound.play().catch(console.error);
      
      setGameState(prev => ({
        ...prev,
        foundWords: [...prev.foundWords, reversedWord],
        highlightedWords: [...prev.highlightedWords, cells],
        selectedCells: []
      }));
    } else {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          selectedCells: []
        }));
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      foundWords: [],
      selectedCells: [],
      highlightedWords: []
    }));
  };

  const shuffleGrid = () => {
    const shuffledWords = [...WORDS].sort(() => Math.random() - 0.5).slice(0, 5);
    setWORDS(shuffledWords);
    
    setGameState(prev => ({
      ...prev,
      grid: generateWordSearch(shuffledWords, getGridSize(prev.difficulty)),
      foundWords: [],
      selectedCells: [],
      highlightedWords: []
    }));
  };

  const setDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    setGameState(prev => ({
      ...prev,
      difficulty,
      grid: generateWordSearch(WORDS, getGridSize(difficulty)),
      foundWords: [],
      selectedCells: [],
      highlightedWords: []
    }));
  };

  return {
    gameState,
    setGameState,
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
  };
};
