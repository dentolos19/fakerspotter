export function getScore() {
  const value = localStorage.getItem("score");
  if (!value) {
    return 0;
  }
  return parseInt(value);
}

export function setScore(value: number) {
  localStorage.setItem("score", value.toString());
}