type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <div 
        className="mb-4 h-1 w-16 rounded-full bg-aurora-gradient glow-accent" 
        aria-hidden="true" 
      />
      <h2 className="font-display text-3xl font-extrabold tracking-wider text-foreground sm:text-4xl uppercase">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base font-normal leading-7 text-muted font-body">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
