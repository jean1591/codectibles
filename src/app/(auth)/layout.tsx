export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="px-4 lg:px-0 mx-auto max-w-3xl min-h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
