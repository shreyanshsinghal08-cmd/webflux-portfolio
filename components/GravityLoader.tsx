'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ClientStar {
  name: string;
  category: string;
  targetAngle: number;
  targetDist: number;
  startX: number;
  startY: number;
  launchTime: number; // in seconds
  flightDuration: number;
  currentX: number;
  currentY: number;
  isAttached: boolean;
  attachTime: number;
  explodeVx: number;
  explodeVy: number;
}

interface ExplosionParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

export default function GravityLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [percentage, setPercentage] = useState(1);
  const [statusText, setStatusText] = useState('ALIGNING VOID CORE');
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock scroll during loading sequence
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
    const cy = height / 2 - (isMobile ? 24 : 32);

    // 8 Diverse client business archetypes as per notebook concept
    const CLIENT_SPECS = [
      { name: 'Artisan Café', category: 'F&B', angle: 0.35, launch: 0.15 },
      { name: 'Fitness & Gym', category: 'Health', angle: 1.15, launch: 0.38 },
      { name: 'Fine Dining', category: 'Luxury', angle: 1.95, launch: 0.62 },
      { name: 'Luxury Salon', category: 'Beauty', angle: 2.75, launch: 0.88 },
      { name: 'Apex Academy', category: 'Education', angle: 3.55, launch: 1.12 },
      { name: 'Boutique Hotel', category: 'Hospitality', angle: 4.35, launch: 1.36 },
      { name: 'Real Estate', category: 'Commercial', angle: 5.15, launch: 1.62 },
      { name: 'Tech Startup', category: 'SaaS', angle: 5.95, launch: 1.88 },
    ];

    const clientStars: ClientStar[] = CLIENT_SPECS.map((spec, i) => {
      const targetDist = isMobile ? 85 + (i % 3) * 22 : 140 + (i % 3) * 40;
      // Spawn far outside screen
      const spawnAngle = spec.angle + (Math.random() - 0.5) * 0.8;
      const spawnDist = Math.max(width, height) * 0.85 + 100;
      const startX = cx + Math.cos(spawnAngle) * spawnDist;
      const startY = cy + Math.sin(spawnAngle) * spawnDist;

      // Explosion outward trajectory
      const expAngle = spec.angle + (Math.random() - 0.5) * 0.3;
      const expSpeed = 12 + Math.random() * 14;

      return {
        name: spec.name,
        category: spec.category,
        targetAngle: spec.angle,
        targetDist,
        startX,
        startY,
        launchTime: spec.launch,
        flightDuration: 0.55,
        currentX: startX,
        currentY: startY,
        isAttached: false,
        attachTime: 0,
        explodeVx: Math.cos(expAngle) * expSpeed,
        explodeVy: Math.sin(expAngle) * expSpeed,
      };
    });

    const explosionParticles: ExplosionParticle[] = [];
    let hasExploded = false;
    let explosionTime = 0;
    const EXPLOSION_TRIGGER_TIME = 2.45; // seconds
    let startTime: number | null = null;

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // in seconds

      ctx.clearRect(0, 0, width, height);

      // Deep void black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Calculate progress percentage based on attached client stars
      let attachedCount = 0;

      // Update client stars
      clientStars.forEach((star) => {
        if (elapsed >= star.launchTime) {
          const t = Math.min((elapsed - star.launchTime) / star.flightDuration, 1);
          // Ease-out cubic curve for gravity pull towards center ball
          const easeOut = 1 - Math.pow(1 - t, 3);

          const targetX = cx + Math.cos(star.targetAngle) * star.targetDist;
          const targetY = cy + Math.sin(star.targetAngle) * star.targetDist;

          if (hasExploded) {
            // Accelerate outwards during explosion
            const dtExplode = elapsed - explosionTime;
            star.currentX += star.explodeVx * 1.35;
            star.currentY += star.explodeVy * 1.35;
          } else {
            // Parabolic fly-in towards target orbit
            const perpAngle = star.targetAngle + Math.PI / 2;
            const curveArch = (1 - easeOut) * Math.sin(easeOut * Math.PI) * 70;
            star.currentX = star.startX + (targetX - star.startX) * easeOut + Math.cos(perpAngle) * curveArch;
            star.currentY = star.startY + (targetY - star.startY) * easeOut + Math.sin(perpAngle) * curveArch;
          }

          if (t >= 1) {
            if (!star.isAttached) {
              star.isAttached = true;
              star.attachTime = elapsed;
            }
          }
        }

        if (star.isAttached) {
          attachedCount++;
        }
      });

      // Synchronize percentage with client connections: 1% -> 25% -> 50% -> 75% -> 100%
      let calculatedPct = 1;
      if (attachedCount === 0) {
        calculatedPct = Math.min(10, Math.floor(1 + elapsed * 10));
      } else if (attachedCount <= 2) {
        calculatedPct = 15 + Math.floor((attachedCount / 2) * 12);
      } else if (attachedCount <= 4) {
        calculatedPct = 28 + Math.floor(((attachedCount - 2) / 2) * 24);
      } else if (attachedCount <= 6) {
        calculatedPct = 54 + Math.floor(((attachedCount - 4) / 2) * 22);
      } else if (attachedCount < clientStars.length) {
        calculatedPct = 78 + Math.floor(((attachedCount - 6) / 2) * 18);
      } else {
        calculatedPct = 100;
      }

      calculatedPct = Math.min(100, Math.max(1, calculatedPct));
      setPercentage(calculatedPct);

      if (calculatedPct < 25) {
        setStatusText('GRAVITY CORE INITIALIZING');
      } else if (calculatedPct < 75) {
        setStatusText(`CONNECTING CLIENTS (${attachedCount}/${clientStars.length})`);
      } else if (calculatedPct < 100) {
        setStatusText('ORBITAL LOCK ACHIEVED');
      } else {
        setStatusText('SUPERNOVA TRIGGERED');
      }

      // Check for 100% Explosion Trigger
      if (elapsed >= EXPLOSION_TRIGGER_TIME && !hasExploded) {
        hasExploded = true;
        explosionTime = elapsed;

        // Spawn 80 radial explosion particles
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 6 + Math.random() * 22;
          explosionParticles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 1 + Math.random() * 2.8,
            alpha: 1,
            decay: 0.018 + Math.random() * 0.025,
          });
        }

        // Trigger smooth fade-out and reveal of actual website
        setTimeout(() => {
          setIsExiting(true);
        }, 320);

        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = '';
        }, 900);
      }

      // --- DRAW CURVED CONNECTION LINES (From client stars to central ball) ---
      if (!hasExploded) {
        clientStars.forEach((star) => {
          if (elapsed >= star.launchTime) {
            const t = Math.min((elapsed - star.launchTime) / star.flightDuration, 1);
            const lineAlpha = star.isAttached ? 0.45 : t * 0.25;

            // Draw curved organic connection bezier
            const midX = (star.currentX + cx) / 2;
            const midY = (star.currentY + cy) / 2;
            const perpAngle = star.targetAngle + Math.PI / 2;
            const curveOffset = Math.sin(star.targetAngle * 3) * 25;
            const ctrlX = midX + Math.cos(perpAngle) * curveOffset;
            const ctrlY = midY + Math.sin(perpAngle) * curveOffset;

            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = star.isAttached ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(star.currentX, star.currentY);
            ctx.quadraticCurveTo(ctrlX, ctrlY, cx, cy);
            ctx.stroke();
          }
        });
      }

      // --- DRAW CENTRAL WEBFLUX BALL (The Core) ---
      const coreBaseRadius = isMobile ? 26 : 36;
      let coreScale = 1;

      if (!hasExploded) {
        // Subtle breathing pulse
        coreScale = 1 + Math.sin(elapsed * 4) * 0.04;
      } else {
        // Expansion flash during supernova
        const dtExp = elapsed - explosionTime;
        coreScale = 1 + dtExp * 4;
      }

      const coreRadius = coreBaseRadius * coreScale;
      const coreAlpha = hasExploded ? Math.max(0, 1 - (elapsed - explosionTime) * 3) : 1;

      if (coreAlpha > 0) {
        // Outer glowing halo
        const gradHalo = ctx.createRadialGradient(cx, cy, coreRadius * 0.4, cx, cy, coreRadius * 2.5);
        gradHalo.addColorStop(0, `rgba(255, 255, 255, ${0.4 * coreAlpha})`);
        gradHalo.addColorStop(0.5, `rgba(255, 255, 255, ${0.12 * coreAlpha})`);
        gradHalo.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradHalo;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Solid luminous core
        const gradCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
        gradCore.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
        gradCore.addColorStop(0.7, `rgba(235, 240, 255, ${0.9 * coreAlpha})`);
        gradCore.addColorStop(1, `rgba(180, 195, 230, ${0.5 * coreAlpha})`);
        ctx.fillStyle = gradCore;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // Center Monogram 'W'
        if (!hasExploded) {
          ctx.fillStyle = '#000000';
          ctx.font = `900 ${isMobile ? '13px' : '17px'} Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('W', cx, cy);
        }
      }

      // --- DRAW CLIENT STARS & LABELS ---
      clientStars.forEach((star) => {
        if (elapsed >= star.launchTime) {
          const starAlpha = hasExploded
            ? Math.max(0, 1 - (elapsed - explosionTime) * 2.5)
            : 1;

          if (starAlpha > 0) {
            // Star body
            ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
            ctx.beginPath();
            ctx.arc(star.currentX, star.currentY, isMobile ? 3 : 4, 0, Math.PI * 2);
            ctx.fill();

            // Star specular halo
            ctx.fillStyle = `rgba(255, 255, 255, ${0.25 * starAlpha})`;
            ctx.beginPath();
            ctx.arc(star.currentX, star.currentY, isMobile ? 7 : 10, 0, Math.PI * 2);
            ctx.fill();

            // Client Business Pill Label
            if (star.isAttached && !hasExploded) {
              const labelX = star.currentX + (Math.cos(star.targetAngle) > 0 ? 10 : -10);
              const labelY = star.currentY + (Math.sin(star.targetAngle) > 0 ? 10 : -10);
              const align = Math.cos(star.targetAngle) > 0 ? 'left' : 'right';

              ctx.fillStyle = '#FFFFFF';
              ctx.font = `600 ${isMobile ? '9px' : '11px'} Inter, sans-serif`;
              ctx.textAlign = align;
              ctx.textBaseline = 'middle';
              ctx.fillText(star.name, labelX, labelY);
            }
          }
        }
      });

      // --- DRAW EXPLOSION PARTICLES & SHOCKWAVE ---
      if (hasExploded) {
        const dtExp = elapsed - explosionTime;

        // Expanding shockwave ring
        const shockRadius = dtExp * Math.max(width, height) * 0.9;
        const shockAlpha = Math.max(0, 1 - dtExp * 2.2);
        if (shockAlpha > 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shockAlpha * 0.75})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, shockRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Flying burst particles
        for (let i = 0; i < explosionParticles.length; i++) {
          const p = explosionParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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
      className={`fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-between select-none pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Gravity Loading Screen"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top Header Badge */}
      <div className="w-full pt-6 sm:pt-8 px-6 sm:px-10 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono text-xs font-bold">
            W
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400">
            WebFlux Design Studio
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Gravity Sync</span>
        </div>
      </div>

      {/* Center UI Overlay (Percentage & Concept Subtext) */}
      <div className="z-10 flex flex-col items-center justify-center text-center pointer-events-none mt-auto mb-16 sm:mb-20">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl sm:text-7xl md:text-8xl font-mono font-extrabold text-white tracking-tighter drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
            {percentage}
          </span>
          <span className="text-2xl sm:text-4xl font-mono font-bold text-zinc-500">
            %
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-zinc-400 font-medium">
            {statusText}
          </span>
        </div>

        <div className="mt-1 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-600">
          Client Stars In Orbit • Supernova Ready
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="w-full pb-6 sm:pb-8 px-6 sm:px-10 flex items-center justify-between z-10 pointer-events-none">
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-600">
          Lead Architect: Shreyansh Singhal
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-600">
          © {new Date().getFullYear()} WebFlux
        </span>
      </div>
    </div>
  );
}
