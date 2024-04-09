export function YellowButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <button className="bg-flock-yellow">{children}</button>;
}

export function GrayButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <button className="bg-flock-gray">{children}</button>;
}

export function ClearButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <button className="transparent border-black border-1">{children}</button>
  );
}
