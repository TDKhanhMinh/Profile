import { cn } from "@/lib/utils";

type SkillBadgeProps = {
  name: string;
  tone?: "frontend" | "backend" | "database" | "cloud" | "iot";
};

const toneClasses: Record<NonNullable<SkillBadgeProps["tone"]>, string> = {
  frontend: "border-sky-400/40 bg-sky-400/10 text-sky-100 hover:shadow-sky-400/20",
  backend: "border-orange-400/40 bg-orange-400/10 text-orange-100 hover:shadow-orange-400/20",
  database: "border-cyan-400/40 bg-cyan-400/10 text-cyan-100 hover:shadow-cyan-400/20",
  cloud: "border-violet-400/40 bg-violet-400/10 text-violet-100 hover:shadow-violet-400/20",
  iot: "border-accent/40 bg-accent/10 text-emerald-100 hover:shadow-accent/20",
};

export function SkillBadge({ name, tone = "frontend" }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1.5 text-sm font-medium shadow-lg shadow-transparent transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]",
        toneClasses[tone],
      )}
    >
      {name}
    </span>
  );
}
