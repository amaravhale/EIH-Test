"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

// Real Empirisys historical facts
const EMPIRISYS_FACTS = [
  "The founding of Empirisys was deeply personal: both founders were driven by their own family's experiences with serious industrial accidents.",
  "Empirisys began in 2020 as a kitchen-table startup during the COVID-19 lockdown, making 'remote-first' part of its DNA from day one.",
  "Our internal motto for team culture is simple but powerful: 'We have no egos, amigos.'",
  "In 2023, just three years after founding, Empirisys was named one of the Sunday Times Best Places to Work in the UK.",
  "We run on trust: Empirisys has a nominal holiday policy, but we deliberately don't track leave to encourage true work-life balance.",
  "Our team brings unique perspectives—one of our talented data scientists used to be a professional chef!",
  "In 2024, our CEO Gus Carroll was awarded the prestigious IChemE Franklin Medal for his 30-year contribution to process safety.",
  "Our Chairman, Iain Conn, brings world-class experience, having previously served as CEO of both BP's downstream business and Centrica.",
  "The Alex White Memorial Fund honors our late colleague by supporting neurodiverse students during our annual Cardiff internships.",
  "Our DETECT analytics engine was developed in direct partnership with BP, revolutionising decision-making support in process safety.",
  "We ran the largest-ever Process Safety Leadership Survey with Step Change in Safety, gathering input from 450 leaders across 73 organisations.",
  "From a two-person startup to a 30+ strong team, we proudly work alongside industry giants like BP, Thames Water, SSE, and Ineos."
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
