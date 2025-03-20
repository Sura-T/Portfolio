import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surafel Takele - Full Stack Developer",
  description: "Professional portfolio showcasing my work as a full-stack developer, including projects, skills, and achievements.",
  keywords: ["full stack developer", "web development", "software engineer", "portfolio", "Sura-T", "Surafel Takele", "React developer", "frontend developer", "Backend Developer"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden min-h-screen w-screen`}>
        <Navbar />
        <main className="pt-16 max-w-screen overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
