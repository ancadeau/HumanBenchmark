import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Dataset {
  label: string;
  data: number[];
}

interface SkillChartProps {
  datasets: Dataset[];
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

const Spiderman: React.FC<SkillChartProps> = ({ datasets }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById(
      "spiderman-chart"
    ) as HTMLCanvasElement;
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
      type: "radar",
      data: {
        labels: [
          "Reaction Time",
          "Word Memory",
          "Number Memory",
          "Sequence Memory",
          "Chimp Test",
        ],
        datasets: preparedDatasets,
      },
      options: {
        scales: {
          r: {
            suggestedMin: 0,
          },
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [datasets]);

  return (
    <div>
      <canvas
        id="spiderman-chart"
        width="500"
        height="500"
        style={{ display: "block", maxWidth: "500px", maxHeight: "500px" }}
      ></canvas>
    </div>
  );
};

export default Spiderman;
