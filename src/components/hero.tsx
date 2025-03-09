"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SketchToCodeAnimation from "@/components/sketch-to-code-animation";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50 z-0" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[70%] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                AI-Powered UI Generation
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Draw Your Website,{" "}
                <span className="text-primary">Get Instant Code</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 text-xl text-muted-foreground max-w-lg"
              >
                Sketch your UI, and CraftJS generates Next.js code in real-time.
                From imagination to implementation in seconds.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="font-medium text-base" asChild>
                <Link href="/login">Try CraftJS Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-medium text-base"
                asChild
              >
                <Link href="/login">Watch Demo</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-muted/50 to-muted p-1 rounded-2xl shadow-xl dark:shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl" />
              <div className="relative bg-card rounded-xl overflow-hidden shadow-inner">
                <SketchToCodeAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
