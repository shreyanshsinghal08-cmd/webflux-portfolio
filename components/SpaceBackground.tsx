'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  // Center anchor around which orbital math evolves
  centerX: number;
  centerY: number;
  // Mathematical 3D depth simulation [0.15, 1.0]
  z: number;
  radius: number;
  baseAlpha: number;
  // Angular and orbital dynamics
  orbitAngle: number;
  angularSpeed: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  tiltAngle: number;
  // Linear drift velocity vector
  driftVx: number;
  driftVy: number;
  // Time oscillation and twinkling
  phase: number;
  twinkleFreq: number;
  harmonicFreq: number;
  // Interactive cursor deflection spring offsets
  reactionX: number;
  reactionY: number;
}

interface ShootingStar {
  startX: number;
  startY: number;
  dirX: number;
  dirY: number;
  initialVelocity: number;
  acceleration: number;
  maxDistance: number;
  duration: number; // in frames
  currentFrame: number;
  active: boolean;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
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

    // 1. MATHEMATICAL STAR ENGINE INITIALIZATION
    // 240 visible, prominent stars operating with trigonometric orbital mechanics
    const STAR_COUNT = 240;
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      // Depth simulation z: 0.15 (deep, gentle) to 1.0 (foreground, brilliant, large)
      const z = Math.pow(Math.random(), 1.3) * 0.85 + 0.15;
      // Upgraded base radius: 1.5px to 3.5px as requested
      const radius = 1.5 + z * 2.0;
      // Elevated opacity for deep rich visibility
      const baseAlpha = 0.38 + z * 0.58;

      // Orbital parameters using sin/cos mechanics
      const orbitRadiusX = 25 + Math.random() * 80 * (1 - z * 0.4);
      const orbitRadiusY = 15 + Math.random() * 50 * (1 - z * 0.4);
      const tiltAngle = Math.random() * Math.PI; // Orbital plane orientation
      const angularSpeed = (0.0003 + Math.random() * 0.0008) * (Math.random() < 0.5 ? 1 : -1);

      // Linear drift vector
      const driftAngle = Math.random() * Math.PI * 2;
      const driftSpeed = 0.06 + 0.16 * z;
      const driftVx = Math.cos(driftAngle) * driftSpeed;
      const driftVy = Math.sin(driftAngle) * driftSpeed;

