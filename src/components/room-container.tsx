import { useMemo } from "react";

import { useTips } from "@/lib/database";
import { pickRandom } from "@/lib/utilities";

export default function RoomContainer({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  const { data: tips } = useTips();
  const tip = useMemo(() => (tips ? pickRandom(tips) : undefined), [tips]);

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
