'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BusinessParticle {
  id: number;
  name: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  initialAngle: number;
  initialDist: number;
  ambientSpeed: number;
  radialOscSpeed: number;
  merged: boolean;
  mergeTime: number;
  trail: Array<{ x: number; y: number }>;
}

interface SupernovaSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

interface MergeRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  growth: number;
}

export default function GravityLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [percentage, setPercentage] = useState(1);
  const [statusText, setStatusText] = useState('DETECTING DISTRIBUTED NODES');
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock scroll during 2.2-second express cinematic loading sequence
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const isMobile = width < 768;
    const cx = width / 2;
    // Position center slightly above middle on mobile so percentage sits prominently right beneath it
    const cy = height * (isMobile ? 0.40 : 0.44);

    // 24 Business Entities representing diverse commercial industries
    const BUSINESS_NAMES = [
      { name: 'Elite Academy', category: 'Education' },
      { name: 'Artisan Café', category: 'Hospitality' },
      { name: 'Boutique Hotel', category: 'Luxury' },
      { name: 'Apex Fitness', category: 'Health' },
      { name: 'Luxe Salon', category: 'Beauty' },
      { name: 'Fintech Protocol', category: 'Finance' },
      { name: 'Vanguard Realty', category: 'Real Estate' },
      { name: 'Aura Dining', category: 'Gastronomy' },
      { name: 'Biotech Labs', category: 'Science' },
      { name: 'Studio Media', category: 'Creative' },
      { name: 'Orbit Retail', category: 'Commerce' },
      { name: 'Stellar Freight', category: 'Logistics' },
      { name: 'Apex Law', category: 'Legal' },
      { name: 'Quantum SaaS', category: 'Software' },
      { name: 'Elysium Health', category: 'Medical' },
      { name: 'Arch Studio', category: 'Design' },
      { name: 'Horizon Motors', category: 'Automotive' },
      { name: 'Pulse Agency', category: 'Marketing' },
      { name: 'Summit Capital', category: 'Venture' },
      { name: 'Titan Shield', category: 'Security' },
      { name: 'Verve Roasters', category: 'F&B' },
      { name: 'Aether Robotics', category: 'Robotics' },
      { name: 'Solstice Spa', category: 'Wellness' },
      { name: 'Kinetix Labs', category: 'AI Research' },
    ];

    // Perimeter distribution (scaled up on mobile for maximum spatial impact)
    const baseDist = Math.min(width, height) * (isMobile ? 0.36 : 0.40);

    const particles: BusinessParticle[] = BUSINESS_NAMES.map((spec, i) => {
      const angle = (i / BUSINESS_NAMES.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
      const dist = baseDist + (i % 3) * (isMobile ? 22 : 36) + Math.random() * 18;
      const startX = cx + Math.cos(angle) * dist;
      const startY = cy + Math.sin(angle) * dist;

      // Larger nodes on mobile for crisp high visibility
      const nodeRadius = isMobile ? 6.0 + (i % 3) * 1.2 : 3.8 + (i % 4) * 0.7;

      return {
        id: i,
        name: spec.name,
        category: spec.category,
        x: startX,
        y: startY,
        vx: 0,
        vy: 0,
        radius: nodeRadius,
        initialAngle: angle,
        initialDist: dist,
        ambientSpeed: (0.0008 + (i % 5) * 0.0003) * (i % 2 === 0 ? 1 : -1),
        radialOscSpeed: 2.2 + Math.random() * 1.2,
        merged: false,
        mergeTime: 0,
        trail: [],
      };
    });

    const ripples: MergeRipple[] = [];
    const supernovaSparks: SupernovaSpark[] = [];
    let supernovaTriggered = false;
    let exitTriggered = false;
    let completedTriggered = false;

    let startTime: number | null = null;
    const TOTAL_DURATION = 2.2; // Express 2.2s Loading Sequence

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = Math.min((timestamp - startTime) / 1000, TOTAL_DURATION + 0.1);

      // --- 1. EXPRESS TIMELINE SYNCHRONIZATION (0.0s - 2.2s) ---
      let currentPct = 1;
      let currentStatus = 'DETECTING DISTRIBUTED NODES';

      if (elapsed < 0.7) {
        // Scene 1 (0.0s - 0.7s): 1% -> 35%
        currentPct = Math.min(35, Math.floor(1 + (elapsed / 0.7) * 34));
        currentStatus = elapsed < 0.35 ? 'DETECTING DISTRIBUTED NODES' : 'CALCULATING GRAVITATIONAL CONVERGENCE';
      } else if (elapsed < 1.6) {
        // Scene 2 (0.7s - 1.6s): 35% -> 88%
        const t = (elapsed - 0.7) / 0.9;
        currentPct = Math.min(88, Math.floor(35 + Math.pow(t, 1.2) * 53));
        currentStatus = t < 0.5 ? 'GRAVITATIONAL ACCRETION ACTIVE' : 'ORBITAL COMPRESSION DETECTED';
      } else if (elapsed < 1.9) {
        // Scene 3 (1.6s - 1.9s): 88% -> 99%
        const t = (elapsed - 1.6) / 0.3;
        currentPct = Math.min(99, Math.floor(88 + t * 11));
        currentStatus = 'PLANETARY GENESIS • WEBFLUX CORE';
      } else {
        // Scene 4 (1.9s - 2.2s): 100%
        currentPct = 100;
        currentStatus = 'SUPERNOVA BURST • SYSTEM READY';
      }

      setPercentage(currentPct);
      setStatusText(currentStatus);

      if (elapsed >= 1.95 && !exitTriggered) {
        exitTriggered = true;
        setIsExiting(true);
      }

      if (elapsed >= TOTAL_DURATION && !completedTriggered) {
        completedTriggered = true;
        setIsComplete(true);
        document.body.style.overflow = '';
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // --- 2. GRAVITATIONAL FIELD ORBIT GUIDE ---
      const guideAlpha = Math.max(0, (isMobile ? 0.14 : 0.08) - elapsed * 0.04);
      if (guideAlpha > 0) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${guideAlpha})`;
        ctx.lineWidth = isMobile ? 1.5 : 1.0;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.arc(cx, cy, baseDist, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- 3. PLANET SIZE COMPUTATION ---
      const maxPlanetRadius = isMobile ? 54 : 68;
      let planetRadius = 0;
      let planetAlpha = 0;

      if (elapsed >= 1.55) {
        const planetProgress = Math.min((elapsed - 1.55) / 0.35, 1);
        const easeOut = 1 - Math.pow(1 - planetProgress, 3);
        planetRadius = 8 + (maxPlanetRadius - 8) * easeOut;
        planetAlpha = Math.min(1, (elapsed - 1.55) * 4);
      }

      // --- 4. UPDATE & DRAW PARTICLES ---
      particles.forEach((p) => {
        if (p.merged) return;

        if (elapsed < 0.7) {
          // Scene 1: Rapid Orbital Drift
          const currentAngle = p.initialAngle + elapsed * p.ambientSpeed * Math.PI * 2;
          const oscDist = p.initialDist + Math.sin(elapsed * p.radialOscSpeed + p.id) * 8;
          p.x = cx + Math.cos(currentAngle) * oscDist;
          p.y = cy + Math.sin(currentAngle) * oscDist;
        } else if (elapsed < 1.6) {
          // Scene 2: High-velocity Inward Gravity Accretion
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          const timeProgress = (elapsed - 0.7) / 0.9;
          const force = (2.2 + 16.0 * Math.pow(timeProgress, 1.8)) * (420 / Math.max(dist, 20));

          const swirl = (1 - timeProgress) * 0.45;
          const perpAngle = angle + Math.PI / 2;

          p.vx += Math.cos(angle) * force * 0.22 + Math.cos(perpAngle) * swirl;
          p.vy += Math.sin(angle) * force * 0.22 + Math.sin(perpAngle) * swirl;

          p.vx *= 0.90;
          p.vy *= 0.90;

          p.x += p.vx;
          p.y += p.vy;

          p.trail.unshift({ x: p.x, y: p.y });
          if (p.trail.length > 10) p.trail.pop();

          // Visual pull vectors towards center
          const lineAlpha = (isMobile ? 0.65 : 0.35) * Math.sin(timeProgress * Math.PI);
          if (lineAlpha > 0.05) {
            ctx.save();
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = isMobile ? 1.6 : 1.0;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            const midX = (p.x + cx) / 2;
            const midY = (p.y + cy) / 2;
            const curveOffset = Math.sin(p.initialAngle * 3) * (isMobile ? 18 : 25);
            ctx.quadraticCurveTo(midX + Math.cos(perpAngle) * curveOffset, midY + Math.sin(perpAngle) * curveOffset, cx, cy);
            ctx.stroke();
            ctx.restore();
          }

          if (dist < (isMobile ? 26 : 20)) {
            p.merged = true;
            p.mergeTime = elapsed;
            ripples.push({
              x: cx,
              y: cy,
              radius: 6,
              maxRadius: (isMobile ? 42 : 32) + Math.random() * 20,
              alpha: 0.95,
              growth: 3.2,
            });
          }
        } else {
          // Scene 3: Final Rapid Fusion
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          const force = 48 * (300 / Math.max(dist, 8));
          p.vx += Math.cos(angle) * force * 0.22;
          p.vy += Math.sin(angle) * force * 0.22;
          p.x += p.vx;
          p.y += p.vy;

          if (dist < Math.max(planetRadius, 18)) {
            p.merged = true;
            p.mergeTime = elapsed;
            ripples.push({
              x: cx,
              y: cy,
              radius: planetRadius * 0.5,
              maxRadius: planetRadius * 1.6,
              alpha: 1.0,
              growth: 3.8,
            });
          }
        }

        // Draw Trails
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(isMobile ? 0.55 : 0.35, (elapsed - 0.7) * 0.5)})`;
          ctx.lineWidth = isMobile ? 1.8 : 1.2;
          ctx.stroke();
        }

        // Draw Glowing Node Body
        ctx.save();
        ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowBlur = Math.max(isMobile ? 8 : 4, p.radius * (isMobile ? 2.6 : 2.0));

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Halo
        ctx.fillStyle = `rgba(255, 255, 255, ${isMobile ? 0.35 : 0.22})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (isMobile ? 2.6 : 2.2), 0, Math.PI * 2);
        ctx.fill();

        // Render business name labels on desktop
        if (!isMobile && elapsed < 0.7) {
          const labelAlpha = Math.max(0, 0.85 - elapsed * 0.7);
          const isRight = p.x >= cx;
          ctx.fillStyle = `rgba(255, 255, 255, ${labelAlpha})`;
          ctx.font = '600 10px Inter, sans-serif';
          ctx.textAlign = isRight ? 'left' : 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.name, p.x + (isRight ? 12 : -12), p.y);
        }
      });

      // --- 5. DRAW MERGE RIPPLES ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.growth;
        r.alpha -= 0.05;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
          ctx.lineWidth = isMobile ? 2.0 : 1.3;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // --- 6. DRAW CENTRAL CORE PLANET (WEBFLUX) ---
      if (planetRadius > 0) {
        // Corona Glow
        const coronaR = planetRadius * 2.8;
        const gCorona = ctx.createRadialGradient(cx, cy, planetRadius * 0.5, cx, cy, coronaR);
        gCorona.addColorStop(0, `rgba(255, 255, 255, ${planetAlpha * 0.55})`);
        gCorona.addColorStop(0.45, `rgba(240, 245, 255, ${planetAlpha * 0.22})`);
        gCorona.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gCorona;
        ctx.beginPath();
        ctx.arc(cx, cy, coronaR, 0, Math.PI * 2);
        ctx.fill();

        // Accretion Rings
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${planetAlpha * 0.45})`;
        ctx.lineWidth = isMobile ? 2.0 : 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, planetRadius * 1.65, planetRadius * 0.48, -0.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Radiant Core Sphere
        const gPlanet = ctx.createRadialGradient(cx, cy, 0, cx, cy, planetRadius);
        gPlanet.addColorStop(0, '#FFFFFF');
        gPlanet.addColorStop(0.5, `rgba(245, 248, 255, ${planetAlpha * 0.98})`);
        gPlanet.addColorStop(0.85, `rgba(210, 225, 255, ${planetAlpha * 0.85})`);
        gPlanet.addColorStop(1, `rgba(160, 185, 230, ${planetAlpha * 0.45})`);

        ctx.save();
        ctx.shadowColor = 'rgba(255, 255, 255, 1.0)';
        ctx.shadowBlur = planetRadius * 0.8;
        ctx.fillStyle = gPlanet;
        ctx.beginPath();
        ctx.arc(cx, cy, planetRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Luminous 'W' Core Monogram
        if (planetRadius > 20 && elapsed < 1.9) {
          ctx.fillStyle = '#000000';
          ctx.font = `900 ${isMobile ? '20px' : '24px'} Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('W', cx, cy);
        }
      }

      // --- 7. SUPERNOVA BURST & LIGHT BLOOM (1.9s - 2.2s) ---
      if (elapsed >= 1.9) {
        if (!supernovaTriggered) {
          supernovaTriggered = true;
          const sparkCount = isMobile ? 60 : 80;
          for (let k = 0; k < sparkCount; k++) {
            const angle = (k / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
            const speed = (isMobile ? 12 : 15) + Math.random() * 25;
            supernovaSparks.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: (isMobile ? 2.0 : 1.5) + Math.random() * 2.8,
              alpha: 1.0,
              decay: 0.045 + Math.random() * 0.035,
            });
          }
        }

        const dtSupernova = elapsed - 1.9;
        const shockRadius = dtSupernova * Math.max(width, height) * 2.8;
        const shockAlpha = Math.max(0, 1 - dtSupernova * 3.5);
        if (shockAlpha > 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shockAlpha * 0.9})`;
          ctx.lineWidth = isMobile ? 3.5 : 3.0;
          ctx.beginPath();
          ctx.arc(cx, cy, shockRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        const flashAlpha = Math.max(0, 1 - dtSupernova * 4.0) * 0.95;
        if (flashAlpha > 0) {
          const gFlash = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
          gFlash.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
          gFlash.addColorStop(0.3, `rgba(240, 245, 255, ${flashAlpha * 0.65})`);
          gFlash.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gFlash;
          ctx.fillRect(0, 0, width, height);
        }

        for (let i = 0; i < supernovaSparks.length; i++) {
          const sp = supernovaSparks[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.alpha -= sp.decay;

          if (sp.alpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha})`;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-between select-none pointer-events-auto transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Express Gravity Loading Screen"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top Header Brand Badge */}
      <div className="w-full pt-5 sm:pt-8 px-5 sm:px-10 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-mono text-sm font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            W
          </div>
          <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase text-white font-bold">
            WebFlux
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/10 border border-white/20 text-zinc-300">
            STUDIO
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Express 2.2s Engine</span>
        </div>
      </div>

      {/* Center UI Overlay (High-Impact Mobile & Desktop Percentage) */}
      <div className="z-10 flex flex-col items-center justify-center text-center pointer-events-none mt-auto mb-16 sm:mb-20 px-4">
        <div className="flex items-baseline justify-center gap-1 sm:gap-2">
          <span className="text-7xl sm:text-8xl md:text-9xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_50px_rgba(255,255,255,0.6)]">
            {percentage}
          </span>
          <span className="text-3xl sm:text-5xl font-mono font-bold text-zinc-400">
            %
          </span>
        </div>

        <div className="mt-2.5 sm:mt-3 flex items-center gap-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-zinc-200 font-semibold drop-shadow-md">
            {statusText}
          </span>
        </div>

        <div className="mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Independent Businesses Converging • WebFlux Genesis
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="w-full pb-5 sm:pb-8 px-5 sm:px-10 flex items-center justify-between z-10 pointer-events-none">
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500">
          Physics Engine: Express Accretion &bull; Orbitals &bull; Supernova Core
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500">
          &copy; {new Date().getFullYear()} WebFlux Studio
        </span>
      </div>
    </div>
  );
}
