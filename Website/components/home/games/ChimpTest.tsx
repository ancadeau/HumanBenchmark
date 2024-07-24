"use client";
import React, { useEffect, useState } from "react";
import { EclairIcon } from "@/components/icons/EclairIcon";

const ChimpTest: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<
    "initial" | "showing" | "clicking" | "result"
  >("initial");

  const sendScore = () => {
    window.parent.postMessage(
      { type: "gameEnd", score: level - 1 },
      window.location.origin
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none">
    </div>
  );
};

export default ChimpTest;