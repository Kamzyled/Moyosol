import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [gameData, setGameData] = useState(null);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {screen === "welcome" && <WelcomeScreen setScreen={setScreen} />}
      {screen === "create" && <CreateGame setScreen={setScreen} setGameData={setGameData} />}
      {screen === "join" && <JoinGame setScreen={setScreen} setGameData={setGameData} />}
      {screen === "game" && <GameBoard gameData={gameData} setScreen={setScreen} />}
      {screen === "score" && <ScoreBoard gameData={gameData} />}
    </div>
  );
}

export default App;
