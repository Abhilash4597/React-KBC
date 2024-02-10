import { useEffect, useState } from "react";

export default function Timer({ setStop, questionNum, quizStarted }) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!quizStarted) return; // Do not start the timer if the quiz has not started
    if (timer === 0) return setStop(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setStop, timer, quizStarted]);

  useEffect(() => {
    if (quizStarted) {
      setTimer(60);
    }
  }, [questionNum, quizStarted]);

  return timer;
}
