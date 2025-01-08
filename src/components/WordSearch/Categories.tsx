import { motion, AnimatePresence } from "framer-motion";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import CategoryBox from './CategoryBox';
import { WordCategory } from './types';

const CATEGORIES: WordCategory[] = [
  { 
    name: 'Animals', 
    words: ['LION', 'TIGER', 'BEAR', 'WOLF', 'EAGLE', 'SHARK', 'ZEBRA', 'SNAKE', 'PANDA', 'KOALA', 'WHALE', 'MOUSE', 'HORSE', 'CAMEL', 'SHEEP',
            'DEER', 'MOOSE', 'OTTER', 'SLOTH', 'HIPPO', 'RHINO', 'LLAMA', 'GECKO', 'GOOSE', 'DUCK', 'SWAN', 'CROW', 'HAWK', 'SEAL', 'CRAB']
  },
  { 
    name: 'Colors', 
    words: ['BLUE', 'GREEN', 'RED', 'YELLOW', 'WHITE', 'BLACK', 'PURPLE', 'ORANGE', 'BROWN', 'PINK', 'GRAY', 'GOLD', 'SILVER', 'TEAL', 'CORAL',
            'BEIGE', 'AMBER', 'AZURE', 'IVORY', 'JADE', 'MAUVE', 'OCHRE', 'PLUM', 'RUBY', 'SLATE', 'TAN', 'WINE', 'BRASS', 'LIME', 'NAVY']
  },
  { 
    name: 'Food', 
    words: ['PIZZA', 'PASTA', 'SUSHI', 'BREAD', 'CAKE', 'SALAD', 'STEAK', 'SOUP', 'TACOS', 'RICE', 'APPLE', 'CANDY', 'CHIPS', 'FISH', 'EGGS',
            'BACON', 'BAGEL', 'CURRY', 'DONUT', 'FRIES', 'GRAPE', 'HONEY', 'JELLY', 'KIWI', 'LEMON', 'MANGO', 'OLIVE', 'PEACH', 'PEAR', 'PLUM']
  },
  { 
    name: 'Sports', 
    words: ['SOCCER', 'TENNIS', 'GOLF', 'RUGBY', 'SWIM', 'HOCKEY', 'BOXING', 'KARATE', 'SURF', 'CLIMB', 'DANCE', 'SKATE', 'CYCLE', 'YOGA', 'POLO',
            'JUDO', 'CHESS', 'DARTS', 'FENCE', 'HIKE', 'JUMP', 'LIFT', 'RACE', 'ROW', 'RUN', 'SAIL', 'SHOOT', 'SPIKE', 'THROW', 'VAULT']
  },
  { 
    name: 'Tech', 
    words: ['PHONE', 'LAPTOP', 'MOUSE', 'SCREEN', 'WIFI', 'CLOUD', 'DATA', 'CODE', 'ROBOT', 'CYBER', 'PIXEL', 'AUDIO', 'VIDEO', 'CABLE', 'DRIVE',
            'CHIP', 'DISK', 'EMAIL', 'FLASH', 'GAME', 'HOST', 'INPUT', 'LINK', 'LOGIN', 'NODE', 'PORT', 'QUERY', 'RAM', 'SCAN', 'USER']
  },
  { 
    name: 'Movies', 
    words: ['FILM', 'ACTOR', 'SCENE', 'DRAMA', 'PLOT', 'STORY', 'MOVIE', 'STAGE', 'ROLE', 'CAST', 'AWARD', 'GENRE', 'MUSIC', 'SOUND', 'LIGHT',
            'EDIT', 'FRAME', 'HERO', 'INTRO', 'JOKE', 'LENS', 'MASK', 'PLAY', 'PROP', 'REEL', 'SHOT', 'STAR', 'TAKE', 'VIEW', 'ZOOM']
  },
  { 
    name: 'Music', 
    words: ['SONG', 'BEAT', 'ROCK', 'JAZZ', 'BAND', 'PIANO', 'DRUM', 'BASS', 'VOCAL', 'NOTE', 'TEMPO', 'CHORD', 'SOLO', 'TUNE', 'SOUND',
            'ALTO', 'ARIA', 'CODA', 'DUET', 'FOLK', 'FUNK', 'HYMN', 'KEYS', 'LYRE', 'MUTE', 'OPUS', 'PICK', 'REED', 'SING', 'TONE']
  },
  { 
    name: 'Space', 
    words: ['STAR', 'MOON', 'MARS', 'COMET', 'SUN', 'EARTH', 'SPACE', 'ORBIT', 'NOVA', 'VENUS', 'PLUTO', 'ALIEN', 'DUST', 'VOID', 'LIGHT',
            'ATOM', 'BEAM', 'CORE', 'DARK', 'FLUX', 'HALO', 'MASS', 'MIST', 'NEBULA', 'PULSE', 'QUARK', 'RING', 'SOLAR', 'TIME', 'WAVE']
  },
  { 
    name: 'Nature', 
    words: ['TREE', 'RIVER', 'LAKE', 'PLANT', 'ROCK', 'BEACH', 'CLOUD', 'RAIN', 'STORM', 'WIND', 'LEAF', 'GRASS', 'SAND', 'HILL', 'CAVE',
            'BARK', 'BUSH', 'CLIFF', 'DAWN', 'DUNE', 'FERN', 'FOG', 'GLOW', 'MOSS', 'PEAK', 'PINE', 'POND', 'REED', 'STEM', 'VINE']
  },
  { 
    name: 'Cities', 
    words: ['PARIS', 'TOKYO', 'ROME', 'DUBAI', 'LIMA', 'LONDON', 'MIAMI', 'SEOUL', 'CAIRO', 'DELHI', 'SYDNEY', 'BERLIN', 'MOSCOW', 'MADRID', 'OSLO',
            'ATHENS', 'BERN', 'DOHA', 'HANOI', 'KYOTO', 'LAGOS', 'MILAN', 'PORTO', 'QUITO', 'RIGA', 'SOFIA', 'TUNIS', 'VADUZ', 'WIEN', 'YORK']
  },
  { 
    name: 'Ocean', 
    words: ['WAVE', 'CORAL', 'FISH', 'SHELL', 'SAND', 'SHARK', 'WHALE', 'CRAB', 'TIDE', 'REEF', 'SEAL', 'SHIP', 'SURF', 'DEEP', 'FOAM',
            'ALGAE', 'BAY', 'COAST', 'DOCK', 'EEL', 'FIN', 'GULF', 'KELP', 'PIER', 'RAY', 'SALT', 'SWIM', 'TUNA', 'WAKE', 'ZONE']
  },
  { 
    name: 'Plants', 
    words: ['ROSE', 'TREE', 'LEAF', 'SEED', 'ROOT', 'STEM', 'VINE', 'MOSS', 'FERN', 'PINE', 'PALM', 'HERB', 'GRASS', 'WEED', 'FRUIT',
            'ALOE', 'BEAN', 'CORN', 'DAISY', 'ELM', 'FIG', 'IRIS', 'LILY', 'MINT', 'OAK', 'PEAR', 'SAGE', 'TARO', 'YAM', 'ZEA']
  },
  { 
    name: 'Weather', 
    words: ['RAIN', 'SNOW', 'WIND', 'STORM', 'CLOUD', 'SUNNY', 'FROST', 'HEAT', 'COLD', 'WARM', 'HAIL', 'MIST', 'FOG', 'ICE', 'SLEET',
            'ARID', 'BALM', 'CHILL', 'DAMP', 'FAIR', 'GALE', 'HAZE', 'MILD', 'SMOG', 'THAW', 'HUMID', 'DRY', 'HOT', 'WET', 'COOL']
  },
  { 
    name: 'Science', 
    words: ['ATOM', 'CELL', 'GENE', 'LIGHT', 'WAVE', 'FORCE', 'MASS', 'TIME', 'SPACE', 'HEAT', 'SOUND', 'SPEED', 'POWER', 'ENERGY', 'MOTION',
            'ACID', 'BASE', 'BOND', 'DATA', 'ECHO', 'FLOW', 'GAS', 'ION', 'LAB', 'MOLE', 'NODE', 'PHASE', 'RATE', 'SPIN', 'VOLT']
  },
  { 
    name: 'Jobs', 
    words: ['CHEF', 'PILOT', 'NURSE', 'ACTOR', 'JUDGE', 'BAKER', 'COACH', 'CLERK', 'GUARD', 'AGENT', 'ARTIST', 'DRIVER', 'DOCTOR', 'WRITER', 'MODEL',
            'AIDE', 'BOSS', 'DEAN', 'HOST', 'MAID', 'PROF', 'SCOUT', 'TUTOR', 'USHER', 'VALET', 'WAITER', 'GUIDE', 'CREW', 'STAFF', 'TEACH']
  },
  { 
    name: 'Emotions', 
    words: ['HAPPY', 'ANGRY', 'CALM', 'BRAVE', 'PROUD', 'QUIET', 'SILLY', 'TIRED', 'EAGER', 'UPSET', 'JOYFUL', 'SCARED', 'LOVED', 'PEACE', 'HOPE',
            'BOLD', 'COOL', 'DULL', 'ENVY', 'FEAR', 'GLAD', 'HURT', 'KIND', 'LAZY', 'MAD', 'NICE', 'OKAY', 'PURE', 'RAGE', 'WILD']
  },
  { 
    name: 'School', 
    words: ['BOOK', 'DESK', 'TEST', 'MATH', 'READ', 'WRITE', 'LEARN', 'STUDY', 'CLASS', 'GRADE', 'PAPER', 'PENCIL', 'RULER', 'CHALK', 'BOARD',
            'BELL', 'CARD', 'DRAW', 'EXAM', 'FILE', 'GYM', 'HALL', 'INK', 'LAB', 'MAP', 'NOTE', 'PAGE', 'QUIZ', 'SEAT', 'TEAM']
  },
  { 
    name: 'Tools', 
    words: ['NAIL', 'SCREW', 'DRILL', 'WRENCH', 'PLIER', 'CHISEL', 'LEVEL', 'RULER', 'KNIFE', 'BRUSH', 'HAMMER', 'CLAMP', 'CHAIN', 'BLADE', 'TORCH',
            'AWL', 'BOLT', 'FILE', 'GRIP', 'HOOK', 'JACK', 'KEY', 'LATHE', 'MITER', 'PICK', 'PUMP', 'RAKE', 'SAW', 'TAPE', 'VISE']
  },
  { 
    name: 'Clothes', 
    words: ['SHIRT', 'PANTS', 'DRESS', 'SKIRT', 'SHOES', 'SCARF', 'GLOVE', 'BOOTS', 'SOCKS', 'COAT', 'JEANS', 'BELT', 'SUIT', 'HAT', 'WATCH',
            'BAG', 'CAP', 'GOWN', 'HOOD', 'MASK', 'ROBE', 'SLIP', 'TIE', 'VEST', 'WRAP', 'ZIP', 'BOW', 'CAPE', 'SOLE', 'WOOL']
  },
  { 
    name: 'Hobbies', 
    words: ['PAINT', 'CRAFT', 'DANCE', 'WRITE', 'SING', 'DRAW', 'BUILD', 'COOK', 'BAKE', 'KNIT', 'PHOTO', 'GAME', 'READ', 'SWIM', 'HIKE',
            'BLOG', 'CAMP', 'FISH', 'GROW', 'HUNT', 'JAM', 'MAKE', 'PLAY', 'QUILT', 'RUN', 'SEW', 'SHOP', 'TRAIN', 'WALK', 'YARN']
  }
];

