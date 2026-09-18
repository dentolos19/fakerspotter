"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Loading from "@/app/loading";
import RoomContainer from "@/components/room-container";
import { StatementDocument, useStatementQuestions } from "@/lib/database";
import settings, { useHydrated } from "@/lib/settings";
import { generateRandom, pickRandom } from "@/lib/utilities";

const MAX_POINTS = 300;

export default function Page() {
  const router = useRouter();
  const hydrated = useHydrated();

  const [question, setQuestion] = useState<StatementDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);

  const { data: questions } = useStatementQuestions();
  const initialQuestion = useMemo(() => (questions ? pickRandom(questions) : undefined), [questions]);
  const currentQuestion = question ?? initialQuestion;

  if (!hydrated || !currentQuestion || !questions) return <Loading />;

  if (settings.isRoom1Completed) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  const currentScore = settings.score;

  const answerHandler = (answeredOpinion: boolean) => {
    const correct = currentQuestion.isOpinion === answeredOpinion;
    const nextCount = correct ? currentCount + 1 : currentCount;
    const nextPoints = correct ? currentPoints : currentPoints - generateRandom(0, 60);

    if (nextCount >= 10 || nextPoints < 100) {
      settings.score += nextPoints;
      settings.isRoom1Completed = true;
      router.push("/room/2");
      return;
    }

    setCurrentCount(nextCount);
    setCurrentPoints(nextPoints);
    setQuestion(pickRandom(questions));
  };

  return (
    <RoomContainer
      title={`Room 1: Is it a fact or an opinion? (${currentCount}/10) | ${MAX_POINTS} room points → ${currentPoints} current points | ${currentScore} total score`}
    >
      <h5>{currentQuestion.statement}</h5>
      <div className={"btn-group"}>
        <button
          className={"btn btn-primary"}
          onClick={() => {
            answerHandler(false);
          }}
        >
          Fact
        </button>
        <button
          className={"btn btn-secondary"}
          onClick={() => {
            answerHandler(true);
          }}
        >
          Opinion
        </button>
      </div>
    </RoomContainer>
  );
}
