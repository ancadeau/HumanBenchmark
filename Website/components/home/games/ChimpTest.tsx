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
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("Wrong square clicked!");
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
      { type: "gameEnd", score: level - 1 },
      window.location.origin
    );
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "10px",
  };

  const squareStyle = {
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none">
      {gameState === "initial" && (
        <div
          className="w-full h-full flex flex-col justify-center items-center select-none"
          onClick={handleStart}
        >
          {errorMessage === "" ? (
            ""
          ) : (
            <div className="text-red-500">{errorMessage}</div>
          )}
          Start the game
        </div>
      )}
      {gameState === "clicking" && (
        <div style={gridStyle}>
          {grid.map((num, index) => (
            <div
              key={index}
              style={{
                ...squareStyle,
                backgroundColor: num
                  ? currentClick > 1
                    ? "gray"
                    : "white"
                  : "transparent",
                pointerEvents: num ? "auto" : "none",
              }}
              onClick={() => handleSquareClick(num, index)}
            >
              {currentClick > 1 || !num ? "" : num}
            </div>
          ))}
        </div>
      )}
      {gameState === "result" && (
        <div
          className="w-full h-full flex flex-col justify-center items-center gap-32 bg-blue-500 text-white font-medium"
          onClick={sendScore}
        >
          <div className="text-center">
            Game Over!
            <p className="font-bold text-4xl">Level Reached: {level - 1}</p>
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