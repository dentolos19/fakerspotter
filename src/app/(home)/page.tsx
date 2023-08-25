import Link from "next/link";

export default function Page() {
  return (
    <main className={"p-4 bg-light rounded"}>
      <h1>Welcome!</h1>
      <p>
        A cyberwellness digital toolkit for learning on how to protect yourself
        from fake news!
      </p>
      <div className={"btn-group"}>
        <Link className={"btn btn-primary"} href={"/play"}>
          Play
        </Link>
        <Link className={"btn btn-secondary"} href={"/about"}>
          About
        </Link>
      </div>
    </main>
  );
}