"use client";

import React, { useMemo, useState } from "react";
import { Play, Pause, RotateCcw, FastForward, Rewind, Info, Radio, Activity } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

// Define the shape of an asteroid
interface Asteroid {
  rx: number;
  ry: number;
  size: number;
  speed: number;
  opacity: number;
  br: string;
}

export function SpaceScene() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeSpeed, setTimeSpeed] = useState<number>(1.0);

  // Generate 60 asteroids with random dimensions & orbits
  const asteroids = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => {
      const rx = 100 + Math.random() * 45; // radius x
      const ry = 95 + Math.random() * 25; // radius y
      const size = Math.random() * 3.5 + 1.5; // size in px
      const speed = Math.random() * 15 + 12; // base orbit duration
      const opacity = Math.random() * 0.6 + 0.25;
      // random rocky border radius
      const br = `${Math.random() * 30 + 35}% ${Math.random() * 30 + 35}% ${Math.random() * 30 + 35}% ${Math.random() * 30 + 35}%`;
      return { rx, ry, size, speed, opacity, br };
    });
  }, []);

  // Generate solar wind particle directions
  const solarParticles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.15;
      const dist = 110 + Math.random() * 70;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const dur = Math.random() * 1.8 + 1.2;
      const delay = Math.random() * 2.5;
      return { dx, dy, dur, delay };
    });
  }, []);

  // Constellation stars configuration (Orion shape coordinates)
  const orionStars = [
    { x: 30, y: 15, name: "Betelgeuse" },
    { x: 90, y: 22, name: "Meissa" },
    { x: 120, y: 65, name: "Bellatrix" },
    { x: 82, y: 90, name: "Alnilam (Belt)" },
    { x: 55, y: 84, name: "Alnitak (Belt)" },
    { x: 68, y: 135, name: "Saiph" },
    { x: 130, y: 150, name: "Rigel" }
  ];
  const orionConnections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 5], [3, 6]
  ];

  const handleReset = () => {
    setTimeSpeed(1.0);
    setIsPlaying(true);
  };

  const adjustSpeed = (factor: number) => {
    setTimeSpeed((prev) => {
      const next = prev + factor;
      return Math.min(Math.max(Number(next.toFixed(1)), 0.1), 10.0);
    });
  };

  // Bind speed values directly to CSS properties
  const dynamicStyle = {
    "--time-scale": isPlaying ? timeSpeed : 0.00001,
    "--animation-play-state": isPlaying ? "running" : "paused",
  } as React.CSSProperties;

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 relative" id="simulator">
      {/* Inject self-contained keyframe styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter-clockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes comet-move {
          0% { transform: translate(650px, -50px) rotate(-30deg); opacity: 0; }
          4% { opacity: 1; }
          25% { opacity: 1; }
          35% { transform: translate(-100px, 450px) rotate(-30deg); opacity: 0; }
          100% { transform: translate(-100px, 450px) rotate(-30deg); opacity: 0; }
        }
        @keyframes particle-emit {
          0% { transform: translate(0, 0) scale(1); opacity: 0.9; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0.15); opacity: 0; }
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 0.35; transform: scale(0.98); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }
        
        .animate-spin-custom {
          animation: spin-clockwise calc(24s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-spin-custom-reverse {
          animation: spin-counter-clockwise calc(28s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-comet-path {
          animation: comet-move calc(14s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-solar-wind-particle {
          animation: particle-emit calc(var(--dur) / var(--time-scale, 1)) ease-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-orbit-time {
          animation: spin-clockwise calc(var(--dur) / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-pulse-time {
          animation: pulse-light calc(5s / var(--time-scale, 1)) ease-in-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
      `}} />

      <SectionTitle
        title="Mô Phỏng Vũ Trụ"
        subtitle="Hệ thống hiển thị thời gian thực các hiện tượng vật lý thiên văn vũ trụ."
      />

      {/* Viewport Frame */}
      <div
        style={dynamicStyle}
        className="relative w-full h-[580px] rounded-3xl border border-white/5 bg-[#020617] overflow-hidden shadow-2xl select-none"
      >
        {/* Star backdrop patterns */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-background to-background pointer-events-none" />

        {/* 1. Black Hole Component (Center-Left) */}
        <div className="absolute left-[25%] top-[40%] -translate-x-1/2 -translate-y-1/2 group/bh">
          {/* Gravitational bend accretion disk */}
          <div
            className="w-48 h-48 rounded-full animate-spin-custom relative flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.25)]"
            style={{
              background: "conic-gradient(from 0deg, #f97316 0%, #d97706 20%, #a855f7 40%, #ec4899 65%, #22d3ee 85%, #f97316 100%)",
              filter: "blur(1.5px)",
            }}
          >
            {/* Accretion inner detailing */}
            <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-spin-custom-reverse" />
            <div className="absolute inset-7 rounded-full border border-dotted border-white/5" />
          </div>

          {/* Event Horizon center void */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.4),0_0_25px_rgba(0,0,0,1)] flex items-center justify-center">
            {/* Distortion blur ring */}
            <div className="w-10 h-10 rounded-full bg-black/80 blur-xs" />
          </div>

          {/* HUD Label */}
          <div className="absolute top-[110%] left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-muted-dark font-display text-center whitespace-nowrap group-hover/bh:text-accent-pink transition-colors">
            Cygnus X-1 [Black Hole]
          </div>

          {/* 2. Asteroid Belt Component (Rotating around BlackHole) */}
          {asteroids.map((asteroid, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: `${asteroid.rx * 2}px`,
                height: `${asteroid.ry * 2}px`,
                transform: "translate(-50%, -50%) rotate(-15deg)",
              }}
            >
              <div
                className="absolute animate-orbit-time"
                style={{
                  width: `${asteroid.size}px`,
                  height: `${asteroid.size}px`,
                  left: "50%",
                  top: 0,
                  backgroundColor: "#6b7280",
                  borderRadius: asteroid.br,
                  opacity: asteroid.opacity,
                  "--dur": `${asteroid.speed}s`,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>

        {/* 3. SpaceStation Orbit Component (Center-Top) */}
        <div className="absolute left-[52%] top-[25%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Earth planet core */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-800 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center group cursor-pointer">
            {/* Atmospherics */}
            <div className="absolute -inset-1 rounded-full border border-blue-500/10 animate-pulse" />
            <div className="absolute inset-0.5 rounded-full border border-dashed border-white/20 animate-spin-custom-reverse" style={{ animationDuration: "35s" }} />
            
            {/* Tooltip on Earth */}
            <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 hidden group-hover:block bg-background/95 border border-white/5 px-2 py-1 rounded-md text-[9px] font-display uppercase tracking-widest text-muted pointer-events-none whitespace-nowrap shadow-lg">
              Terra [Hành Tinh Mẹ]
            </div>

            {/* Orbiting Space Station path overlay */}
            <div
              className="absolute rounded-full border border-dashed border-white/10 w-28 h-28 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-time"
              style={{ "--dur": "18s" } as React.CSSProperties}
            >
              {/* Space Station SVG structure */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center group/station cursor-pointer">
                {/* Antennas and main module */}
                <div className="w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-400 relative shadow-md">
                  <div className="absolute top-1/2 right-[100%] w-2 h-[1px] bg-slate-500 rotate-15" />
                  <div className="absolute top-1/2 left-[100%] w-2 h-[1px] bg-slate-500 -rotate-15" />
                </div>
                {/* Cyber solar wings */}
                <div className="w-5 h-2 bg-sky-500/80 border border-sky-400/60 rounded-sm ml-1 hover:bg-accent transition-colors" />
                <div className="w-5 h-2 bg-sky-500/80 border border-sky-400/60 rounded-sm mr-5 hover:bg-accent transition-colors" />

                {/* Status indicator tooltip */}
                <div className="absolute top-[125%] left-1/2 -translate-x-1/2 hidden group-hover/station:block bg-background/90 border border-accent/20 px-2 py-1 rounded text-[8px] font-display uppercase tracking-widest text-accent whitespace-nowrap shadow-xl pointer-events-none">
                  Orbital Station
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Comet shooting across background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-32 h-1.5 bg-gradient-to-r from-cyan-200 to-transparent rounded-full blur-[0.5px] animate-comet-path"
            style={{
              left: 0,
              top: 0,
            }}
          >
            {/* Burning core */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#22d3ee]" />
          </div>
        </div>

        {/* 5. Solar Wind emission (Left-Bottom) */}
        <div className="absolute left-[15%] top-[70%] -translate-x-1/2 -translate-y-1/2">
          {/* Glowing Sol Core */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 border border-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center group cursor-pointer">
            <div className="absolute -inset-2 rounded-full border border-orange-500/20 animate-ping opacity-30" style={{ animationDuration: "4s" }} />
            
            {/* Label */}
            <div className="absolute top-[115%] left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-muted-dark font-display text-center whitespace-nowrap group-hover:text-amber-400 transition-colors">
              Solar Engine
            </div>

            {/* Radiant Solar wind particles */}
            {solarParticles.map((p, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-orange-400/70 animate-solar-wind-particle pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                  "--dur": `${p.dur}s`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* 6. Constellation lines Map (Right-Bottom) */}
        <div className="absolute right-[8%] bottom-[12%]">
          <div className="w-44 h-48 group/constellation border border-white/5 rounded-2xl bg-white/2 backdrop-blur-xs p-3.5 hover:border-accent/30 transition-all duration-300 shadow-lg">
            <div className="absolute bottom-2 right-3 text-[8px] uppercase tracking-widest text-muted-dark font-display group-hover/constellation:text-accent transition-colors">
              Sector: Orion
            </div>
            
            <svg className="w-full h-full text-slate-500 group-hover/constellation:text-cyan-400 transition-colors duration-300">
              {/* Draw connected constellation strings */}
              {orionConnections.map(([from, to], i) => (
                <line
                  key={i}
                  x1={orionStars[from].x}
                  y1={orionStars[from].y}
                  x2={orionStars[to].x}
                  y2={orionStars[to].y}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeOpacity="0.2"
                  className="group-hover/constellation:stroke-cyan-500/40"
                />
              ))}

              {/* Stellar stars */}
              {orionStars.map((star, i) => (
                <g key={i} className="group/star cursor-pointer">
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r="2.5"
                    fill="#ffffff"
                    className="group-hover/constellation:shadow-[0_0_8px_#22d3ee] animate-pulse-time"
                  />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r="6"
                    fill="transparent"
                    className="hover:fill-cyan-400/20 transition-colors"
                  />
                  <title>{star.name}</title>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* 7. Wormhole / Portal (Right-Top) */}
        <div className="absolute right-[18%] top-[25%] -translate-x-1/2 -translate-y-1/2 group/wormhole cursor-pointer transition-transform duration-300 hover:scale-105">
          {/* Swirling wormhole */}
          <div
            className="w-32 h-32 rounded-full animate-spin-custom-reverse relative flex items-center justify-center border border-purple-500/20 shadow-[0_0_35px_rgba(168,85,247,0.35)]"
            style={{
              background: "conic-gradient(from 180deg, #a855f7 0%, #ec4899 35%, #22d3ee 70%, #a855f7 100%)",
              filter: "blur(0.5px)",
            }}
          >
            <div className="absolute inset-2.5 rounded-full border border-dashed border-white/20 animate-spin-custom" />
            <div className="absolute inset-5 rounded-full border border-dotted border-white/10" />

            {/* Core wormhole void tunnel */}
            <div className="absolute w-9 h-9 rounded-full bg-slate-950 border border-purple-400/40 shadow-[inset_0_0_15px_rgba(0,0,0,0.95)] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black shadow-[0_0_8px_#a855f7]" />
            </div>
          </div>

          <div className="absolute top-[110%] left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-muted-dark font-display text-center whitespace-nowrap group-hover/wormhole:text-purple-400 transition-colors">
            Singularity Warp
          </div>
        </div>

        {/* HUD system info readouts */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
          <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-background/50 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider font-display text-muted">
            <Activity className="h-3.5 w-3.5 text-accent animate-pulse" />
            SIMULATOR ENGINE ACTIVE
          </div>
        </div>

        {/* 8. Time Control Bar (Bottom HUD) */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="rounded-2xl border border-white/5 bg-background/50 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left readout status */}
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? "bg-emerald-500" : "bg-amber-500"}`} />
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted font-display">
                  TRẠNG THÁI MÔ PHỎNG
                </p>
                <p className="text-xs font-bold text-starlight-white font-body">
                  {isPlaying ? `Đang chạy tốc độ ${timeSpeed.toFixed(1)}x` : "Đã Tạm Dừng"}
                </p>
              </div>
            </div>

            {/* Slider control */}
            <div className="flex-1 max-w-xs flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted font-display">
                TỐC ĐỘ:
              </span>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={timeSpeed}
                onChange={(e) => setTimeSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <span className="font-display text-xs font-bold text-accent min-w-[32px] text-right">
                {timeSpeed.toFixed(1)}x
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => adjustSpeed(-0.2)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground hover:border-accent hover:text-accent transition-all cursor-pointer active:scale-95"
                title="Giảm tốc độ"
              >
                <Rewind className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex h-10 px-5 items-center gap-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                  isPlaying 
                    ? "bg-accent-pink/15 border border-accent-pink/30 text-accent-pink hover:bg-accent-pink/20" 
                    : "bg-accent/15 border border-accent/30 text-accent hover:bg-accent/20 shadow-[0_0_15px_rgba(0,212,255,0.25)]"
                }`}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlaying ? "Tạm Dừng" : "Bắt Đầu"}
              </button>

              <button
                onClick={() => adjustSpeed(0.2)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground hover:border-accent hover:text-accent transition-all cursor-pointer active:scale-95"
                title="Tăng tốc độ"
              >
                <FastForward className="h-4 w-4" />
              </button>

              <button
                onClick={handleReset}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted hover:border-accent hover:text-accent transition-all cursor-pointer active:scale-95 ml-1"
                title="Khởi tạo lại"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
