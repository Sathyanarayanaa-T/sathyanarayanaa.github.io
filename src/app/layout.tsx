import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";


const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sathyanarayanaa T. | Creative Developer",
  description: "Frontend Engineer & AI Researcher. Building immersive web experiences.",
  keywords: ["Frontend Engineer", "Creative Developer", "React", "Next.js", "WebGL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${syne.variable} ${manrope.variable} font-manrope bg-charcoal text-offwhite overflow-x-hidden selection:bg-neon-purple selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