      stars.push({
        centerX: Math.random() * width,
        centerY: Math.random() * height,
        z,
        radius,
        baseAlpha,
        orbitAngle: Math.random() * Math.PI * 2,
        angularSpeed,
        orbitRadiusX,
        orbitRadiusY,
        tiltAngle,
        driftVx,
        driftVy,
        phase: Math.random() * Math.PI * 2,
        twinkleFreq: 0.015 + Math.random() * 0.035,
        harmonicFreq: 0.0008 + Math.random() * 0.0015,
        reactionX: 0,
        reactionY: 0,
      });
    }

    // 2. CURSOR INTERACTION TRACKING
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 3. SHOOTING STARS MATHEMATICAL ENGINE
    let shootingStar: ShootingStar | null = null;
    let frameCount = 0;
    // Periodic random interval between 200 and 360 frames (3.3s to 6.0s at 60fps)
    let nextShootingStarFrame = Math.floor(Math.random() * 160 + 200);

    const spawnShootingStar = () => {
      // Angle-based trajectory across sky
      const theta = Math.PI / 4 + (Math.random() - 0.5) * (Math.PI / 7); // ~32deg to 58deg
      const dirX = Math.random() < 0.25 ? -Math.cos(theta) : Math.cos(theta);
      const dirY = Math.sin(theta);

      const startX = dirX > 0 ? Math.random() * (width * 0.7) : Math.random() * (width * 0.7) + width * 0.3;
      const startY = Math.random() * (height * 0.35);

      const initialVelocity = 14 + Math.random() * 8; // Initial speed
      const acceleration = 0.22; // Kinematic acceleration
      const duration = Math.floor(32 + Math.random() * 18); // 32 to 50 frames
      const maxDistance = initialVelocity * duration + 0.5 * acceleration * duration * duration;

      shootingStar = {
        startX,
        startY,
        dirX,
        dirY,
        initialVelocity,
        acceleration,
        maxDistance,
        duration,
        currentFrame: 0,
        active: true,
      };
    };

    // 4. MAIN MATHEMATICAL RENDER LOOP (60fps)
    const MARGIN = 70; // Edge wrapping buffer
    const INFLUENCE_RADIUS = 160; // Cursor interaction distance

    const render = (time: number) => {
      frameCount++;

      // Deep void black clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // --- RENDER MATHEMATICAL STARS ---
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Linear velocity vector drift
        star.centerX += star.driftVx;
        star.centerY += star.driftVy;

        // Continuous seamless wrapping at screen boundaries
        if (star.centerX < -MARGIN) star.centerX = width + MARGIN;
        else if (star.centerX > width + MARGIN) star.centerX = -MARGIN;

        if (star.centerY < -MARGIN) star.centerY = height + MARGIN;
        else if (star.centerY > height + MARGIN) star.centerY = -MARGIN;

        // Orbital angular rotation
        star.orbitAngle += star.angularSpeed;

        // Harmonic time oscillation using sin/cos/tan
        const harmonic = Math.sin(time * star.harmonicFreq + star.phase);
        const ellipticalX = Math.cos(star.orbitAngle) * star.orbitRadiusX;
        const ellipticalY = Math.sin(star.orbitAngle) * star.orbitRadiusY;

        // Rotate ellipse by tiltAngle via 2D rotation matrix math
        const rotatedOrbitX = ellipticalX * Math.cos(star.tiltAngle) - ellipticalY * Math.sin(star.tiltAngle);
        const rotatedOrbitY = ellipticalX * Math.sin(star.tiltAngle) + ellipticalY * Math.cos(star.tiltAngle);

        // Compute current theoretical point on canvas
        const currentX = star.centerX + rotatedOrbitX + harmonic * 2;
        const currentY = star.centerY + rotatedOrbitY + harmonic * 1.5;

        // Cursor distance and interaction physics
        if (isMouseActive) {
          const dx = currentX - mouseX;
          const dy = currentY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            // Smooth cosine falloff force: 1 at cursor center, 0 at outer boundary
            const force = Math.cos((dist / INFLUENCE_RADIUS) * (Math.PI * 0.5));
            const nx = dx / dist;
            const ny = dy / dist;

            // Repulsion modulated by 3D depth and subtle orbital swirl
            const swirl = Math.sin(dist * 0.04) * force * 6;
            const targetReactionX = nx * force * (32 * star.z) - ny * swirl;
            const targetReactionY = ny * force * (32 * star.z) + nx * swirl;

            star.reactionX += (targetReactionX - star.reactionX) * 0.12;
            star.reactionY += (targetReactionY - star.reactionY) * 0.12;
          } else {
            star.reactionX *= 0.92;
            star.reactionY *= 0.92;
          }
        } else {
          star.reactionX *= 0.92;
          star.reactionY *= 0.92;
        }

        // Final rendered coordinates
        const renderX = currentX + star.reactionX;
        const renderY = currentY + star.reactionY;

        // Time-based organic twinkle using sinusoidal oscillation
        const twinkle = Math.sin(time * star.twinkleFreq + star.phase);
        const dynamicAlpha = Math.max(
          0.30,
          Math.min(1.0, star.baseAlpha * (0.75 + 0.25 * twinkle))
        );

        // Subtle glowing blur effect
        ctx.save();
        ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
        ctx.shadowBlur = Math.max(3, star.radius * 2.2);

        // Draw star core
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Subtle glowing atmospheric halo to make space feel deep and populated
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha * 0.18})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Extra brilliant glint on prominent foreground stars (z > 0.75)
        if (star.z > 0.75 && dynamicAlpha > 0.6) {
          ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha * 0.08})`;
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.radius * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- RENDER SHOOTING STAR ---
      if (!shootingStar && frameCount >= nextShootingStarFrame) {
        spawnShootingStar();
      }

      if (shootingStar && shootingStar.active) {
        shootingStar.currentFrame++;
        const t = shootingStar.currentFrame;
        const progress = t / shootingStar.duration;

        if (progress >= 1.0) {
          shootingStar.active = false;
          shootingStar = null;
          // Schedule next shooting star
          nextShootingStarFrame = frameCount + Math.floor(Math.random() * 160 + 200);
        } else {
          // Kinematic distance integration: d = v0*t + 0.5*a*t^2
          const currentDistance =
            shootingStar.initialVelocity * t + 0.5 * shootingStar.acceleration * t * t;

          const headX = shootingStar.startX + shootingStar.dirX * currentDistance;
          const headY = shootingStar.startY + shootingStar.dirY * currentDistance;

          // Sinusoidal opacity envelope: peaks smoothly in mid-flight, fades at ends
          const envelopeAlpha = Math.sin(progress * Math.PI);

          // Dynamic streak tail length
          const tailLength = 110 + 60 * Math.sin(progress * Math.PI);
          const tailX = headX - shootingStar.dirX * tailLength;
          const tailY = headY - shootingStar.dirY * tailLength;

          // Render shooting star gradient
          const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.75, `rgba(255, 255, 255, ${envelopeAlpha * 0.35})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${envelopeAlpha * 0.95})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.35;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          // Intense glowing head point
          ctx.fillStyle = `rgba(255, 255, 255, ${envelopeAlpha * 0.98})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
