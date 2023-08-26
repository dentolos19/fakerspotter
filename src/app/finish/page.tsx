"use client";

import Link from "next/link";
import Image from "next/image";
import settings from "@/lib/settings";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createLeaderboardEntry, getLeaderboardEntry, updateLeaderboardEntry } from "@/lib/database";

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

  const postHandler = async () => {
    let entry, temp;
    if ((temp = settings.uniqueId)) {
      entry = await getLeaderboardEntry(temp);
    }
    if (!entry) {
      const name = prompt("Please enter your name...");
      if (!name) return;
      entry = await createLeaderboardEntry(name, currentScore);
      if (entry) settings.uniqueId = entry.id;
    } else {
      const answer = confirm(
        `You have already posted your results. Do you want to update? Current: ${entry.score}, New: ${currentScore}`
      );
      if (!answer) return;
      await updateLeaderboardEntry(entry.id, currentScore);
    }
  };

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
                <Image alt={"Cyberwellness Arance Champion"} src={"/assets/icon.png"} width={256} height={256} />
                <h5>Cyberwellness Arcane Champion</h5>
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
        <button className={"btn btn-primary"} onClick={postHandler}>
          Post
        </button>
        <button className={"btn btn-danger"} onClick={resetHandler}>
          Reset
        </button>
        <Link className={"btn btn-secondary"} href={".."}>
          Back
        </Link>
      </div>
    </main>
  );
}