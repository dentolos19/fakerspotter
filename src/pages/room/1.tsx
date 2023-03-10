import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pickRandom } from "@/lib/utilities";
import { getTips, getStatementQuestions } from "@/lib/database";
import type { TipDocument, StatementDocument } from "@/lib/database";

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

export default function Page({
  tips,
  questions,
}: {
  tips: TipDocument[];
  questions: StatementDocument[];
}) {
  const router = useRouter();

  const [tip, setTip] = useState<TipDocument | null>(null);
  const [question, setQuestion] = useState<StatementDocument | null>(null);
  const [count, setCount] = useState(0);

  const answerHandler = (answeredOpinion: boolean) => {
    if (question?.isOpinion === answeredOpinion) {
      setCount(count + 1);
      if (count >= 10) {
        router.push("/room/2");
      }
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  useEffect(() => {
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  }, [questions, tips]);

  return (
    <div>
      <div className={"alert alert-primary"}>{tip?.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>
          Room 1: Is it a fact or an opinion? ({count}/10)
        </div>
        <div className={"card-body"}>
          <h5>{question?.statement}</h5>
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