"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border-transparent hover:bg-muted/30 focus-visible:ring-primary"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative h-6 w-6 flex items-center justify-center"
      >
        {mounted && (
          <>
            {theme !== "dark" ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] text-foreground/90" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-[1.2rem] w-[1.2rem] text-foreground/90" />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
