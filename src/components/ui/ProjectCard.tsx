import { Code2, ExternalLink, Orbit } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
};

const categoryLabels: Record<Project["category"], string> = {
  iot: "IoT System",
  cloud: "Cloud Space",
  web: "Web Interface",
  fullstack: "Full-Stack",
};

const categoryClasses: Record<Project["category"], string> = {
  iot: "bg-accent-pink/15 text-accent-pink border-accent-pink/30",
  cloud: "bg-accent-light/15 text-accent-light border-accent-light/30",
  web: "bg-accent/15 text-accent border-accent/30",
  fullstack: "bg-accent-dark/15 text-accent-dark border-accent-dark/30",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, 4);
  const hiddenCount = Math.max(project.tech.length - visibleTech.length, 0);

  return (
    <article className="group glass-panel glass-panel-hover overflow-hidden rounded-2xl transition duration-300">
      {/* Cosmic Header Image area */}
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-b from-surface-2 to-background p-6 text-center overflow-hidden border-b border-white/5">
        {/* Subtle grid and glows */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute -bottom-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
        
        {/* Floating planet vector/icon */}
        <div className="absolute top-4 right-4 text-white/10 group-hover:text-accent/35 transition-colors duration-500">
          <Orbit className="h-8 w-8 animate-orbit-rotate" style={{ animationDuration: "12s" }} />
        </div>
        
        <span className="font-display text-lg font-bold tracking-wider text-starlight-white uppercase z-10">
          {project.title}
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-display",
              categoryClasses[project.category],
            )}
          >
            {categoryLabels[project.category]}
          </span>
          {project.featured ? (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 font-display">
              ⭐ Featured
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted font-body">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-slate-300 font-body"
            >
              {tech}
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className="rounded-md bg-accent/5 border border-accent/10 px-2.5 py-1 text-xs text-accent">
              +{hiddenCount} more
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
          <a
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] active:scale-95",
              !project.githubUrl && "pointer-events-none opacity-20",
            )}
            href={project.githubUrl || "#"}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} GitHub`}
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] active:scale-95",
              !project.demoUrl && "pointer-events-none opacity-20",
            )}
            href={project.demoUrl || "#"}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} demo`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
