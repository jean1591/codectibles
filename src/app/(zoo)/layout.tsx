import { Banner } from "../components/banner";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Banner />
      <div className="my-16 px-4 sm:px-0 mx-auto max-w-3xl min-h-screen flex justify-center">
        {children}
      </div>
    </div>
  );
}
