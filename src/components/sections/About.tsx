import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Compass, Orbit } from "lucide-react";

const stats = [
  { value: "03+", label: "Completed Projects" },
  { value: "02+", label: "Years Learning" },
  { value: "05+", label: "Core Technologies" },
];

export function About() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
      {/* Telemetry radar display container */}
      <AnimatedWrapper className="relative flex min-h-80 items-center justify-center rounded-2xl glass-panel p-8 overflow-hidden">
        {/* Radar grid backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,212,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Concentric telemetry rings */}
        <div className="absolute h-64 w-64 rounded-full border border-dashed border-accent/20 animate-orbit-rotate" style={{ animationDuration: "35s" }} />
        <div className="absolute h-52 w-52 rounded-full border border-dotted border-accent-light/10 animate-orbit-rotate-reverse" style={{ animationDuration: "25s" }} />
        <div className="absolute h-40 w-40 rounded-full border border-accent-pink/5" />
        
        <div className="relative grid h-44 w-44 place-items-center rounded-full border border-accent/40 bg-accent/5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.15)] group">
          <div className="absolute top-2 animate-pulse text-accent-pink">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-display text-5xl font-black text-starlight-white tracking-widest hover:scale-105 transition-transform duration-300">
            KM
          </span>
          <div className="absolute bottom-2 text-[8px] uppercase tracking-widest text-muted-dark font-display">
            Sensor Active
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper delay={0.1}>
        <SectionTitle 
          title="Về tôi" 
          subtitle="System logs identify local developer instance." 
        />
        
        <div className="space-y-5 text-base leading-8 text-muted font-body">
          <p>
            Tôi là một student developer tràn đầy đam mê với các hệ thống Web Development và IoT, 
            tập trung kiến tạo các sản phẩm kỹ thuật số tối ưu, có tính ứng dụng thực tế cao.
          </p>
          <p>
            Mục tiêu dài hạn của tôi là hoàn thiện năng lực Full-Stack. Tôi luôn hướng đến việc 
            kết hợp backend kiến trúc vững chắc, frontend mượt mà có tính thẩm mỹ cao cùng hạ tầng 
            cloud AWS ổn định để triển khai ứng dụng trên production.
          </p>
          <p>
            Hiện tại, stack công nghệ cốt lõi của tôi bao gồm Next.js, React, Java Spring Boot, 
            NestJS, quản lý cơ sở dữ liệu MySQL và xây dựng các mạch tích hợp IoT.
          </p>
        </div>

        {/* Stats strip using Glassmorphic blocks */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3 font-display">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="rounded-xl border border-white/5 bg-surface-2/40 p-5 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
            >
              <p className="text-3xl font-extrabold text-accent tracking-wider drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase font-bold tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
