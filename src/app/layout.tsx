import "@/styles/globals.scss";
import NavigationBar from "@/components/navigation-bar";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FakerSpotter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"d-flex flex-column vh-100"}>
          <NavigationBar />
          <div className="container h-100 py-4">{children}</div>
        </div>
      </body>
    </html>
  );
}