"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  Commander,
  Order,
  commanders as mockCommanders,
  fleets as mockFleets,
  planets as mockPlanets,
  relics as mockRelics,
  strategicOrders as mockStrategicOrders
} from "@/data/campaignData";
import { FastForward, HelpCircle, Pause, Play, Rewind, RotateCcw, Search, ShieldAlert } from "lucide-react";
import React, { useMemo, useState } from "react";

// Reusable CommanderPortrait Component
type CommanderPortraitProps = {
  src?: string;
  alt: string;
  name: string;
  allegiance: string;
  status?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

export function CommanderPortrait({
  src,
  alt,
  name,
  allegiance,
  status,
  size = "md",
  priority = false
}: CommanderPortraitProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const isFallen = status && (status.toLowerCase().includes("fallen") || status.toLowerCase().includes("memorial"));

  // size mapping
  let sizeClasses = "w-10 h-10";
  if (size === "sm") sizeClasses = "w-8 h-8 rounded-full border-2";
  else if (size === "md") sizeClasses = "w-11 h-11 rounded-lg border";
  else if (size === "lg") sizeClasses = "w-24 h-32 rounded-lg border-2 aspect-[3/4]";

  // border colors & glows based on allegiance
  let borderClass = "border-slate-800/80";
  if (allegiance === "Imperium") {
    borderClass = "border-yellow-600/60 shadow-[0_0_8px_rgba(250,204,21,0.25)]";
  } else if (allegiance === "Chaos" || allegiance === "Traitor") {
    borderClass = "border-red-600/60 shadow-[0_0_8px_rgba(239,68,68,0.25)]";
  } else if (allegiance === "Unknown") {
    borderClass = "border-cyan-500/60 shadow-[0_0_8px_rgba(34,211,238,0.25)]";
  }

  const initials = getInitials(name);
  const filterClass = isFallen ? "grayscale contrast-[0.85] opacity-60" : "";

  // animation trigger for large views
  const animationClass = (allegiance === "Chaos" || allegiance === "Traitor") && size === "lg"
    ? "animate-[chaosPortraitFlicker_3s_infinite]"
    : (allegiance === "Imperium" && size === "lg" ? "animate-[imperialPortraitGlow_4s_infinite]" : "");

  return (
    <div className={`relative overflow-hidden bg-black/90 flex items-center justify-center shrink-0 ${sizeClasses} ${borderClass} ${filterClass} ${animationClass}`}>
      {/* Scanline overlay */}
      {(size === "md" || size === "lg") && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 z-10" />
      )}

      {imageError || !src ? (
        <div className="flex items-center justify-center w-full h-full text-center">
          <span className={`font-display font-black tracking-wider ${size === "sm" ? "text-[9px]" : size === "md" ? "text-xs" : "text-xl"
            } ${allegiance === "Chaos" || allegiance === "Traitor" ? "text-red-500" :
              allegiance === "Imperium" ? "text-yellow-500" : "text-cyan-400"
            }`}>
            {initials}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover relative z-0"
        />
      )}

      {/* Memorial Overlay label */}
      {isFallen && (size === "lg" || size === "md") && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-950/80 border-t border-red-900/40 py-0.5 text-center z-10 pointer-events-none">
          <span className="text-[6px] font-display font-black text-red-400 tracking-widest block uppercase">
            MEMORIAM
          </span>
        </div>
      )}
    </div>
  );
}

