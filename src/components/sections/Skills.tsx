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
        subtitle="Hệ thống công nghệ phân tích từ dữ liệu cảm biến đến giao diện người dùng."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group: SkillGroup, groupIndex) => {
          const Icon = iconMap[group.icon];
          const tone = toneForCategory(group.category);

          return (
            <motion.article
              key={group.category}
              className="group/card glass-panel glass-panel-hover p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: groupIndex * 0.05 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 text-accent shadow-[0_0_12px_rgba(0,212,255,0.15)] group-hover/card:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-foreground group-hover/card:text-accent transition-colors duration-300">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
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
