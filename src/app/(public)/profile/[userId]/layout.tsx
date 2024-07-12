import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="px-4 mx-auto w-full lg:max-w-2xl">{children}</div>
    </div>
  );
}
