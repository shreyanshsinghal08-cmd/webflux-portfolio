'use client';

import React, { useEffect, useRef, useState } from 'react';

export type AtmosphereMode = 'full' | 'calm' | 'off'; // 'full' = Fog + Light Beams, 'calm' = Fog only, 'off' = Black void

type BeamOrigin = 'top' | 'left' | 'right' | 'corner-left' | 'corner-right';

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
  depth: number;
}

interface MultiDirBeam {
  id: number;
  originType: BeamOrigin;
  normPos: number; // 0 to 1 along edge
  angle: number; // Direction vector angle in radians
  angleSwaySpeed: number;
  angleSwayAmp: number;
  widthOrigin: number;
  widthEnd: number;
  length: number;
  maxAlpha: number;
  sweepSpeed: number;
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
    // 1. MOBILE-ENHANCED DEPTH FOG (Cinematic Volumetric Strata)
    // =========================================================================
    const FOG_COUNT = isMobile ? 5 : 6;
    const fogClusters: FogCluster[] = [];

    for (let i = 0; i < FOG_COUNT; i++) {
      const depth = i % 3;
      const speedMult = depth === 0 ? 0.04 : depth === 1 ? 0.08 : 0.12;

      // Elevated alpha on mobile (0.09 - 0.13) so fog is clearly noticeable on phone screens
      const baseAlpha = isMobile
        ? (depth === 0 ? 0.09 : depth === 1 ? 0.125 : 0.085)
        : (depth === 0 ? 0.045 : depth === 1 ? 0.06 : 0.038);

      const baseRadiusX = (width * (isMobile ? 0.65 : 0.45) + (i % 3) * (width * 0.25));
      const baseRadiusY = baseRadiusX * (isMobile ? 0.55 : 0.44);

      fogClusters.push({
        x: Math.random() * width,
        y: (height * 0.1) + (i / FOG_COUNT) * (height * 0.8) + (Math.random() - 0.5) * 100,
        vx: (0.06 + Math.random() * 0.08) * speedMult * (i % 2 === 0 ? 1 : -1),
        vy: (Math.random() - 0.5) * 0.04 * speedMult,
        baseRadiusX,
        baseRadiusY,
        rotation: (Math.random() - 0.5) * 0.25,
        rotSpeed: (Math.random() - 0.5) * 0.00015,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0005 + Math.random() * 0.0005,
        depth,
      });
    }

    // Parallax
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
    // 2. MULTI-DIRECTIONAL LIGHT BEAMS (TOP, LEFT, RIGHT, DIAGONAL)
    // =========================================================================
    const BEAM_COUNT = isMobile ? 3 : 4;
    const lightBeams: MultiDirBeam[] = [];

    // Helper to configure beam geometry based on origin
    const setupBeamGeometry = (b: MultiDirBeam, origin: BeamOrigin) => {
      b.originType = origin;
      if (origin === 'top') {
        b.normPos = Math.random() * 0.7 + 0.15;
        // Angles pointing downward (roughly 60° to 120°)
        b.angle = Math.PI * 0.5 + (Math.random() - 0.5) * 0.65;
        b.length = height * 1.5;
      } else if (origin === 'left') {
        b.normPos = Math.random() * 0.55 + 0.1;
        // Angles pointing diagonally towards bottom-right (20° to 50°)
        b.angle = 0.45 + (Math.random() - 0.5) * 0.35;
        b.length = Math.max(width, height) * 1.4;
      } else if (origin === 'right') {
        b.normPos = Math.random() * 0.55 + 0.1;
        // Angles pointing diagonally towards bottom-left (130° to 160°)
        b.angle = Math.PI - 0.45 - (Math.random() - 0.5) * 0.35;
        b.length = Math.max(width, height) * 1.4;
      } else if (origin === 'corner-left') {
        b.normPos = 0;
        b.angle = 0.72 + (Math.random() - 0.5) * 0.2; // ~41° diagonal sweep
        b.length = Math.max(width, height) * 1.6;
      } else {
        // corner-right
        b.normPos = 1;
        b.angle = Math.PI - 0.72 - (Math.random() - 0.5) * 0.2;
        b.length = Math.max(width, height) * 1.6;
      }

      // Thicker and brighter on mobile for punchy visibility
      b.widthOrigin = width * (isMobile ? 0.10 + Math.random() * 0.05 : 0.045 + Math.random() * 0.025);
      b.widthEnd = width * (isMobile ? 0.55 + Math.random() * 0.25 : 0.32 + Math.random() * 0.12);
      b.maxAlpha = isMobile ? (0.11 + Math.random() * 0.04) : (0.05 + Math.random() * 0.025);
    };

