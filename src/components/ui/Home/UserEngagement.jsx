import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useOverAllStateQuery } from "../../../redux/apiSlices/dashboardSlice";

const userData = [
  { name: "Mo", totalUsers: 1200, activeUsers: 450 },
  { name: "Tu", totalUsers: 1100, activeUsers: 930 },
  { name: "We", totalUsers: 700, activeUsers: 560 },
  { name: "Th", totalUsers: 1400, activeUsers: 870 },
  { name: "Fr", totalUsers: 900, activeUsers: 780 },
  { name: "Sa", totalUsers: 1600, activeUsers: 1250 },
  { name: "Su", totalUsers: 1700, activeUsers: 500 },
];

const UserEngagement = () => {
  const { data: overAllState, isLoading } = useOverAllStateQuery();

  if (isLoading) {
    <h1>Loading...</h1>;
  }

  const chartData = overAllState?.data?.data;

  return (
    <div className="bg-white p-5 w-[100%] h-[300px] rounded-2xl border">
      <h2 className="font-bold mb-5">User Engagement</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" />
          <Line
            type="monotone"
            dataKey="orderCount"
            stroke="#FCE74C"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="userCount" stroke="#FFBB00" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;
