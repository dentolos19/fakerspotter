class Settings {
  // uniqueId
  get uniqueId() {
    const value = localStorage.getItem("uniqueId");
    if (!value) return "";
    return value;
  }
  set uniqueId(value: string) {
    localStorage.setItem("uniqueId", value);
  }
  // score
  get score() {
    const value = localStorage.getItem("score");
    if (!value) return 0;
    return parseInt(value);
  }
  set score(value: number) {
    localStorage.setItem("score", value.toString());
  }
  // isRoom1Completed
  get isRoom1Completed() {
    const value = localStorage.getItem("room1finished");
    if (!value) return false;
    return value === "true";
  }
  set isRoom1Completed(value: boolean) {
    localStorage.setItem("room1finished", value.toString());
  }
  // isRoom2Completed
  get isRoom2Completed() {
    const value = localStorage.getItem("room2finished");
    if (!value) return false;
    return value === "true";
  }
  set isRoom2Completed(value: boolean) {
    localStorage.setItem("room2finished", value.toString());
  }
  // isRoom3Completed
  get isRoom3Completed() {
    const value = localStorage.getItem("room3finished");
    if (!value) return false;
    return value === "true";
  }
  set isRoom3Completed(value: boolean) {
    localStorage.setItem("room3finished", value.toString());
  }
}

const settings = new Settings();

export default settings;