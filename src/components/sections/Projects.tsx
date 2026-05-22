"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const filters: Array<{ label: string; value: "all" | Project["category"] }> = [
  { label: "Tất cả", value: "all" },
  { label: "IoT", value: "iot" },
  { label: "Cloud", value: "cloud" },
  { label: "Web", value: "web" },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          title="Dự án"
          subtitle="Những project tiêu biểu trong IoT, cloud và web application."
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={cn(
                "h-10 rounded-md border border-border px-4 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent",
                activeFilter === filter.value && "border-accent bg-accent/10 text-accent-light",
              )}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.28 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
