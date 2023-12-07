import type { Metadata } from "next";
import "./globals.css";
import { cn, fontSans } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Viadukt",
  description: "JSON Query Builder",
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
        <main>{children}</main>
      </body>
    </html>
  );
}
