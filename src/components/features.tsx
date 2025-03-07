"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Paintbrush, Zap, Monitor, Upload } from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "Freehand Sketching",
    description:
      "Draw UI elements just like you would on paper. No complex tools to learn.",
    color: "from-pink-600 to-purple-600",
  },
  {
    icon: Zap,
    title: "Real-Time Code Generation",
    description:
      "Watch as your sketches transform into clean, production-ready Next.js code instantly.",
    color: "from-yellow-600 to-orange-600",
  },
  {
    icon: Monitor,
    title: "Live Preview",
    description:
      "See your UI come to life in real-time before exporting. What you see is what you get.",
    color: "from-green-600 to-emerald-600",
  },
  {
    icon: Upload,
    title: "Export to Next.js",
    description:
      "Download a complete, ready-to-use Next.js project with all your components.",
    color: "from-blue-600 to-cyan-600",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CraftJS combines the freedom of sketching with the power of AI to
            revolutionize how you build web interfaces.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />

              <div className="relative bg-card rounded-xl p-6 h-full shadow-md dark:shadow-primary/5 border border-border/50 hover:border-primary/20 transition-colors duration-300">
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
