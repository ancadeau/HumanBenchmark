"use client";
import React, { useState } from "react";
import Spiderman from "../home/charts/skill-chart";
import LineChart from "../home/charts/line-char";
import { Avatar } from "@nextui-org/react";

export const Profile = () => {
  const [name, setName] = useState("TestUser");
  const spidermanDatasets = [
    {
      label: "1st test",
      data: [10, 20, 30, 40, 50], // Example data, replace with actual data
    },
    {
      label: "2nd test",
      data: [30, 40, 50, 60, 70], // Example data, replace with actual
    },
    {
      label: "3rd test",
      data: [50, 60, 70, 80, 90], // Example data, replace with actual
    },
  ];

  const lineChartDatasets = [
    {
      label: "Score Evolution",
      data: [10, 50, 30, 23, 80], // Example data, replace with actual data
    },
  ];
  const lineChartLabels = ["Test1", "Test2", "Test3", "Test4", "Test5"];

  return (
    <div className="w-full h-full bg-blue-500 text-white">

      <div className="flex flex-row bg-white text-gray-800">
        <Avatar isBordered color="default" size="md" src="profile.png" />
        <h1>{name}</h1>
      </div>
      <br/>
      <div className="flex flew-row bg-white justify-between">
        <Spiderman datasets={spidermanDatasets} />
        <LineChart datasets={lineChartDatasets} labels={lineChartLabels} />
      </div>
    </div>
  );
};
