"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { awardFor } from "@/lib/awards";
import settings, { useHydrated } from "@/lib/settings";

export default function Page() {
  const router = useRouter();
  const hydrated = useHydrated();

  if (!hydrated) return <Loading />;

  if (!(settings.isRoom1Completed && settings.isRoom2Completed && settings.isRoom3Completed)) {
    return <div className={"alert alert-danger"}>Please complete all rooms.</div>;
  }

  const currentScore = settings.score;
  const award = awardFor(currentScore);

  const resetHandler = () => {
    settings.score = 0;
    settings.isRoom1Completed = false;
    settings.isRoom2Completed = false;
    settings.isRoom3Completed = false;
    router.push("/");
  };

  return (
    <main className={"d-flex flex-column align-items-center"}>
      <h1>Congratulations!</h1>
      <div className={"d-flex flex-column align-items-center"}>
        <Image alt={award.title} src={award.image} width={256} height={256} />
        <h5 className={currentScore >= 1000 ? "mt-4" : undefined}>{award.title}</h5>
      </div>
      <p>
        {"You've"} scored {currentScore} points!
      </p>
      <div className={"btn-group"}>
        <button className={"btn btn-danger"} onClick={resetHandler}>
          Reset
        </button>
        <Link className={"btn btn-secondary"} href={"/"}>
          Back
        </Link>
      </div>
    </main>
  );
}
