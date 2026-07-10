import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사단법인깊은순종",
  description: "사단법인깊은순종 홈페이지에 오신것을 환영합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
