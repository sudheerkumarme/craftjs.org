"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PenLine, Brain, Rocket, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    title: "Draw your UI",
    description:
      "Sketch your interface elements freehand, just like you would on paper or a whiteboard.",
    emoji: "✍️",
  },
  {
    icon: Brain,
    title: "CraftJS recognizes the elements",
    description:
      "Our AI analyzes your sketch and identifies UI components, layouts, and structure.",
    emoji: "🤖",
  },
  {
    icon: Rocket,
    title: "Code & preview update in real-time",
    description:
      "Watch as your sketch transforms into clean Next.js code with a live preview.",
    emoji: "🚀",
  },
  {
    icon: PartyPopper,
    title: "Export & build your site",
    description:
      "Download your complete Next.js project, ready to customize and deploy.",
    emoji: "🎉",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CraftJS simplifies the journey from concept to code with an
            intuitive four-step process.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/10 hidden md:block" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div
                    className={`${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="bg-card rounded-xl p-6 shadow-md dark:shadow-primary/5 border border-border/50 relative">
                      {/* Number indicator */}
                      <div className="absolute top-6 -left-4 md:left-auto md:-right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm z-10">
                        {index + 1}
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-2 rounded-lg bg-primary/10 text-primary">
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          {step.title}{" "}
                          <span className="ml-2">{step.emoji}</span>
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex justify-center ${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                      {step.emoji}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
