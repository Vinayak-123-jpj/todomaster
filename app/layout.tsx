import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TodoMaster - Task Management",
    template: "%s | TodoMaster",
  },
  description: "A powerful task management application with role-based authentication and subscription features.",
  keywords: ["todo", "task management", "productivity", "clerk", "nextjs"],
  authors: [{ name: "TodoMaster" }],
  creator: "TodoMaster",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "TodoMaster - Task Management",
    description: "A powerful task management application with role-based authentication and subscription features.",
    siteName: "TodoMaster",
  },
  twitter: {
    card: "summary_large_image",
    title: "TodoMaster - Task Management",
    description: "A powerful task management application with role-based authentication and subscription features.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
