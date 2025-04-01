import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "페어링 BOOK",
  description: "책에서 시작된 운명적인 만남",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navbar session={session} />
        <Toaster />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
