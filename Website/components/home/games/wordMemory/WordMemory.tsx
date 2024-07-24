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

  const randomizeWords = (words: string[]) => {
    // Fisher-Yates shuffle algorithm
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
      { type: "gameEnd", score: (points*50)/30 },
      window.location.origin
    );
  };

  if (gameOver) {
    return (
      <div onClick={handleNextGameClick}>
        <h1>End of the test</h1>
        <p>Your score: {points}</p>
        <p>Click to go to the next game</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none bg-blue-500 text-white  py-5">
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