    const ORIGIN_SEQUENCE: BeamOrigin[] = ['top', 'left', 'right', 'corner-left'];

    for (let i = 0; i < BEAM_COUNT; i++) {
      const b: MultiDirBeam = {
        id: i,
        originType: ORIGIN_SEQUENCE[i % ORIGIN_SEQUENCE.length],
        normPos: 0.3,
        angle: Math.PI * 0.5,
        angleSwaySpeed: 0.00025 + i * 0.0001,
        angleSwayAmp: 0.07,
        widthOrigin: 40,
        widthEnd: 300,
        length: height * 1.5,
        maxAlpha: 0.06,
        sweepSpeed: 0.00005 * (i % 2 === 0 ? 1 : -1),
        state: i === 0 ? 'entering' : 'dormant',
        stateTimer: i === 0 ? 0 : (i * 6.0),
        enterDuration: 4.5 + Math.random() * 2.0,
        activeDuration: 9.0 + Math.random() * 5.0,
        exitDuration: 4.5 + Math.random() * 2.0,
        dormantDuration: 7.0 + Math.random() * 9.0,
        currentAlpha: 0,
      };

      setupBeamGeometry(b, b.originType);
      lightBeams.push(b);
    }

    // =========================================================================
    // 3. MAIN CINEMATIC RENDER LOOP
    // =========================================================================
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      if (currentMode === 'off') {
        animId = requestAnimationFrame(render);
        return;
      }

      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.04;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.04;

