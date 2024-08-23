import { useTips } from "@/lib/database";
import { pickRandom } from "@/lib/utilities";
import { useEffect, useState } from "react";

export default function RoomContainer({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  const [tip, setTip] = useState<string>();

  const { data: tips } = useTips();

  useEffect(() => {
    if (!tips) return;
    setTip(pickRandom(tips));
  }, [tips]);

  return (
    <main>
      {tip && <div className={"alert alert-primary"}>{tip}</div>}
      <div className={"card"}>
        <div className={"card-header"}>{title}</div>
        <div className={`card-body ${className}`}>{children}</div>
      </div>
    </main>
  );
}