import { Banner } from "./ui/banner";
import { Navbar } from "./ui/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 mx-auto max-w-7xl">
      <Banner />

      <div className="my-4 grid grid-cols-7 gap-x-12">
        <div className="hidden lg:block lg:col-span-1">
          <Navbar />
        </div>

        <div className="col-span-7 lg:col-span-6">{children}</div>
      </div>
    </div>
  );
}
