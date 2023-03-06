// adapted from https://codepen.io/cbmunro/pen/rxbKZg

import styles from "./spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles["spinner"]}>
      <span className={styles["spinner-inner-1"]}></span>
      <span className={styles["spinner-inner-2"]}></span>
      <span className={styles["spinner-inner-3"]}></span>
    </div>
  );
}