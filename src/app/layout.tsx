import "@/styles/global.scss";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FakerSpotter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"container py-2"}>
          <header className={"d-flex align-items-center justify-content-between px-2 pb-2 border-bottom"}>
            <Link className={"d-flex gap-2 align-items-center text-decoration-none"} href={"/"}>
              <img alt={"FakerSpotter"} src={"/assets/icon.png"} width={32} height={32} />
              <span className={"fs-5 text-dark"}> FakerSpotter</span>
            </Link>
            <Link className={"text-muted text-decoration-none"} href={"/leaderboard"}>
              Leaderboard
            </Link>
          </header>
          <div className={"pt-4 mx-4"}>{children}</div>
        </div>
      </body>
    </html>
  );
}