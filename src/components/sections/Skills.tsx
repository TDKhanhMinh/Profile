"use client";

import { Cloud, Cpu, Database, Monitor, Server } from "lucide-react";
import { motion } from "framer-motion";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skillGroups, type SkillGroup } from "@/data/skills";

const iconMap = {
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
};

function toneForCategory(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("backend")) return "backend" as const;
  if (normalized.includes("database")) return "database" as const;
  if (normalized.includes("cloud")) return "cloud" as const;
  if (normalized.includes("iot")) return "iot" as const;

  return "frontend" as const;
}

export function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle
        title="Kỹ năng"
        subtitle="Các nhóm công nghệ đang sử dụng trong frontend, backend, database, cloud và IoT."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group: SkillGroup, groupIndex) => {
          const Icon = iconMap[group.icon];
          const tone = toneForCategory(group.category);

          return (
            <motion.article
              key={group.category}
              className="rounded-lg border border-border bg-surface/70 p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: groupIndex * 0.05 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent-light">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: skillIndex * 0.03 }}
                  >
                    <SkillBadge name={skill} tone={tone} />
                  </motion.span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
