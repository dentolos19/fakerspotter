import { useState } from "react";
import { useRouter } from "next/router";
import { pickRandom } from "@/lib/utilities";
import { getTips, getClosedHeadlineQuestions, getMultipleHeadlineQuestions } from "@/lib/database";
import type { TipDocument, ClosedHeadlineDocument, MultipleHeadlineDocument } from "@/lib/database";

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
  const [count, setCount] = useState(0);

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCount(count + 1);
      if (count >= 5) {
        router.push("/room/3");
      }
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>Room 2: Spot the fake headline! ({count}/5)</div>
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