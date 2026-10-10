'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  startX: number;
  startY: number;
  length: number;
  speed: number;
  dx: number;
  dy: number;
  currentFrame: number;
  duration: number;
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
      ctx.scale(dpr, dpr);
    };

    resize();

    // 1. Generate 175 micro-sized stars continuously drifting in random diagonal directions
    const STAR_COUNT = 175;
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      // Diagonal drift with gentle randomized components
      const dirX = Math.random() < 0.5 ? -1 : 1;
      const dirY = Math.random() < 0.5 ? -1 : 1;
      const speedX = Math.random() * 0.22 + 0.04;
      const speedY = Math.random() * 0.22 + 0.04;
      const baseAlpha = Math.random() * 0.6 + 0.25;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.75 + 0.45, // 0.45px to 1.2px micro-stars
        vx: dirX * speedX,
        vy: dirY * speedY,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Shooting Star state
    let shootingStar: ShootingStar | null = null;
    let frameCounter = 0;
    // Trigger every 2.5 to 5.5 seconds (at 60fps: 150-330 frames)
    let nextShootingStarFrame = Math.floor(Math.random() * 180 + 150);

    const spawnShootingStar = () => {
      // Diagonal trajectory across upper/mid portion of viewport
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35; // ~35deg - 55deg
      const dirX = Math.random() < 0.3 ? -1 : 1; // mostly left-to-right, occasionally right-to-left
      const speed = Math.random() * 7 + 13; // 13-20 px per frame
      const length = Math.random() * 70 + 90; // 90-160px tail
      const duration = Math.floor(Math.random() * 15 + 35); // 35-50 frames

      const startX = dirX === 1
        ? Math.random() * (width * 0.75)
        : Math.random() * (width * 0.75) + width * 0.25;
      const startY = Math.random() * (height * 0.45);

      const dx = Math.cos(angle) * speed * dirX;
      const dy = Math.sin(angle) * speed;

      shootingStar = {
        startX,
        startY,
        length,
        speed,
        dx,
        dy,
        currentFrame: 0,
        duration,
        active: true,
      };
    };

    // 3. 60fps Render Loop
    const render = () => {
      frameCounter++;
      ctx.clearRect(0, 0, width, height);

      // --- Draw Drifting Stars ---
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star diagonally
        star.x += star.vx;
        star.y += star.vy;

        // Wrap coordinates seamlessly when reaching viewport bounds
        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        else if (star.y > height) star.y = 0;

        // Subtle organic twinkling
        star.twinklePhase += star.twinkleSpeed;
        star.alpha = Math.max(
          0.12,
          Math.min(1, star.baseAlpha + Math.sin(star.twinklePhase) * 0.22)
        );

        // Render micro-star core
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on brighter micro-stars
        if (star.radius > 0.85 && star.alpha > 0.6) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Handle Shooting Star ---
      if (!shootingStar && frameCounter >= nextShootingStarFrame) {
        spawnShootingStar();
      }

      if (shootingStar && shootingStar.active) {
        shootingStar.currentFrame++;
        const progress = shootingStar.currentFrame / shootingStar.duration;

        if (progress >= 1) {
          shootingStar.active = false;
          shootingStar = null;
          // Schedule next shooting star in 2.5 to 5.5 seconds
          nextShootingStarFrame = frameCounter + Math.floor(Math.random() * 180 + 150);
        } else {
          // Smooth fade envelope: rapid fade in, smooth fade out
          let alpha = 1;
          if (progress < 0.2) {
            alpha = progress / 0.2;
          } else if (progress > 0.45) {
            alpha = 1 - (progress - 0.45) / 0.55;
          }
          alpha = Math.max(0, Math.min(1, alpha));

          const headX = shootingStar.startX + shootingStar.dx * shootingStar.currentFrame;
          const headY = shootingStar.startY + shootingStar.dy * shootingStar.currentFrame;

          // Growing tail as streak accelerates
          const currentTailLength = shootingStar.length * Math.min(1, shootingStar.currentFrame / 8);
          const dirLen = Math.hypot(shootingStar.dx, shootingStar.dy);
          const normX = shootingStar.dx / dirLen;
          const normY = shootingStar.dy / dirLen;

          const tailX = headX - normX * currentTailLength;
          const tailY = headY - normY * currentTailLength;

          // Render shooting star gradient tail
          const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.75, `rgba(255, 255, 255, ${alpha * 0.35})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.95})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          // Brilliant head point
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.98})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 1.25, 0, Math.PI * 2);
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
