"use client";
import React, { useState, useEffect } from "react";

interface Games {
  name: string;
  url: string;
  backendName: string;
}

const games: Games[] = [
  { name: "Speed Test", url: "/games/speedTest", backendName: "speedTest" },
  // { name: "Memory Game", url: "/app/memoryGame", backendName: "memoryGame" },
  // { name: "Reaction Test", url: "/app/reactionTest", backendName: "reactionTest" },
];

const GameHandler: React.FC = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const handleGameEnd = (score: number) => {
    console.log("New score received", score);
    const game = games[currentGameIndex];
    setScores((prevScores) => ({ ...prevScores, [game.name]: score }));

    if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
    } else {
      // All games finished, send scores to backend
      console.log("Scores", scores);
    }
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { type, score } = event.data;
      if (type === "gameEnd") {
        handleGameEnd(score);
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [currentGameIndex, scores]);

  return (
    <iframe src={games[currentGameIndex].url} className="section bg-red-100 w-full" />
  );
};

export default GameHandler;
