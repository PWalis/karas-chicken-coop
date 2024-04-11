import type { Metadata } from "next";
import { londrina } from "@/ui/fonts"
import "./globals.css";



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
