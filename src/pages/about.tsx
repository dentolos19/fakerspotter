import useSWR from "swr";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Spinner from "@/components/spinner";

export default function Page() {
  const { data, error } = useSWR("/static/about.md", (url) => fetch(url).then((res) => res.text()));
  if (error) {
    return <div className={"alert alert-danger"}>Error</div>;
  }
  if (!data) {
    return <Spinner />;
  }
  return (
    <div>
      <ReactMarkdown>{data}</ReactMarkdown>
      <div className={"d-flex justify-content-center"}>
        <Link className={"btn btn-secondary"} href={".."}>
          Back
        </Link>
      </div>
    </div>
  );
}