"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

const SpeedTest: React.FC = () => {
  const [gameState, setGameState] = useState<
    "initial" | "waiting" | "click" | "result"
  >("initial");
  const [randomTime, setRandomTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [clickTime, setClickTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "waiting") {
      const randomDelay = Math.floor(Math.random() * 5000) + 2000;
      setRandomTime(randomDelay);
      timer = setTimeout(() => {
        setStartTime(Date.now());
        setGameState("click");
      }, randomDelay);
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleStart = () => {
    setGameState("waiting");
  };

  const handleClick = () => {
    if (gameState === "click") {
      const endTime = Date.now();
      const clickDuration = endTime - startTime;
      setClickTime(clickDuration);
      setGameState("result");
      window.parent.postMessage(
        { type: "gameEnd", score: clickDuration },
        window.location.origin
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {gameState === "initial" && <Button onClick={handleStart}>Start</Button>}
      {gameState === "waiting" && (
        <div className="w-full h-full" style={{ backgroundColor: "red" }}></div>
      )}
      {gameState === "click" && (
        <div
          className="w-full h-full"
          style={{ backgroundColor: "green" }}
          onClick={handleClick}
        ></div>
      )}
      {gameState === "result" && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>Time to click: {clickTime} ms</p>
        </div>
      )}
    </div>
  );
};

export default SpeedTest;