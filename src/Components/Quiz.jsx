/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import correctSound from "../sounds/correct.mp3";
import playSound from "../sounds/play.mp3";
// import waitSound from "../sounds/wait.mp3";
import wrongSound from "../sounds/wrong.mp3";
import Timer from "./Timer";

export default function Quiz({ data, setStop, setQuestionNum, questionNum }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  function play() {
    new Audio(playSound).play();
  }
  function correct() {
    new Audio(correctSound).play();
  }
  function wrong() {
    new Audio(wrongSound).play();
  }
  //   function wait() {
  //     new Audio(waitSound).play();
  //   }

  useEffect(() => {
    play();
    setQuizStarted(true);
  }, []); // Empty dependency array runs this effect once when the component mounts

  useEffect(() => {
    if (quizStarted) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuestion = data[randomIndex];
      setQuestion(randomQuestion);
    }
  }, [quizStarted, data, questionNum]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (question, option) => {
    setSelectedAnswer(option.option);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(
        question.answer === option.option ? "answer correct" : "answer wrong"
      )
    );
    delay(5000, () => {
      if (question.answer === option.option) {
        correct();
        delay(1000, () => {
          setQuestionNum((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrong();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div>
      {quizStarted && (
        <div>
          <div className="timer">
            <Timer
              setStop={setStop}
              questionNum={questionNum}
              quizStarted={quizStarted}
            />
          </div>

          {question && (
            <div className="quiz">
              <div className="questions">{question.question}</div>
              <div className="answers">
                {question.options.map((option, id) => (
                  <div
                    key={id}
                    className={
                      selectedAnswer === option.option ? className : "answer"
                    }
                    onClick={() => handleClick(question, option)}>
                    {option.option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
