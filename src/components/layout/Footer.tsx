import { Code2, Mail, Network } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/TDKhanhMinh", label: "GitHub", icon: Code2 },
  {
    href: "https://www.linkedin.com/in/tr%E1%BA%A7n-%C4%91%E1%BB%97-kh%C3%A1nh-minh-454894376/",
    label: "LinkedIn",
    icon: Network,
  },
  { href: "mailto:trandokhanhminh@gmail.com", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-foreground">Trần Đỗ Khánh Minh</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition hover:border-accent hover:text-accent"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a className="ml-2 text-sm font-medium hover:text-accent" href="#home">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
