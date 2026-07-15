"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

// Real Empirisys historical facts - A mix of serious history and humorous company quirks
const EMPIRISYS_FACTS = [
  // The Serious & Meaningful
  "The founding of Empirisys was deeply personal: both founders were driven by their own family's experiences with serious industrial accidents.",
  "The Alex White Memorial Fund honors our late colleague by supporting neurodiverse students during our annual Cardiff internships.",
  "In 2024, our CEO Gus Carroll was awarded the prestigious IChemE Franklin Medal for his 30-year contribution to process safety.",
  "Our DETECT analytics engine was developed in direct partnership with BP, revolutionising decision-making support in process safety.",
  "We ran the largest-ever Process Safety Leadership Survey with Step Change in Safety, gathering input from 450 leaders across 73 organisations.",
  "From a two-person startup to a 30+ strong team, we proudly work alongside industry giants like BP, Thames Water, SSE, and Ineos.",
  "Our Chairman, Iain Conn, brings world-class experience, having previously served as CEO of both BP's downstream business and Centrica.",
  
  // The Humorous & Quirky
  "Empirisys was founded in 2020 from a kitchen table. We claim 'remote-first' was a strategic visionary move, but really we were just stuck in lockdown.",
  "Our official team motto is 'We have no egos, amigos.' Unofficial motto: 'Who broke the build on a Friday afternoon?'",
  "We trust our team so much we don't even track their holidays. If someone is missing for 3 weeks, we just assume they're deep in a neural network.",
  "Our data science team includes a former professional chef. We're still trying to convince him to cook us lunch instead of writing Python scripts.",
  "In 2023, we accidentally won a Sunday Times Best Place to Work award. We thought our culture was just 'okay', but apparently having no egos actually works!"
];

interface FunFactLoaderProps {
  message?: string;
  className?: string;
}

export function FunFactLoader({ message = "Loading Intelligence...", className = "" }: FunFactLoaderProps) {
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
    // Pick a random fact on mount
    const randomFact = EMPIRISYS_FACTS[Math.floor(Math.random() * EMPIRISYS_FACTS.length)];
    setFact(randomFact);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] w-full p-8 ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full bg-[#1A1525]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl overflow-hidden"
      >
        {/* Animated Background Mesh */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex h-12 w-12 items-center justify-center mb-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-20"></span>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px]">
              <div className="h-full w-full rounded-full bg-[#1A1525] flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-violet-400 animate-spin" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            {message}
          </h3>

          <AnimatePresence mode="wait">
            {fact && (
              <motion.div
                key={fact}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/5 border border-white/5 rounded-xl p-4"
              >
                <span className="block text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-2">
                  Did you know?
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  "{fact}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
