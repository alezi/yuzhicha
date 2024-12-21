import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "next/font/geist";

const font = GeistSans;

export const metadata: Metadata = {
  title: "鱼智查 - 闲鱼商品风险查询工具",
  description: "帮助用户识别闲鱼商品潜在风险的查询工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={font.className}>
      <body>{children}</body>
    </html>
  );
}
