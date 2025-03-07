"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SketchToCodeAnimation() {
const [step, setStep] = useState(0);

// Cycle through animation steps
useEffect(() => {
  const interval = setInterval(() => {
    setStep((prev) => (prev + 1) % 4);
  }, 3000);

  return () => clearInterval(interval);
}, []);

const generatedCode = `
import { Button } from "@/components/ui/button"

export default function Welcome() {
  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-bold">
        Hello
      </h1>
      <p className="my-4 text-gray-500">
        Welcome
      </p>
      <Button>Click</Button>
    </div>
  )
}
  `.trim();

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-background p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-muted-foreground">CraftJS Preview</div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Left side - Sketch */}
        <div className="border rounded-md p-4 bg-muted/30 flex flex-col">
          <div className="text-xs text-muted-foreground mb-2 font-mono">
            Sketch
          </div>
          <div className="flex-1 relative">
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center text-muted-foreground">
                  <p>Start drawing your UI...</p>
                </div>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-sm whitespace-pre p-2 h-full"
                style={{
                  fontFamily: "Comic Sans MS, cursive",
                  lineHeight: 1.5,
                }}
              >
                <div className="border-2 border-primary/30 p-2 rounded-md inline-block">
                  <div className="text-xl font-bold mb-2 border-b-2 border-dashed border-primary/30">
                    Hello
                  </div>
                  <div className="mb-2">Welcome</div>
                  <div className="border-2 border-primary/30 rounded px-2 py-1 inline-block">
                    Click
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right side - Code */}
        <div className="border rounded-md p-4 bg-muted/30 flex flex-col">
          <div className="text-xs text-muted-foreground mb-2 font-mono">
            Generated Code
          </div>
          <div className="flex-1 relative overflow-hidden">
            {step < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center text-muted-foreground">
                  <p>
                    {step === 0
                      ? "Waiting for sketch..."
                      : "Analyzing sketch..."}
                  </p>
                </div>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.pre
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs overflow-auto h-full p-2 rounded bg-muted/50"
              >
                <code className="text-xs">{generatedCode}</code>
              </motion.pre>
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 3 ? 1 : 0 }}
        className="mt-4 border rounded-md p-4 bg-card h-24 flex items-center justify-center"
      >
        <div className="p-4 rounded-lg border shadow-sm">
          <h1 className="text-lg font-bold">Hello</h1>
          <p className="my-2 text-sm text-muted-foreground">Welcome</p>
          <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
            Click
          </button>
        </div>
      </motion.div>
    </div>
  );
}
