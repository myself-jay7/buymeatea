import Header from "@/components/Header";
import {authOptions} from "@/lib/authOptions";
import type { Metadata } from "next";
import {getServerSession} from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import { Providers } from './providers';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buy me a Tea",
  description: "Empowering creators through meaningful support.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Header session={session} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
