import "@/styles/global.scss";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FakerSpotter</title>
      </Head>
      <div className={"container py-2"}>
        <header
          className={
            "d-flex align-items-center justify-content-between" +
            " " +
            "pb-2 border-bottom" // separator
          }
        >
          <Link className={"fs-4 text-dark text-decoration-none"} href={"/"}>
            FakerSpotter
          </Link>
          <Link
            className={"text-muted text-decoration-none"}
            href={"/leaderboard"}
          >
            Leaderboard
          </Link>
        </header>
        <main className={"pt-4 mx-4"}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}