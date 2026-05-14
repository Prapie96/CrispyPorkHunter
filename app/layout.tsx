import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { kanit} from "./ui/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crispy Pork Hunter | ตามล่าร้านหมูกรอบ",
  description: "แอปพลิเคชันสำหรับคนรักหมูกรอบ ค้นหาพิกัดร้านเด็ด บันทึกร้านโปรด และเก็บสถิติการกินของคุณ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={`${kanit.className} antialiased`}>{children}</body>
    </html>
  );
}
