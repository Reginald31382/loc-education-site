import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteTransition from "@/components/motion/RouteTransition";
import AuthProvider from "@/components/AuthProvider";
import VisitTracker from "@/components/VisitTracker";

export const metadata: Metadata = {
  title: "LOCED — Loc Education",
  description:
    "Practical education for starting, caring for, and maintaining healthy locs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <VisitTracker />
          <Header />

          <RouteTransition>{children}</RouteTransition>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
