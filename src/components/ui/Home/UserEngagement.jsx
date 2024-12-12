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
import rentMeLogo from "../../../assets/navLogo.png";

const UserEngagement = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const {
    data: overAllState,
    isLoading,
    refetch,
  } = useOverAllStateQuery({ range: selectedYear }, { skip: false });

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const chartData = overAllState?.data;

  return (
    <div className="bg-white p-5 w-[100%] h-[300px] rounded-2xl border">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold">User Engagement</h2>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-md px-3 py-2 w-32 cursor-pointer"
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
            }}
          >
            {years
              .slice()
              .reverse()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>
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
