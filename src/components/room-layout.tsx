import { getTips } from "@/lib/database";
import { pickRandom } from "@/lib/utilities";
import { useEffect, useState } from "react";

export default function RoomLayout({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  const [tip, setTip] = useState<string>();

  const { data: tips } = getTips();

  useEffect(() => {
    if (!tips) return;
    setTip(pickRandom(tips));
  }, [tips]);

  return (
    <div>
      {tip && <div className={"alert alert-primary"}>{tip}</div>}
      <div className={"card"}>
        <div className={"card-header"}>{title}</div>
        <div className={`card-body ${className}`}>{children}</div>
      </div>
    </div>
  );
}