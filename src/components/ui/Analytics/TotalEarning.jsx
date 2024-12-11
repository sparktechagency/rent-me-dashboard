import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useOverAllStateQuery } from "../../../redux/apiSlices/dashboardSlice";
import rentMeLogo from "../../../assets/navLogo.png";

const TotalEarning = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: overAllState, isLoading } = useOverAllStateQuery({
    range: selectedYear,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const chartData = overAllState?.data || [];

  // Generate years from 10 years back to 1 year ahead
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, i) => currentYear - 10 + i
  ).reverse();

  return (
    <div className="bg-white border p-5 rounded-2xl" style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Total Earning</p>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="border rounded-md px-3 py-1 cursor-pointer"
          style={{
            maxHeight: "150px",
            overflowY: "scroll",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#DE950F"
            fill="#F3E524"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalEarning;
