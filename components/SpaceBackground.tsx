'use client';

import React, { useEffect, useRef, useState } from 'react';

export type AtmosphereMode = 'full' | 'calm' | 'off'; // 'full' = Fog + Light Beams, 'calm' = Fog only, 'off' = Black void

interface FogCluster {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadiusX: number;
  baseRadiusY: number;
  rotation: number;
  rotSpeed: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  depth: number; // 0: Deep, 1: Mid, 2: Near
}

interface LightBeam {
  id: number;
  sourceNormX: number; // Normalized source X position (0 to 1)
  baseAngle: number; // Nominal beam angle (radians from downward vertical)
  angleSwaySpeed: number;
  angleSwayAmp: number;
  widthTop: number;
  widthBottom: number;
  maxAlpha: number;
  sweepSpeed: number; // Normalized horizontal drift speed
  state: 'dormant' | 'entering' | 'active' | 'exiting';
  stateTimer: number;
  enterDuration: number;
  activeDuration: number;
  exitDuration: number;
  dormantDuration: number;
  currentAlpha: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentMode, setCurrentMode] = useState<AtmosphereMode>('full');

  useEffect(() => {
    // Expose global controller for optional mode toggling
    if (typeof window !== 'undefined') {
      (window as unknown as { __setAtmosphereMode?: (mode: AtmosphereMode) => void }).__setAtmosphereMode = (mode: AtmosphereMode) => {
        if (mode === 'full' || mode === 'calm' || mode === 'off') {
          setCurrentMode(mode);
        }
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Limit DPR on mobile to maintain buttery 60fps with zero fillrate penalty
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

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

    // =========================================================================
    // 1. DEPTH FOG SYSTEM (Cinematic Volumetric Strata)
    // =========================================================================
    // 6 carefully spaced volumetric mist clusters across 3 depth planes
    const FOG_COUNT = isMobile ? 4 : 6;
    const fogClusters: FogCluster[] = [];

    for (let i = 0; i < FOG_COUNT; i++) {
      const depth = i % 3; // 0 = Deep, 1 = Mid, 2 = Near
      // Deeper fog is larger and slower; near fog is subtler and slightly more dynamic
      const speedMult = depth === 0 ? 0.04 : depth === 1 ? 0.08 : 0.12;
      const baseAlpha = depth === 0 ? 0.04 : depth === 1 ? 0.055 : 0.035;

      const baseRadiusX = (width * 0.45 + (i % 3) * (width * 0.2)) * (isMobile ? 1.1 : 1.0);
      const baseRadiusY = baseRadiusX * (0.42 + Math.random() * 0.22); // Elliptical mist strata

      fogClusters.push({
        x: Math.random() * width,
        y: (height * 0.15) + (i / FOG_COUNT) * (height * 0.7) + (Math.random() - 0.5) * 120,
        vx: (0.05 + Math.random() * 0.08) * speedMult * (i % 2 === 0 ? 1 : -1),
        vy: (Math.random() - 0.5) * 0.03 * speedMult,
        baseRadiusX,
        baseRadiusY,
        rotation: (Math.random() - 0.5) * 0.2,
        rotSpeed: (Math.random() - 0.5) * 0.00012,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0004 + Math.random() * 0.0005,
        depth,
      });
    }

    // Interactive mouse parallax offset
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / width - 0.5) * 2;
      const ny = (e.clientY / height - 0.5) * 2;
      targetParallaxX = nx * 35;
      targetParallaxY = ny * 20;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // =========================================================================
    // 2. LIGHT BEAMS SYSTEM (Rare, Elegant Volumetric God Rays)
    // =========================================================================
    // 3 distinct atmospheric beam tracks that cycle softly
    const BEAM_COUNT = isMobile ? 2 : 3;
    const lightBeams: LightBeam[] = [];

    const INITIAL_SPECS = [
      { normX: 0.22, angle: 0.38, maxAlpha: 0.052, delay: 0.5 },
      { normX: 0.68, angle: -0.32, maxAlpha: 0.045, delay: 8.0 },
      { normX: 0.45, angle: 0.18, maxAlpha: 0.038, delay: 16.0 },
    ];

    for (let i = 0; i < BEAM_COUNT; i++) {
      const spec = INITIAL_SPECS[i];
      lightBeams.push({
        id: i,
        sourceNormX: spec.normX,
        baseAngle: spec.angle,
        angleSwaySpeed: 0.00025 + i * 0.00008,
        angleSwayAmp: 0.06,
        widthTop: width * (isMobile ? 0.06 : 0.04),
        widthBottom: width * (isMobile ? 0.38 : 0.32),
        maxAlpha: isMobile ? spec.maxAlpha * 0.8 : spec.maxAlpha,
        sweepSpeed: 0.00004 * (i % 2 === 0 ? 1 : -1),
        state: i === 0 ? 'entering' : 'dormant',
        stateTimer: i === 0 ? 0 : spec.delay,
        enterDuration: 5.0 + Math.random() * 2.0, // 5s - 7s gentle fade-in
        activeDuration: 10.0 + Math.random() * 6.0, // 10s - 16s majestic lingering
        exitDuration: 5.0 + Math.random() * 2.0, // 5s - 7s gentle fade-out
        dormantDuration: 8.0 + Math.random() * 12.0, // 8s - 20s quiet intermission
        currentAlpha: 0,
      });
    }

    // =========================================================================
    // 3. MAIN RENDER LOOP (60fps Cinematic Atmosphere)
    // =========================================================================
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Deep void black clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // If mode is 'off', remain pure solid black void
      if (currentMode === 'off') {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth parallax interpolation
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.04;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.04;

      // -----------------------------------------------------------------------
      // A. RENDER DEPTH FOG LAYERS
      // -----------------------------------------------------------------------
      for (let i = 0; i < fogClusters.length; i++) {
        const fog = fogClusters[i];

        // Drift motion
        fog.x += fog.vx;
        fog.y += fog.vy;
        fog.rotation += fog.rotSpeed;

        // Wrap boundaries seamlessly with buffer
        const bufferX = fog.baseRadiusX * 1.2;
        const bufferY = fog.baseRadiusY * 1.2;

        if (fog.x < -bufferX) fog.x = width + bufferX;
        else if (fog.x > width + bufferX) fog.x = -bufferX;

        if (fog.y < -bufferY) fog.y = height + bufferY;
        else if (fog.y > height + bufferY) fog.y = -bufferY;

        // Depth parallax offset
        const pWeight = (fog.depth + 1) * 0.45;
        const renderX = fog.x + currentParallaxX * pWeight;
        const renderY = fog.y + currentParallaxY * pWeight;

        // Organic breathing pulse
        const pulse = Math.sin(time * fog.pulseSpeed + fog.pulsePhase);
        const dynamicAlpha = fog.baseAlpha * (0.8 + 0.2 * pulse);
        const radX = fog.baseRadiusX * (0.95 + 0.05 * pulse);
        const radY = fog.baseRadiusY * (0.95 + 0.05 * pulse);

        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(fog.rotation);

        // Elliptical transform for atmospheric horizontal strata
        const scaleY = radY / radX;
        ctx.scale(1, scaleY);

        // Volumetric radial falloff
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radX);
        grad.addColorStop(0, `rgba(255, 255, 255, ${dynamicAlpha})`);
        grad.addColorStop(0.35, `rgba(240, 245, 255, ${dynamicAlpha * 0.65})`);
        grad.addColorStop(0.7, `rgba(220, 230, 245, ${dynamicAlpha * 0.22})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, radX, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // B. RENDER LIGHT BEAMS (GOD RAYS) — Enabled in 'full' mode
      // -----------------------------------------------------------------------
      if (currentMode === 'full') {
        for (let j = 0; j < lightBeams.length; j++) {
          const beam = lightBeams[j];

          // State Machine: dormant -> entering -> active -> exiting -> dormant
          beam.stateTimer += dt;

          if (beam.state === 'dormant') {
            beam.currentAlpha = 0;
            if (beam.stateTimer >= beam.dormantDuration) {
              beam.state = 'entering';
              beam.stateTimer = 0;
              // Slightly randomize new spawn parameters for natural variety
              beam.sourceNormX = Math.max(0.12, Math.min(0.88, beam.sourceNormX + (Math.random() - 0.5) * 0.2));
            }
          } else if (beam.state === 'entering') {
            const prog = Math.min(beam.stateTimer / beam.enterDuration, 1);
            // Smooth easeInOut sine
            beam.currentAlpha = beam.maxAlpha * (0.5 - 0.5 * Math.cos(prog * Math.PI));
            if (prog >= 1) {
              beam.state = 'active';
              beam.stateTimer = 0;
            }
          } else if (beam.state === 'active') {
            beam.currentAlpha = beam.maxAlpha;
            if (beam.stateTimer >= beam.activeDuration) {
              beam.state = 'exiting';
              beam.stateTimer = 0;
            }
          } else if (beam.state === 'exiting') {
            const prog = Math.min(beam.stateTimer / beam.exitDuration, 1);
            beam.currentAlpha = beam.maxAlpha * (0.5 + 0.5 * Math.cos(prog * Math.PI));
            if (prog >= 1) {
              beam.state = 'dormant';
              beam.stateTimer = 0;
              beam.dormantDuration = 8.0 + Math.random() * 12.0;
            }
          }

          if (beam.currentAlpha <= 0.001) continue;

          // Slow horizontal sweep drift
          beam.sourceNormX += beam.sweepSpeed;
          if (beam.sourceNormX < 0.05 || beam.sourceNormX > 0.95) {
            beam.sweepSpeed *= -1;
          }

          // Slow angle oscillation
          const angleSway = Math.sin(time * beam.angleSwaySpeed + beam.id * 2.1) * beam.angleSwayAmp;
          const currentAngle = beam.baseAngle + angleSway;

          // Compute beam geometry
          const originX = beam.sourceNormX * width + currentParallaxX * 0.15;
          const originY = -50; // Just above top viewport boundary
          const beamLength = height * 1.5;

          const dirX = Math.sin(currentAngle);
          const dirY = Math.cos(currentAngle);

          const endCenterX = originX + dirX * beamLength;
          const endCenterY = originY + dirY * beamLength;

          // Perpendicular unit vector for width extrusion
          const perpX = -dirY;
          const perpY = dirX;

          const halfTop = beam.widthTop * 0.5;
          const halfBottom = beam.widthBottom * 0.5;

          const p1x = originX - perpX * halfTop;
          const p1y = originY - perpY * halfTop;
          const p2x = originX + perpX * halfTop;
          const p2y = originY + perpY * halfTop;
          const p3x = endCenterX + perpX * halfBottom;
          const p3y = endCenterY + perpY * halfBottom;
          const p4x = endCenterX - perpX * halfBottom;
          const p4y = endCenterY - perpY * halfBottom;

          // Draw Outer Soft Volumetric Shaft
          ctx.save();
          const shaftGrad = ctx.createLinearGradient(originX, originY, endCenterX, endCenterY);
          shaftGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shaftGrad.addColorStop(0.18, `rgba(255, 255, 255, ${beam.currentAlpha * 0.95})`);
          shaftGrad.addColorStop(0.45, `rgba(240, 245, 255, ${beam.currentAlpha * 0.7})`);
          shaftGrad.addColorStop(0.8, `rgba(220, 230, 245, ${beam.currentAlpha * 0.2})`);
          shaftGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = shaftGrad;
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);
          ctx.lineTo(p3x, p3y);
          ctx.lineTo(p4x, p4y);
          ctx.closePath();
          ctx.fill();

          // Draw Inner Radiant Core (narrower, softer highlight along center shaft)
          const coreHalfTop = halfTop * 0.45;
          const coreHalfBottom = halfBottom * 0.45;

          const cp1x = originX - perpX * coreHalfTop;
          const cp1y = originY - perpY * coreHalfTop;
          const cp2x = originX + perpX * coreHalfTop;
          const cp2y = originY + perpY * coreHalfTop;
          const cp3x = endCenterX + perpX * coreHalfBottom;
          const cp3y = endCenterY + perpY * coreHalfBottom;
          const cp4x = endCenterX - perpX * coreHalfBottom;
          const cp4y = endCenterY - perpY * coreHalfBottom;

          const coreGrad = ctx.createLinearGradient(originX, originY, endCenterX, endCenterY);
          coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          coreGrad.addColorStop(0.22, `rgba(255, 255, 255, ${beam.currentAlpha * 0.6})`);
          coreGrad.addColorStop(0.65, `rgba(245, 250, 255, ${beam.currentAlpha * 0.25})`);
          coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.moveTo(cp1x, cp1y);
          ctx.lineTo(cp2x, cp2y);
          ctx.lineTo(cp3x, cp3y);
          ctx.lineTo(cp4x, cp4y);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#000000',
      }}
      aria-hidden="true"
    />
  );
}
