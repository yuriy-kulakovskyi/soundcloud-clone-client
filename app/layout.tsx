import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/ui/globals.css";
import Sidebar from "@/app/ui/home/sidebar";
import { UserProvider } from "@/hooks/useUser";
import ModalProvider from "@/providers/modal-provider";
import Player from "@/app/ui/player/player";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "SoundCloud",
  description: "SoundCloud clone created by Yurii Kulakovskyi",
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <UserProvider>
          <ModalProvider />
          <Sidebar>
            {children}
          </Sidebar>
          <Player />
        </UserProvider>
      </body>
    </html>
  );
}
