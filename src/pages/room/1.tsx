import { useState } from "react";
import { useRouter } from "next/router";
import { pickRandom, generateRandom } from "@/lib/utilities";
import { getScore, setScore } from "@/lib/settings";
import { getTips, getStatementQuestions } from "@/lib/database";
import type { TipDocument, StatementDocument } from "@/lib/database";

const MAX_SCORE = 300;

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
  const [currentScore, setCurrentScore] = useState(MAX_SCORE);

  const answerHandler = (answeredOpinion: boolean) => {
    if (question.isOpinion === answeredOpinion) {
      setCurrentCount(currentCount + 1);
      if (currentCount >= 10 || currentScore < 100) {
        setScore(getScore() + currentScore);
        router.push("/room/2");
      }
    } else {
      setCurrentScore(currentScore - generateRandom(0, 60));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 1: Is it a fact or an opinion? ({currentCount}/10) | {MAX_SCORE} room points → {currentScore} current
          points
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