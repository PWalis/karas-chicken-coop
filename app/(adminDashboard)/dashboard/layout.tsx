import React from "react";
import { SideNav } from "@/ui/dashboard/sidenav";
import MobileNav  from "@/ui/dashboard/mobilenav";
import { Header } from "@/ui/dashboard/header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-fit min-h-screen">
      <nav className="hidden lg:block min-h-screen"> {/* Render SideNav for large screens */}
        <SideNav />
      </nav>
      <nav className="lg:hidden"> {/* Render MobileNav for smaller screens */}
        <MobileNav />
      </nav>
      {children}
    </div>
  );
}
