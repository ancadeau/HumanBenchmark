"use client";
import React, { useEffect, useState} from "react";
import { Input } from "@nextui-org/input";

// 4 screens -> initial -> number showing -> user input -> result when failed

const WordMemory: React.FC = () => {
  const [points, setPoints] = React.useState<number>(1);
  const [gameState, setGameState] = useState<
    "initial" | "waiting" | "input" | "result"
  >("initial");

  const RandomNumberGenerator = (nbOfNb: number) => {
    //generate random number of nbOfNb digits
    let number = "";
    for (let i = 0; i < nbOfNb; i++) {
      number += Math.floor(Math.random() * 10);
    }
  };

  React.useEffect(() => {}, []);

  const handleNextGameClick = () => {
    window.parent.postMessage(
      { type: "gameEnd", score: points },
      window.location.origin
    );
  };

  if (gameState === "result") {
    return (
      <div onClick={handleNextGameClick}>
        <h1>End of the test</h1>
        <p>Your score: {points}</p>
        <p>Click to go to the next game</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none bg-blue-500 text-white  py-5">
      <div className="w-full flex flex-row justify-between pr-5 pl-5 font-medium">
        <div className="">Points: {points}</div>
      </div>

      <div className="font-semibold font-size-l flex flex-col">
        <div className="flex">Current Word: </div>
        <div className="flex">{words[currentWordIndex]}</div>
      </div>
    </div>
  );
};

export { WordMemory };
