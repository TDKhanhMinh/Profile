"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, Info, Compass, HelpCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface CelestialBody {
  id: string;
  name: string;
  type: string;
  x: number; // static position along galaxy band (W = 1050)
  y: number;
  size: number; // width/height in px
  color: string;
  atmosphereColor?: string;
  description: string;
  telemetry: {
    distance: string;
    period: string;
    temp: string;
    habitability: string;
  };
  features: string[];
}

const celestialBodies: CelestialBody[] = [
  {
    id: "sol",
    name: "Sol",
    type: "Yellow Dwarf Star",
    x: 120,
    y: 180,
    size: 76,
    color: "#f59e0b",
    atmosphereColor: "rgba(245, 158, 11, 0.4)",
    description: "Sao lùn vàng nằm tại tâm hệ hành tinh của chúng ta. Nó cung cấp ánh sáng và nhiệt năng giúp duy trì tất cả sự sống trên Trái Đất thông qua các phản ứng nhiệt hạch lõi liên tục chuyển hydro thành heli.",
    telemetry: {
      distance: "0.00 AU (Lõi hệ)",
      period: "25 ngày tự quay",
      temp: "~5,500 °C (Bề mặt)",
      habitability: "0.0% (Phóng xạ cực cao)"
    },
    features: ["Vành nhật hoa rực rỡ", "6 tia sáng động phản chiếu", "Lực hấp dẫn định hình quỹ đạo"]
  },
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial Planet",
    x: 230,
    y: 200,
    size: 20,
    color: "#6b7280",
    description: "Hành tinh gần mặt trời nhất và nhỏ nhất hệ. Mercury không có bầu khí quyển đáng kể để giữ nhiệt, tạo ra sự chênh lệch nhiệt độ bề mặt khắc nghiệt nhất giữa ngày và đêm trong Thái Dương Hệ.",
    telemetry: {
      distance: "0.39 AU từ Sol",
      period: "88 ngày Trái Đất",
      temp: "-170°C đến 430°C",
      habitability: "0.0% (Thiếu khí quyển)"
    },
    features: ["Bề mặt nhiều hố thiên thạch", "Lõi sắt cực lớn", "Không có vệ tinh tự nhiên"]
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial Planet",
    x: 320,
    y: 160,
    size: 32,
    color: "#d97706",
    atmosphereColor: "rgba(217, 119, 6, 0.45)",
    description: "Hành tinh nóng nhất hệ do hiệu ứng nhà kính mất kiểm soát từ bầu khí quyển CO2 siêu đặc. Venus có kích thước gần bằng Trái Đất nhưng áp suất khí quyển cao gấp 92 lần.",
    telemetry: {
      distance: "0.72 AU từ Sol",
      period: "225 ngày Trái Đất",
      temp: "~465 °C ổn định",
      habitability: "0.0% (Mưa Axit Sulfuric)"
    },
    features: ["Bầu khí quyển Amber dày", "Quay ngược chiều tự nhiên", "Núi lửa đang hoạt động"]
  },
  {
    id: "earth",
    name: "Earth",
    type: "Habitable World",
    x: 440,
    y: 210,
    size: 38,
    color: "#2563eb",
    atmosphereColor: "rgba(59, 130, 246, 0.3)",
    description: "Ngôi nhà của nhân loại, hành tinh duy nhất được xác nhận có sự sống. Earth sở hữu lượng nước lỏng khổng lồ chiếm 71% bề mặt và bầu khí quyển giàu nitơ-oxy lý tưởng.",
    telemetry: {
      distance: "1.00 AU từ Sol",
      period: "365.25 ngày",
      temp: "-89°C đến 58°C",
      habitability: "100% (Hoàn hảo)"
    },
    features: ["Đại dương xanh & Lục địa xanh lá", "Hệ thống mây khí động học", "Mặt Trăng Luna quay quanh"]
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial Planet",
    x: 560,
    y: 150,
    size: 26,
    color: "#ea580c",
    atmosphereColor: "rgba(234, 88, 12, 0.2)",
    description: "Hành tinh đỏ nổi tiếng với bề mặt giàu oxit sắt. Mars sở hữu ngọn núi lửa lớn nhất hệ mặt trời (Olympus Mons) và có những bằng chứng rõ ràng về nguồn nước chảy cổ đại.",
    telemetry: {
      distance: "1.52 AU từ Sol",
      period: "687 ngày Trái Đất",
      temp: "-153°C đến 20°C",
      habitability: "12.5% (Tiềm năng cải tạo)"
    },
    features: ["Băng cực trắng ở Bắc Cực", "Hẻm vực Valles Marineris lớn", "Bão cát toàn hành tinh"]
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    x: 700,
    y: 195,
    size: 48,
    color: "#d9a752",
    atmosphereColor: "rgba(217, 167, 82, 0.15)",
    description: "Hành tinh khí khổng lồ nổi bật với hệ thống vành đai băng đá tráng lệ và rộng lớn. Saturn là hành tinh nhẹ nhất hệ, có mật độ trung bình thấp hơn cả nước.",
    telemetry: {
      distance: "9.58 AU từ Sol",
      period: "29 năm Trái Đất",
      temp: "~ -140 °C",
      habitability: "0.0% (Lõi áp suất cực đại)"
    },
    features: ["3 lớp vành đai nghiêng lộng lẫy", "Cơn bão lục giác ở cực bắc", "82 vệ tinh quay quanh"]
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    x: 850,
    y: 155,
    size: 40,
    color: "#1d4ed8",
    atmosphereColor: "rgba(29, 78, 216, 0.3)",
    description: "Hành tinh xa nhất trong Hệ Mặt Trời. Neptune là một hành tinh băng khổng lồ phủ đầy các đám mây khí metan đóng băng và sở hữu những luồng gió nhanh nhất hệ mặt trời lên tới 2,100 km/h.",
    telemetry: {
      distance: "30.07 AU từ Sol",
      period: "165 năm Trái Đất",
      temp: "~ -201 °C",
      habitability: "0.0% (Bão lạnh siêu thanh)"
    },
    features: ["Bão lớn trắng xanh (Great Dark Spot)", "Các vành đai bụi mờ tối", "Vệ tinh Triton quay ngược quỹ đạo"]
  },
  {
    id: "kepler442b",
    name: "Kepler-442b",
    type: "Super-Earth Exoplanet",
    x: 990,
    y: 200,
    size: 44,
    color: "#059669",
    atmosphereColor: "rgba(16, 185, 129, 0.35)",
    description: "Một ngoại hành tinh đá nằm cách Trái Đất 1,206 năm ánh sáng trong chòm sao Thiên Cầm. Kepler-442b được giới khoa học đánh giá là một trong những hành tinh có triển vọng sống cao nhất ngoài Hệ Mặt Trời.",
    telemetry: {
      distance: "1,206 năm ánh sáng",
      period: "112 ngày địa phương",
      temp: "~ -2.6 °C (Trung bình)",
      habitability: "83.6% (Vùng ở được Goldilocks)"
    },
    features: ["Màu xanh lục của thảm thực vật ngoài hành tinh", "Khối lượng gấp 2.3 lần Trái Đất", "Ngôi sao chủ là sao lùn cam K"]
  }
];

