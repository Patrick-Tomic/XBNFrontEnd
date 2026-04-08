/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xtreme Body Nutrition",
  description: "Premium supplements & fitness nutrition — Tampa, FL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white`}>{children}</body>
    </html>
  );
}
