"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, TrendingUp, Code2, Sparkles, Activity, Layers } from "lucide-react";

interface Service3DVisualizerProps {
  type: "ai" | "growth" | "web" | string;
  color?: string;
}

export default function Service3DVisualizer({
  type,
  color = "#6366F1",
}: Service3DVisualizerProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (type === "ai" || type.toLowerCase().includes("ia") || type.toLowerCase().includes("inteligência")) {
    return (
      <div className="relative w-full h-[320px] rounded-2xl bg-[#08090E] border border-white/10 overflow-hidden flex flex-col p-6 preserve-3d">
        {/* Ambient glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: color }}
        />

        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest">
              AI Pipeline // Synapse-4
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
            99.8% ACCURACY
          </span>
        </div>

        {/* Interactive Neural Core */}
        <div className="flex-1 flex flex-col justify-center items-center relative">
          {/* Pulsing Concentric Rings */}
          <div className="absolute w-44 h-44 rounded-full border border-indigo-500/20 animate-ping opacity-25" />
          <div className="absolute w-32 h-32 rounded-full border border-cyan-500/30 animate-pulse" />
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600/40 to-cyan-500/40 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            <Cpu className="w-10 h-10 text-cyan-300 animate-pulse" />
          </div>

          {/* Floating Neural Nodes */}
          <div className="absolute top-2 left-6 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-[11px] font-mono text-white/80 shadow-lg translate-z-30">
            <span className="text-indigo-400 font-bold">NODE 01:</span> Lead Qualifier
          </div>
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-[11px] font-mono text-white/80 shadow-lg translate-z-20">
            <span className="text-cyan-400 font-bold">NODE 02:</span> CRM Sync Active
          </div>
          <div className="absolute top-4 right-6 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-[11px] font-mono text-white/80 shadow-lg translate-z-30">
            <span className="text-purple-400 font-bold">NODE 03:</span> Auto-WhatsApp
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
          <div className="text-center">
            <div className="text-[10px] text-white/40 font-mono">LATENCY</div>
            <div className="text-[13px] font-mono font-bold text-white">12ms</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-white/40 font-mono">FLOWS</div>
            <div className="text-[13px] font-mono font-bold text-cyan-400">24/7 Active</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-white/40 font-mono">SAVINGS</div>
            <div className="text-[13px] font-mono font-bold text-indigo-400">+140h/mês</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "growth" || type.toLowerCase().includes("tráfego") || type.toLowerCase().includes("marketing")) {
    return (
      <div className="relative w-full h-[320px] rounded-2xl bg-[#08090E] border border-white/10 overflow-hidden flex flex-col p-6 preserve-3d">
        <div
          className="absolute -top-12 -left-12 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "#06B6D4" }}
        />

        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest">
              Performance Engine // ROAS Max
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            SCALE: ACTIVE
          </span>
        </div>

        {/* 3D Growth Bars visualization */}
        <div className="flex-1 flex items-end justify-between gap-3 px-4 pb-4 pt-6">
          {[
            { label: "Mês 1", h: "40%", val: "2.8x" },
            { label: "Mês 2", h: "58%", val: "4.1x" },
            { label: "Mês 3", h: "75%", val: "5.8x" },
            { label: "Mês 4", h: "95%", val: "7.9x" },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[11px] font-mono text-cyan-300 font-bold group-hover:scale-110 transition-transform">
                {bar.val}
              </span>
              <div className="w-full bg-white/5 rounded-t-lg overflow-hidden relative flex items-end h-full max-h-[140px]">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bar.h }}
                  transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                  className={`w-full rounded-t-lg ${
                    i === 3
                      ? "bg-gradient-to-t from-indigo-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                      : "bg-white/15 group-hover:bg-white/25"
                  } transition-colors`}
                />
              </div>
              <span className="text-[10px] font-mono text-white/40">{bar.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-white/60 font-mono">Taxa Conversão</span>
            <span className="text-[12px] font-mono font-bold text-emerald-400">+185%</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-white/60 font-mono">Custo p/ Lead</span>
            <span className="text-[12px] font-mono font-bold text-indigo-400">-46% CAC</span>
          </div>
        </div>
      </div>
    );
  }

  // Web Development / Next-Gen Digital Platform
  return (
    <div className="relative w-full h-[320px] rounded-2xl bg-[#08090E] border border-white/10 overflow-hidden flex flex-col p-6 preserve-3d">
      <div
        className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "#8B5CF6" }}
      />

      {/* Browser Mockup Chrome */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <div className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-white/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          https://onze.digital/platform
        </div>
        <Code2 className="w-4 h-4 text-purple-400" />
      </div>

      {/* Code vs Live interactive preview */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[12px] leading-relaxed text-white/70 space-y-1">
          <div className="text-white/40">// Next.js 16 + React 19 Engine</div>
          <div>
            <span className="text-purple-400">export default</span>{" "}
            <span className="text-indigo-400">function</span>{" "}
            <span className="text-cyan-300">ModernExperience</span>() &#123;
          </div>
          <div className="pl-4 text-white/90">
            return &lt;<span className="text-cyan-400">Performance</span>{" "}
            <span className="text-purple-300">score</span>=&#123;<span className="text-emerald-400">100</span>&#125; /&gt;
          </div>
          <div>&#125;</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
        <div className="text-center">
          <div className="text-[10px] text-white/40 font-mono">SPEED INDEX</div>
          <div className="text-[13px] font-mono font-bold text-emerald-400">0.4s (A+)</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-white/40 font-mono">SEO SCORE</div>
          <div className="text-[13px] font-mono font-bold text-white">100/100</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-white/40 font-mono">FRAMEWORK</div>
          <div className="text-[13px] font-mono font-bold text-purple-400">Next.js 16</div>
        </div>
      </div>
    </div>
  );
}
