import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/global.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Y",
  description: "Social media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
