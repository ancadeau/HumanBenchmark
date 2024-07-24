"use client";

import React from "react";
import { MyNavbar } from "../navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export const GameLayout = ({ children }: Props) => {
  return (
    <>
      <main className="flex flex-col h-screen">{children}</main>
    </>
  );
};
