import react from "react";
import { SideNav } from "@/ui/dashboard/sidenav";
import { Header } from "@/ui/dashboard/header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* <Header /> */}
      <div className="flex h-screen">
        <SideNav />
        {children}
      </div>
    </>
  );
}
