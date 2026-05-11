import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KDT Learning Board",
  description: "K-Digital Training 오프라인 훈련생을 위한 내부 학습 지원 허브",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-secondary-50 text-secondary-900 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative">
          <Navigation />
          <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
