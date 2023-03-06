import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Spinner from "@/components/spinner";
import { useStaticText } from "@/lib/utilities";

export default function Page() {
  const { data, error } = useStaticText("about.md");
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