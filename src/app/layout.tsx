import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "鱼智查 - 闲鱼商品风险查询工具",
  description: "帮助用户识别闲鱼商品潜在风险的查询工具",
};

export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.API_BASE_URL = "${process.env.NEXT_PUBLIC_API_URL || 'https://api.yuzhicha.com'}";`
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
