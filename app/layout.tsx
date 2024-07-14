import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./ui/globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoundCloud",
  description: "SoundCloud clone created by Yurii Kulakovskyi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
