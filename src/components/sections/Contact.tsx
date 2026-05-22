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
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex justify-center">
        <SectionTitle
          title="Liên hệ"
          subtitle="Hãy cùng xây dựng điều gì đó."
        />
      </div>

      <button
        className="mt-2 break-all font-display text-2xl font-bold text-foreground transition hover:text-accent sm:text-4xl"
        type="button"
        onClick={copyEmail}
      >
        {email}
      </button>
      <div className="mt-3 h-6 text-sm font-medium text-accent-light">
        {copied ? "Đã copy!" : null}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 font-semibold text-slate-950 transition hover:bg-accent-light"
          href={`mailto:${email}`}
        >
          <Mail className="h-4 w-4" />
          Gửi email
        </a>
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-5 font-semibold text-foreground transition hover:border-accent hover:text-accent"
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
