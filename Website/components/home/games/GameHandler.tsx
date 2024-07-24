"use client";
import { CatchPhrase } from "@/components/icons/CatchPhrase";
import { DownArrowIcon } from "@/components/icons/DownArrowIcon";
import React, { useState, useEffect } from "react";

interface Games {
  name: string;
  url: string;
  backendName: string;
}

const games: Games[] = [
  { name: "Chimp Test", url: "/games/chimpTest", backendName: "chimpTest" },
  // { name: "Word Memory", url: "/games/wordMemory", backendName: "wordMemory" },
  // { name: "Speed Test", url: "/games/speedTest", backendName: "speedTest" },
  // { name: "Reaction Test", url: "/app/reactionTest", backendName: "reactionTest" },
];

const GameHandler: React.FC = () => {
  const [isGameLaunched, setIsGameLaunched] = useState(false);
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
    <div className="section w-full">
      {isGameLaunched ? (
        <iframe src={games[currentGameIndex].url} className="w-full h-full" />
      ) : (
        <div
          className="w-full h-full flex flex-col justify-between items-center bg-blue-500"
          onClick={() => setIsGameLaunched(true)}
        >
          <div className="pt-100"></div>
          <CatchPhrase className="flex-grow flex flex-col justify-center items-center" />
          <div className="flex flex-col justify-end items-center w-full p-4 text-white color">
            Click to START
            <DownArrowIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHandler;
