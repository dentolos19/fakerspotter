import Link from "next/link";

export default function Page() {
  return (
    <div className={"d-flex flex-column align-items-center"}>
      <h1>Congratulations!</h1>
      <p>*Insert Image Here*</p>
      <p>{"You've"} scored this many points!</p>
      <div className={"btn-group"}>
        <button className={"btn btn-primary"}>Share</button>
        <button className={"btn btn-danger"}>Reset</button>
        <Link className={"btn btn-secondary"} href={".."}>
          Back
        </Link>
      </div>
    </div>
  );
}