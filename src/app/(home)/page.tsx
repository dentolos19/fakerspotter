import Link from "next/link";

export default function Page() {
  return (
    <main className="text-center">
      <h1>FakerSpotter</h1>
      <p>A cyberwellness digital toolkit for learning on how to protect yourself from fake news!</p>
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