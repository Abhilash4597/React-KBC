import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Quiz from "./Components/Quiz";
import data from "./Data/data.json";
import Start from "./Components/Start";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("0");

  // console.log(data[0].question)

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "1000" },
        { id: 2, amount: "2000" },
        { id: 3, amount: "3000" },
        { id: 4, amount: "5000" },
        { id: 5, amount: "10000" },
        { id: 6, amount: "20000" },
        { id: 7, amount: "40000" },
        { id: 8, amount: "80000" },
        { id: 9, amount: "160000" },
        { id: 10, amount: "320000" },
        { id: 11, amount: "640000" },
        { id: 12, amount: "1250000" },
        { id: 13, amount: "2500000" },
        { id: 14, amount: "5000000" },
        { id: 15, amount: "10000000" },
        { id: 16, amount: "70000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNum > 1 &&
      setEarned(
        moneyPyramid.find((money) => money.id === questionNum - 1).amount
      );
  }, [questionNum, moneyPyramid]);

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned : {earned} </h1>
            ) : (
              <>
                <div className="top"></div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    setQuestionNum={setQuestionNum}
                    questionNum={questionNum}
                  />
                </div>
              </>
            )}
          </div>

          <div className="money">
            <ul className="money_list">
              {moneyPyramid.map((item, id) => {
                return (
                  <li
                    className={
                      questionNum === item.id
                        ? "money_list_item active"
                        : "money_list_item"
                    }
                    key={id}>
                    <span className="money_list_item_number">{item.id}</span>
                    <span className="money_list_item_amount">
                      {item.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
