"use client";

import Loading from "@/app/loading";
import RoomLayout from "@/components/room-layout";
import settings from "@/lib/settings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClosedHeadlineQuestions, ClosedHeadlineDocument } from "@/lib/database";
import { pickRandom, generateRandom } from "@/lib/utilities";

// TODO: add multiple headline questions

const MAX_POINTS = 200;

export default function Page() {
  const router = useRouter();

  const [question, setQuestion] = useState<ClosedHeadlineDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);

  const { data: questions } = getClosedHeadlineQuestions();

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom2Completed);
    setAllowAccess(settings.isRoom1Completed);
    if (questions) setQuestion(pickRandom(questions));
  }, [questions]);

  if (!question || !questions) return <Loading />;

  if (roomCompleted) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  if (!allowAccess) {
    return <div className={"alert alert-danger"}>Please complete the previous room.</div>;
  }

  if (currentCount >= 5 || currentPoints < 100) {
    settings.score = settings.score + currentPoints;
    settings.isRoom2Completed = true;
    router.push("/room/3");
    return <Loading />;
  }

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentPoints(currentPoints - generateRandom(0, 40));
    }
    setQuestion(pickRandom(questions));
  };

  return (
    <RoomLayout
      title={`Room 2: Spot the fake headline! (${currentCount}/5) | ${MAX_POINTS} room points → ${currentPoints} current points | ${currentScore} total score`}
    >
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
    </RoomLayout>
  );
}