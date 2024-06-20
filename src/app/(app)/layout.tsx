import { Banner } from "./ui/banner";
import { Navbar, NavbarSmallScreen } from "./ui/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 sm:mx-auto sm:max-w-7xl flex-grow">
        <Banner />

        <div className="my-4 grid grid-cols-7 gap-x-12">
          <div className="hidden sm:block sm:col-span-1">
            <Navbar />
          </div>

          <div className="col-span-7 sm:col-span-6">{children}</div>
        </div>
      </div>

      <div className="sm:hidden">
        <NavbarSmallScreen />
      </div>
    </div>
  );
}
