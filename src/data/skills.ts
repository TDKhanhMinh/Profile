export type SkillGroup = {
  category: string;
  icon: "Monitor" | "Server" | "Database" | "Cloud" | "Cpu";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "Monitor",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "Server",
    skills: ["Java", "Spring MVC", "Spring Boot", "REST API"],
  },
  {
    category: "Database",
    icon: "Database",
    skills: ["MySQL", "Amazon RDS"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["AWS Elastic Beanstalk", "EC2", "S3", "Vercel", "Git", "GitHub"],
  },
  {
    category: "IoT",
    icon: "Cpu",
    skills: ["Embedded C", "MQTT", "Cảm biến môi trường", "Điều khiển tự động"],
  },
];
