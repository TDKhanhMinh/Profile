import { Code2, Mail, Network, Rocket } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/TDKhanhMinh", label: "GitHub", icon: Code2 },
  {
    href: "https://www.linkedin.com/in/tr%E1%BA%A7n-%C4%91%E1%BB%97-kh%C3%A1nh-minh-454894376/",
    label: "LinkedIn",
    icon: Network,
  },
  { href: "mailto:trandokhanhminh@gmail.com", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background overflow-hidden py-10">
      {/* Footer Perspective Grid visual */}
      <div className="absolute inset-0 perspective-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-base font-bold text-foreground tracking-wider uppercase">
            Trần Đỗ Khánh Minh
          </p>
          <p className="mt-1 text-xs text-muted font-body">
            Built with Next.js, Tailwind v4 & Cosmic UI Design System.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white/5 transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] active:scale-95"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a 
            className="ml-2 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider font-display text-accent transition-all duration-300 hover:bg-accent/15 hover:border-accent hover:shadow-[0_0_12px_rgba(0,212,255,0.25)] active:scale-95" 
            href="#home"
          >
            <Rocket className="h-3.5 w-3.5 animate-bounce" />
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
