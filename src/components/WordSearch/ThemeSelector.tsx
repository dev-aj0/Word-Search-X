import { Button } from "@/components/ui/button";
import { HelpCircle, Sun, Moon, Candy, Sunset, TreePine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 flex gap-2 z-50"
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg bg-background/80 backdrop-blur-sm hover:bg-accent"
        onClick={() => setShowHelp(true)}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-lg bg-background/80 backdrop-blur-sm hover:bg-accent">
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : theme === "candy" ? (
              <Candy className="h-4 w-4" />
            ) : theme === "sunset" ? (
              <Sunset className="h-4 w-4" />
            ) : theme === "forest" ? (
              <TreePine className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg">
          <DropdownMenuItem 
            onClick={() => setTheme("light")} 
            className={cn(
              "gap-2 cursor-pointer",
              theme === "light" && "bg-accent"
            )}
          >
            <Sun className="h-4 w-4" /> Light
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")} 
            className={cn(
              "gap-2 cursor-pointer",
              theme === "dark" && "bg-accent"
            )}
          >
            <Moon className="h-4 w-4" /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("candy")} 
            className={cn(
              "gap-2 cursor-pointer",
              theme === "candy" && "bg-accent"
            )}
          >
            <Candy className="h-4 w-4" /> Candy
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("sunset")} 
            className={cn(
              "gap-2 cursor-pointer",
              theme === "sunset" && "bg-accent"
            )}
          >
            <Sunset className="h-4 w-4" /> Sunset
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("forest")} 
            className={cn(
              "gap-2 cursor-pointer",
              theme === "forest" && "bg-accent"
            )}
          >
            <TreePine className="h-4 w-4" /> Forest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-[425px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogTitle>How to Play Word Search</DialogTitle>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Find the words listed above the grid</li>
            <li>Click and drag letters to select them</li>
            <li>Words can be horizontal, vertical, or diagonal</li>
            <li>Find all words to win!</li>
          </ol>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ThemeSelector;