interface CategoriesProps {
  onSelectCategory: (words: string[], difficulty: 'easy' | 'medium' | 'hard') => void;
}

const Categories = ({ onSelectCategory }: CategoriesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const handleCategorySelect = (category: WordCategory, difficulty: 'easy' | 'medium' | 'hard') => {
    let wordCount = 5;
    const shuffledWords = [...category.words].sort(() => Math.random() - 0.5);
    
    // Adjust word selection based on difficulty
    switch(difficulty) {
      case 'easy':
        // Take words from the beginning of the shuffled array (potentially simpler words)
        onSelectCategory(shuffledWords.slice(0, wordCount), difficulty);
        break;
      case 'medium':
        // Take words from the middle of the shuffled array
        const middleStart = Math.floor((shuffledWords.length - wordCount) / 2);
        onSelectCategory(shuffledWords.slice(middleStart, middleStart + wordCount), difficulty);
        break;
      case 'hard':
        // Take words from the end of the shuffled array (potentially more complex words)
        onSelectCategory(shuffledWords.slice(-wordCount), difficulty);
        break;
      default:
        onSelectCategory(shuffledWords.slice(0, wordCount), difficulty);
    }
    setExpandedCategory(null);
  };

  const handleRandomMode = (difficulty: 'easy' | 'medium' | 'hard') => {
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    handleCategorySelect(randomCategory, difficulty);
  };

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 bg-background text-foreground relative">
      <ThemeSelector />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-[800px] mt-12"
      >
        <h1 className="text-5xl font-bold">Word Search X</h1>
        
        <div className="w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <motion.div
          layout
          className="relative w-full max-w-[600px] h-24 mb-4"
        >
          <CategoryBox
            category={{ name: "Random Mode", words: [] }}
            onSelect={handleRandomMode}
            isRandom
            isExpanded={expandedCategory === "Random Mode"}
            onExpandToggle={() => handleCategoryClick("Random Mode")}
          />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {CATEGORIES.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((category) => (
            <CategoryBox
              key={category.name}
              category={category}
              onSelect={(difficulty) => handleCategorySelect(category, difficulty)}
              isExpanded={expandedCategory === category.name}
              onExpandToggle={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </motion.div>

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default Categories;
