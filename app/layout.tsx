import type { Metadata } from "next";
import { londrina } from "@/ui/fonts";
import NavBar from "@/ui/header/navbar"
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={londrina.className}>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
