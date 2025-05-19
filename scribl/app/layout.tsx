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
  description: "A free online blogging application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
