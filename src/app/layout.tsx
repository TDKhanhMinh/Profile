import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.vercel.app"),
  title: {
    default: "Trần Đỗ Khánh Minh | Portfolio",
    template: "%s | Khánh Minh",
  },
  description:
    "Portfolio cá nhân của Trần Đỗ Khánh Minh - Web Developer với kinh nghiệm Spring MVC, Next.js, AWS và IoT.",
  keywords: [
    "portfolio",
    "web developer",
    "spring mvc",
    "nextjs",
    "aws",
    "iot",
    "vietnam",
  ],
  authors: [{ name: "Trần Đỗ Khánh Minh" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://your-domain.vercel.app",
    title: "Trần Đỗ Khánh Minh | Portfolio",
    description: "Personal portfolio showcasing Web, Cloud, and IoT projects.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${spaceGrotesk.variable} ${orbitron.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-body relative overflow-x-hidden">
        <CosmicBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
