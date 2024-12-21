import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "鱼智查 - 智能商品风险识别系统",
  description: "智能识别商品风险，为您的店铺报价护航",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body className={`${geist.className} antialiased`}>
        <div className="page-transition">
          {children}
        </div>
      </body>
    </html>
  );
}
