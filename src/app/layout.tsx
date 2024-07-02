import "./globals.css";

import { Inter } from "next/font/google";
import { StoreProvider } from "./lib/store/storeProvider";
import { classNames } from "@/utils";

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
          className={classNames(inter.className, "bg-slate-200 text-slate-800")}
        >
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
