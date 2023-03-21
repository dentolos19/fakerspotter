import Image from "next/image";
import Spinner from "@/components/spinner";
import settings from "@/lib/settings";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pickRandom, generateRandom } from "@/lib/utilities";
import { getTips, getNewsQuestions } from "@/lib/database";
import type { TipDocument, NewsDocument } from "@/lib/database";

const MAX_POINTS = 500;

export async function getServerSideProps() {
  const tips = await getTips();
  const questions = await getNewsQuestions();
  return {
    props: {
      tips,
      questions,
    },
  };
}

export default function Page({ tips, questions }: { tips: TipDocument[]; questions: NewsDocument[] }) {
  const router = useRouter();

  const [tip, setTip] = useState<TipDocument>(pickRandom(tips));
  const [question, setQuestion] = useState<NewsDocument>(pickRandom(questions));
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentPoints(currentPoints - generateRandom(0, 100));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom3Completed);
    setAllowAccess(settings.isRoom1Completed && settings.isRoom2Completed);
  }, []);

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
    return <Spinner />;
  }

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
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