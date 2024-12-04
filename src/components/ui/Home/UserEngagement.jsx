import React, { PureComponent } from "react";
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

const data = [
  { name: "Mo", totalUsers: 1200, activeUsers: 450 },
  { name: "Tu", totalUsers: 1100, activeUsers: 930 },
  { name: "We", totalUsers: 700, activeUsers: 560 },
  { name: "Th", totalUsers: 1400, activeUsers: 870 },
  { name: "Fr", totalUsers: 900, activeUsers: 780 },
  { name: "Sa", totalUsers: 1600, activeUsers: 1250 },
  { name: "Su", totalUsers: 1700, activeUsers: 500 },
];

export default class UserEngagement extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952";

  render() {
    return (
      <div className="bg-white p-5 w-[100%] h-[400px] rounded-2xl border">
        <h2 className=" font-bold">User Engagement</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />{" "}
            <Line
              type="monotone"
              dataKey="totalUsers"
              stroke="#FCE74C"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="activeUsers" stroke="#FFBB00" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
