import react from "react";
import { SideNav } from "@/ui/dashboard/sidenav";
import { Header } from "@/ui/dashboard/header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="flex h-fit">
        <SideNav />
        {children}
      </div>
  );
}
