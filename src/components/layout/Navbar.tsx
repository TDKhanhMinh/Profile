"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "galaxy", label: "Galaxy" },
  { id: "simulator", label: "Simulator" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const sectionIds = ["home", ...navItems.map((item) => item.id)];

export function Navbar() {
  const activeId = useScrollSpy(sectionIds, -96);
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > previousY && currentY > 96);
      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl"
      animate={{ y: hidden ? -88 : 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="font-display text-xl font-black tracking-widest text-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-300">
          KM<span className="text-accent-pink">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-lg px-4 py-1.5 text-xs uppercase font-bold tracking-wider font-display transition-all duration-300",
                activeId === item.id 
                  ? "bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(0,212,255,0.15)]" 
                  : "text-muted hover:text-starlight-white border border-transparent"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-accent/40 bg-accent/5 px-4 text-xs font-bold uppercase tracking-wider font-display text-accent transition-all duration-300 hover:bg-accent/15 hover:border-accent hover:shadow-[0_0_12px_rgba(0,212,255,0.25)] active:scale-95"
            href="#contact"
          >
            <Mail className="h-3.5 w-3.5" />
            Contact
          </a>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-foreground md:hidden hover:border-accent/40 transition-colors"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="border-t border-white/5 bg-surface-2/95 backdrop-blur-xl px-4 py-4 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-wider font-display transition-all duration-200",
                    activeId === item.id 
                      ? "bg-accent/10 text-accent border border-accent/20" 
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/5 px-4 text-sm font-bold uppercase tracking-wider font-display text-accent"
                href="#contact"
                onClick={() => setIsOpen(false)}
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
