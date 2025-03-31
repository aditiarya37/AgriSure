import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import PieChart from "./Graphs/PieChart";
import CircularGraph from "./Graphs/CicularGraph";
import LineChart from "./Graphs/LineChart";
import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Card title="Crop Health">
          <PieChart />
        </Card>
        <Card title="Weather Report">
          <CircularGraph />
        </Card>
        <Card title="Crop Recommendation">
          <LineChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;