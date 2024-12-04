import React, { PureComponent } from "react";
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

const data = [
  { name: "Jan", earning: 4000 },
  { name: "Feb", earning: 3000 },
  { name: "Mar", earning: 2000 },
  { name: "Apr", earning: 3780 },
  { name: "May", earning: 1890 },
  { name: "Jun", earning: 3390 },
  { name: "Jul", earning: 2490 },
];

export default class UserStatistics extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf";

  render() {
    return (
      <div
        className="bg-white border p-4 rounded-2xl"
        style={{ width: "100%" }}
      >
        <p className="font-bold">Total Earning</p>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earning"
              stroke="#DE950F"
              fill="#F3E524"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
