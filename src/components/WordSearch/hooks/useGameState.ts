import { useState } from 'react';
import { generateWordSearch } from '../wordSearchUtils';

export interface WordSearchState {
  grid: string[][];
  foundWords: string[];
  selectedCells: number[][];
  highlightedWords: number[][][];
  isMouseDown: boolean;
  showWinDialog: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const INITIAL_WORDS = ['GAME', 'WORD', 'FIND', 'PLAY', 'FUN'];

export const getGridSize = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 8;
    case 'medium':
      return 10;
    case 'hard':
      return 12;
    default:
      return 8;
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<WordSearchState>(() => ({
    grid: generateWordSearch(INITIAL_WORDS, getGridSize('medium')),
    foundWords: [],
    selectedCells: [],
    highlightedWords: [],
    isMouseDown: false,
    showWinDialog: false,
    difficulty: 'medium'
  }));

  return { gameState, setGameState };
};