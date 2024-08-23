import Link from "next/link";

export default function Page() {
  return (
    <main className={"text-center"}>
      <h1>FakerSpotter</h1>
      <p>A cyberwellness digital toolkit for learning on how to protect yourself from fake news!</p>
      <Link className={"btn btn-primary"} href={"/play"}>
        Play
      </Link>
    </main>
  );
}