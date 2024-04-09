import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/ui/header/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kara's Chickens",
  description: "Landing page for Kara's Chickens facebook page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <NavBar></NavBar>
        </div>
        {children}
      </body>
    </html>
  );
}
