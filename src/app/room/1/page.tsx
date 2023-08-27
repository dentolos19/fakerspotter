"use client";

import Loading from "@/app/loading";
import RoomLayout from "@/components/room-layout";
import settings from "@/lib/settings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatementDocument, getStatementQuestions } from "@/lib/database";
import { generateRandom, pickRandom } from "@/lib/utilities";

const MAX_POINTS = 300;

export default function Page() {
  const router = useRouter();

  const [question, setQuestion] = useState<StatementDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);

  const { data: questions } = getStatementQuestions();

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom1Completed);
    if (questions) setQuestion(pickRandom(questions));
  }, [questions]);

  if (!question || !questions) return <Loading />;

  if (roomCompleted) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  if (currentCount >= 10 || currentPoints < 100) {
    settings.score = settings.score + currentPoints;
    settings.isRoom1Completed = true;
    router.push("/room/2");
    return <Loading />;
  }

  const answerHandler = (answeredOpinion: boolean) => {
    if (question.isOpinion === answeredOpinion) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentPoints(currentPoints - generateRandom(0, 60));
    }
    setQuestion(pickRandom(questions));
  };

  return (
    <RoomLayout
      title={`Room 1: Is it a fact or an opinion? (${currentCount}/10) | ${MAX_POINTS} room points → ${currentPoints} current points | ${currentScore} total score`}
    >
      <h5>{question.statement}</h5>
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
    </RoomLayout>
  );
}