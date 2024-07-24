"use client";
import React from "react";
import gameWords from "./words";
import { Button } from "@nextui-org/button";

const WordMemory: React.FC = () => {
  const [words, setWords] = React.useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = React.useState<number>(0);
  const [seenWords, setSeenWords] = React.useState<string[]>([]);
  const [lives, setLives] = React.useState<number>(3);
  const [points, setPoints] = React.useState<number>(0);
  const [availableWords, setAvailableWords] = React.useState<string[]>([]);
  const [gameOver, setGameOver] = React.useState<boolean>(false);
  const [gameState, setGameState] = React.useState<"initial" | "playing" | "result">("initial");

  const randomizeWords = (words: string[]) => {
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
  };

  React.useEffect(() => {
    const initialWords = gameWords.gameWords.slice(0, 10);
    setAvailableWords(gameWords.gameWords.slice(10));
    setWords(randomizeWords([...initialWords]));
  }, []);

  const handleNewButtonClick = () => {
    if (!seenWords.includes(words[currentWordIndex])) {
      setSeenWords((prevSeenWords) => [
        ...prevSeenWords,
        words[currentWordIndex],
      ]);
      setPoints((prevPoints) => prevPoints + 1);
      addNewWords();
    } else {
      if (lives - 1 === 0) {
        setGameOver(true);
        setGameState("result");
      }
      setLives((prevLives) => prevLives - 1);
    }
    goToNextWord();
  };

  const handleSeenButtonClick = () => {
    if (seenWords.includes(words[currentWordIndex])) {
      setPoints((prevPoints) => prevPoints + 1);
      addNewWords();
    } else {
      if (lives - 1 === 0) {
        setGameOver(true);
        setGameState("result");
      }
      setLives((prevLives) => prevLives - 1);
    }
    goToNextWord();
  };

  const goToNextWord = () => {
    setCurrentWordIndex(Math.floor(Math.random() * words.length));
  };

  const addNewWords = () => {
    if (availableWords.length > 0) {
      const newWords = availableWords.slice(0, 2);
      setAvailableWords((prevAvailableWords) => prevAvailableWords.slice(2));
      setWords((prevWords) => randomizeWords([...prevWords, ...newWords]));
    }
  };

  const handleNextGameClick = () => {
    window.parent.postMessage(
      { type: "gameEnd", score: (points * 50) / 30 },
      window.location.origin
    );
  };

  const handleStartGameClick = () => {
    setGameState("playing");
  };

  if (gameState === "initial") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5">
        <h1 className="font-bold text-3xl mb-4">Word Memory Game</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded border-1 border-white hover:bg-blue-700"
          onClick={handleStartGameClick}
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "result") {
    return (
      <div
        onClick={handleNextGameClick}
        className="w-full h-full flex flex-col justify-center items-center select-none bg-blue-500 text-white py-5 cursor-pointer"
      >
        <h1 className="font-bold text-4xl mb-4">End of the Test</h1>
        <div className="text-center mb-6">
          <p className="text-xl mb-2">
            Your Score: <span className="font-bold">{points}</span>
          </p>
          <p className="text-lg mb-1">Click to go to the next game</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none bg-blue-500 text-white py-5">
      <div className="w-full flex flex-row justify-between pr-5 pl-5 font-medium">
        <div className="">Lives: {lives}</div>
        <div className="">Points: {points}</div>
      </div>

      <div className="font-semibold font-size-l flex flex-col">
        <div className="flex">Current Word: </div>
        <div className="flex">{words[currentWordIndex]}</div>
      </div>

      <div className="flex gap-8 w-full px-8 pb-4">
        <Button
          className="bg-white text-neutral-900 font-medium w-full h-16"
          onClick={handleNewButtonClick}
          disabled={lives <= 0}
        >
          New
        </Button>
        <Button
          className="bg-white text-neutral-900 font-medium w-full h-16"
          onClick={handleSeenButtonClick}
          disabled={lives <= 0}
        >
          Seen
        </Button>
      </div>
    </div>
  );
};

export { WordMemory };
