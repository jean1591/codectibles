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
      <html lang="fr">
        <body
          className={classNames(inter.className, "bg-slate-300 text-slate-800")}
        >
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
