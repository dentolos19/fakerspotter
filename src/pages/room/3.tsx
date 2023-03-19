import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { pickRandom, generateRandom } from "@/lib/utilities";
import { getScore, setScore } from "@/lib/settings";
import { getTips, getNewsQuestions } from "@/lib/database";
import type { TipDocument, NewsDocument } from "@/lib/database";

const MAX_SCORE = 500;

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
  const [currentScore, setCurrentScore] = useState(0);

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCurrentCount(currentCount + 1);
      if (currentCount >= 5 || currentScore < 100) {
        setScore(getScore() + currentScore);
        router.push("/finish");
      }
    } else {
      setCurrentScore(currentScore - generateRandom(0, 100));
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 3: Spot the fake news! ({currentCount}/5) | {MAX_SCORE} room points → {currentScore} current points
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