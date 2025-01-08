import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useConfettiEffect = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const duration = 1500;
      const end = Date.now() + duration;
      const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 90,
          spread: 45,
          origin: { x: 0.5, y: 0.7 },
          colors: colors,
          shapes: ['circle'],
          scalar: 0.5,
          gravity: 1,
          drift: 0,
          ticks: 200
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);
};