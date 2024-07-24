"use client";
import React from "react";
import GameHandler from "./games/GameHandler";

export const Content = () => {
  return (
    <div className="scroll-container">
      <GameHandler />
      <div className="section bg-blue-700">Section 2</div>
    </div>
  );
};
