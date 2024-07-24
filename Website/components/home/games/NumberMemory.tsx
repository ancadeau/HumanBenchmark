"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";

// 4 screens -> initial -> number showing -> user input -> result when failed

const NumberMemory: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [gameState, setGameState] = useState<
    "initial" | "waiting" | "input" | "result"
  >("initial");
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");

  const generateRandomNumber = (nbOfDigits: number) => {
    let number = "";
    for (let i = 0; i < nbOfDigits + 1; i++) {
      number += Math.floor(Math.random() * 10);
    }
    setCurrentNumber(number);
  };

  useEffect(() => {
    if (gameState === "waiting") {
      generateRandomNumber(points);
      setTimeout(() => {
        setGameState("input");
      }, 2000);
    }
  }, [gameState, points]);

  const handleStartGameClick = () => {
    setGameState("waiting");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleInputSubmit = () => {
    if (userInput === currentNumber) {
      setPoints(points + 1);
      setUserInput("");
      setGameState("waiting");
    } else {
      setGameState("result");
    }
  };

  const handleNextGameClick = () => {
    window.parent.postMessage(
      { type: "gameEnd", score: (points * 50) / 7 },
      window.location.origin
    );
  };

  if (gameState === "result") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5" onClick={handleNextGameClick}>
        <h1 className="font-bold text-4xl mb-4">End of the Test</h1>
        <div className="text-center mb-6">
          <p className="text-xl mb-2">
            Your Score: <span className="font-bold">{points}</span>
          </p>
          <p className="text-lg mb-1">
            The correct number was:{" "}
            <span className="font-bold">{currentNumber}</span>
          </p>
          <p className="text-lg mb-1">
            You guessed: <span className="font-bold">{userInput}</span>
          </p>
        </div>
        <div
          className="text-xl font-bold text-center"
        >
          Click on the screen to go to the next game
        </div>
      </div>
    );
  }

  if (gameState === "initial") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5">
        <h1 className="font-bold text-3xl mb-4">Number Memory Game</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded border-1 border-white hover:bg-blue-700"
          onClick={handleStartGameClick}
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "waiting") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5">
        <h1 className="font-bold text-3xl mb-4">{currentNumber}</h1>
      </div>
    );
  }

  if (gameState === "input") {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center select-none bg-blue-500 text-white py-5">
        <div className="w-full flex flex-row justify-between pr-5 pl-5 font-medium">
          <div className="">Points: {points}</div>
        </div>
        <div className="font-semibold text-lg flex flex-col">
          <div className="flex mb-2">What was the number?</div>
          <Input
            autoFocus
            type="number"
            className="w-full"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputSubmit();
              }
            }}
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-neutral-900 font-medium rounded"
            onClick={handleInputSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default NumberMemory;
