import Header from "@components/Header";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex grow flex-col items-center p-1">
      <div className="w-full max-w-7xl grow">
        <Header />
        <main id="main-content" className="h-full w-full grow">{children}</main>
      </div>
    </div>
  );
}
