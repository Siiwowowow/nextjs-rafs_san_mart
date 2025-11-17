"use client"; // make RootLayout a client component

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AppContextProvider } from "@/context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import UserInfo from "./components/UserInfo";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <AppContextProvider>
            <UserInfo />
            {/* Show Navbar & Footer only outside dashboard */}
            {!isDashboard && <Navbar />}

            <div className="min-h-[calc(100vh-133px)]">{children}</div>

            {!isDashboard && <Footer />}
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
