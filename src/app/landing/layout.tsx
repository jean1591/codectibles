import { Navbar } from "./components/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 mx-auto w-full lg:max-w-5xl">
      <Navbar />
      {children}
    </div>
  );
}
