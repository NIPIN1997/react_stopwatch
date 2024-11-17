import styles from "../styles/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faPlay,
  faStop,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export function Home() {
  const second = useRef(0);
  const minute = useRef(0);
  const hour = useRef(0);

  const [secondString, setSecondString] = useState("00");
  const [minuteString, setMinuteString] = useState("00");
  const [hourString, setHourString] = useState("00");
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const stopStyle = {
    backgroundColor: "red",
    color: "white",
  };

  const resumeStyle = {
    backgroundColor: "yellow",
    color: "black",
  };

  const [buttonStyle, setButtonStyle] = useState(stopStyle);

  let interval = useRef();

  const startCount = () => {
    interval.current = setInterval(() => {
      second.current = second.current + 1;
      if (second.current === 60) {
        second.current = 0;
        minute.current = minute.current + 1;
      }
      if (minute.current === 60) {
        minute.current = 0;
        hour.current = hour.current + 1;
      }
      if (hour.current === 24) {
        clearInterval(interval.current);
        reset();
      }
      if (second.current < 10) {
        setSecondString(`0${second.current}`);
      } else {
        setSecondString(second.current);
      }
      if (minute.current < 10) {
        setMinuteString(`0${minute.current}`);
      } else {
        setMinuteString(minute.current);
      }
      if (hour.current < 10) {
        setHourString(`0${hour.current}`);
      } else {
        setHourString(hour.current);
      }
    }, 1000);
  };

  const start = () => {
    startCount();
    setIsRunning(true);
    setIsStarted(true);
    setIsStopped(false);
  };

  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(interval.current);
      setButtonStyle(resumeStyle);
      setIsStopped(true);
    } else {
      setIsRunning(true);
      startCount();
      setButtonStyle(stopStyle);
      setIsStopped(false);
    }
  };

  const reset = () => {
    second.current = 0;
    minute.current = 0;
    hour.current = 0;
    setSecondString("00");
    setMinuteString("00");
    setHourString("00");
    setIsStarted(false);
    setIsRunning(false);
    setButtonStyle(stopStyle);
    setIsStopped(true);
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>
          Stop Watch <FontAwesomeIcon icon={faStopwatch} fade />
        </h1>
      </div>
      <div className={styles.display}>
        <div>{hourString}</div>
        <div>:</div>
        <div>{minuteString}</div>
        <div>:</div>
        <div>{secondString}</div>
      </div>
      <div className={styles.buttonsDiv}>
        <button
          onClick={start}
          className={styles.buttons}
          style={{ backgroundColor: "#3cf042" }}
          disabled={isStarted}
        >
          Start <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          onClick={pause}
          className={styles.buttons}
          style={buttonStyle}
          disabled={!isStarted}
        >
          {isStopped && isStarted ? (
            <>
              Resume <FontAwesomeIcon icon={faPlay} />
            </>
          ) : (
            <>
              Stop <FontAwesomeIcon icon={faStop} />
            </>
          )}
        </button>
        <button
          onClick={reset}
          className={styles.buttons}
          style={{ backgroundColor: "white", color: "black" }}
          disabled={!(isStopped && isStarted)}
        >
          Reset <FontAwesomeIcon icon={faRotateRight} spin />
        </button>
      </div>
    </div>
  );
}