      // --- A. RENDER DEPTH FOG CLUSTERS ---
      for (let i = 0; i < fogClusters.length; i++) {
        const fog = fogClusters[i];

        fog.x += fog.vx;
        fog.y += fog.vy;
        fog.rotation += fog.rotSpeed;

        const bufferX = fog.baseRadiusX * 1.2;
        const bufferY = fog.baseRadiusY * 1.2;

        if (fog.x < -bufferX) fog.x = width + bufferX;
        else if (fog.x > width + bufferX) fog.x = -bufferX;

        if (fog.y < -bufferY) fog.y = height + bufferY;
        else if (fog.y > height + bufferY) fog.y = -bufferY;

        const pWeight = (fog.depth + 1) * 0.45;
        const renderX = fog.x + currentParallaxX * pWeight;
        const renderY = fog.y + currentParallaxY * pWeight;

        const pulse = Math.sin(time * fog.pulseSpeed + fog.pulsePhase);
        const dynamicAlpha = fog.baseAlpha * (0.85 + 0.15 * pulse);
        const radX = fog.baseRadiusX * (0.95 + 0.05 * pulse);
        const radY = fog.baseRadiusY * (0.95 + 0.05 * pulse);

        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(fog.rotation);
        ctx.scale(1, radY / radX);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radX);
        grad.addColorStop(0, `rgba(255, 255, 255, ${dynamicAlpha})`);
        grad.addColorStop(0.35, `rgba(240, 245, 255, ${dynamicAlpha * 0.72})`);
        grad.addColorStop(0.7, `rgba(220, 230, 245, ${dynamicAlpha * 0.28})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, radX, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // --- B. RENDER MULTI-DIRECTIONAL LIGHT BEAMS ---
      if (currentMode === 'full') {
        for (let j = 0; j < lightBeams.length; j++) {
          const beam = lightBeams[j];
          beam.stateTimer += dt;

          if (beam.state === 'dormant') {
            beam.currentAlpha = 0;
            if (beam.stateTimer >= beam.dormantDuration) {
              beam.state = 'entering';
              beam.stateTimer = 0;
              // Randomize next origin edge: top, left, right, or corners!
              const allEdges: BeamOrigin[] = ['top', 'left', 'right', 'corner-left', 'corner-right'];
              const nextEdge = allEdges[Math.floor(Math.random() * allEdges.length)];
              setupBeamGeometry(beam, nextEdge);
            }
          } else if (beam.state === 'entering') {
            const prog = Math.min(beam.stateTimer / beam.enterDuration, 1);
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
              beam.dormantDuration = 6.0 + Math.random() * 10.0;
            }
          }

          if (beam.currentAlpha <= 0.001) continue;

          // Drift along edge
          beam.normPos += beam.sweepSpeed;
          if (beam.normPos < 0.08 || beam.normPos > 0.92) {
            beam.sweepSpeed *= -1;
          }

          const angleSway = Math.sin(time * beam.angleSwaySpeed + beam.id * 2.2) * beam.angleSwayAmp;
          const currentAngle = beam.angle + angleSway;

          // Determine origin point based on originType
          let originX = 0;
          let originY = 0;

          if (beam.originType === 'top') {
            originX = beam.normPos * width + currentParallaxX * 0.15;
            originY = -50;
          } else if (beam.originType === 'left') {
            originX = -50;
            originY = beam.normPos * height + currentParallaxY * 0.15;
          } else if (beam.originType === 'right') {
            originX = width + 50;
            originY = beam.normPos * height + currentParallaxY * 0.15;
          } else if (beam.originType === 'corner-left') {
            originX = -40;
            originY = -40;
          } else {
            // corner-right
            originX = width + 40;
            originY = -40;
          }

          const dirX = Math.cos(currentAngle);
          const dirY = Math.sin(currentAngle);

          const endCenterX = originX + dirX * beam.length;
          const endCenterY = originY + dirY * beam.length;

          // Perpendicular unit vector
          const perpX = -dirY;
          const perpY = dirX;

          const halfTop = beam.widthOrigin * 0.5;
          const halfBottom = beam.widthEnd * 0.5;

          const p1x = originX - perpX * halfTop;
          const p1y = originY - perpY * halfTop;
          const p2x = originX + perpX * halfTop;
          const p2y = originY + perpY * halfTop;
          const p3x = endCenterX + perpX * halfBottom;
          const p3y = endCenterY + perpY * halfBottom;
          const p4x = endCenterX - perpX * halfBottom;
          const p4y = endCenterY - perpY * halfBottom;

          // Outer Soft Volumetric Shaft
          ctx.save();
          const shaftGrad = ctx.createLinearGradient(originX, originY, endCenterX, endCenterY);
          shaftGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shaftGrad.addColorStop(0.18, `rgba(255, 255, 255, ${beam.currentAlpha * 0.98})`);
          shaftGrad.addColorStop(0.45, `rgba(240, 245, 255, ${beam.currentAlpha * 0.72})`);
          shaftGrad.addColorStop(0.78, `rgba(220, 230, 245, ${beam.currentAlpha * 0.25})`);
          shaftGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = shaftGrad;
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);
          ctx.lineTo(p3x, p3y);
          ctx.lineTo(p4x, p4y);
          ctx.closePath();
          ctx.fill();

          // Inner Radiant Core Ribbon (Adds crisp ethereal depth without hard edges)
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
          coreGrad.addColorStop(0.2, `rgba(255, 255, 255, ${beam.currentAlpha * 0.65})`);
          coreGrad.addColorStop(0.65, `rgba(245, 250, 255, ${beam.currentAlpha * 0.28})`);
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
