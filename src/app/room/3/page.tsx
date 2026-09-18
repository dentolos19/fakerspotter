"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Loading from "@/app/loading";
import RoomContainer from "@/components/room-container";
import { NewsDocument, useNewsQuestions } from "@/lib/database";
import settings, { useHydrated } from "@/lib/settings";
import { generateRandom, pickRandom } from "@/lib/utilities";

// TODO: fix the images

const MAX_POINTS = 500;

export default function Page() {
  const router = useRouter();
  const hydrated = useHydrated();

  const [question, setQuestion] = useState<NewsDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);

  const { data: questions } = useNewsQuestions();
  const initialQuestion = useMemo(() => (questions ? pickRandom(questions) : undefined), [questions]);
  const currentQuestion = question ?? initialQuestion;

  if (!hydrated || !currentQuestion || !questions) return <Loading />;

  if (settings.isRoom3Completed) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  if (!(settings.isRoom1Completed && settings.isRoom2Completed)) {
    return <div className={"alert alert-danger"}>Please complete the previous room(s).</div>;
  }

  const currentScore = settings.score;

  const answerHandler = (answeredFake: boolean) => {
    const correct = currentQuestion.isFake === answeredFake;
    const nextCount = correct ? currentCount + 1 : currentCount;
    const nextPoints = correct ? currentPoints : currentPoints - generateRandom(0, 100);

    if (nextCount >= 5 || nextPoints < 100) {
      settings.score += nextPoints;
      settings.isRoom3Completed = true;
      router.push("/finish");
      return;
    }

    setCurrentCount(nextCount);
    setCurrentPoints(nextPoints);
    setQuestion(pickRandom(questions));
  };

  return (
    <RoomContainer
      className={"text-center"}
      title={`Room 3: Spot the fake news! (${currentCount}/5) | ${MAX_POINTS} room points → ${currentPoints} current points | ${currentScore} total score`}
    >
      <h5>{currentQuestion.headline}</h5>
      <img className={"img-fluid rounded my-2"} alt={"News Image"} src={currentQuestion.imageUrl} />
      <p>{currentQuestion.background}</p>
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
    </RoomContainer>
  );
}
