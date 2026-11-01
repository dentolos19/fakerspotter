const awards = [
  { minimum: 1000, title: "Cyberwellness Arcane Champion", image: "/icon.png" },
  { minimum: 800, title: "Cyberwellness Champion", image: "/assets/champion.svg" },
  { minimum: 600, title: "Cyberwellness Master", image: "/assets/master.svg" },
  { minimum: 400, title: "Cyberwellness Apprentice", image: "/assets/apprentice.svg" },
];

export function awardFor(score: number) {
  return awards.find((award) => score >= award.minimum) ?? { title: "Cyberwellness Novice", image: "/assets/novice.svg" };
}
