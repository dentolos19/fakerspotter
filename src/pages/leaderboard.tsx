import Image from "next/image";
import { getLeaderboard } from "@/lib/database";
import type { LeaderboardDocument } from "@/lib/database";

export async function getServerSideProps() {
  const leaderboard = await getLeaderboard();
  return {
    props: {
      leaderboard,
    },
  };
}

export default function Page({ leaderboard }: { leaderboard: LeaderboardDocument[] }) {
  return (
    <div className={"d-flex flex-column align-items-center"}>
      <table className={"table"}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
              <td className={"d-flex gap-2 align-items-center"}>
                {function () {
                  if (entry.score > 1000) {
                    return (
                      <>
                        <Image alt={"Cyberwellness Arance Champion"} src={"/static/icon.png"} width={32} height={32} />
                        <span>Cyberwellness Arcane Champion</span>
                      </>
                    );
                  } else if (entry.score > 800) {
                    return (
                      <>
                        <Image alt={"Cyberwellness Champion"} src={"/static/champion.svg"} width={32} height={32} />
                        <span>Cyberwellness Champion</span>
                      </>
                    );
                  } else if (entry.score > 600) {
                    return (
                      <>
                        <Image alt={"Cyberwellness Master"} src={"/static/master.svg"} width={32} height={32} />
                        <span>Cyberwellness Master</span>
                      </>
                    );
                  } else if (entry.score > 400) {
                    return (
                      <>
                        <Image alt={"Cyberwellness Apprentice"} src={"/static/apprentice.svg"} width={32} height={32} />
                        <span>Cyberwellness Apprentice</span>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Image alt={"Cyberwellness Novice"} src={"/static/novice.svg"} width={32} height={32} />
                        <span>Cyberwellness Novice</span>
                      </>
                    );
                  }
                }.call(null)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}