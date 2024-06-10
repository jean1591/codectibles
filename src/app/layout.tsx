import "./globals.css";

import { Inter } from "next/font/google";
import { classNames } from "@/utils";
import { Navbar } from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr" suppressHydrationWarning>
        <body
          className={classNames(
            inter.className,
            "bg-slate-800 text-slate-100"
          )}
        >
          <Navbar/>
          <div className="my-16 px-4 sm:px-0 mx-auto max-w-6xl min-h-screen">
            {children}
          </div>
        </body>
      </html>
  );
}
