import "./globals.css";

// Fonts
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
});

// Metadata
import { Metadata } from "next";
import { metadata as _metadata } from "@/lib/utils";
export const metadata: Metadata = _metadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
