import type { Metadata } from "next";
import { londrina } from "@/ui/fonts";
import NavBar from "@/ui/header/navbar"
import "./globals.css";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";

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
        <Footer></Footer>
      </body>
    </html>
  );
}
