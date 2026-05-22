import { cn } from "@/lib/utils";

type SkillBadgeProps = {
  name: string;
  tone?: "frontend" | "backend" | "database" | "cloud" | "iot";
};

const toneClasses: Record<NonNullable<SkillBadgeProps["tone"]>, string> = {
  frontend: "border-accent/30 bg-accent/5 text-accent hover:border-accent hover:shadow-[0_0_12px_rgba(0,212,255,0.3)]",
  backend: "border-accent-dark/30 bg-accent-dark/5 text-accent-dark hover:border-accent-dark hover:shadow-[0_0_12px_rgba(124,58,237,0.3)]",
  database: "border-sky-400/30 bg-sky-400/5 text-sky-400 hover:border-sky-400 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)]",
  cloud: "border-accent-light/30 bg-accent-light/5 text-accent-light hover:border-accent-light hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]",
  iot: "border-accent-pink/30 bg-accent-pink/5 text-accent-pink hover:border-accent-pink hover:shadow-[0_0_12px_rgba(236,72,153,0.3)]",
};

export function SkillBadge({ name, tone = "frontend" }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-default font-body",
        toneClasses[tone],
      )}
    >
      {name}
    </span>
  );
}
