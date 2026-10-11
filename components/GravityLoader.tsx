'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GravityLoader() {
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock scroll during loading sequence
    document.body.style.overflow = 'hidden';

    const TOTAL_MS = 2000; // Strictly 2.0 seconds (within 1.8s - 2.2s window)
    const EXIT_MS = 1800; // Trigger exit fade at 1.8s when hitting 100%
    const start = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / EXIT_MS, 1);

      // Fast, non-linear progression
      let currentPct: number;
      let statusText: string;

      if (progress < 0.35) {
        // Phase 1 (0 - 35%): Rapid discovery
        currentPct = Math.min(35, Math.floor(1 + (progress / 0.35) * 34));
        statusText = 'DETECTING DISTRIBUTED NODES';
      } else if (progress < 0.8) {
        // Phase 2 (35% - 88%): High-gravity convergence
        const t = (progress - 0.35) / 0.45;
        currentPct = Math.min(88, Math.floor(35 + Math.pow(t, 1.2) * 53));
        statusText = 'GRAVITATIONAL CONVERGENCE';
      } else if (progress < 1.0) {
        // Phase 3 (88% - 99%): Orbital compression
        const t = (progress - 0.8) / 0.2;
        currentPct = Math.min(99, Math.floor(88 + t * 11));
        statusText = 'PLANETARY GENESIS • WEBFLUX CORE';
      } else {
        // Phase 4 (100%): Supernova ready
        currentPct = 100;
        statusText = 'SUPERNOVA BURST • SYSTEM READY';
      }

      // Direct DOM update (ZERO React state re-renders during 60FPS loop)
      if (pctRef.current) {
        pctRef.current.textContent = `${currentPct}`;
      }
      if (statusRef.current) {
        statusRef.current.textContent = statusText;
      }

      if (elapsed >= EXIT_MS && !isExiting) {
        setIsExiting(true);
      }

      if (elapsed >= TOTAL_MS) {
        setIsComplete(true);
        document.body.style.overflow = '';
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
    };
  }, [isExiting]);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-between select-none pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'transform, opacity' }}
      aria-label="Express Gravity Loading Screen"
    >
      {/* GPU Keyframe Style Definitions */}
      <style>{`
        @keyframes gravityFall {
          0% { transform: translate3d(0, -90px, 0); opacity: 0; }
          60% { transform: translate3d(0, 10px, 0); opacity: 1; }
          82% { transform: translate3d(0, -4px, 0); }
          100% { transform: translate3d(0, 0, 0); opacity: 1; }
        }
        @keyframes orbitalSpin {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(0, 0, 0) rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale3d(1, 1, 1); opacity: 0.4; }
          50% { transform: translate3d(0, 0, 0) scale3d(1.18, 1.18, 1); opacity: 0.85; }
        }
        @keyframes ringConverge {
          0% { transform: translate3d(0, 0, 0) scale3d(1.9, 1.9, 1); opacity: 0.15; }
          70% { transform: translate3d(0, 0, 0) scale3d(1, 1, 1); opacity: 0.7; }
          100% { transform: translate3d(0, 0, 0) scale3d(1.05, 1.05, 1); opacity: 0.85; }
        }
        @keyframes nodeInward {
          0% { transform: translate3d(var(--nx), var(--ny), 0) scale(1); opacity: 0.85; }
          65% { transform: translate3d(calc(var(--nx) * 0.35), calc(var(--ny) * 0.35), 0) scale(0.85); opacity: 0.9; }
          90% { transform: translate3d(0, 0, 0) scale(0.2); opacity: 0; }
          100% { transform: translate3d(0, 0, 0) scale(0); opacity: 0; }
        }
        @keyframes supernovaBloom {
          0% { transform: translate3d(0, 0, 0) scale3d(0.6, 0.6, 1); opacity: 0; }
          80% { transform: translate3d(0, 0, 0) scale3d(1.4, 1.4, 1); opacity: 0.9; }
          100% { transform: translate3d(0, 0, 0) scale3d(2.0, 2.0, 1); opacity: 0; }
        }
        .gravity-core {
          animation: gravityFall 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          will-change: transform, opacity;
        }
        .ring-spin {
          animation: orbitalSpin 6s linear infinite;
          will-change: transform;
        }
        .ring-converge {
          animation: ringConverge 1.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        .node-converge {
          animation: nodeInward 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Top Header Brand Badge */}
      <div className="w-full pt-6 sm:pt-8 px-6 sm:px-10 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-mono text-sm font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            W
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-white font-bold">
            WebFlux
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/10 border border-white/20 text-zinc-300">
            STUDIO
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Zero-Latency Engine</span>
        </div>
      </div>

      {/* Center Gravitational Core & Planetary Convergence */}
      <div className="relative flex flex-col items-center justify-center my-auto pointer-events-none">
        {/* Luminous Core Planet Drop */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center gravity-core">
          {/* Supernova Expansion Shockwave */}
          <div
            className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none"
            style={{ animation: 'supernovaBloom 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
          />

          {/* Outer Concentric Converging Ring */}
          <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-white/20 ring-spin ring-converge pointer-events-none" />

          {/* Middle Radiant Halo */}
          <div
            className="absolute -inset-3 sm:-inset-4 rounded-full border border-white/15 pointer-events-none"
            style={{ animation: 'pulseGlow 2.2s ease-in-out infinite' }}
          />

          {/* Central Sphere */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #dbeafe 45%, #1e293b 100%)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            <span className="font-mono font-black text-2xl sm:text-3xl text-black select-none tracking-tight">
              W
            </span>
          </div>

          {/* 6 Converging Enterprise Orbital Nodes */}
          {[
            { x: '120px', y: '0px', delay: '0.1s' },
            { x: '60px', y: '104px', delay: '0.2s' },
            { x: '-60px', y: '104px', delay: '0.15s' },
            { x: '-120px', y: '0px', delay: '0.25s' },
            { x: '-60px', y: '-104px', delay: '0.05s' },
            { x: '60px', y: '-104px', delay: '0.3s' },
          ].map((pos, idx) => (
            <div
              key={idx}
              className="absolute w-3 h-3 rounded-full bg-white node-converge shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              style={
                {
                  '--nx': pos.x,
                  '--ny': pos.y,
                  animationDelay: pos.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* High-Impact Typography & Gravity Percentage (Direct DOM, Butter-Smooth 60FPS) */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline justify-center gap-1 sm:gap-2">
            <span
              ref={pctRef}
              className="text-7xl sm:text-8xl md:text-9xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_45px_rgba(255,255,255,0.5)]"
            >
              1
            </span>
            <span className="text-3xl sm:text-5xl font-mono font-bold text-zinc-400">
              %
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span
              ref={statusRef}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-zinc-200 font-semibold drop-shadow-md"
            >
              DETECTING DISTRIBUTED NODES
            </span>
          </div>

          <div className="mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Independent Business Nodes Converging • WebFlux Core
          </div>
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="w-full pb-6 sm:pb-8 px-6 sm:px-10 flex items-center justify-between z-10 pointer-events-none">
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500">
          Hardware-Accelerated &bull; 60FPS Physics Engine
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500">
          &copy; {new Date().getFullYear()} WebFlux Studio
        </span>
      </div>
    </div>
  );
}
