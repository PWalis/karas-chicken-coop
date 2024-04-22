import type { Metadata } from "next";
import { londrina } from "@/ui/fonts";
import "../globals.css";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";
import Loading from "./loading";
import { Suspense } from "react";
import { CartProvider } from "@/app/context/cartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={londrina.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
