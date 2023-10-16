import React from "react";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import PieChart from "./charts/PieChart";

function Dashboard() {
  const data = [
    {
      property: "a",
      value: "10",
    },
    {
      property: "b",
      value: "20",
    },
    {
      property: "c",
      value: "35",
    },
    {
      property: "d",
      value: "15",
    },
    {
      property: "e",
      value: "25",
    },
  ];

  return (
    <div className="App">
      <div className="d-flex">
        <div className="col-6">
          <div className="chart-container">
            <BarChart data={data} height={200} />
          </div>
        </div>
        <div className="col-6">
          <div className="chart-container">
            <DonutChart data={data} height={200} />
          </div>
        </div>
        <div className="col-6">
          <div className="chart-container">
            <PieChart data={data} height={200} />
          </div>
        </div>
      </div>
      <div className="d3-tooltip" />
    </div>
  );
}
export default Dashboard;
