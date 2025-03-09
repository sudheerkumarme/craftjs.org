"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle"
import { PenLine } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <PenLine className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="font-bold text-xl text-foreground">CraftJS</span>
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Docs
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
