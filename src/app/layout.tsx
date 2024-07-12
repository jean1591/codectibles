import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { StoreProvider } from "./lib/store/storeProvider";
import { classNames } from "@/utils";

const metaDescription =
  "Transform your coding experience into a fun and rewarding game. Earn XP for your contributions, collect unique animal emojis, and level up to unlock perks.";

export const metadata: Metadata = {
  title: {
    template: "Codectibles - Enhance Your Coding Journey",
    default: "Codectibles - Enhance Your Coding Journey",
  },
  description: metaDescription,
  keywords:
    "gamification, coding, GitHub, developer, rewards, XP, animal emojis, level up, contributions",
  metadataBase: new URL("https://www.codectibles.fr"),
  openGraph: {
    title: "Codectibles - Enhance Your Coding Journey",
    description: metaDescription,
    url: "https://www.codectibles.fr",
    siteName: "Codectibles - Enhance Your Coding Journey",
    images: [
      {
        url: "/hero-profile.jpeg",
        width: 500,
        height: 500,
      },
    ],
    type: "website",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr" className="scroll-smooth">
        <body
          className={classNames(inter.className, "bg-slate-100 text-slate-800")}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </StoreProvider>
  );
}
