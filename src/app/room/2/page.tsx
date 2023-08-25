"use client";

import Loading from "@/app/loading";
import settings from "@/lib/settings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTips,
  getClosedHeadlineQuestions,
  ClosedHeadlineDocument,
} from "@/lib/database";

// TODO: add multiple headline questions
import { pickRandom, generateRandom } from "@/lib/utilities";

const MAX_POINTS = 200;

export default function Page() {
  const router = useRouter();

  const [tip, setTip] = useState<string>();
  const [question, setQuestion] = useState<ClosedHeadlineDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);

  const { data: tips } = getTips();
  const { data: questions } = getClosedHeadlineQuestions();

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom2Completed);
    setAllowAccess(settings.isRoom1Completed);
    if (!tips || !questions) return;
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  }, [tips, questions]);

  if (!tips || !questions) return <Loading />;
  if (!tip || !question) return <Loading />;

  if (roomCompleted) {
    return (
      <div className={"alert alert-danger"}>
        You have already completed this room.
      </div>
    );
  }

  if (!allowAccess) {
    return (
      <div className={"alert alert-danger"}>
        Please complete the previous room.
      </div>
    );
  }

  if (currentCount >= 5 || currentPoints < 100) {
    settings.score = settings.score + currentPoints;
    settings.isRoom2Completed = true;
    router.push("/room/3");
    return <div>Loading</div>; // TODO: replace this with proper loading spinner
  }

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentPoints(currentPoints - generateRandom(0, 40));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 2: Spot the fake headline! ({currentCount}/5) | {MAX_POINTS} room
          points → {currentPoints} current points | {currentScore} total score
        </div>
        <div className={"card-body"}>
          <h5>{question.headline}</h5>
          <div className={"btn-group"}>
            <button
              className={"btn btn-primary"}
              onClick={() => {
                answerHandler(false);
              }}
            >
              True
            </button>
            <button
              className={"btn btn-secondary"}
              onClick={() => {
                answerHandler(true);
              }}
            >
              False
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}