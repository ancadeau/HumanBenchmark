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
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
  };

  const handleClick = () => {
    if (gameState === "click") {
      const endTime = Date.now();
      const clickDuration = endTime - startTime;
      setClickTime(clickDuration);
      setGameState("result");
    }
  };

  const sendScore = () => {
    let scaledScore = 100 - (clickTime * 50) / 273;
    scaledScore = scaledScore < 0 ? 0 : scaledScore;
    window.parent.postMessage(
      { type: "gameEnd", score: scaledScore },
      window.location.origin
    );
  };

  const pressOnRed = () => {
    setErrorMessage("You clicked too early");
    setGameState("initial");
  };

  if (gameState === "initial") {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5"
        onClick={handleStart}
      >
        {errorMessage && (
          <div className="text-red-500 mb-4 font-bold">{errorMessage}</div>
        )}
        <h1 className="font-bold text-3xl mb-4">Speed Test Game</h1>
        <p className="text-lg text-center mb-4">
          Objective: Test and improve your reaction time.
          <br />
          How to Play:
          <br />
          1. The game begins by displaying a message instructing you to wait
          until the screen turns green.
          <br />
          2. The screen is initially red. During this phase, you need to stay
          alert and ready to click as soon as the screen changes color.
          <br />
          3. At a random moment, the screen will turn green. As soon as you see
          the green screen, click as quickly as possible.
          <br />
          4. The game measures the time between the screen turning green and
          your click. This time is displayed in milliseconds.
          <br />
          5. After clicking, the game will show your reaction time. Use this
          feedback to track your progress and try to improve your reaction time
          with each attempt.
          <br />
          <br />
        </p>
        <p className="font-bold">Click on the screen to start the game.</p>
      </div>
    );
  }

  if (gameState === "waiting") {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-32 bg-red-500 text-white font-medium"
        onClick={pressOnRed}
      >
        <EclairIcon />
        <div className="text-center">
          Click when the screen turns
          <p className="text-lime-400 font-bold">GREEN</p>
        </div>
      </div>
    );
  }

  if (gameState === "click") {
    return (
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
    );
  }

  if (gameState === "result") {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-32 bg-blue-500 text-white font-medium"
        onClick={sendScore}
      >
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
    );
  }

  return null;
};

export default SpeedTest;
