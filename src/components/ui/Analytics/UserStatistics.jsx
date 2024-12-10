import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useOverAllStateQuery } from "../../../redux/apiSlices/dashboardSlice";

const data = [
  { name: "Jan", earning: 4000 },
  { name: "Feb", earning: 3000 },
  { name: "Mar", earning: 2000 },
  { name: "Apr", earning: 3780 },
  { name: "May", earning: 1890 },
  { name: "Jun", earning: 3390 },
  { name: "Jul", earning: 2490 },
];

const UserStatistics = () => {
  const { data: overAllState, isLoading } = useOverAllStateQuery();

  if (isLoading) {
    <h1>Loading...</h1>;
  }

  const chartData = overAllState?.data?.data;

  return (
    <div className="bg-white border p-4 rounded-2xl" style={{ width: "100%" }}>
      <p className="font-bold mb-3">User Statistics</p>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
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
            dataKey="userCount"
            stroke="#DE950F"
            fill="#F3E524"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatistics;
