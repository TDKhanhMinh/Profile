"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Mail, Network, Orbit, Rocket } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const roles = ["Web Developer", "Spring MVC Developer", "IoT Builder"];

const socialLinks = [
  { href: "https://github.com/TDKhanhMinh", label: "GitHub", icon: Code2 },
  {
    href: "https://www.linkedin.com/in/tr%E1%BA%A7n-%C4%91%E1%BB%97-kh%C3%A1nh-minh-454894376/",
    label: "LinkedIn",
    icon: Network,
  },
  { href: "mailto:trandokhanhminh@gmail.com", label: "Email", icon: Mail },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const role = roles[roleIndex];
    const timeout = window.setTimeout(
      () => {
        if (letterIndex < role.length) {
          setLetterIndex((index) => index + 1);
          return;
        }

        setRoleIndex((index) => (index + 1) % roles.length);
        setLetterIndex(0);
      },
      letterIndex < role.length ? 75 : 1600,
    );

    return () => window.clearTimeout(timeout);
  }, [letterIndex, roleIndex]);

  const currentRole = roles[roleIndex].slice(0, letterIndex);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-20 sm:px-6">
      {/* Background space elements specific to Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,212,255,0.07),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="text-left"
        >
          {[
            <p key="intro" className="mb-4 text-xs font-bold uppercase tracking-widest text-accent font-display">
              🛰️ System Transmission Initiated
            </p>,
            <h1
              key="name"
              className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl tracking-wide uppercase"
            >
              Xin chào, tôi là <br />
              <span className="text-aurora drop-shadow-[0_0_35px_rgba(0,212,255,0.25)]">
                Khánh Minh
              </span>
            </h1>,
            <div key="role" className="mt-6 flex items-center h-10 overflow-hidden font-display text-lg md:text-2xl font-bold tracking-wider">
              <span className="text-muted mr-2">Tôi xây dựng</span>
              <span className="inline-block whitespace-nowrap border-r-2 border-accent pr-1.5 text-accent drop-shadow-[0_0_10px_rgba(0,212,255,0.6)]">
                {currentRole}
              </span>
            </div>,
            <p key="desc" className="mt-6 max-w-xl text-base leading-8 text-muted font-body">
              Student developer chuyên biệt về web engineering, cloud computing và IoT. 
              Xây dựng giải pháp kỹ thuật số tối ưu sử dụng các công nghệ Next.js, Spring Boot và AWS.
            </p>,
            <div key="buttons" className="mt-10 flex flex-col gap-4 sm:flex-row font-display text-xs font-bold uppercase tracking-wider">
              <a
                className="inline-flex h-12 items-center justify-center rounded-xl bg-aurora-gradient px-6 text-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-95"
                href="#projects"
              >
                Khám phá Dự án
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/5 px-6 text-accent transition-all duration-300 hover:bg-accent/15 hover:border-accent hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-[1.02] active:scale-95"
                href="#contact"
              >
                Kết nối với tôi
              </a>
            </div>,
            <div key="socials" className="mt-8 flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_12px_rgba(0,212,255,0.25)] active:scale-95"
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>,
          ].map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {/* Orbiting concentric ring layout wrapping the avatar */}
        <motion.div
          className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          {/* Orbital Ring 1: Outer dashed circle */}
          <div className="absolute inset-0 rounded-full border border-dashed border-accent/15 animate-orbit-rotate pointer-events-none" style={{ animationDuration: "40s" }} />

          {/* Orbital Ring 2: Medium dotted circle with planet icons */}
          <div className="absolute inset-[10%] rounded-full border border-dotted border-accent-light/20 animate-orbit-rotate-reverse pointer-events-none" style={{ animationDuration: "50s" }} />
          
          {/* Decorative mini orbital planets */}
          <div className="absolute inset-0 animate-orbit-rotate pointer-events-none" style={{ animationDuration: "30s" }}>
            <div className="absolute top-[10%] left-[10%] h-3 w-3 rounded-full bg-accent/60 glow-accent" />
            <div className="absolute bottom-[20%] right-[5%] h-2 w-2 rounded-full bg-accent-pink/60 glow-accent" />
          </div>

          {/* Inner ring core layout */}
          <div className="relative aspect-square w-[75%] rounded-full bg-gradient-to-br from-accent/25 via-accent-dark/20 to-accent-pink/25 p-1 backdrop-blur-md shadow-[0_0_50px_rgba(124,58,237,0.2)]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background overflow-hidden border border-white/10">
              <Image
                src="/avatar.svg"
                alt="Trần Đỗ Khánh Minh avatar"
                width={320}
                height={320}
                priority
                className="h-full w-full rounded-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all duration-300 rounded-full p-2 border border-white/5 bg-background/40 backdrop-blur-md inline-flex"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </div>
  );
}
