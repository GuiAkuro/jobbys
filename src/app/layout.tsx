import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { TRPCReactProvider } from "@/server/api/trpc/react";
import { headers } from "next/headers";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <body className="h-screen overflow-hidden bg-neutral-900 text-neutral-100">
        <AuthProvider>
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
