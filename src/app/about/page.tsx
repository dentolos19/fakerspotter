"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";

import Loading from "@/app/loading";

export default function Page() {
  const { data: text } = useSWR("/assets/about.md", (url) => fetch(url).then((res) => res.text()));
  if (!text) return <Loading />;

  return (
    <main>
      <ReactMarkdown>{text}</ReactMarkdown>
      <div className={"d-flex justify-content-center"}>
        <Link className={"btn btn-secondary"} href={".."}>
          Back
        </Link>
      </div>
    </main>
  );
}
