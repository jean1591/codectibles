import { createClient } from "@/utils/supabase/server";
import { Banner, Navbar } from "./ui/";
import { NavbarFooter } from "./ui/navbarFooter";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },  
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <div className="px-4 mx-auto max-w-7xl">
        <Banner />

        <div className="my-4 grid grid-cols-7 gap-x-12">
          <div className="hidden lg:block lg:col-span-1">
            <Navbar />
          </div>

          <div className="col-span-7 lg:col-span-6">{children}</div>
        </div>
      </div>

      <div className="block lg:hidden w-full">
        <NavbarFooter />
      </div>
    </div>
  );
}
