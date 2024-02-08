import { useEffect, useState } from "react"

export default function Quiz({data , setimeOut , setQuestionNum , questionNum}) {

    const [questions , setQuestions] = useState(null);

    useEffect(()=>{
        setQuestions(data[Math.floor(Math.random() *40)]);
    },[data, questionNum])


  return (
    <div className="quiz">
        {questions ?questions.map((question,id)=>{
            return <div key={id}>
            <div className="questions">{question.question}</div>
            <div className="answers">
                <div className="answer">Abhilash Singh</div>
                <div className="answer">Abhilash Singh</div>
                <div className="answer">Abhilash Singh</div>
                <div className="answer">Abhilash Singh</div>
            </div>
            </div>
        })}
        
    </div>
  )
}
