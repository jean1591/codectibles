import { Footer } from "./components/footer";
import { Metadata } from "next";
import { Navbar } from "./components/navbar";
import { ReactNode } from "react";

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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="px-4 mx-auto w-full lg:max-w-5xl">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
