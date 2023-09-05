import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { RecoilRoot } from "../src/recoil-root";
import { ThemeProvider } from "../src/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nondakure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ThemeProvider>
    </RecoilRoot>
  );
}
