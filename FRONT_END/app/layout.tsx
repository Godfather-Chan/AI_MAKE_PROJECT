import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";


export const metadata: Metadata = {
  title: "미루어보자 - AI 기반 영화·음악 취향 테스트",
  description: "당신의 영화 취향을 감정 패턴으로 분석하고, 맞춤형 영화와 음악을 추천해드립니다.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* ⬇️ Geist 기본 className */}
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
