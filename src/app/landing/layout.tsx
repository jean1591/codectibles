import { Navbar } from "./components/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 mx-auto max-w-5xl">
      <Navbar />
      {children}
    </div>
  );
}
