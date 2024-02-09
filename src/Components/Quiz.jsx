/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Quiz({ data, setimeOut, setQuestionNum, questionNum }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuestion = data[randomIndex];
    setQuestion(randomQuestion);
  }, [data, questionNum]);

  const handleClick = (option) => {
    setSelectedAnswer(option.option);
    setClassName("answer active");
    console.log(option.option);
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
                className={selectedAnswer===option.option ? className:'answer'}
                onClick={() => handleClick(option)}>
                {option.option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
