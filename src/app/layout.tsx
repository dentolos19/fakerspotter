import NavigationBar from "@/components/navigation-bar";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FakerSpotter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={font.className}>
        <div className={"d-flex flex-column vh-100"}>
          <NavigationBar />
          <div className="container h-100 py-4">{children}</div>
        </div>
      </body>
    </html>
  );
}