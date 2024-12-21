import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
