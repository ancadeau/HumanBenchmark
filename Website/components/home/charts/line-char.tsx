"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Dataset {
  label: string;
  data: number[];
}

interface SkillChartProps {
  datasets: Dataset[];
  labels: string[];
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomColors = () => {
  const borderColor = getRandomColor();
  const backgroundColor = borderColor + "33"; // Adding 33 for alpha transparency
  const pointBackgroundColor = borderColor;
  const pointBorderColor = "#fff";
  const pointHoverBackgroundColor = "#fff";
  const pointHoverBorderColor = borderColor;

  return {
    backgroundColor,
    borderColor,
    pointBackgroundColor,
    pointBorderColor,
    pointHoverBackgroundColor,
    pointHoverBorderColor,
  };
};

const LineChart: React.FC<SkillChartProps> = ({ datasets, labels }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("line-chart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const preparedDatasets = datasets.map((dataset) => {
      const colors = generateRandomColors();
      return {
        ...dataset,
        ...colors,
      };
    });

    chartRef.current = new Chart(ctx!, {
      type: "line",
      data: {
        labels: labels,
        datasets: preparedDatasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [datasets, labels]);

  return (
    <canvas
      id="line-chart"
      width="800"
      height="500"
      style={{ display: "block", maxWidth: "800px", maxHeight: "500px" }}
    />
  );
};

export default LineChart;
