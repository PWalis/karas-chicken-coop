import { londrina } from "@/ui/fonts";
import "../globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={londrina.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