export function SpaceScene() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeSpeed, setTimeSpeed] = useState<number>(1.0);

  // Selection states
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("voss");
  const [selectedCommanderId, setSelectedCommanderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [highlightTarget, setHighlightTarget] = useState<string>("Voss-IX");
  const [rosterAllegianceFilter, setRosterAllegianceFilter] = useState<string>("All");
  const [rosterSearch, setRosterSearch] = useState<string>("");
  const [showTactical, setShowTactical] = useState<boolean>(true);

  // Campaign Mock Data References
  const commanders = mockCommanders;
  const planets = mockPlanets;
  const strategicOrders = mockStrategicOrders;
  const fleets = mockFleets;
  const relics = mockRelics;

  // Asteroid Belt elements
  const beltAsteroids = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => {
      const rx = 85 + Math.random() * 45;
      const ry = 55 + Math.random() * 20;
      const size = Math.random() * 3.5 + 1.5;
      const speed = Math.random() * 16 + 12;
      const opacity = Math.random() * 0.45 + 0.25;
      const rotation = Math.random() * 360;
      const isMetalScrap = Math.random() > 0.85; // debris
      const br = isMetalScrap ? "1px" : `${Math.random() * 20 + 40}% ${Math.random() * 20 + 40}%`;
      return { rx, ry, size, speed, opacity, rotation, br, isMetalScrap };
    });
  }, []);

  // Solar winds
  const solarWinds = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.15;
      const dist = 80 + Math.random() * 50;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const dur = Math.random() * 2.0 + 1.2;
      const delay = Math.random() * 2.5;
      return { dx, dy, dur, delay };
    });
  }, []);

  // Filtering commanders
  const filteredCommanders = useMemo(() => {
    return commanders.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
        c.legion.toLowerCase().includes(rosterSearch.toLowerCase()) ||
        c.title.toLowerCase().includes(rosterSearch.toLowerCase());
      if (rosterAllegianceFilter === "All") return matchesSearch;
      return c.allegiance === rosterAllegianceFilter && matchesSearch;
    });
  }, [commanders, rosterAllegianceFilter, rosterSearch]);

  const selectedCommander = useMemo(() => {
    if (!selectedCommanderId) return null;
    return commanders.find((c) => c.id === selectedCommanderId) || null;
  }, [commanders, selectedCommanderId]);

  const selectedOrder = useMemo(() => {
    if (!selectedOrderId) return null;
    return strategicOrders.find((o) => o.id === selectedOrderId) || null;
  }, [strategicOrders, selectedOrderId]);

  // Click on order handler
  const handleOrderSelect = (order: Order) => {
    setSelectedOrderId(order.id);
    setHighlightTarget(order.target);
    const linkedPlanet = planets.find((p) => p.name === order.target);
    if (linkedPlanet) {
      setSelectedPlanetId(linkedPlanet.id);
    }
  };

  const handleCommanderSelect = (c: Commander) => {
    setSelectedCommanderId(c.id);
    setHighlightTarget(c.sector);
    const linkedPlanet = planets.find((p) => p.name === c.sector || c.sector.includes(p.name));
    if (linkedPlanet) {
      setSelectedPlanetId(linkedPlanet.id);
    }
  };

  const activeCommandersCount = useMemo(() => {
    return commanders.filter((c) => c.allegiance === "Imperium" && c.status.includes("Active")).length;
  }, [commanders]);

  const chaosThreatsCount = useMemo(() => {
    return commanders.filter((c) => c.allegiance === "Chaos").length;
  }, [commanders]);

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

  // Setup speed styling
  const dynamicStyle = {
    "--time-scale": isPlaying ? timeSpeed : 0.00001,
    "--animation-play-state": isPlaying ? "running" : "paused",
  } as React.CSSProperties;

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 relative" id="simulator">
      {/* Dynamic CSS animations block */}
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
        @keyframes warp-storm-anim {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.5; filter: blur(16px); }
          50% { transform: scale(1.2) translate(10px, -15px); opacity: 0.9; filter: blur(24px); }
        }
        @keyframes comet-diagonal {
          0% { transform: translate(750px, -50px) rotate(-35deg); opacity: 0; }
          4% { opacity: 1; }
          20% { opacity: 1; }
          28% { transform: translate(-100px, 450px) rotate(-35deg); opacity: 0; }
          100% { transform: translate(-100px, 450px) rotate(-35deg); opacity: 0; }
        }
        @keyframes solar-emission {
          0% { transform: translate(0, 0) scale(1.1); opacity: 0.9; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0.1); opacity: 0; }
        }
        @keyframes psychic-beacon-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.35; box-shadow: 0 0 15px rgba(250, 204, 21, 0.2); }
          50% { transform: scale(1.1); opacity: 0.85; box-shadow: 0 0 35px rgba(250, 204, 21, 0.7); }
        }
        @keyframes laser-sweep {
          0%, 100% { opacity: 0.1; stroke-width: 0.5px; }
          50% { opacity: 0.8; stroke-width: 1.5px; }
        }
        @keyframes relic-pulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes glitch-shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 2px); }
        }
        @keyframes chaosPortraitFlicker {
          0%, 100% {
            opacity: 1;
            filter: contrast(1.05) saturate(1.1);
          }
          45% {
            opacity: 0.92;
            filter: contrast(1.25) saturate(1.4) hue-rotate(8deg);
          }
          48% {
            opacity: 0.75;
            filter: contrast(1.5) saturate(1.8) hue-rotate(-12deg);
          }
          52% {
            opacity: 1;
            filter: contrast(1.1) saturate(1.2);
          }
        }
        @keyframes imperialPortraitGlow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(250, 204, 21, 0.25);
          }
          50% {
            box-shadow: 0 0 16px rgba(34, 211, 238, 0.28);
          }
        }
        
        .animate-spin-custom {
          animation: spin-clockwise calc(28s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-spin-custom-reverse {
          animation: spin-counter-clockwise calc(34s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-warp-storm {
          animation: warp-storm-anim calc(15s / var(--time-scale, 1)) ease-in-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-comet-grim {
          animation: comet-diagonal calc(14s / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-solar-wind {
          animation: solar-emission calc(var(--dur) / var(--time-scale, 1)) ease-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-psychic-halo {
          animation: psychic-beacon-pulse calc(6s / var(--time-scale, 1)) ease-in-out infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-orbit-time {
          animation: spin-clockwise calc(var(--dur) / var(--time-scale, 1)) linear infinite;
          animation-play-state: var(--animation-play-state, running);
        }
        .animate-laser {
          animation: laser-sweep 2s ease-in-out infinite;
        }
        .animate-relic-glow {
          animation: relic-pulse 3s infinite;
        }
        .glitch-active {
          animation: glitch-shake 0.3s infinite;
        }
      `}} />

      <SectionTitle
        title="Bản Đồ Chỉ Huy Chiến Dịch"
        subtitle="Hệ thống giám sát Thiên hà của Đế chế loài người - Imperium of Man"
      />

      {/* Warhammer 40K Grimdark Cogitator Layout Grid */}
      <div className="grid gap-6 lg:grid-cols-12" style={dynamicStyle}>

        {/* ==================================================
            LEFT COLUMN (Roster & Hierarchy, span 3)
            ================================================== */}
        <div className="lg:col-span-3 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
          {/* CommanderRoster Search / Filters */}
          <div className="rounded-xl border border-amber-900/30 bg-slate-950/90 p-4 shadow-lg flex flex-col gap-3 relative">
            <h4 className="font-display text-[9px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <span>Commander Roster</span>
            </h4>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Primarchs/Legions..."
                value={rosterSearch}
                onChange={(e) => setRosterSearch(e.target.value)}
                className="w-full bg-slate-900 border border-amber-900/20 rounded-md py-1.5 pl-8 pr-3 text-[10px] font-body text-slate-300 focus:outline-none focus:border-amber-500 transition-colors"
                aria-label="Search commanders list"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-amber-700/60" />
            </div>

            {/* Allegiance Tabs */}
            <div className="grid grid-cols-4 gap-1 border-t border-amber-900/10 pt-2.5">
              {["All", "Imperium", "Chaos", "Unknown"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRosterAllegianceFilter(tab)}
                  className={`py-1 rounded text-[8px] font-display font-bold uppercase tracking-wider border transition-all cursor-pointer ${rosterAllegianceFilter === tab
                    ? "border-amber-500 bg-amber-950/20 text-amber-400"
                    : "border-white/5 bg-slate-900/40 text-slate-500 hover:text-slate-300"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Roster Cards List */}
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1.5">
              {filteredCommanders.map((c) => {
                const isSelected = selectedCommanderId === c.id;
                let activeGlow = "border-white/5 bg-slate-900/20";
                if (isSelected) {
                  if (c.allegiance === "Chaos") activeGlow = "border-purple-600 bg-purple-950/15 shadow-[0_0_8px_rgba(126,34,206,0.25)]";
                  else if (c.allegiance === "Imperium") activeGlow = "border-amber-500 bg-amber-950/15 shadow-[0_0_8px_rgba(245,158,11,0.25)]";
                  else activeGlow = "border-cyan-500 bg-cyan-950/15 shadow-[0_0_8px_rgba(34,211,238,0.25)]";
                }

                return (
                  <div
                    key={c.id}
                    onClick={() => handleCommanderSelect(c)}
                    onMouseEnter={() => setHighlightTarget(c.sector)}
                    className={`p-2 rounded border cursor-pointer hover:border-amber-900/50 transition-all flex items-center gap-2.5 ${activeGlow}`}
                  >
                    <CommanderPortrait
                      src={c.portrait}
                      alt={c.portraitAlt}
                      name={c.name}
                      allegiance={c.allegiance}
                      status={c.status}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display text-[9px] font-bold text-slate-200 uppercase tracking-wide truncate">
                        {c.name}
                      </h5>
                      <p className="text-[7px] text-slate-500 font-body uppercase mt-0.5">
                        {c.legion}
                      </p>
                    </div>

                    <span className={`text-[7px] font-display font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border shrink-0 ${c.allegiance === "Chaos" ? "border-red-900/40 text-red-400 bg-red-950/10" :
                      c.allegiance === "Imperium" ? "border-amber-900/40 text-amber-500 bg-amber-950/10" :
                        "border-cyan-900/40 text-cyan-400 bg-cyan-950/10"
                      }`}>
                      {c.allegiance}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CommandHierarchy map tree */}
          <div className="rounded-xl border border-amber-900/30 bg-slate-950/90 p-4 shadow-lg flex flex-col gap-2 relative">
            <h4 className="font-display text-[9px] font-black uppercase tracking-widest text-amber-500 pb-1.5 border-b border-amber-900/10">
              Command Hierarchy
            </h4>

            <div className="relative h-[190px] overflow-hidden bg-black/40 rounded-lg p-2 flex flex-col justify-between font-display text-[7px] tracking-widest uppercase">
              {/* Emperor Node */}
              <div className="flex justify-center z-10">
                <div
                  onClick={() => {
                    setSelectedCommanderId(null);
                    setHighlightTarget("Golden Throne");
                  }}
                  className="px-2 py-1 border border-yellow-500/40 bg-yellow-950/10 text-yellow-400 rounded cursor-pointer hover:border-yellow-400 transition-colors animate-pulse flex items-center gap-1.5"
                >
                  <CommanderPortrait
                    src="https://warhammer40k.fandom.com/wiki/Emperor_of_Mankind"
                    alt="The Emperor of Mankind"
                    name="Emperor"
                    allegiance="Imperium"
                    size="sm"
                  />
                  <span>👑 The Emperor</span>
                </div>
              </div>

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line x1="50%" y1="20" x2="50%" y2="60" stroke="#facc15" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="85" x2="50%" y2="120" stroke="#facc15" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="85" x2="20%" y2="120" stroke="#7e22ce" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="50%" y1="85" x2="80%" y2="120" stroke="#facc15" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* High Lords Node */}
              <div className="flex justify-center z-10">
                <div className="px-2 py-0.5 border border-amber-900/30 bg-slate-900 text-slate-400 rounded">
                  High Lords of Terra
                </div>
              </div>

              {/* Lower Tier Nodes */}
              <div className="flex justify-between px-1 z-10">
                {/* Chaos heresy line */}
                <div
                  onClick={() => handleCommanderSelect(commanders.find(c => c.id === "traitor-03")!)}
                  className="px-1.5 py-0.5 border border-purple-500/30 bg-purple-950/10 text-purple-400 rounded cursor-pointer flex items-center gap-1 hover:border-purple-400 transition-colors"
                >
                  <CommanderPortrait
                    src="/warhammer/portraits/magnus-the-red.jpg"
                    alt="Magnus the Red"
                    name="Magnus Red"
                    allegiance="Chaos"
                    size="sm"
                  />
                  <span>⚡ Daemon Primarchs</span>
                </div>

                <div
                  onClick={() => handleCommanderSelect(commanders[0])}
                  className="px-1.5 py-0.5 border-2 border-yellow-500 bg-yellow-950/20 text-yellow-300 rounded cursor-pointer flex items-center gap-1 shadow-[0_0_12px_rgba(250,204,21,0.4)] animate-pulse"
                >
                  <CommanderPortrait
                    src="/warhammer/portraits/roboute-guilliman.jpg"
                    alt="Roboute Guilliman"
                    name="Roboute Guilliman"
                    allegiance="Imperium"
                    size="sm"
                  />
                  <span>⚔️ Lord Commander</span>
                </div>

                <div className="px-1.5 py-0.5 border border-cyan-900/40 bg-slate-900 text-cyan-400 rounded">
                  Fleet Admirals
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            CENTER COLUMN (Space Viewport, span 6)
            ================================================== */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Viewport Frame */}
          <div className="relative w-full h-[520px] border-2 border-amber-900/50 bg-[#020204] overflow-hidden rounded-xl shadow-2xl">
            {/* Scanline pattern overlay */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(to_bottom,rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:28px_28px]" />

            {/* EmperorCore Component (Golden Throne, Top Center) */}
            <div
              className="absolute left-1/2 top-[13%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/emperor"
            >
              {/* Highlight selector halo */}
              {highlightTarget === "Golden Throne" && (
                <div className="absolute -inset-4 rounded-full border border-yellow-500/30 animate-ping" />
              )}

              {/* Astronomican beacon psychic circles */}
              <div className="absolute w-24 h-24 rounded-full animate-psychic-halo pointer-events-none" />

              {/* The Throne Silhouette */}
              <div
                onClick={() => {
                  setSelectedCommanderId(null);
                  setSelectedOrderId("order-02");
                  setHighlightTarget("Golden Throne");
                }}
                className="relative flex items-center justify-center p-1.5 rounded-full bg-slate-950/80 border border-yellow-500/40 shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:border-yellow-400 transition-all cursor-pointer"
              >
                {/* Emperor Portrait Circle inside the Throne */}
                <div className="absolute inset-1 rounded-full overflow-hidden border border-yellow-500/20 w-[44px] h-[44px] z-10 opacity-70 group-hover/emperor:opacity-90 transition-opacity">
                  <CommanderPortrait
                    src="https://warhammer40k.fandom.com/wiki/Emperor_of_Mankind"
                    alt="The Emperor of Mankind"
                    name="Emperor"
                    allegiance="Imperium"
                    size="sm"
                  />
                </div>

                <svg className="w-12 h-14 text-yellow-500 fill-current hover:text-yellow-400 transition-colors opacity-30 relative z-0" viewBox="0 0 100 120">
                  <path d="M 20 120 L 20 40 Q 50 10 80 40 L 80 120 Z" fill="rgba(180, 83, 9, 0.25)" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="50" cy="52" r="9" fill="currentColor" />
                  <path d="M 38 120 C 38 82, 62 82, 62 120 Z" fill="currentColor" />
                  <path d="M 44 42 L 50 35 L 56 42 Z" fill="#ffffff" />
                  <rect x="15" y="114" width="70" height="6" rx="2" fill="currentColor" />
                </svg>
              </div>

              {/* Labels */}
              <span className="mt-1.5 font-display text-[7px] font-black uppercase tracking-widest text-yellow-500 hover:text-yellow-400 transition-colors">
                GOLDEN THRONE ONLINE
              </span>
            </div>

            {/* Render Planets on map */}
            {planets.map((p) => {
              const isSelected = selectedPlanetId === p.id;
              const isHighlighted = highlightTarget === p.name;

              return (
                <div
                  key={p.id}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Selector target halo highlight */}
                  {isHighlighted && (
                    <div className="absolute -inset-6 rounded-full border-2 border-dashed border-red-500/50 animate-spin-custom" />
                  )}

                  {/* Planet sphere structure */}
                  <div
                    onClick={() => {
                      setSelectedPlanetId(p.id);
                      setHighlightTarget(p.name);
                    }}
                    className={`relative rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center cursor-pointer transition-all border ${isSelected ? "scale-105 border-yellow-500 shadow-[0_0_18px_rgba(250,204,21,0.3)]" : "opacity-80 border-slate-700 hover:opacity-100"
                      }`}
                    style={{ width: p.size, height: p.size }}
                  >
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-white/10 animate-spin-custom-reverse" style={{ animationDuration: "35s" }} />

                    {/* Exterminatus Warning overlay */}
                    {p.exterminatusRisk === "Extreme" && (
                      <div className="absolute -inset-1 rounded-full border border-red-600/30 animate-pulse bg-red-950/15" />
                    )}

                    {/* Voss Orbital siege laser stripes */}
                    {showTactical && p.id === "voss" && (
                      <svg className="absolute -inset-16 w-44 h-44 overflow-visible pointer-events-none">
                        <line x1="0" y1="0" x2="88" y2="88" stroke="#ef4444" strokeDasharray="3 3" className="animate-laser opacity-45" />
                        <line x1="160" y1="10" x2="88" y2="88" stroke="#f59e0b" strokeWidth="1" className="animate-laser opacity-55" />
                        <circle cx="88" cy="88" r="32" fill="none" stroke="#991b1b" strokeWidth="0.8" strokeDasharray="5 7" className="animate-spin-custom" />
                      </svg>
                    )}
                  </div>

                  {/* Planet badge labeling */}
                  <span className="mt-2 font-display text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                    {p.name}
                  </span>

                  {p.exterminatusRisk === "Extreme" && (
                    <span className="text-[6px] font-display font-black text-red-500 tracking-widest bg-red-950/40 border border-red-900/60 px-1 rounded mt-0.5 animate-pulse">
                      EXTERMINATUS RISK
                    </span>
                  )}
                </div>
              );
            })}

            {/* patrolling Gothic fleets */}
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
                {/* SVG Spired ship design */}
                <div className={`relative flex items-center gap-1.5 p-1 rounded border border-transparent ${fleet.color} bg-black/60`}>
                  <svg className="w-7 h-4 text-slate-400 group-hover/fleet:text-amber-500 transition-colors" viewBox="0 0 40 20" fill="currentColor">
                    <path d="M 0 10 L 10 5 L 12 0 L 14 5 L 26 5 L 30 2 L 32 5 L 38 10 L 32 15 L 30 18 L 26 15 L 14 15 L 12 20 L 10 15 Z" />
                    <circle cx="3" cy="10" r="2.5" fill="#22d3ee" className="animate-pulse" />
                  </svg>
                  <span className="text-[7px] font-display font-bold text-slate-300">
                    {fleet.ships}
                  </span>
                </div>
                <div className="absolute top-[110%] left-1/2 -translate-x-1/2 hidden group-hover/fleet:block bg-slate-950 border border-red-500/30 p-1.5 rounded shadow-xl text-center z-30 pointer-events-none whitespace-nowrap">
                  <p className="text-[8px] font-display uppercase tracking-widest text-red-500 font-bold">
                    Imperial Battlefleet Detected
                  </p>
                  <p className="text-[7px] font-body text-slate-400 mt-0.5">
                    {fleet.name} [{fleet.status}]
                  </p>
                </div>
              </div>
            ))}

            {/* Relic beacons */}
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
                <div className="absolute w-4 h-4 bg-amber-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                <div className="w-3 h-3 rounded border border-amber-500/50 bg-black/80 flex items-center justify-center text-[7px] font-bold text-amber-500 hover:border-amber-400 hover:text-amber-400 transition-colors shadow">
                  ▲
                </div>
                <div className="absolute bottom-[125%] left-1/2 -translate-x-1/2 hidden group-hover/relic:block bg-slate-950 border border-amber-500/30 px-2 py-0.5 rounded text-[8px] font-display uppercase tracking-widest text-amber-500 whitespace-nowrap shadow-xl">
                  📜 {relic.type}: {relic.label}
                </div>
              </div>
            ))}

            {/* Astroids belt orbiting anomaly */}
            <div className="absolute left-[20%] top-[40%] -translate-x-1/2 -translate-y-1/2 group/anomaly">
              {/* Accretion ring */}
              <div
                className="w-36 h-36 rounded-full animate-spin-custom relative flex items-center justify-center shadow-[0_0_30px_rgba(153,27,27,0.25)]"
                style={{
                  background: "conic-gradient(from 45deg, #991b1b 0%, #7e22ce 35%, #ec4899 65%, #facc15 85%, #991b1b 100%)",
                  filter: "blur(1.5px)",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border border-red-950/60 shadow-[inset_0_0_12px_rgba(255,255,255,0.1),0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-black blur-xs" />
              </div>
              <div className="absolute top-[105%] left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-widest text-red-500/80 font-display text-center whitespace-nowrap">
                ⚠️ GRAVITATIONAL ANOMALY
              </div>
              {/* Asteroids belt list map */}
              {beltAsteroids.map((asteroid, i) => (
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
                  />
                </div>
              ))}
            </div>

            {/* Warp Storm Zone energy cloud */}
            <div className="absolute left-[78%] top-[62%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div
                className="w-44 h-44 rounded-full animate-warp-storm"
                style={{
                  background: "radial-gradient(circle, rgba(126,34,206,0.14) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
                }}
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-widest text-purple-400 font-display">
                WARP STORM: NOCTURNE RIFT
              </div>
            </div>

            {/* Radiant Solar wind particles */}
            <div className="absolute left-[44%] top-[82%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-800 border border-amber-500/30 flex items-center justify-center">
                {solarWinds.map((p, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-amber-400/80 animate-solar-wind pointer-events-none"
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

            {/* Comet Sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute w-20 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full blur-[0.5px] animate-comet-grim" />
            </div>

          </div>
        </div>

        {/* ==================================================
            RIGHT COLUMN (Telemetry details & Orders, span 3)
            ================================================== */}
        <div className="lg:col-span-3 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
          {/* Main Imperial Telemetry statistics / ImperialCommandPanel */}
          <div className="rounded-xl border border-amber-900/30 bg-slate-950/90 p-4 shadow-lg flex flex-col relative overflow-hidden">
            {/* Scanline layer effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            <h4 className="font-display text-[9px] font-black uppercase tracking-widest text-amber-500 pb-2 border-b border-amber-900/10 mb-3 flex items-center justify-between">
              <span>Imperial Command Status</span>
              {selectedCommander && selectedCommander.allegiance === "Chaos" ? (
                <span className="text-red-500 font-bold animate-pulse text-[8px]">HERESY ALERT</span>
              ) : (
                <span className="text-cyan-400 text-[8px]">CONFIRMED</span>
              )}
            </h4>

            {/* Thumbnail portrait block */}
            <div className="flex gap-2.5 items-center mb-3 pb-3 border-b border-amber-900/10">
              {(() => {
                const portraitUrl = selectedCommander ? selectedCommander.portrait : "https://warhammer40k.fandom.com/wiki/Emperor_of_Mankind";
                const isExternal = portraitUrl?.startsWith("http");
                const inner = (
                  <CommanderPortrait
                    src={portraitUrl}
                    alt={selectedCommander ? selectedCommander.portraitAlt : "The Emperor of Mankind"}
                    name={selectedCommander ? selectedCommander.name : "Emperor"}
                    allegiance={selectedCommander ? selectedCommander.allegiance : "Imperium"}
                    size="md"
                  />
                );
                return isExternal ? (
                  <a
                    href={portraitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open official link for ${selectedCommander ? selectedCommander.name : "The Emperor"}`}
                    className="cursor-pointer hover:opacity-90 active:scale-95 transition-all shrink-0"
                  >
                    {inner}
                  </a>
                ) : inner;
              })()}
              <div className="flex-1 min-w-0">
                <span className="text-[6px] font-display font-black text-slate-500 tracking-widest block uppercase">
                  COMMAND SIGNATURE
                </span>
                <span className="text-[9px] font-display font-bold text-slate-300 uppercase block truncate">
                  {selectedCommander ? selectedCommander.name : "The Emperor of Mankind"}
                </span>
                <span className="text-[7px] font-body text-slate-400 uppercase block truncate">
                  {selectedCommander ? selectedCommander.title : "Throne World Beacon"}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 font-display text-[8px] tracking-wider text-slate-400 uppercase">
              <div className="flex justify-between items-center">
                <span>Astronomican:</span>
                <span className="text-yellow-400 font-bold">ONLINE [PSY-OUT: 98%]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Primarchs:</span>
                <span className="text-starlight-white font-bold">{activeCommandersCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Chaos Threats:</span>
                <span className="text-red-500 font-bold animate-pulse">{chaosThreatsCount} CRITICAL</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Morale index:</span>
                <span className="text-cyan-400 font-bold">STABLE [82%]</span>
              </div>
            </div>
          </div>

          {/* CommanderDetailPanel (Dynamic) */}
          <div className="rounded-xl border border-amber-900/30 bg-slate-950/90 p-4 shadow-lg flex flex-col relative overflow-hidden">
            {/* Scanline layer effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-45" />

            {selectedCommander ? (
              <div className={`flex flex-col gap-2 relative ${selectedCommander.allegiance === "Chaos" ? "glitch-active" : ""}`}>
                <div className="flex gap-2.5 items-start border-b border-amber-900/10 pb-2.5">
                  {selectedCommander.portrait?.startsWith("http") ? (
                    <a
                      href={selectedCommander.portrait}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Open official link for ${selectedCommander.name}`}
                      className="cursor-pointer hover:opacity-90 active:scale-95 transition-all shrink-0"
                    >
                      <CommanderPortrait
                        src={selectedCommander.portrait}
                        alt={selectedCommander.portraitAlt}
                        name={selectedCommander.name}
                        allegiance={selectedCommander.allegiance}
                        status={selectedCommander.status}
                        size="lg"
                        priority={true}
                      />
                    </a>
                  ) : (
                    <CommanderPortrait
                      src={selectedCommander.portrait}
                      alt={selectedCommander.portraitAlt}
                      name={selectedCommander.name}
                      allegiance={selectedCommander.allegiance}
                      status={selectedCommander.status}
                      size="lg"
                      priority={true}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-[10px] font-black text-starlight-white uppercase tracking-wider">
                      {selectedCommander.name}
                    </h4>
                    <p className="text-[7px] text-slate-500 font-body uppercase mt-0.5">
                      {selectedCommander.title}
                    </p>

                    {/* Status indicator badges */}
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className={`text-[6px] font-display font-black px-1.5 py-0.5 rounded tracking-widest uppercase border ${selectedCommander.status.toLowerCase().includes("active") ? "border-emerald-900/40 text-emerald-400 bg-emerald-950/15" :
                          selectedCommander.status.toLowerCase().includes("missing") ? "border-amber-900/40 text-amber-500 bg-amber-950/15 animate-pulse" :
                            "border-slate-800 text-slate-400 bg-slate-900/40"
                        }`}>
                        {selectedCommander.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details list info */}
                <div className="space-y-1.5 font-display text-[8px] tracking-wider text-slate-400 uppercase">
                  <p>
                    <strong className="text-slate-200">Legion:</strong> {selectedCommander.legion}
                  </p>
                  <p>
                    <strong className="text-slate-200">Loyalty level:</strong> {selectedCommander.loyalty}
                  </p>
                  <p>
                    <strong className="text-slate-200">Target sector:</strong> {selectedCommander.sector}
                  </p>
                  <p>
                    <strong className="text-slate-200">Current task:</strong> {selectedCommander.currentOrder}
                  </p>
                </div>

                {/* Tactical stats bar */}
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between text-[7px] font-display text-slate-500 tracking-wider">
                    <span>COMMAND POWER:</span>
                    <span className="text-amber-500 font-bold">{selectedCommander.stats.commandPower}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                    <div className="bg-amber-500 h-full" style={{ width: `${selectedCommander.stats.commandPower}%` }} />
                  </div>

                  <div className="flex justify-between text-[7px] font-display text-slate-500 tracking-wider">
                    {selectedCommander.allegiance === "Chaos" ? (
                      <>
                        <span className="text-red-500">CHAOS CORRUPTION:</span>
                        <span className="text-red-500 font-bold">{selectedCommander.stats.corruptionRisk}%</span>
                      </>
                    ) : (
                      <>
                        <span>WARP RESISTANCE:</span>
                        <span className="text-cyan-400 font-bold">{selectedCommander.stats.warpResistance}%</span>
                      </>
                    )}
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                    <div
                      className={selectedCommander.allegiance === "Chaos" ? "bg-red-600 h-full" : "bg-cyan-400 h-full"}
                      style={{
                        width: selectedCommander.allegiance === "Chaos"
                          ? `${selectedCommander.stats.corruptionRisk}%`
                          : `${selectedCommander.stats.warpResistance}%`
                      }}
                    />
                  </div>
                </div>

                {/* Heretic or loyalist badges */}
                <div className="mt-2.5">
                  {selectedCommander.allegiance === "Chaos" ? (
                    <div className="flex items-center gap-1.5 border border-red-500/25 bg-red-950/20 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-red-500 rounded animate-pulse">
                      <ShieldAlert className="h-3 w-3 text-red-500" />
                      HERETICUS EXTREMIS
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 border border-yellow-500/20 bg-yellow-950/25 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-yellow-500 rounded">
                      IMPERIAL AUTHORITY VERIFIED
                    </div>
                  )}
                </div>

                {/* Tactical command triggers */}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <button
                    onClick={() => setHighlightTarget(selectedCommander.sector)}
                    className="py-1 border border-slate-900 hover:border-amber-900/40 bg-slate-900 text-slate-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer active:scale-95"
                    aria-label={`Focus target sector for ${selectedCommander.name}`}
                  >
                    Focus Sector
                  </button>
                  <button
                    onClick={() => alert(`Initiating Fleet Deployment for ${selectedCommander.name}...`)}
                    className="py-1 border border-slate-900 hover:border-amber-900/40 bg-slate-900 text-slate-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer active:scale-95"
                    aria-label={`Deploy fleet commands under ${selectedCommander.name}`}
                  >
                    Deploy Fleet
                  </button>
                </div>

                {/* External links */}
                {selectedCommander.portrait?.startsWith("http") && (
                  <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                    <a
                      href={selectedCommander.portrait}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 border border-amber-900/30 hover:border-amber-500 bg-amber-950/20 text-amber-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer text-center flex items-center justify-center gap-1 active:scale-95"
                    >
                      <span>
                        {selectedCommander.portrait.includes("gallery")
                          ? "View Gallery"
                          : selectedCommander.portrait.includes("shop")
                          ? "View Shop"
                          : "View Wiki"}
                      </span>
                      <span>↗</span>
                    </a>
                    {selectedCommander.galleryUrl ? (
                      <a
                        href={selectedCommander.galleryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 border border-amber-900/30 hover:border-amber-500 bg-amber-950/20 text-amber-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer text-center flex items-center justify-center gap-1 active:scale-95"
                      >
                        <span>View Gallery</span>
                        <span>↗</span>
                      </a>
                    ) : (
                      <div className="border border-slate-900/40 bg-slate-950/20 text-slate-600 rounded text-[7px] font-display uppercase tracking-widest flex items-center justify-center select-none">
                        No Alt Gallery
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : highlightTarget === "Golden Throne" ? (
              <div className="flex flex-col gap-2 relative">
                <div className="flex gap-2.5 items-start border-b border-amber-900/10 pb-2.5">
                  <a
                    href="https://warhammer40k.fandom.com/wiki/Emperor_of_Mankind"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open official link for The Emperor of Mankind"
                    className="cursor-pointer hover:opacity-90 active:scale-95 transition-all shrink-0"
                  >
                    <CommanderPortrait
                      src="https://warhammer40k.fandom.com/wiki/Emperor_of_Mankind"
                      alt="The Emperor of Mankind"
                      name="Emperor"
                      allegiance="Imperium"
                      status="Active"
                      size="lg"
                      priority={true}
                    />
                  </a>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-[10px] font-black text-yellow-500 uppercase tracking-wider animate-pulse">
                      The Emperor of Mankind
                    </h4>
                    <p className="text-[7px] text-slate-500 font-body uppercase mt-0.5">
                      God-Emperor & Master of Mankind
                    </p>

                    {/* Status indicator badges */}
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="text-[6px] font-display font-black px-1.5 py-0.5 rounded tracking-widest uppercase border border-yellow-500/40 text-yellow-500 bg-yellow-950/15 animate-pulse">
                        ENTOMBED / SACRED ACTIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details list info */}
                <div className="space-y-1.5 font-display text-[8px] tracking-wider text-slate-400 uppercase">
                  <p>
                    <strong className="text-slate-200">Legion:</strong> Imperium / Legio Custodes
                  </p>
                  <p>
                    <strong className="text-slate-200">Loyalty level:</strong> Eternal Sovereign
                  </p>
                  <p>
                    <strong className="text-slate-200">Target sector:</strong> Segmentum Solar (Terra)
                  </p>
                  <p>
                    <strong className="text-slate-200">Current task:</strong> Guiding Astronomican psychic beacon across the Warp.
                  </p>
                </div>

                {/* Tactical stats bar */}
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between text-[7px] font-display text-slate-500 tracking-wider">
                    <span>PSYCHIC POWER:</span>
                    <span className="text-yellow-500 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                    <div className="bg-yellow-500 h-full w-full" />
                  </div>

                  <div className="flex justify-between text-[7px] font-display text-slate-500 tracking-wider">
                    <span>WARP RESISTANCE:</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                    <div className="bg-cyan-400 h-full w-full" />
                  </div>
                </div>

                {/* Heretic or loyalist badges */}
                <div className="mt-2.5">
                  <div className="flex items-center gap-1.5 border border-yellow-500/30 bg-yellow-950/20 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-yellow-400 rounded">
                    👑 MASTER OF HUMANITY
                  </div>
                </div>

                {/* Tactical command triggers */}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <button
                    onClick={() => setHighlightTarget("Terra Prime")}
                    className="py-1 border border-slate-900 hover:border-amber-900/40 bg-slate-900 text-slate-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer active:scale-95"
                    aria-label="Focus Terra Prime"
                  >
                    Focus Terra
                  </button>
                  <button
                    onClick={() => alert("The Emperor directs all battlefleets through the Astronomican.")}
                    className="py-1 border border-slate-900 hover:border-amber-900/40 bg-slate-900 text-slate-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer active:scale-95"
                    aria-label="Initiate Emperor Directive"
                  >
                    Psychic Pulse
                  </button>
                </div>

                {/* External links */}
                <div className="grid grid-cols-1 gap-1.5 mt-1.5">
                  <a
                    href="https://warhammer40k.fandom.com/wiki/Emperor_of_Mankind"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 border border-amber-900/30 hover:border-amber-500 bg-amber-950/20 text-amber-400 rounded text-[7px] font-display uppercase tracking-widest cursor-pointer text-center flex items-center justify-center gap-1 active:scale-95"
                  >
                    <span>View Wiki</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-slate-500 border border-dashed border-amber-900/20 rounded-xl">
                <HelpCircle className="h-7 w-7 text-amber-900/40 animate-pulse mb-2" />
                <h5 className="font-display text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  NO ACTIVE COMMANDER SELECT
                </h5>
                <p className="text-[7px] font-body text-slate-500 mt-1 max-w-[150px]">
                  Select a Primarch from the list to display tactical parameters.
                </p>
              </div>
            )}
          </div>

          {/* StrategicOrdersPanel */}
          <div className="rounded-xl border border-amber-900/30 bg-slate-950/90 p-4 shadow-lg flex flex-col gap-2 relative">
            <h4 className="font-display text-[9px] font-black uppercase tracking-widest text-amber-500 pb-1.5 border-b border-amber-900/10">
              Active Strategic Orders
            </h4>

            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
              {strategicOrders.map((order) => {
                const isSelected = selectedOrderId === order.id;
                let priorityBorder = "border-amber-900/20";
                if (order.priority === "Extreme") priorityBorder = "border-red-900/50";
                if (isSelected) priorityBorder = "border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.15)]";

                return (
                  <div
                    key={order.id}
                    onClick={() => handleOrderSelect(order)}
                    className={`p-2 rounded border bg-slate-900/35 cursor-pointer hover:border-amber-950 ${priorityBorder} transition-all`}
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-display text-[9px] font-bold text-slate-300 uppercase tracking-wide leading-tight">
                        {order.title}
                      </h5>
                      <span className={`text-[6px] font-display font-black px-1 rounded uppercase tracking-wider ${order.priority === "Extreme" ? "text-red-500 bg-red-950/20" : "text-amber-500 bg-amber-950/20"
                        }`}>
                        {order.priority}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[7px] font-display text-slate-500 tracking-wider">
                      <span>PROGRESS: {order.progress}%</span>
                      <span>TARGET: {order.target}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ==================================================
          BOTTOM ROW (TimeControlBar & FactionPresenceMap, span 12)
          ================================================== */}
      <div className="mt-6 grid gap-6 md:grid-cols-12" style={dynamicStyle}>
        {/* FactionPresenceMap (Left 5 cols) */}
        <div className="md:col-span-5 rounded-2xl border-2 border-amber-900/40 bg-slate-950/90 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

          <h4 className="font-display text-[9px] font-black uppercase tracking-widest text-amber-500 pb-1.5 border-b border-amber-900/10 mb-2">
            Sector Faction Dominance Map
          </h4>

          {/* Progress control grids */}
          <div className="space-y-2 relative z-10">
            <div className="flex flex-col gap-1 text-[8px] font-display tracking-widest uppercase">
              <div className="flex justify-between text-yellow-500 font-bold">
                <span>Imperium Control:</span>
                <span>61%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                <div className="bg-yellow-500 h-full" style={{ width: "61%" }} />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-[8px] font-display tracking-widest uppercase">
              <div className="flex justify-between text-purple-400 font-bold">
                <span>Chaos Corruption:</span>
                <span>27%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                <div className="bg-purple-500 h-full" style={{ width: "27%" }} />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-[8px] font-display tracking-widest uppercase">
              <div className="flex justify-between text-emerald-500 font-bold">
                <span>Xenos Threat Presence:</span>
                <span>8%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-amber-900/10">
                <div className="bg-emerald-500 h-full" style={{ width: "8%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* TimeControlBar (Right 7 cols) */}
        <div className="md:col-span-7 rounded-2xl border-2 border-amber-900/40 bg-slate-950/90 px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

          {/* Readout state status */}
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

          {/* Slider speed gauge */}
          <div className="flex-1 max-w-[150px] flex items-center gap-3 relative z-10">
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.1"
              value={timeSpeed}
              onChange={(e) => setTimeSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-amber-950/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
              aria-label="Simulation speed scale control slider"
            />
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => adjustSpeed(-0.2)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/30 bg-slate-900 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer active:scale-95"
              aria-label="Decrease time scale speed speed"
              title="Giảm tốc độ"
            >
              <Rewind className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex h-10 px-5 items-center gap-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${isPlaying
                ? "bg-red-950/25 border border-red-500/30 text-red-500 hover:bg-red-950/40"
                : "bg-amber-500/15 border border-amber-500/30 text-amber-500 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(250,204,21,0.25)]"
                }`}
              aria-label={isPlaying ? "Pause simulation speed state" : "Play simulation speed state"}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {isPlaying ? "Tạm Dừng" : "Bắt Đầu"}
            </button>

            <button
              onClick={() => adjustSpeed(0.2)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/30 bg-slate-900 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer active:scale-95"
              aria-label="Increase time scale speed speed"
              title="Tăng tốc độ"
            >
              <FastForward className="h-4 w-4" />
            </button>

            <button
              onClick={handleReset}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/30 bg-slate-900 text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer active:scale-95 ml-1"
              aria-label="Reset simulation speed status to normal"
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
