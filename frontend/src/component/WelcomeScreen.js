import React from "react";

export default function WelcomeScreen({ setScreen }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Moyosola</h1>
      <p>Created with love by Kamzy ❤️</p>
      <button onClick={() => setScreen("create")} style={{ margin: "10px", padding: "10px 20px" }}>Create Game</button>
      <button onClick={() => setScreen("join")} style={{ margin: "10px", padding: "10px 20px" }}>Join Game</button>
    </div>
  );
}
