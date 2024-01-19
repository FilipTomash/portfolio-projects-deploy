import "./BarChart.css";
import { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Button from "../Button/Button";

const BarChart = () => {
  const [chartType, setChartType] = useState("bar");
  const storedTasks = JSON.parse(localStorage.getItem("completedTasks"));

  const targetDate = "2023-07-05";

  const above50 = storedTasks.filter((task) => task.date === targetDate && task.percentage >= 50).map((task) => task.percentage);
  const below50 = storedTasks.filter((task) => task.date === targetDate && task.percentage < 50).map((task) => task.percentage);
  const targetDateLabel = storedTasks.filter((task) => task.date === targetDate).map((task) => task.date);
  console.log(targetDateLabel);
  console.log(above50);
  console.log(below50);
  // Dummy data for the chart
  const data = {
    labels: [...targetDateLabel],
    datasets: [
      {
        label: "Grades over 50%",
        data: [...above50],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Grades below 49%",
        data: [...below50],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  const handleChartToggle = () => {
    setChartType((prevChartType) => (prevChartType === "bar" ? "doughnut" : "bar"));
  };

  return (
    <div className="bar-chart">
      <h2>Basic Performance Chart</h2>
      {chartType === "bar" ? <Bar data={data} options={options} /> : <Doughnut data={data} options={options} />}
      <Button onBtnClick={handleChartToggle} btnText="Toggle Chart" className="toggleChartBtn" />
    </div>
  );
};

export default BarChart;
