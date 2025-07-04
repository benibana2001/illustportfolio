import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const notoSerifJP = Noto_Serif_JP({ subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  title: "イラストポートフォリオ",
  description: "イラストレーターのポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.className} ${notoSansJP.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
