import { Banner } from "../components/banner";
import { Navbar, NavbarSmallScreen } from "./ui/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="my-4 sm:my-16 px-4 sm:px-0 mx-auto max-w-7xl grid grid-cols-7 gap-x-12">
          <div className="hidden sm:block sm:col-span-1">
            <Navbar />
          </div>

          <div className="col-span-7 sm:col-span-6">
            <Banner />
            {children}
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <NavbarSmallScreen />
      </div>
    </div>
  );
}
