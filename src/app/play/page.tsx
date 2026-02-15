"use client";

import Loading from "@/app/loading";
import settings from "@/lib/settings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";

export default function Page() {
  const router = useRouter();

  const { data: text } = useSWR("/assets/intro.md", (url) => fetch(url).then((res) => res.text()));
  if (!text) return <Loading />;

  const startHandler = () => {
    if (settings.isRoom3Completed) {
      router.push("/finish");
    } else if (settings.isRoom2Completed) {
      router.push("/room/3");
    } else if (settings.isRoom1Completed) {
      router.push("/room/2");
    } else {
      router.push("/room/1");
    }
  };

  return (
    <main>
      <ReactMarkdown>{text}</ReactMarkdown>
      <div className={"d-flex justify-content-center"}>
        <div className={"btn-group"}>
          <div className={"btn btn-primary"} onClick={startHandler}>
            Start
          </div>
          <Link className={"btn btn-secondary"} href={".."}>
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}
