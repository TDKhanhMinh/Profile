"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eye, EyeOff, FastForward, Pause, Play, Rewind, RotateCcw, ShieldAlert } from "lucide-react";
import React, { useMemo, useState } from "react";

// Types
interface Planet {
  id: string;
  name: string;
  type: string;
  status: "Fortified" | "Under Siege" | "Warp Distortion";
  threatLevel: "Low" | "Medium" | "High" | "Extreme" | "Exterminatus Risk";
  population: string;
  orbitText: string;
  x: number; // percentage
  y: number;
  color: string;
  size: number;
}

interface Fleet {
  id: string;
  name: string;
  ships: number;
  status: "Patrolling" | "Engaged" | "Orbital Blockade";
  x: number;
  y: number;
  color: string;
}

interface RelicMarker {
  id: string;
  label: string;
  type: "Archeotech Signal" | "Lost Beacon" | "Forbidden Archive";
  x: number;
  y: number;
}

export function SpaceScene() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeSpeed, setTimeSpeed] = useState<number>(1.0);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("voss");
  const [showTacticalOverlays, setShowTacticalOverlays] = useState<boolean>(true);

  // Sector Data Lists
  const planets: Planet[] = useMemo(() => [
    {
      id: "terra",
      name: "Terra Prime",
      type: "Hive World",
      status: "Fortified",
      threatLevel: "Medium",
      population: "120 Billion",
      orbitText: "Orbital Fortress Active",
      x: 52,
      y: 26,
      color: "from-blue-600 to-indigo-900 border-blue-400/40",
      size: 58
    },
    {
      id: "voss",
      name: "Voss-IX",
      type: "Forge World",
      status: "Under Siege",
      threatLevel: "Extreme",
      population: "18 Billion Tech-Priests",
      orbitText: "Battlefleet Engaged in Siege",
      x: 26,
      y: 50,
      color: "from-red-700 to-amber-950 border-red-500/40",
      size: 50
    },
    {
      id: "nocturne",
      name: "Nocturne Gate",
      type: "Dead World",
      status: "Warp Distortion",
      threatLevel: "Exterminatus Risk",
      population: "0 (Automated Beacons)",
      orbitText: "Signal Distortion High",
      x: 76,
      y: 65,
      color: "from-purple-800 to-slate-900 border-purple-500/40",
      size: 44
    }
  ], []);

  const fleets: Fleet[] = useMemo(() => [
    {
      id: "fleet-alpha",
      name: "Ashen Battlefleet",
      ships: 8,
      status: "Orbital Blockade",
      x: 18,
      y: 42,
      color: "text-amber-500 border-amber-500/30"
    },
    {
      id: "fleet-beta",
      name: "Crimson Spear Group",
      ships: 4,
      status: "Engaged",
      x: 36,
      y: 56,
      color: "text-red-500 border-red-500/30"
    },
    {
      id: "fleet-gamma",
      name: "Vanguard Patrol",
      ships: 3,
      status: "Patrolling",
      x: 58,
      y: 16,
      color: "text-cyan-500 border-cyan-500/30"
    }
  ], []);

  const relics: RelicMarker[] = useMemo(() => [
    {
      id: "relic-01",
      label: "Ancient Relic Beacon",
      type: "Archeotech Signal",
      x: 82,
      y: 20
    },
    {
      id: "relic-02",
      label: "Sector Archive Vault",
      type: "Forbidden Archive",
      x: 12,
      y: 78
    },
    {
      id: "relic-03",
      label: "Lost Patrol Beacon",
      type: "Lost Beacon",
      x: 45,
      y: 84
    }
  ], []);

  // Generate Asteroids dynamically
  const asteroids = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const rx = 100 + Math.random() * 50;
      const ry = 60 + Math.random() * 30;
      const size = Math.random() * 4 + 2;
      const speed = Math.random() * 18 + 14;
      const opacity = Math.random() * 0.5 + 0.3;
      const rotation = Math.random() * 360;
      const isMetalScrap = Math.random() > 0.82; // 18% space wreckage
      const br = isMetalScrap ? "2px" : `${Math.random() * 25 + 35}% ${Math.random() * 25 + 35}%`;
      return { rx, ry, size, speed, opacity, rotation, br, isMetalScrap };
    });
  }, []);

  // Generate Solar winds emitted from core Sol
  const solarWinds = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.2;
      const dist = 90 + Math.random() * 60;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const dur = Math.random() * 2.2 + 1.4;
      const delay = Math.random() * 3;
      return { dx, dy, dur, delay };
    });
  }, []);

  // Constellation Draco coordinate configuration
  const constellationStars = [
    { x: 20, y: 15, name: "Thuban" },
    { x: 50, y: 25, name: "Eltanin" },
    { x: 90, y: 35, name: "Rastaban" },
    { x: 120, y: 75, name: "Altais" },
    { x: 70, y: 110, name: "Aldibain" },
    { x: 30, y: 130, name: "Edasich" }
  ];
  const constellationConnections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
  ];

  const selectedPlanet = useMemo(() => {
    return planets.find((p) => p.id === selectedPlanetId) || planets[0];
  }, [planets, selectedPlanetId]);

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

  const getTimeFlowLabel = () => {
    if (!isPlaying) return "PAUSED";
    if (timeSpeed === 1.0) return "REAL-TIME";
    if (timeSpeed < 5.0) return "ACCELERATED";
    return "WARP SPEED";
  };

  // Inline CSS variables
  const dynamicStyle = {
    "--time-scale": isPlaying ? timeSpeed : 0.00001,
    "--animation-play-state": isPlaying ? "running" : "paused",
  } as React.CSSProperties;

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 relative" id="simulator">
      {/* Self-contained CSS declarations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter-clockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes warp-cloud {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.6; filter: blur(14px); }
          50% { transform: scale(1.15) translate(8px, -12px); opacity: 0.95; filter: blur(20px); }
        }
        @keyframes comet-diagonal {
          0% { transform: translate(750px, -50px) rotate(-35deg); opacity: 0; }
          3% { opacity: 0.95; }
          22% { opacity: 0.95; }
          30% { transform: translate(-100px, 450px) rotate(-35deg); opacity: 0; }
          100% { transform: translate(-100px, 450px) rotate(-35deg); opacity: 0; }
        }
        @keyframes wind-emit {
          0% { transform: translate(0, 0) scale(1.2); opacity: 0.9; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0.1); opacity: 0; }
        }
        @keyframes pulse-gothic {
          0%, 100% { opacity: 0.35; border-color: rgba(153, 27, 27, 0.4); }
          50% { opacity: 0.95; border-color: rgba(250, 204, 21, 0.95); }
        }
        @keyframes laser-sweep {
          0%, 100% { opacity: 0.15; stroke-width: 0.6px; }
          50% { opacity: 0.75; stroke-width: 1.4px; }
        }
        @keyframes signal-ping {
          0% { transform: scale(0.7); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes scanline-shift {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .animate-spin-custom {
          animation: spin-clockwise calc(26s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-spin-custom-reverse {
          animation: spin-counter-clockwise calc(32s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-warp-drift {
          animation: warp-cloud calc(16s / var(--time-scale, 1)) ease-in-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-comet-grim {
          animation: comet-diagonal calc(15s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-solar-emit {
          animation: wind-emit calc(var(--dur) / var(--time-scale, 1)) ease-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-pulse-gothic-ring {
          animation: pulse-gothic calc(4.5s / var(--time-scale, 1)) ease-in-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-orbit-time {
          animation: spin-clockwise calc(var(--dur) / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-laser {
          animation: laser-sweep 2.5s ease-in-out infinite;
        }
      `}} />

      <SectionTitle
        title="Bản Đồ Chiến Dịch Thiên Hà"
        subtitle="Mô phỏng hạm đội, vùng bão Warp và phong tỏa quỹ đạo trong vũ trụ Grimdark."
      />

      {/* Main Campaign Layout Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-12" style={dynamicStyle}>

        {/* VIEWPORT PANEL CONTAINER (Left 8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Top Campaign Status Banner */}
          <div className="flex items-center justify-between border-2 border-b-0 border-amber-900/40 bg-slate-950/80 px-5 py-3.5 rounded-t-2xl relative overflow-hidden">
            {/* Scanline layer effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-display text-[10px] font-black uppercase tracking-widest text-red-500">
                TACTICAL SECTOR SCANNER: ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTacticalOverlays(!showTacticalOverlays)}
                className="flex items-center gap-1.5 rounded-md border border-amber-900/30 bg-amber-950/20 hover:bg-amber-950/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider font-display text-amber-500 transition-all cursor-pointer active:scale-95"
              >
                {showTacticalOverlays ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                {showTacticalOverlays ? "Ẩn Tactical" : "Hiện Tactical"}
              </button>
              <div className="rounded-md border border-red-950 bg-red-950/30 px-2 py-0.5 text-[8px] font-bold text-red-500 uppercase tracking-widest font-display">
                WAR ZONE
              </div>
            </div>
          </div>

          {/* Tactical Space Map Frame */}
          <div className="relative w-full h-[540px] border-2 border-amber-900/40 bg-[#020204] overflow-hidden rounded-b-2xl shadow-2xl">
            {/* Space Grid scan lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,rgba(180,83,9,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* 1. Black Hole Component with ACCRETION DISK and WARNING BORDER (Left Center) */}
            <div className="absolute left-[24%] top-[38%] -translate-x-1/2 -translate-y-1/2 group/bh">

              {/* Accretion Disk (conic gradients in crimson/warp purple/burnt gold) */}
              <div
                className="w-40 h-40 rounded-full animate-spin-custom relative flex items-center justify-center shadow-[0_0_40px_rgba(153,27,27,0.3)]"
                style={{
                  background: "conic-gradient(from 45deg, #991b1b 0%, #450a0a 20%, #7e22ce 40%, #ec4899 65%, #facc15 85%, #991b1b 100%)",
                  filter: "blur(1.5px)",
                }}
              >
                <div className="absolute inset-3 rounded-full border border-dashed border-red-500/25 animate-spin-custom-reverse" />
              </div>

              {/* Event Horizon Lõi Đen */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black border border-red-950/60 shadow-[inset_0_0_15px_rgba(255,255,255,0.2),0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-black blur-xs" />
              </div>

              {/* Warning Stripes Ring Overlay */}
              {showTacticalOverlays && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[190px] rounded-full border border-dashed border-red-700/35 pointer-events-none animate-spin-custom-reverse" style={{ animationDuration: "40s" }}>
                  {/* Warning ticker text wrapper */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(153,27,27,0.15),rgba(153,27,27,0.15)_6px,transparent_6px,transparent_12px)] rounded-full" />
                </div>
              )}

              {/* Tactical Label */}
              <div className="absolute top-[110%] left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest text-red-500/80 font-display text-center whitespace-nowrap group-hover/bh:text-red-400 transition-colors">
                ⚠️ GRAVITATIONAL ANOMALY: CYGNUS
              </div>

              {/* 2. Asteroid Belt Component with resource marker and wreckage (Around Black Hole) */}
              {asteroids.map((asteroid, i) => (
                <div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${asteroid.rx * 2}px`,
                    height: `${asteroid.ry * 2}px`,
                    transform: `translate(-50%, -50%) rotate(${asteroid.rotation}deg)`,
                  }}
                >
                  <div
                    className="absolute animate-orbit-time"
                    style={{
                      width: `${asteroid.size}px`,
                      height: asteroid.isMetalScrap ? `${asteroid.size * 2.2}px` : `${asteroid.size}px`,
                      left: "50%",
                      top: 0,
                      backgroundColor: asteroid.isMetalScrap ? "#94a3b8" : "#4b5563",
                      border: asteroid.isMetalScrap ? "1px solid #b45309" : "none",
                      borderRadius: asteroid.br,
                      opacity: asteroid.opacity,
                      "--dur": `${asteroid.speed}s`,
                    } as React.CSSProperties}
                    title={asteroid.isMetalScrap ? "Cathedral Spaceship Wreckage" : "Iron Asteroid"}
                  />
                  {/* Resource Marker Blinking Lights */}
                  {showTacticalOverlays && i % 12 === 0 && (
                    <div
                      className="absolute animate-orbit-time"
                      style={{
                        left: "50%",
                        top: -4,
                        "--dur": `${asteroid.speed}s`,
                      } as React.CSSProperties}
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping opacity-75" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 3. SpaceStationOrbit (Orbital Fortress Online, around Earth) */}
            <div className="absolute left-[54%] top-[30%] -translate-x-1/2 -translate-y-1/2">
              <div
                className={`relative rounded-full bg-gradient-to-br ${planets[0].color} flex items-center justify-center cursor-pointer transition-all duration-300 border ${selectedPlanetId === "terra" ? "scale-105 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "opacity-80"
                  }`}
                style={{ width: planets[0].size, height: planets[0].size }}
                onClick={() => setSelectedPlanetId("terra")}
              >
                {/* Visual planet sphere features */}
                <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 animate-spin-custom-reverse" style={{ animationDuration: "45s" }} />

                {/* Orbital Fortress (cathedral spire design) path */}
                <div
                  className="absolute rounded-full border border-dashed border-amber-900/35 w-[105px] h-[105px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-time"
                  style={{ "--dur": "22s" } as React.CSSProperties}
                >
                  {/* Spired Gothic Orbital Fortress */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center group/fortress cursor-pointer">
                    <div className="relative flex flex-col items-center">
                      {/* Spire peak */}
                      <div className="w-0.5 h-2.5 bg-amber-500" />
                      {/* Main Cathedral module */}
                      <div className="w-4 h-4 bg-zinc-800 border border-amber-500/40 relative rounded-sm shadow-md">
                        {/* Windows SVG lines */}
                        <div className="absolute inset-x-1 top-0.5 bottom-1 border-x border-amber-500/20" />
                        {/* Glow engine ports */}
                        <div className="absolute -bottom-1 left-1.5 w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                      </div>
                      {/* Wings */}
                      <div className="absolute top-3 w-8 h-[2px] bg-amber-600/60" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute top-[135%] left-1/2 -translate-x-1/2 hidden group-hover/fortress:block bg-slate-950 border border-amber-500/30 px-2 py-0.5 rounded text-[8px] font-display uppercase tracking-widest text-amber-500 whitespace-nowrap shadow-xl">
                      Orbital Fortress: Online
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Warp Gate (Wormhole, Nocturne) */}
            <div className="absolute left-[78%] top-[62%] -translate-x-1/2 -translate-y-1/2">
              <div
                className={`relative rounded-full bg-gradient-to-br ${planets[2].color} flex items-center justify-center cursor-pointer transition-all duration-300 border ${selectedPlanetId === "nocturne" ? "scale-105 shadow-[0_0_20px_rgba(126,34,206,0.3)]" : "opacity-80"
                  }`}
                style={{ width: planets[2].size, height: planets[2].size }}
                onClick={() => setSelectedPlanetId("nocturne")}
              >
                {/* Warp Gate path */}
                <div
                  className="absolute rounded-full border border-dashed border-purple-500/20 w-[95px] h-[95px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-time"
                  style={{ "--dur": "15s" } as React.CSSProperties}
                >
                  {/* Swirling Warp Gate portal */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group/warpgate cursor-pointer">
                    <div
                      className="w-9 h-9 rounded-full animate-spin-custom-reverse relative flex items-center justify-center border border-purple-500/30 shadow-[0_0_20px_rgba(126,34,206,0.5)]"
                      style={{
                        background: "conic-gradient(from 180deg, #7e22ce 0%, #ec4899 40%, #22d3ee 80%, #7e22ce 100%)",
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-black border border-purple-400/40" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-[135%] left-1/2 -translate-x-1/2 hidden group-hover/warpgate:block bg-slate-950 border border-purple-500/30 px-2 py-0.5 rounded text-[8px] font-display uppercase tracking-widest text-red-500 whitespace-nowrap shadow-xl">
                      WARP GATE: Unsafe Route
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Warp Storm Zone (Energy cloud swirl around Nocturne Warp Gate) */}
            <div className="absolute left-[78%] top-[62%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div
                className="w-48 h-48 rounded-full animate-warp-drift"
                style={{
                  background: "radial-gradient(circle, rgba(126,34,206,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
                }}
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-widest text-purple-400 font-display">
                WARP INSTABILITY DETECTED
              </div>
            </div>

            {/* 6. Voss-IX Planet with Orbital Siege and Lasers (Center-Bottom) */}
            <div className="absolute left-[30%] top-[68%] -translate-x-1/2 -translate-y-1/2">
              <div
                className={`relative rounded-full bg-gradient-to-br ${planets[1].color} flex items-center justify-center cursor-pointer transition-all duration-300 border ${selectedPlanetId === "voss" ? "scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "opacity-80"
                  }`}
                style={{ width: planets[1].size, height: planets[1].size }}
                onClick={() => setSelectedPlanetId("voss")}
              >
                {/* Atmosphere ring */}
                <div className="absolute -inset-1 rounded-full border border-red-500/10 animate-pulse" />

                {/* Laser Siege Lines targeting Voss */}
                {showTacticalOverlays && (
                  <svg className="absolute -inset-24 w-64 h-64 pointer-events-none overflow-visible">
                    {/* Laser strike from fleet location */}
                    <line
                      x1="0"
                      y1="0"
                      x2="128"
                      y2="128"
                      stroke="#ef4444"
                      strokeDasharray="4 4"
                      className="animate-laser opacity-40"
                    />
                    <line
                      x1="220"
                      y1="40"
                      x2="128"
                      y2="128"
                      stroke="#f59e0b"
                      strokeWidth="1.2"
                      className="animate-laser opacity-50"
                    />

                    {/* Blockade rings visual */}
                    <circle
                      cx="128"
                      cy="128"
                      r="40"
                      fill="none"
                      stroke="#991b1b"
                      strokeWidth="0.8"
                      strokeDasharray="6 8"
                      className="animate-spin-custom"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* 7. Gothic Space Fleets patrolling and besieging planets */}
            {fleets.map((fleet) => (
              <div
                key={fleet.id}
                style={{
                  left: `${fleet.x}%`,
                  top: `${fleet.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute flex flex-col items-center group/fleet cursor-pointer"
              >
                {/* SVG Gothic Ship design representation */}
                <div className={`relative flex items-center gap-1 p-1 rounded border border-transparent ${fleet.color} bg-black/60`}>
                  {/* Lead Cruiser */}
                  <svg className="w-7 h-4 text-slate-400 group-hover/fleet:text-amber-500 transition-colors" viewBox="0 0 40 20" fill="currentColor">
                    {/* Gothic spired arrow shape ship outline */}
                    <path d="M 0 10 L 10 5 L 12 0 L 14 5 L 26 5 L 30 2 L 32 5 L 38 10 L 32 15 L 30 18 L 26 15 L 14 15 L 12 20 L 10 15 Z" />
                    {/* Plasma Engine glow */}
                    <circle cx="3" cy="10" r="2.5" fill="#22d3ee" className="animate-pulse" />
                  </svg>
                  {/* Small escorts */}
                  <div className="flex flex-col gap-0.5">
                    <div className="w-2 h-1 bg-zinc-600 rounded-sm" />
                    <div className="w-2 h-1 bg-zinc-600 rounded-sm" />
                  </div>
                </div>

                {/* Subtitle tag */}
                <span className="mt-1.5 text-[7px] font-bold uppercase tracking-wider text-slate-500 font-display group-hover/fleet:text-amber-400">
                  {fleet.name} ({fleet.ships} SC)
                </span>

                {/* Tooltip */}
                <div className="absolute top-[110%] left-1/2 -translate-x-1/2 hidden group-hover/fleet:block bg-slate-950 border border-red-500/30 p-1.5 rounded shadow-xl text-center z-30 pointer-events-none">
                  <p className="text-[8px] font-display uppercase tracking-widest text-red-500 font-bold">
                    Imperial Battlefleet Detected
                  </p>
                  <p className="text-[7px] font-body text-slate-400 mt-0.5">
                    Task: {fleet.status}
                  </p>
                </div>
              </div>
            ))}

            {/* 8. Relic Tech Beacons pulsing beacons in space */}
            {relics.map((relic) => (
              <div
                key={relic.id}
                style={{
                  left: `${relic.x}%`,
                  top: `${relic.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute flex items-center justify-center cursor-pointer group/relic z-20"
              >
                {/* Ping rings */}
                <div className="absolute w-4 h-4 bg-amber-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />

                {/* Tech icon glyph */}
                <div className="w-3.5 h-3.5 rounded border border-amber-500/50 bg-black/80 flex items-center justify-center text-[7px] font-bold text-amber-500 hover:border-amber-400 hover:text-amber-400 transition-colors shadow">
                  ▲
                </div>

                {/* Relic descriptor on hover */}
                <div className="absolute bottom-[125%] left-1/2 -translate-x-1/2 hidden group-hover/relic:block bg-slate-950 border border-amber-500/30 px-2 py-0.5 rounded text-[8px] font-display uppercase tracking-widest text-amber-500 whitespace-nowrap shadow-xl">
                  📜 {relic.type}: {relic.label}
                </div>
              </div>
            ))}

            {/* 9. Constellation Map Grid overlays (Draco or similar stars) */}
            <div className="absolute right-[4%] top-[8%] pointer-events-none">
              <div className="w-44 h-44 border border-white/5 rounded-xl bg-slate-950/20 p-2.5">
                <svg className="w-full h-full text-slate-700">
                  {constellationConnections.map(([from, to], i) => (
                    <line
                      key={i}
                      x1={constellationStars[from].x}
                      y1={constellationStars[from].y}
                      x2={constellationStars[to].x}
                      y2={constellationStars[to].y}
                      stroke="currentColor"
                      strokeWidth="0.6"
                      strokeOpacity="0.15"
                    />
                  ))}
                  {constellationStars.map((star, i) => (
                    <circle
                      key={i}
                      cx={star.x}
                      cy={star.y}
                      r="1.8"
                      fill="#e5e7eb"
                      className="opacity-40 animate-pulse"
                    />
                  ))}
                </svg>
                <div className="absolute bottom-1 right-2 text-[6px] tracking-widest uppercase text-slate-600 font-display">
                  Grid: Draco Sector
                </div>
              </div>
            </div>

            {/* 10. Solar Wind emission Core (Sol solar core model, Center Bottom) */}
            <div className="absolute left-[48%] top-[80%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-800 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center justify-center group cursor-pointer">
                {/* Wind particles emitting from Solar star */}
                {solarWinds.map((p, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-amber-400/80 animate-solar-emit pointer-events-none"
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

            {/* 11. Comet Icy sweep diagonals */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full blur-[0.5px] animate-comet-grim" />
            </div>

          </div>
        </div>

        {/* IMPERIAL COMMAND PANEL (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col h-[601px]">
          <div className="flex-1 rounded-2xl border-2 border-amber-900/40 bg-slate-950/80 backdrop-blur-xl p-5 flex flex-col relative overflow-hidden">
            {/* Scanline layer effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            <h3 className="font-display text-xs font-black uppercase tracking-widest text-amber-500 pb-3 border-b border-amber-900/30">
              ⚔️ IMPERIAL COMMAND CENTER
            </h3>

            {/* Overall Sector parameters status */}
            <div className="mt-4 space-y-3 font-display text-[9px] uppercase tracking-widest">
              <div className="flex justify-between items-center text-slate-400">
                <span>SECTOR RANGE:</span>
                <span className="text-starlight-white font-bold">OBSIDIAN REACH</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>FLEET STRENGTH:</span>
                <span className="text-amber-500 font-bold">78% [STANDBY]</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>WARP STABILITY:</span>
                <span className="text-red-500 font-bold animate-pulse">42% [UNSTABLE]</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>ACTIVE THREATS:</span>
                <span className="text-red-600 font-bold">04 SECTOR NODES</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>PLANETARY REGULATION:</span>
                <span className="text-red-500 font-bold">CONTESTED WARZONE</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-amber-900/20" />

            {/* Campaign Planet Selector lists */}
            <h4 className="font-display text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2.5">
              TELEMETRY SELECTOR:
            </h4>
            <div className="space-y-2">
              {planets.map((p) => {
                const isSelected = selectedPlanetId === p.id;
                let badgeColor = "border-cyan-500/20 text-cyan-400 bg-cyan-950/20";
                if (p.status === "Under Siege") badgeColor = "border-red-500/20 text-red-400 bg-red-950/20";
                if (p.status === "Warp Distortion") badgeColor = "border-purple-500/20 text-purple-400 bg-purple-950/20";

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlanetId(p.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${isSelected
                      ? "border-amber-500 bg-amber-950/15 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                      : "border-white/5 bg-slate-900/20 hover:border-amber-900/40"
                      }`}
                  >
                    <div>
                      <h5 className="font-display text-[10px] font-bold text-starlight-white uppercase tracking-wider">
                        {p.name}
                      </h5>
                      <p className="text-[7px] text-slate-500 font-body uppercase tracking-wider mt-0.5">
                        {p.type}
                      </p>
                    </div>

                    <span className={`border px-2 py-0.5 rounded text-[7px] font-display font-bold uppercase tracking-wider ${badgeColor}`}>
                      {p.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Planet Status readout */}
            <div className="flex-1 mt-4 flex flex-col justify-end">
              <div className="rounded-xl border border-red-900/30 bg-red-950/5 p-4 relative overflow-hidden">
                {/* Distressed background warning lights */}
                {selectedPlanet.threatLevel === "Exterminatus Risk" && (
                  <div className="absolute inset-0 bg-red-950/10 pointer-events-none animate-pulse" />
                )}

                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-4 w-4 text-red-500 animate-pulse" />
                  <span className="font-display text-[9px] font-black uppercase tracking-widest text-red-500">
                    ANOMALY REPORT FOR {selectedPlanet.name}
                  </span>
                </div>

                <div className="space-y-2 font-display text-[8px] tracking-wider text-slate-400">
                  <p>
                    <strong className="text-slate-200">POPULATION STATUS:</strong> {selectedPlanet.population}
                  </p>
                  <p>
                    <strong className="text-slate-200">ORBITAL MATRIX:</strong> {selectedPlanet.orbitText}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <strong className="text-slate-200">SECTOR RISK:</strong>
                    <span className="text-red-500 font-bold animate-pulse">
                      [{selectedPlanet.threatLevel}]
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 12. Time Control Bar Component (Bottom HUD command board) */}
      <div className="mt-6">
        <div className="rounded-2xl border-2 border-amber-900/40 bg-slate-950/90 px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative overflow-hidden">
          {/* Scanline layer effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

          {/* Left readout state */}
          <div className="flex items-center gap-3 relative z-10">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? "bg-red-500" : "bg-amber-500"}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? "bg-red-600" : "bg-amber-600"}`} />
            </span>
            <div>
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-display">
                TIME FLOW CONTROL
              </p>
              <p className="text-[10px] font-bold text-starlight-white font-display uppercase tracking-widest">
                {getTimeFlowLabel()} ({timeSpeed.toFixed(1)}x)
              </p>
            </div>
          </div>

          {/* Speed status warnings */}
          {timeSpeed >= 5.0 && isPlaying && (
            <div className="flex items-center gap-1.5 rounded border border-red-500/25 bg-red-950/20 px-3 py-1 text-[8px] font-bold uppercase tracking-widest font-display text-red-500 animate-pulse relative z-10">
              ⚠️ Temporal Stress Rising
            </div>
          )}

          {/* Range Speed Slider */}
          <div className="flex-1 max-w-xs flex items-center gap-3 relative z-10">
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.1"
              value={timeSpeed}
              onChange={(e) => setTimeSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-amber-950/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
              aria-label="Simulation speed scale slider"
            />
          </div>

          {/* Control Triggers */}
          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => adjustSpeed(-0.2)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/30 bg-slate-900 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer active:scale-95"
              aria-label="Decrease time scale speed"
              title="Giảm tốc độ"
            >
              <Rewind className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex h-10 px-5 items-center gap-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${isPlaying
                ? "bg-red-950/25 border border-red-500/30 text-red-500 hover:bg-red-950/40"
                : "bg-amber-500/15 border border-amber-500/30 text-amber-500 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(250,204,21,0.2)]"
                }`}
              aria-label={isPlaying ? "Pause simulation speed" : "Play simulation speed"}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {isPlaying ? "Tạm Dừng" : "Bắt Đầu"}
            </button>

            <button
              onClick={() => adjustSpeed(0.2)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/30 bg-slate-900 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer active:scale-95"
              aria-label="Increase time scale speed"
              title="Tăng tốc độ"
            >
              <FastForward className="h-4 w-4" />
            </button>

            <button
              onClick={handleReset}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/30 bg-slate-900 text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer active:scale-95 ml-1"
              aria-label="Reset speed status to normal"
              title="Khởi tạo lại"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
