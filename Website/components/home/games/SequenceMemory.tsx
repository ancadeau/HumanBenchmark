"use client";
import React, { useEffect, useState } from "react";

const SequenceMemory: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [gameState, setGameState] = useState<
    "initial" | "waiting" | "input" | "result"
  >("initial");
  const [gridSize, setGridSize] = useState<number>(3);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [clickedCell, setClickedCell] = useState<number | null>(null);

  useEffect(() => {
    if (points > 0 && points % 10 === 0) {
      setGridSize((prevSize) => prevSize + 1);
    }
  }, [points]);

  useEffect(() => {
    if (gameState === "waiting") {
      const newSequence = [
        ...sequence,
        Math.floor(Math.random() * (gridSize * gridSize)),
      ];
      setSequence(newSequence);
      setUserSequence([]);
      setCurrentStep(0);

      let index = 0;
      const interval = setInterval(() => {
        setCurrentStep(index);
        setTimeout(() => {
          setCurrentStep(-1); // Clear the highlight after 250ms
        }, 250);
        index++;
        if (index >= newSequence.length) {
          clearInterval(interval);
          setTimeout(() => {
            setGameState("input");
          }, 250);
        }
      }, 500); // Total time for each step: 500ms (250ms highlight + 250ms delay)
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleStartGameClick = () => {
    setSequence([Math.floor(Math.random() * (gridSize * gridSize))]);
    setGameState("waiting");
  };

  const handleGridClick = (index: number) => {
    if (gameState !== "input") return;
    setClickedCell(index);
    setTimeout(() => setClickedCell(null), 250); // Clear the highlight after 250ms
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    if (sequence[newUserSequence.length - 1] !== index) {
      setGameState("result");
    } else if (newUserSequence.length === sequence.length) {
      setPoints(points + 1);
      setGameState("waiting");
    }
  };

  const handleNextGameClick = () => {
    window.parent.postMessage(
      { type: "gameEnd", score: (points * 50) / 8.5 },
      window.location.origin
    );
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      grid.push(
        <div
          key={i}
          className={`w-16 h-16 border-2 ${
            sequence[currentStep] === i && gameState === "waiting"
              ? "bg-gray-800"
              : clickedCell === i && gameState === "input"
              ? "bg-green-400"
              : "bg-gray-300"
          } cursor-pointer`}
          onClick={() => handleGridClick(i)}
        ></div>
      );
    }
    return (
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {grid}
      </div>
    );
  };

  if (gameState === "result") {
    return (
      <div
        onClick={handleNextGameClick}
        className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5"
      >
        <h1 className="font-bold text-4xl mb-4">End of the Test</h1>
        <div className="text-center mb-6">
          <p className="text-xl mb-2">
            Your Score: <span className="font-bold">{points}</span>
          </p>
        </div>
        <div className="text-xl font-bold text-center">
          Click on the screen to go to the next game
        </div>
      </div>
    );
  }

  if (gameState === "initial") {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5"
        onClick={handleStartGameClick}
      >
        <h1 className="font-bold text-3xl mb-4">Sequence Memory Game</h1>
        <p className="text-lg text-center mb-4">
          Objective: Test and improve your sequential memory.
          <br />
          How to Play:
          <br />
          1. A sequence of flashing squares is displayed on the screen.
          <br />
          2. Try to memorize the order in which the squares flash.
          <br />
          3. Reproduce the sequence by clicking on the squares in the same
          order.
          <br />
          4. If you correctly reproduce the sequence, a new, longer sequence is
          displayed.
          <br />
          5. If you click on a square out of order, the game ends. Your final
          score is based on the number of correct sequences you memorized.
          <br />
          <br />
        </p>
        <p className="font-bold">Click on the screen to start the game.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5">
      <div className="w-full flex flex-row justify-between pr-5 pl-5 font-medium">
        <div>Points: {points}</div>
      </div>
      <div className="w-full h-3/4 flex justify-center items-center">
        {renderGrid()}
      </div>
    </div>
  );
};

export default SequenceMemory;
