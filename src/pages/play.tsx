import useSWR from "swr";
import settings from "@/lib/settings";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Spinner from "@/components/spinner";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { data, error } = useSWR("/static/intro.md", (url) => fetch(url).then((res) => res.text()));

  if (error) return <div className={"alert alert-danger"}>Error</div>;
  if (!data) return <Spinner />;

  const continueHandler = () => {
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
    <div>
      <ReactMarkdown>{data}</ReactMarkdown>
      <div className={"d-flex justify-content-center"}>
        <div className={"btn-group"}>
          <div className={"btn btn-primary"} onClick={continueHandler}>
            Continue
          </div>
          <Link className={"btn btn-secondary"} href={".."}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}