"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Mail, Network } from "lucide-react";
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
      letterIndex < role.length ? 75 : 1400,
    );

    return () => window.clearTimeout(timeout);
  }, [letterIndex, roleIndex]);

  const currentRole = roles[roleIndex].slice(0, letterIndex);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {[
            <p key="intro" className="mb-4 text-sm font-semibold uppercase text-accent-light">
              Xin chào, tôi là
            </p>,
            <h1
              key="name"
              className="max-w-3xl font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl"
            >
              Trần Đỗ Khánh Minh
            </h1>,
            <div key="role" className="mt-5 h-8 overflow-hidden">
              <span className="inline-block whitespace-nowrap border-r border-accent pr-1 font-display text-xl font-semibold text-accent-light">
                {currentRole}
              </span>
            </div>,
            <p key="desc" className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Student developer tập trung vào web, cloud và IoT, xây dựng các ứng
              dụng thực tế bằng Next.js, Spring Boot và AWS.
            </p>,
            <div key="buttons" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 font-semibold text-slate-950 transition hover:bg-accent-light"
                href="#projects"
              >
                Xem Projects
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-md border border-border px-5 font-semibold text-foreground transition hover:border-accent hover:text-accent"
                href="#contact"
              >
                Liên hệ tôi
              </a>
            </div>,
            <div key="socials" className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted transition hover:border-accent hover:text-accent"
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

        <motion.div
          className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full bg-gradient-to-br from-accent via-sky-400 to-violet-500 p-1"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-surface text-center">
            <Image
              src="/avatar.svg"
              alt="Trần Đỗ Khánh Minh avatar"
              width={320}
              height={320}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted sm:inline-flex"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </div>
  );
}
