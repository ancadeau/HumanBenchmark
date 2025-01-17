"use client";
import { CatchPhrase } from "@/components/icons/CatchPhrase";
import { DownArrowIcon } from "@/components/icons/DownArrowIcon";
import React, { useState, useEffect } from "react";
import Spiderman from "../charts/skill-chart";

interface Games {
  name: string;
  url: string;
  backendName: string;
}

const games: Games[] = [
  { name: "Speed Test", url: "/games/speedTest", backendName: "speedTest" },
  { name: "Word Memory", url: "/games/wordMemory", backendName: "wordMemory" },
  { name: "Chimp Test", url: "/games/chimpTest", backendName: "chimpTest" },
  { name: "Number Memory", url: "/games/numberMemory", backendName: "numberMemory" },
  { name: "Sequence Memory", url: "/games/sequenceMemory", backendName: "sequenceMemory" },
];

const GameHandler: React.FC = () => {
  const [isGameLaunched, setIsGameLaunched] = useState(false);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const handleGameEnd = (score: number) => {
    console.log("New score received", score);
    const game = games[currentGameIndex];
    setScores((prevScores) => ({ ...prevScores, [game.name]: score }));

    if (currentGameIndex < games.length) {
      setCurrentGameIndex(currentGameIndex + 1);
    } else {
      // All games finished
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

  if (currentGameIndex >= games.length) {
    // All games are finished, show results page
    const dataset = {
      label: 'Scores',
      data: games.map((game) => scores[game.name] || 0),
    };

    return (
      <div className="section w-full flex flex-col items-center justify-center bg-blue-500 text-white">
        <h1 className="text-2xl mb-4">Results</h1>
        <Spiderman datasets={[dataset]} />
      </div>
    );
  }

  return (
    <div className="section w-full">
      {isGameLaunched ? (
        <iframe src={"/wdp/Group3" + games[currentGameIndex].url + ".html"} className="w-full h-full" />
      ) : (
        <div
          className="w-full h-full flex flex-col justify-between items-center bg-blue-500"
          onClick={() => setIsGameLaunched(true)}
        >
          <div className="pt-100"></div>
          <CatchPhrase className="flex-grow flex flex-col justify-center items-center h-1/2 w-1/2" />
          <div className="flex flex-col justify-end items-center w-full p-4 text-white">
            Click to START
            <DownArrowIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHandler;