export function GalaxyExplorer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleQueryChange);

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      mediaQuery.removeEventListener("change", handleQueryChange);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Sync zoom offset if selected body changes or viewport resizes
  useEffect(() => {
    if (selectedBody) {
      const targetX = dimensions.width / 2 - selectedBody.x * zoom;
      const targetY = dimensions.height / 2 - selectedBody.y * zoom;
      setOffset({ x: targetX, y: targetY });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [selectedBody, zoom, dimensions.width, dimensions.height]);

  // Galaxy Band Canvas stars rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 1050);
    let height = (canvas.height = 400);

    const handleCanvasResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 1050;
      height = canvas.height = 400;
    };
    window.addEventListener("resize", handleCanvasResize);

    // Initialize stars (Background, Mid, Bright)
    const totalStars = 180;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
      twinkleSpeed?: number;
      twinklePhase?: number;
    }> = [];

    const starColors = ["#dce8ff", "#fff5e8", "#f0f0ff", "#ffffff"];

    for (let i = 0; i < totalStars; i++) {
      const typeRand = Math.random();
      let size = 0.5;
      let opacity = Math.random() * 0.4 + 0.2;
      let twinkleSpeed: number | undefined;

      if (typeRand > 0.9) {
        // Bright stars
        size = Math.random() * 1.5 + 2.0;
        opacity = Math.random() * 0.3 + 0.7;
        twinkleSpeed = Math.random() * 0.04 + 0.01;
      } else if (typeRand > 0.6) {
        // Mid stars
        size = Math.random() * 1.0 + 1.0;
        opacity = Math.random() * 0.3 + 0.4;
      }

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        opacity,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed,
        twinklePhase: Math.random() * Math.PI
      });
    }

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      opacity: number;
    }
    let shootingStar: ShootingStar | null = null;
    let shootingStarTimer = 0;

    const triggerShootingStar = () => {
      if (reducedMotion) return;
      shootingStar = {
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * height * 0.2,
        dx: -(Math.random() * 4 + 6),
        dy: Math.random() * 3 + 4,
        length: Math.random() * 50 + 70,
        opacity: 1
      };
    };

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Lớp 1: Deep Core Band (Horizontal Galactic Path)
      const coreGrad = ctx.createLinearGradient(0, height / 2, width, height / 2);
      coreGrad.addColorStop(0, "rgba(13, 5, 32, 0)");
      coreGrad.addColorStop(0.3, "rgba(124, 58, 237, 0.08)");
      coreGrad.addColorStop(0.5, "rgba(0, 212, 255, 0.1)");
      coreGrad.addColorStop(0.7, "rgba(236, 72, 153, 0.06)");
      coreGrad.addColorStop(1, "rgba(13, 5, 32, 0)");

      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, height / 2 - 60, width, 120);

      // Render Stars
      for (const star of stars) {
        if (star.twinkleSpeed && !reducedMotion) {
          star.twinklePhase = (star.twinklePhase || 0) + star.twinkleSpeed;
          star.opacity = 0.5 + Math.sin(star.twinklePhase) * 0.4;
        }

        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = star.color;

        // Draw bright star flare glow
        if (star.size > 2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0; // Reset shadow

      // Render Shooting star
      if (shootingStar) {
        ctx.globalAlpha = shootingStar.opacity;
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.dx * 1.5,
          shootingStar.y - shootingStar.dy * 1.5
        );
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.4, "rgba(0, 212, 255, 0.5)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x + shootingStar.dx * (shootingStar.length / 10),
          shootingStar.y + shootingStar.dy * (shootingStar.length / 10)
        );
        ctx.stroke();

        if (!reducedMotion) {
          shootingStar.x += shootingStar.dx;
          shootingStar.y += shootingStar.dy;
          shootingStar.opacity -= 0.02;

          if (shootingStar.opacity <= 0 || shootingStar.x < 0 || shootingStar.y > height) {
            shootingStar = null;
          }
        }
      } else {
        shootingStarTimer++;
        if (shootingStarTimer > 400) {
          shootingStarTimer = 0;
          if (Math.random() > 0.4) triggerShootingStar();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleCanvasResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  const selectBody = (body: CelestialBody) => {
    setSelectedBody(body);
    setZoom(2.2);
  };

  const handleZoomChange = (amount: number) => {
    setZoom(prev => Math.min(Math.max(prev + amount, 1), 5));
  };

  const handleClose = () => {
    setSelectedBody(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 relative" id="galaxy">
      <SectionTitle
        title="Dải Ngân Hà"
        subtitle="Mô phỏng bản đồ các thiên thể và hệ thống hành tinh trong thiên hà."
      />

      {/* Main Viewport Explorer Frame */}
      <div 
        ref={containerRef}
        className="relative w-full h-[400px] rounded-2xl border border-white/5 bg-[#030712] overflow-hidden shadow-2xl shadow-accent/5 select-none"
      >
        {/* Canvas Starfield backdrop (static background behind zoom pane) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Outer Orbit Path Overlays (Visual Guide) */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-[180px] left-0 right-0 h-0.5 border-t border-dashed border-accent" />
        </div>

        {/* Zoomable System Canvas Container */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out origin-center"
          style={{
            transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
          }}
        >
          {/* Centered orbits behind celestial entities */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Draw orbit guidelines connecting Sol to Earth and others */}
            <svg className="w-full h-full opacity-10">
              <path 
                d="M 120 180 Q 560 140 990 200" 
                fill="none" 
                stroke="rgba(0, 212, 255, 0.5)" 
                strokeWidth="1.5" 
                strokeDasharray="4 6" 
              />
            </svg>
          </div>

          {/* Render Celestial Bodies */}
          {celestialBodies.map((body) => {
            const isSelected = selectedBody?.id === body.id;

            return (
              <div
                key={body.id}
                style={{
                  left: body.x,
                  top: body.y,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute flex flex-col items-center cursor-pointer group"
                onClick={() => selectBody(body)}
              >
                {/* Celestial Body visual representation */}
                <div
                  className="relative rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: body.size,
                    height: body.size,
                    backgroundColor: body.color,
                    boxShadow: isSelected 
                      ? `0 0 25px ${body.color}, 0 0 10px #ffffff` 
                      : body.atmosphereColor 
                        ? `0 0 15px ${body.atmosphereColor}` 
                        : "none",
                  }}
                >
                  {/* Dynamic Glowing rings or atmospheric flares */}
                  {body.id === "sol" && (
                    <>
                      {/* Rotating sunbeams SVG */}
                      <svg className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] animate-orbit-rotate text-yellow-300/20" style={{ animationDuration: "30s" }} viewBox="0 0 100 100">
                        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
                        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
                        <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
                      </svg>
                      {/* Corona pulse glow */}
                      <div className="absolute -inset-2 rounded-full border border-yellow-400/40 animate-ping opacity-20" style={{ animationDuration: "3s" }} />
                    </>
                  )}

                  {body.id === "mercury" && (
                    <div className="absolute inset-0.5 rounded-full overflow-hidden opacity-40 bg-[radial-gradient(circle_at_30%_30%,#1f2937,transparent_60%)]" />
                  )}

                  {body.id === "venus" && (
                    <div className="absolute -inset-1 rounded-full border border-amber-500/20 animate-pulse" />
                  )}

                  {body.id === "earth" && (
                    <>
                      {/* Swirling atmosphere clouds */}
                      <div className="absolute inset-0.5 rounded-full border border-white/20 animate-orbit-rotate-reverse" style={{ animationDuration: "18s" }} />
                      {/* Orbiting Moon Luna */}
                      <div className="absolute -inset-4 rounded-full border border-dashed border-white/5 animate-orbit-rotate" style={{ animationDuration: "8s" }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400" />
                      </div>
                    </>
                  )}

                  {body.id === "mars" && (
                    // polar ice cap
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-2.5 h-1 rounded-full bg-white opacity-90" />
                  )}

                  {body.id === "saturn" && (
                    // Orbit rings tilted scale representation
                    <div 
                      className="absolute w-[180%] h-[180%] border-4 border-double border-[#eab308]/40 rounded-full pointer-events-none"
                      style={{
                        transform: "rotate(-15deg) scaleY(0.26)",
                      }}
                    />
                  )}

                  {body.id === "neptune" && (
                    // dark storm hurricane spot
                    <div className="absolute top-2 left-2 w-2 h-1.5 rounded-full bg-blue-900/60" />
                  )}

                  {body.id === "kepler442b" && (
                    // cloud overlays
                    <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_70%_70%,#065f46,transparent)] animate-pulse" />
                  )}
                </div>

                {/* Subtitle element display (name is hidden if zoom is too low, but visible on hover) */}
                <span className="mt-2 font-display text-[9px] font-bold uppercase tracking-wider text-muted-dark group-hover:text-accent transition-colors duration-200">
                  {body.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Viewport Overlay HUD Elements */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-background/50 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider font-display text-muted">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            SYSTEMS HUD
          </div>
          
          {selectedBody && (
            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 rounded-lg border border-accent-pink/30 bg-accent-pink/10 hover:bg-accent-pink/20 hover:border-accent-pink px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider font-display text-accent-pink transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.15)] active:scale-95"
            >
              <X className="h-3 w-3" />
              Panoramas [ESC]
            </button>
          )}
        </div>

        {/* Floating Zoom Action Controllers */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
          <div className="rounded-lg border border-white/5 bg-background/50 backdrop-blur-md px-3 py-2 text-[10px] font-bold uppercase tracking-wider font-display text-muted">
            Zoom: {zoom.toFixed(1)}x
          </div>
          <button
            onClick={() => handleZoomChange(0.5)}
            disabled={zoom >= 5}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-2/60 backdrop-blur-md text-foreground transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Phóng to"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleZoomChange(-0.5)}
            disabled={zoom <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-2/60 backdrop-blur-md text-foreground transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Thu nhỏ"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Telemetry data info panel detail display */}
      <div className="mt-6 min-h-48">
        <AnimatePresence mode="wait">
          {selectedBody ? (
            <motion.div
              key={selectedBody.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass-panel p-6 sm:p-8"
            >
              <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                {/* Details left side */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-2xl font-black text-starlight-white uppercase tracking-wider">
                      {selectedBody.name}
                    </h3>
                    <span className="rounded-full border border-accent/25 bg-accent/5 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent font-display">
                      {selectedBody.type}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted font-body">
                    {selectedBody.description}
                  </p>
                </div>

                {/* Telemetry grid stats right side */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted font-display">
                      Khoảng cách quỹ đạo
                    </p>
                    <p className="mt-1 text-sm font-bold text-starlight-white font-body">
                      {selectedBody.telemetry.distance}
                    </p>
                  </div>
                  
                  <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted font-display">
                      Chu kỳ quỹ đạo
                    </p>
                    <p className="mt-1 text-sm font-bold text-starlight-white font-body">
                      {selectedBody.telemetry.period}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted font-display">
                      Nhiệt độ trung bình
                    </p>
                    <p className="mt-1 text-sm font-bold text-starlight-white font-body">
                      {selectedBody.telemetry.temp}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted font-display">
                      Chỉ số có thể ở được
                    </p>
                    <p className="mt-1 text-sm font-bold text-accent font-body">
                      {selectedBody.telemetry.habitability}
                    </p>
                  </div>

                  <div className="col-span-full rounded-xl border border-white/5 bg-background/20 p-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-dark font-display mb-2">
                      Thuộc tính phân tích cảm biến
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBody.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-white/5 px-2.5 py-1 rounded-md text-slate-300 font-body">
                          💡 {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-10 text-center"
            >
              <HelpCircle className="h-8 w-8 text-muted/40 animate-pulse mb-3" />
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
                Telemetry Module Offline
              </h4>
              <p className="mt-2 text-xs text-muted-dark font-body max-w-sm">
                Nhấp vào bất kỳ thực thể thiên thể nào trong Dải Ngân Hà ở trên để đồng bộ hóa cảm biến và tải dữ liệu phân tích.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
