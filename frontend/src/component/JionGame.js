import React, { useState } from "react";
import axios from "axios";

export default function JoinGame({ setScreen, setGameData }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleJoin = async () => {
    const res = await axios.post("http://localhost:5000/join_game", {
      player2_name: name || "Player2",
      game_code: code
    });
    setGameData(res.data);
    setScreen("game");
  };

  return (
    <div>
      <h2>Join Game</h2>
      <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Game Code" value={code} onChange={e => setCode(e.target.value)} />
      <br /><br />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
    }
