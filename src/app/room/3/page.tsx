"use client";

import Loading from "@/app/loading";
import RoomLayout from "@/components/room-layout";
import { NewsDocument, useNewsQuestions } from "@/lib/database";
import settings from "@/lib/settings";
import { generateRandom, pickRandom } from "@/lib/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TODO: fix the images

const MAX_POINTS = 500;

export default function Page() {
  const router = useRouter();

  const [question, setQuestion] = useState<NewsDocument>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);

  const { data: questions } = useNewsQuestions();

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom3Completed);
    setAllowAccess(settings.isRoom1Completed && settings.isRoom2Completed);
    if (questions) setQuestion(pickRandom(questions));
  }, [questions]);

  if (!question || !questions) return <Loading />;

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
    setQuestion(pickRandom(questions));
  };

  return (
    <RoomLayout
      className={"text-center"}
      title={`Room 3: Spot the fake news! (${currentCount}/5) | ${MAX_POINTS} room points → ${currentPoints} current points | ${currentScore} total score`}
    >
      <h5>{question.headline}</h5>
      <img className={"img-fluid rounded my-2"} alt={"News Image"} src={question.imageUrl} />
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
    </RoomLayout>
  );
}