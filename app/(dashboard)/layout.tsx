import { londrina } from "@/ui/fonts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={londrina.className}>{children}</body>
    </html>
  );
}
