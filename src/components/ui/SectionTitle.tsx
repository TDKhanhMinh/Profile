type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-7 text-muted">{subtitle}</p> : null}
    </div>
  );
}
