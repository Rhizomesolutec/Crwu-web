import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const recoleta = localFont({
  src: "../fonts/Recoleta-Regular.otf",
  variable: "--font-recoleta",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "CRWU | Music Artist Booking Platform",
  description:
    "Book raw rap talent, beat producers, and stage performers for concerts, festivals, and studio collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${recoleta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
