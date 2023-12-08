import type { Metadata } from "next";
import "./globals.css";
import { cn, fontSans } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Viadukt",
  description: "JSON API for calculating the ROI of energy upgrades",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
