import Link from "next/link";
import Image from "next/image";
import settings from "@/lib/settings";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [currentScore, setCurrentScore] = useState(0);
  const [allowAccess, setAllowAccess] = useState(false);

  const postHandler = () => {
    // TODO: add function for posting to leaderboard
  };

  const resetHandler = () => {
    settings.score = 0;
    settings.isRoom1Completed = false;
    settings.isRoom2Completed = false;
    settings.isRoom3Completed = false;
    router.push("..");
  };

  useEffect(() => {
    setAllowAccess(settings.isRoom1Completed && settings.isRoom2Completed && settings.isRoom3Completed);
    setCurrentScore(settings.score);
  }, []);

  if (!allowAccess) {
    return <div className={"alert alert-danger"}>Please complete all rooms.</div>;
  }

  return (
    <div className={"d-flex flex-column align-items-center"}>
      <h1>Congratulations!</h1>
      <div className={"d-flex flex-column align-items-center"}>
        {function () {
          if (currentScore > 1000) {
            return (
              <>
                <Image alt={"Cyberwellness Arance Champion"} src={"/static/icon.png"} width={256} height={256} />
                <h5>Cyberwellness Arcane Champion</h5>
              </>
            );
          } else if (currentScore > 800) {
            return (
              <>
                <Image alt={"Cyberwellness Champion"} src={"/static/champion.svg"} width={256} height={256} />
                <h5>Cyberwellness Champion</h5>
              </>
            );
          } else if (currentScore > 600) {
            return (
              <>
                <Image alt={"Cyberwellness Master"} src={"/static/master.svg"} width={256} height={256} />
                <h5>Cyberwellness Master</h5>
              </>
            );
          } else if (currentScore > 400) {
            return (
              <>
                <Image alt={"Cyberwellness Apprentice"} src={"/static/apprentice.svg"} width={256} height={256} />
                <h5>Cyberwellness Apprentice</h5>
              </>
            );
          } else {
            return (
              <>
                <Image alt={"Cyberwellness Novice"} src={"/static/novice.svg"} width={256} height={256} />
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
    </div>
  );
}