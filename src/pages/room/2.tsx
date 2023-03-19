import { useState } from "react";
import { useRouter } from "next/router";
import { pickRandom, generateRandom } from "@/lib/utilities";
import { getScore, setScore } from "@/lib/settings";
import { getTips, getClosedHeadlineQuestions, getMultipleHeadlineQuestions } from "@/lib/database";
import type { TipDocument, ClosedHeadlineDocument, MultipleHeadlineDocument } from "@/lib/database";

const MAX_SCORE = 200;

export async function getServerSideProps() {
  const tips = await getTips();
  const questions = await getClosedHeadlineQuestions();
  return {
    props: {
      tips,
      questions,
    },
  };
}

export default function Page({ tips, questions }: { tips: TipDocument[]; questions: ClosedHeadlineDocument[] }) {
  const router = useRouter();

  const [tip, setTip] = useState<TipDocument>(pickRandom(tips));
  const [question, setQuestion] = useState<ClosedHeadlineDocument>(pickRandom(questions));
  const [currentCount, setCurrentCount] = useState(0);
  const [currentScore, setCurrentScore] = useState(MAX_SCORE);

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCurrentCount(currentCount + 1);
      if (currentCount >= 5 || currentScore < 100) {
        setScore(getScore() + currentScore);
        router.push("/room/3");
      }
    } else {
      setCurrentScore(currentScore - generateRandom(0, 40));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 2: Spot the fake headline! ({currentCount}/5) | {MAX_SCORE} room points → {currentScore} current points
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