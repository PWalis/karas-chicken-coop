import type { Metadata } from "next";
import { londrina } from "@/ui/fonts";
import "../globals.css";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";
import Loading from "./loading";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={londrina.className}>
        {children}
      </body>
    </html>
  );
}
