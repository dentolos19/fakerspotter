"use client";

import Loading from "@/app/loading";
import settings from "@/lib/settings";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTips, getNewsQuestions, NewsDocument } from "@/lib/database";
import { pickRandom, generateRandom } from "@/lib/utilities";

// TODO: fix the images

const MAX_POINTS = 500;

export default function Page() {
  const router = useRouter();

  const [tip, setTip] = useState<string>();
  const [question, setQuestion] = useState<NewsDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);

  const { data: tips } = getTips();
  const { data: questions } = getNewsQuestions();

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom3Completed);
    setAllowAccess(settings.isRoom1Completed && settings.isRoom2Completed);
    if (!tips || !questions) return;
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  }, [tips, questions]);

  if (!tips || !questions) return <Loading />;
  if (!tip || !question) return <Loading />;

  if (roomCompleted) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  if (!allowAccess) {
    return <div className={"alert alert-danger"}>Please complete the previous room(s).</div>;
  }

  if (currentCount >= 5 || currentPoints < 100) {
    settings.score = settings.score + currentPoints;
    settings.isRoom3Completed = true;
    router.push("/finish");
    return <Loading />;
  }

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentPoints(currentPoints - generateRandom(0, 100));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 3: Spot the fake news! ({currentCount}/5) | {MAX_POINTS} room points → {currentPoints} current points |{" "}
          {currentScore} total score
        </div>
        <div className={"card-body"}>
          <h5>{question.headline}</h5>
          <Image alt={"News Image"} src={question.imageUrl} width={500} height={300} />
          <p>{question.background}</p>
          <div className={"btn-group"}>
            <button
              className={"btn btn-success"}
              onClick={() => {
                answerHandler(false);
              }}
            >
              Real
            </button>
            <button
              className={"btn btn-danger"}
              onClick={() => {
                answerHandler(true);
              }}
            >
              Fake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}