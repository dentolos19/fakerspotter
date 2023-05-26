import "@/styles/globals.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>FakerSpotter</title>
      </Head>
      <div className={"container py-2"}>
        <header className={"d-flex align-items-center justify-content-between px-2 pb-2 border-bottom"}>
          <Link className={"d-flex gap-2 align-items-center text-decoration-none"} href={"/"}>
            <Image alt={"FakerSpotter"} src={"/static/icon.png"} width={32} height={32} />
            <span className={"fs-5 text-dark"}> FakerSpotter</span>
          </Link>
          <Link className={"text-muted text-decoration-none"} href={"/leaderboard"}>
            Leaderboard
          </Link>
        </header>
        <motion.main
          key={router.route}
          className={"pt-4 mx-4"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Component {...pageProps} />
        </motion.main>
      </div>
    </>
  );
}