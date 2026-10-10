'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function GravityLoader() {
  const [percentage, setPercentage] = useState(1);
  const [fallProgress, setFallProgress] = useState(0); // 0 (top) to 1 (ground)
  const [isImpact, setIsImpact] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Lock scroll during loading sequence
    document.body.style.overflow = 'hidden';

    const FALL_DURATION = 1400; // 1.4s physical acceleration

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / FALL_DURATION, 1);

      // Real gravity acceleration: y proportional to t^2
      // Using quadratic/exponential acceleration curve
      const gravityY = Math.pow(progress, 2.2);
      setFallProgress(gravityY);

      // Rapidly ticking percentage: 1% -> 25% -> 50% -> 75% -> 100%
      const currentPct = Math.min(100, Math.max(1, Math.floor(1 + 99 * Math.pow(progress, 1.85))));
      setPercentage(currentPct);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Physical impact moment at ground (100%)
        setPercentage(100);
        setFallProgress(1);
        setIsImpact(true);

        // Subtle impact shockwave pause, then smooth cinematic exit
        setTimeout(() => {
          setIsExiting(true);
        }, 280);

        // Teardown and restore document scroll
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = '';
        }, 950);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  // Calculate dynamic vertical translation from 6vh (top) down to 78vh (ground line)
  const topVh = 8;
  const groundVh = 76;
  const currentYVh = topVh + fallProgress * (groundVh - topVh);

  // Aerodynamic stretch while falling, squash on impact
  const scaleY = isImpact ? 0.85 : 1 + fallProgress * 0.14;
  const scaleX = isImpact ? 1.18 : 1 - fallProgress * 0.08;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-between select-none pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 -translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      aria-label="System Initializing"
    >
      {/* Background Ambience Void */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Top Header Stamp */}
      <div className="w-full pt-8 px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono text-xs font-bold">
            W
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400">
            WebFlux Gravity Engine
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Calibrating • 60fps</span>
        </div>
      </div>

      {/* Physics Falling Percentage Element */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center will-change-transform z-20"
        style={{
          top: `${currentYVh}vh`,
          transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
          transition: isImpact ? 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
      >
        {/* Kinetic Percentage Display */}
        <div className="relative flex items-baseline">
          <span className="text-6xl sm:text-8xl md:text-9xl font-mono font-extrabold text-white tracking-tighter drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
            {percentage}
          </span>
          <span className="text-2xl sm:text-4xl font-mono font-bold text-zinc-500 ml-1.5">
            %
          </span>
        </div>

        {/* Status Indicator */}
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-1">
          {percentage < 100 ? 'Synchronizing Void' : 'Terminal Velocity Reached'}
        </span>
      </div>

      {/* Earth / Ground Line at Bottom (76vh) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-10"
        style={{ top: `${groundVh}vh` }}
      >
        {/* Impact Shockwave Pulse (Expands upon impact) */}
        {isImpact && (
          <div className="absolute -top-10 w-72 sm:w-96 h-20 bg-white/20 rounded-full blur-2xl animate-ping pointer-events-none" />
        )}

        {/* Sleek Minimal Glowing Earth / Ground Horizon Line */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Curved Ground Arc */}
          <div
            className={`w-[280px] sm:w-[480px] md:w-[620px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 ${
              isImpact
                ? 'shadow-[0_0_30px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.5)] scale-x-110'
                : 'shadow-[0_0_15px_rgba(255,255,255,0.35)] opacity-80'
            }`}
          />
          {/* Soft Ground Horizon Glow */}
          <div
            className={`absolute -top-1 w-32 sm:w-48 h-3 bg-white/30 rounded-full blur-sm transition-opacity duration-200 ${
              isImpact ? 'opacity-100 scale-125' : 'opacity-40'
            }`}
          />
        </div>

        {/* Ground Subtext */}
        <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
          <span>SURFACE HORIZON</span>
          <span>•</span>
          <span>0.00 M</span>
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="w-full pb-8 px-8 flex items-center justify-center z-10">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
          © {new Date().getFullYear()} WebFlux Studio • Elite Interface Architecture
        </span>
      </div>
    </div>
  );
}
