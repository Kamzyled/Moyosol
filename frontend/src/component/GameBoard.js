import React, { useState } from "react";
import axios from "axios";

export default function GameBoard({ gameData, setScreen }) {
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);

  const handleAnswer = () => {
    const ans = document.getElementById("answer").value;
    const newAnswers = [...answers, ans];
    setAnswers(newAnswers);
    document.getElementById("answer").value = "";
    if (current + 1 >= gameData.questions.length) {
      axios.post("http://localhost:5000/submit_answers", {
        game_code: gameData.game_code,
        player: "player1",
        answers: newAnswers
      }).then(() => setScreen("score"));
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div>
      <h2>Question {current + 1}/{gameData.questions.length}</h2>
      <p>{gameData.questions[current].text}</p>
      <input id="answer" placeholder="Your answer" />
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
}
