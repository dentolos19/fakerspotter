"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";

import Loading from "@/app/loading";
import LoadError from "@/components/load-error";
import { fetchText } from "@/lib/database";

export default function Page() {
  const { data: text, error } = useSWR("/assets/about.md", fetchText);
  if (error && text === undefined) return <LoadError />;
  if (text === undefined) return <Loading />;

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
