import Spinner from "@/components/spinner";
import settings from "@/lib/settings";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pickRandom, generateRandom } from "@/lib/utilities";
import { getTips, getStatementQuestions } from "@/lib/database";
import type { TipDocument, StatementDocument } from "@/lib/database";

const MAX_POINTS = 300;

export async function getServerSideProps() {
  const tips = await getTips();
  const questions = await getStatementQuestions();
  return {
    props: {
      tips,
      questions,
    },
  };
}

export default function Page({ tips, questions }: { tips: TipDocument[]; questions: StatementDocument[] }) {
  const router = useRouter();

  const [tip, setTip] = useState<TipDocument>(pickRandom(tips));
  const [question, setQuestion] = useState<StatementDocument>(pickRandom(questions));
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(MAX_POINTS);
  const [currentScore, setCurrentScore] = useState(0);
  const [roomCompleted, setRoomCompleted] = useState(false);

  const answerHandler = (answeredOpinion: boolean) => {
    if (question.isOpinion === answeredOpinion) {
      setCurrentCount(currentCount + 1);
    } else {
      setCurrentPoints(currentPoints - generateRandom(0, 60));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  useEffect(() => {
    setCurrentScore(settings.score);
    setRoomCompleted(settings.isRoom1Completed);
  }, []);

  if (roomCompleted) {
    return <div className={"alert alert-danger"}>You have already completed this room.</div>;
  }

  if (currentCount >= 10 || currentPoints < 100) {
    settings.score = settings.score + currentPoints;
    settings.isRoom1Completed = true;
    router.push("/room/2");
    return <Spinner />;
  }

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 1: Is it a fact or an opinion? ({currentCount}/10) | {MAX_POINTS} room points → {currentPoints} current
          points | {currentScore} total score
        </div>
        <div className={"card-body"}>
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
        </div>
      </div>
    </div>
  );
}