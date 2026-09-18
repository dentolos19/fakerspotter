"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Loading from "@/app/loading";
import RoomContainer from "@/components/room-container";
import { ClosedHeadlineDocument, useClosedHeadlineQuestions } from "@/lib/database";
import settings, { useHydrated } from "@/lib/settings";
import { generateRandom, pickRandom } from "@/lib/utilities";

// TODO: add multiple headline questions

const MAX_POINTS = 200;

export default function Page() {
  const router = useRouter();
  const hydrated = useHydrated();

  const [question, setQuestion] = useState<ClosedHeadlineDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);

  const { data: questions } = useClosedHeadlineQuestions();
  const initialQuestion = useMemo(() => (questions ? pickRandom(questions) : undefined), [questions]);
  const currentQuestion = question ?? initialQuestion;

  if (!hydrated || !currentQuestion || !questions) return <Loading />;

  if (settings.isRoom2Completed) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  if (!settings.isRoom1Completed) {
    return <div className={"alert alert-danger"}>Please complete the previous room.</div>;
  }

  const currentScore = settings.score;

  const answerHandler = (answeredFake: boolean) => {
    const correct = currentQuestion.isFake === answeredFake;
    const nextCount = correct ? currentCount + 1 : currentCount;
    const nextPoints = correct ? currentPoints : currentPoints - generateRandom(0, 40);

    if (nextCount >= 5 || nextPoints < 100) {
      settings.score += nextPoints;
      settings.isRoom2Completed = true;
      router.push("/room/3");
      return;
    }

    setCurrentCount(nextCount);
    setCurrentPoints(nextPoints);
    setQuestion(pickRandom(questions));
  };

  return (
    <RoomContainer
      title={`Room 2: Spot the fake headline! (${currentCount}/5) | ${MAX_POINTS} room points → ${currentPoints} current points | ${currentScore} total score`}
    >
      <h5>{currentQuestion.headline}</h5>
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
    </RoomContainer>
  );
}
