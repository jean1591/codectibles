import "./globals.css";

import { Banner } from "./components/banner";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar";
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
      <html lang="fr" suppressHydrationWarning>
        <body
          className={classNames(inter.className, "bg-slate-800 text-slate-100")}
        >
          <Banner />
          <Navbar />
          <div className="my-16 px-4 sm:px-0 mx-auto max-w-3xl min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
