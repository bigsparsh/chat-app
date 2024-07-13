import type { Metadata } from "next";
import { Toaster } from "@repo/ui/components/ui/sonner";
import "@repo/ui/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers attribute="class" defaultTheme="dark">
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
