"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  direction: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  dx: number;
  dy: number;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleQueryChange);
    return () => mediaQuery.removeEventListener("change", handleQueryChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    const initStars = () => {
      stars = [];
      const density = Math.floor((width * height) / 8000); // Dynamic star density
      const numStars = Math.min(Math.max(density, 80), 200);

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.8 + 0.2,
          direction: Math.random() * Math.PI * 2,
        });
      }
    };

    initStars();

    const addShootingStar = () => {
      if (reducedMotion) return;
      if (shootingStars.length >= 2) return; // Cap simultaneous shooting stars

      // Random starting point on top or right edge
      const side = Math.random() > 0.5;
      const startX = side ? Math.random() * width : width;
      const startY = side ? 0 : Math.random() * height * 0.5;

      const angle = Math.PI * 0.75 + (Math.random() * 0.2 - 0.1); // Diagonal downward left
      const speed = Math.random() * 8 + 6;

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 80 + 40,
        speed,
        opacity: 1,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
      });
    };

    // Shooting star trigger interval
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        addShootingStar();
      }
    }, 6000);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting stars
      ctx.fillStyle = "#ffffff";
      for (const star of stars) {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (!reducedMotion) {
          // Slow drifting drift animation
          star.x += Math.cos(star.direction) * star.speed;
          star.y += Math.sin(star.direction) * star.speed;

          // Wrap stars around edge
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;

          // Twinkle effect
          star.opacity += Math.random() * 0.04 - 0.02;
          if (star.opacity < 0.2) star.opacity = 0.2;
          if (star.opacity > 1) star.opacity = 1;
        }
      }

      // 2. Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ctx.globalAlpha = ss.opacity;
        
        // Gradient tail for shooting star
        const grad = ctx.createLinearGradient(
          ss.x,
          ss.y,
          ss.x - ss.dx * (ss.length / ss.speed),
          ss.y - ss.dy * (ss.length / ss.speed)
        );
        grad.addColorStop(0, "rgba(0, 212, 255, 1)");
        grad.addColorStop(0.3, "rgba(124, 58, 237, 0.6)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - ss.dx * (ss.length / ss.speed),
          ss.y - ss.dy * (ss.length / ss.speed)
        );
        ctx.stroke();

        if (!reducedMotion) {
          ss.x += ss.dx;
          ss.y += ss.dy;
          ss.opacity -= 0.015; // Slow fade out

          // Remove if faded or out of bounds
          if (
            ss.opacity <= 0 ||
            ss.x < -100 ||
            ss.x > width + 100 ||
            ss.y > height + 100
          ) {
            shootingStars.splice(i, 1);
          }
        }
      }

      ctx.globalAlpha = 1; // Reset opacity
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* HTML Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* Nebula Clouds */}
      <div 
        className="absolute -top-[20%] -left-[10%] h-[60vw] w-[60vw] rounded-full opacity-20 blur-[120px] mix-blend-screen bg-aurora-gradient animate-pulse-slow" 
        style={{ animationDuration: "16s" }}
      />
      <div 
        className="absolute top-[40%] -right-[10%] h-[50vw] w-[50vw] rounded-full opacity-[0.15] blur-[150px] mix-blend-screen bg-[radial-gradient(circle,#7c3aed_0%,#ec4899_100%)] animate-pulse-slow" 
        style={{ animationDuration: "24s", animationDelay: "-4s" }}
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] h-[45vw] w-[45vw] rounded-full opacity-[0.12] blur-[130px] mix-blend-screen bg-[radial-gradient(circle,#00d4ff_0%,#030712_100%)] animate-pulse-slow" 
        style={{ animationDuration: "20s", animationDelay: "-8s" }}
      />

      {/* Ambient Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
    </div>
  );
}
