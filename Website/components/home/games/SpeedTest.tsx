"use client";
import React, { useEffect, useState } from "react";
import { EclairIcon } from "@/components/icons/EclairIcon";
import { BigNowPhrase } from "@/components/icons/BigNowPhrase";

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
    <div className="w-full h-full flex flex-col justify-center items-center select-none">
      {gameState === "initial" && <div onClick={handleStart}>Start</div>}
      {gameState === "waiting" && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-32 bg-red-500 text-white font-medium">
          <EclairIcon />
          <div className="text-center">
            Click when the screen turns
            <p className="text-lime-400 font-bold">GREEN</p>
          </div>
        </div>
      )}
      {gameState === "click" && (
        <div
          className="w-full h-full flex flex-col justify-center items-center gap-32 bg-green-500 text-white font-medium"
          onClick={handleClick}
        >
          <EclairIcon />
          <div className="text-center">
            CLICK THE SCREEN
            <BigNowPhrase />
          </div>
        </div>
      )}
      {gameState === "result" && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-32 bg-blue-500 text-white font-medium">
          <EclairIcon />
          <div className="text-center">
            You clicked in:
            <p className="font-bold text-4xl">{clickTime} ms</p>
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

export default SpeedTest;