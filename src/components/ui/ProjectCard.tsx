import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
};

const categoryLabels: Record<Project["category"], string> = {
  iot: "IoT",
  cloud: "Cloud",
  web: "Web",
  fullstack: "Full-stack",
};

const categoryClasses: Record<Project["category"], string> = {
  iot: "bg-accent/15 text-accent-light border-accent/30",
  cloud: "bg-violet-400/15 text-violet-200 border-violet-400/30",
  web: "bg-sky-400/15 text-sky-200 border-sky-400/30",
  fullstack: "bg-orange-400/15 text-orange-200 border-orange-400/30",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, 4);
  const hiddenCount = Math.max(project.tech.length - visibleTech.length, 0);

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-surface/80 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
      <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.28),transparent_35%),linear-gradient(135deg,#0f172a,#111827_55%,#020617)] px-6 text-center">
        <span className="font-display text-lg font-semibold text-foreground">
          {project.title}
        </span>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-semibold",
              categoryClasses[project.category],
            )}
          >
            {categoryLabels[project.category]}
          </span>
          {project.featured ? (
            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2.5 py-1 text-xs font-semibold text-yellow-100">
              Featured
            </span>
          ) : null}
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-200"
            >
              {tech}
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300">
              +{hiddenCount} more
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <a
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition hover:border-accent hover:text-accent",
              !project.githubUrl && "pointer-events-none opacity-40",
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
              "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition hover:border-accent hover:text-accent",
              !project.demoUrl && "pointer-events-none opacity-40",
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
