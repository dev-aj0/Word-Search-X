import { motion } from 'framer-motion';

interface GameHeaderProps {
  title: string;
}

const GameHeader = ({ title }: GameHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-2">Word Search X</h1>
    </motion.div>
  );
};

export default GameHeader;