import { ReactNode } from "react";
import "./globals.css";

// Fonts
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

// Metadata
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fable",
  description: "A free blogging application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
