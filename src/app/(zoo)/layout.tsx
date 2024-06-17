import { Banner } from "@/app/components/banner";
import { Navbar } from "@/app/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Banner />
      <Navbar />
      <div className="my-16 px-4 sm:px-0 mx-auto max-w-3xl min-h-screen flex justify-center">
        {children}
      </div>
    </div>
  );
}
