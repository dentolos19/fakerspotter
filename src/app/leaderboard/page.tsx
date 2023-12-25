import { LeaderboardEntry, getLeaderboardEntries } from "@/lib/database";

export const revalidate = 0;

export default async function Page() {
  const entries = (await getLeaderboardEntries()) as Array<LeaderboardEntry>;
  return (
    <main className={"table-responsive"}>
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
          {entries.map((entry, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
              <td className={"d-flex gap-2 align-items-center"}>
                {function () {
                  if (entry.score > 1000) {
                    return (
                      <>
                        <img alt={"Cyberwellness Arance Champion"} src={"/assets/icon.png"} height={32} />
                        <span>Cyberwellness Arcane Champion</span>
                      </>
                    );
                  } else if (entry.score > 800) {
                    return (
                      <>
                        <img alt={"Cyberwellness Champion"} src={"/assets/champion.svg"} height={32} />
                        <span>Cyberwellness Champion</span>
                      </>
                    );
                  } else if (entry.score > 600) {
                    return (
                      <>
                        <img alt={"Cyberwellness Master"} src={"/assets/master.svg"} height={32} />
                        <span>Cyberwellness Master</span>
                      </>
                    );
                  } else if (entry.score > 400) {
                    return (
                      <>
                        <img alt={"Cyberwellness Apprentice"} src={"/assets/apprentice.svg"} height={32} />
                        <span>Cyberwellness Apprentice</span>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <img alt={"Cyberwellness Novice"} src={"/assets/novice.svg"} height={32} />
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
    </main>
  );
}