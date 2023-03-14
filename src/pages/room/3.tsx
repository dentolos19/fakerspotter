import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { pickRandom } from "@/lib/utilities";
import { getTips, getNewsQuestions } from "@/lib/database";
import type { TipDocument, NewsDocument } from "@/lib/database";

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
  const [count, setCount] = useState(0);

  const answerHandler = (answeredFake: boolean) => {
    if (question.isFake === answeredFake) {
      setCount(count + 1);
      if (count >= 5) {
        router.push("/finish");
      }
    }
    setTip(pickRandom(tips));
    setQuestion(pickRandom(questions));
  };

  return (
    <div>
      <div className={"alert alert-primary"}>{tip.tip}</div>
      <div className={"card"}>
        <div className={"card-header"}>Room 3: Spot the fake news! ({count}/5)</div>
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