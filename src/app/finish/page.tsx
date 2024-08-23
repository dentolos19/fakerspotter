"use client";

import settings from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [currentScore, setCurrentScore] = useState(0);
  const [allowAccess, setAllowAccess] = useState(false);

  useEffect(() => {
    setAllowAccess(settings.isRoom1Completed && settings.isRoom2Completed && settings.isRoom3Completed);
    setCurrentScore(settings.score);
  }, []);

  if (!allowAccess) {
    return <div className={"alert alert-danger"}>Please complete all rooms.</div>;
  }

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
        {function () {
          if (currentScore > 1000) {
            return (
              <>
                <Image alt={"Cyberwellness Arance Champion"} src={"/icon.png"} width={256} height={256} />
                <h5 className={"mt-4"}>Cyberwellness Arcane Champion</h5>
              </>
            );
          } else if (currentScore > 800) {
            return (
              <>
                <Image alt={"Cyberwellness Champion"} src={"/assets/champion.svg"} width={256} height={256} />
                <h5>Cyberwellness Champion</h5>
              </>
            );
          } else if (currentScore > 600) {
            return (
              <>
                <Image alt={"Cyberwellness Master"} src={"/assets/master.svg"} width={256} height={256} />
                <h5>Cyberwellness Master</h5>
              </>
            );
          } else if (currentScore > 400) {
            return (
              <>
                <Image alt={"Cyberwellness Apprentice"} src={"/assets/apprentice.svg"} width={256} height={256} />
                <h5>Cyberwellness Apprentice</h5>
              </>
            );
          } else {
            return (
              <>
                <Image alt={"Cyberwellness Novice"} src={"/assets/novice.svg"} width={256} height={256} />
                <h5>Cyberwellness Novice</h5>
              </>
            );
          }
        }.call(null)}
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