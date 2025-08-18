import React, { useState } from "react";
import axios from "axios";

export default function CreateGame({ setScreen, setGameData }) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("wife");
  const [numQuestions, setNumQuestions] = useState(10);

  const handleCreate = async () => {
    const res = await axios.post("http://localhost:5000/create_game", {
      player1_name: name || "Player1",
      relationship,
      num_questions: numQuestions
    });
    setGameData(res.data);
    setScreen("game");
  };

  return (
    <div>
      <h2>Create Game</h2>
      <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
      <br /><br />
      <select value={relationship} onChange={e => setRelationship(e.target.value)}>
        <option value="wife">Wife</option>
        <option value="friend">Friend</option>
        <option value="sibling">Sibling</option>
        <option value="parent">Parent</option>
      </select>
      <br /><br />
      <input type="number" min="1" max="1000" value={numQuestions} onChange={e => setNumQuestions(e.target.value)} />
      <br /><br />
      <button onClick={handleCreate}>Start Game</button>
    </div>
  );
                                                                         }
