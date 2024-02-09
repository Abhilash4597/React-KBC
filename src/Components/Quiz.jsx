/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Quiz({ data, setStop, setQuestionNum, questionNum }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuestion = data[randomIndex];
    setQuestion(randomQuestion);
  }, [data, questionNum]);

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
    delay(6000, () => {
      if (question.answer === option.option) {
        setQuestionNum((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div>
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
  );
}
