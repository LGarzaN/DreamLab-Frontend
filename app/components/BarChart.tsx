import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler );

function BarChart({
    labels,
    datasets,
  }: {
    labels: [string, string, string, string, string];
    datasets: [number, number, number, number, number];
  }) {
    const data = {
        labels: labels,
        datasets: [
          {
            data: datasets,
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(255, 159, 64)",
              "rgba(255, 205, 86)",
              "rgba(75, 192, 192)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
            ],
            borderWidth: 1,
            barPercentage: 0.6,
            borderRadius: {
              topLeft: 2,
              topRight: 2,
            },
          },
        ],
      };
      const options = {
        scales: {
          y: {
            title: {
              display: false,
              text: "Y-axis Lable",
            },
            display: true,
            beginAtZero: true,
            max: 50,
            color: "white",
          },
          x: {
            title: {
              display: false,
              text: "x-axis Lable",
            },
            display: true,
          },
        },
      };

  return (
    <div>
      <Bar data={data} options={options} className='h-[200px]' />
    </div>
  )
}

export default BarChart
