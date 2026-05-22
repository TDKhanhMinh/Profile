import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

const stats = [
  { value: "3+", label: "Projects" },
  { value: "2+", label: "Years Learning" },
  { value: "5+", label: "Technologies" },
];

export function About() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
      <AnimatedWrapper className="flex min-h-72 items-center justify-center rounded-lg border border-border bg-surface/70 p-8">
        <div className="grid h-48 w-48 place-items-center rounded-full border border-accent/30 bg-accent/10">
          <span className="font-display text-5xl font-bold text-accent-light">KM</span>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper delay={0.1}>
        <SectionTitle title="Về tôi" />
        <div className="space-y-5 text-base leading-8 text-muted">
          <p>
            Tôi là student developer quan tâm đến web development và IoT, tập
            trung xây dựng các sản phẩm có tính ứng dụng thực tế.
          </p>
          <p>
            Mục tiêu của tôi là phát triển năng lực full-stack, kết hợp backend
            vững chắc, frontend rõ ràng và hạ tầng cloud để đưa sản phẩm lên môi
            trường production.
          </p>
          <p>
            Hiện tại tôi đang làm việc với Next.js, React, Java Spring Boot,
            NestJS, AWS và các hệ thống IoT có tích hợp cảm biến.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-surface/70 p-4">
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
