"use client";

import { Code2, Mail, Network } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const email = "trandokhanhminh@gmail.com";

const socialLinks = [
  { href: "https://github.com/TDKhanhMinh", label: "GitHub", icon: Code2 },
  {
    href: "https://www.linkedin.com/in/tr%E1%BA%A7n-%C4%91%E1%BB%97-kh%C3%A1nh-minh-454894376/",
    label: "LinkedIn",
    icon: Network,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent-dark/5 blur-3xl pointer-events-none" />

      <div className="mx-auto flex justify-center mb-6">
        <SectionTitle
          title="Liên hệ"
          subtitle="Gửi tín hiệu liên kết và khởi tạo dự án mới."
        />
      </div>

      <div className="relative inline-block group">
        <button
          className="mt-2 break-all font-display text-xl font-black tracking-wider text-aurora hover:scale-102 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 sm:text-4xl uppercase cursor-pointer relative z-10"
          type="button"
          onClick={copyEmail}
        >
          {email}
        </button>
      </div>

      <div className="mt-6 h-8 flex items-center justify-center">
        {copied ? (
          <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-display animate-glow-pulse">
            ✔ Đã Sao Chép Tọa Độ Email!
          </span>
        ) : (
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-dark font-display">
            Click vào email để sao chép nhanh
          </span>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row font-display text-xs font-bold uppercase tracking-wider">
        <a
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-aurora-gradient px-6 text-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-95"
          href={`mailto:${email}`}
        >
          <Mail className="h-4 w-4" />
          Gửi Email Trực Tiếp
        </a>
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:scale-[1.02] active:scale-95"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
