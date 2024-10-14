import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Forum
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
        </div>{" "}
        {children}
      </body>
    </html>
  );
}