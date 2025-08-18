import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ScoreBoard({ gameData }) {
  const [score, setScore] = useState({score:0,total:0});

  useEffect(() => {
    axios.get(`http://localhost:5000/score/${gameData.game_code}`)
      .then(res => setScore(res.data));
  }, [gameData.game_code]);

  return (
    <div>
