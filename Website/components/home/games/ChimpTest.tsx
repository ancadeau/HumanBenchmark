"use client";
import React, { useEffect, useState } from "react";

const ChimpTest: React.FC = () => {
  const [gameState, setGameState] = useState<"initial" | "clicking" | "result">(
    "initial"
  );
  const [level, setLevel] = useState(4);
  const [grid, setGrid] = useState<(number | null)[]>([]);
  const [currentClick, setCurrentClick] = useState(1);
  const [strikes, setStrikes] = useState(0);

  useEffect(() => {
    if (gameState === "initial" || gameState === "clicking") {
      generateGrid();
    }
  }, [gameState, level]);

  const generateGrid = () => {
    const totalSquares = 35;
    const numbers = Array.from({ length: level }, (_, i) => i + 1);
    const gridSquares = Array(totalSquares).fill(null);

    let filledIndices = new Set<number>();

    while (filledIndices.size < level) {
      const randomIndex = Math.floor(Math.random() * totalSquares);
      if (!filledIndices.has(randomIndex)) {
        filledIndices.add(randomIndex);
        gridSquares[randomIndex] = numbers[filledIndices.size - 1];
      }
    }

    setGrid(gridSquares);
  };

  const handleStart = () => {
    setGameState("clicking");
  };

  const handleSquareClick = (num: number | null, index: number) => {
    if (gameState === "clicking" && num) {
      if (num === currentClick) {
        const newGrid = [...grid];
        newGrid[index] = null;
        setGrid(newGrid);
        setCurrentClick(currentClick + 1);
        if (currentClick === level) {
          setLevel(level + 1);
          setCurrentClick(1);
          generateGrid();
        }
      } else {
        setStrikes(strikes + 1);
        if (strikes + 1 >= 3) {
          setGameState("result");
        } else {
          setCurrentClick(1);
          generateGrid();
        }
      }
    }
  };

  const sendScore = () => {
    window.parent.postMessage(
      { type: "gameEnd", score: ((level - 4)*5) },
      window.location.origin
    );
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "5px",
    width: "100%",
    height: "auto",
  };

  const squareStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2vw",
    fontWeight: "bold",
    cursor: "pointer",
    aspectRatio: "1 / 1",
    borderRadius: "5px",
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none relative bg-blue-500">
      {gameState === "initial" && (
        <div
          className="w-full h-full flex flex-col justify-center items-center text-center select-none"
          onClick={handleStart}
        >
          <div className="max-w-lg p-4">
            <h1 className="text-2xl font-bold mb-4">Chimp Test Game</h1>
            <p className="mb-4">
              Welcome to the Chimp Test! The goal of this game is to click on
              the squares in ascending numerical order. The game starts with a
              few squares, and with each level, the number of squares increases.
              If you click on a square out of order, you get a strike. You have
              three strikes before the game is over. Good luck!
            </p>
            <p className="font-bold">
              Click the screen to start the game!
            </p>
          </div>
        </div>
      )}
      {gameState === "clicking" && (
        <>
          <div className="top-4 text-2xl font-bold w-full max-w-screen-lg p-2 flex justify-between">
            <p>Life left: {3 - strikes}</p>
            <p>Score: {level - 4}</p>
          </div>
          <div className="border-4 border-blue-600 w-full max-w-screen-lg p-2">
            <div style={gridStyle}>
              {grid.map((num, index) => (
                <div
                  key={index}
                  style={{
                    ...squareStyle,
                    backgroundColor: num
                      ? currentClick > 1
                        ? "#2563EB"
                        : "#93C5FD"
                      : "transparent",
                    pointerEvents: num ? "auto" : "none",
                  }}
                  onClick={() => handleSquareClick(num, index)}
                >
                  {currentClick > 1 || !num ? "" : num}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {gameState === "result" && (
        <div
          className="w-full h-full flex flex-col justify-center items-center gap-32 bg-blue-500 text-white font-medium"
          onClick={sendScore}
        >
          <div className="text-center">
            Game Over!
            <p className="font-bold text-4xl">Level Reached: {level - 4}</p>
          </div>
          <div className="text-center">
            Click to get to the <br />
            NEXT TEST
          </div>
        </div>
      )}
    </div>
  );
};

export default ChimpTest;
