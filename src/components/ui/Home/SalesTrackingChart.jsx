import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSaleAndRevenueQuery } from "../../../redux/apiSlices/dashboardSlice";
import rentMeLogo from "../../../assets/logo.png";
import moment from "moment";

const SalesTrackingChart = () => {
  const { data: saleAndRevenue, isLoading } = useSaleAndRevenueQuery();
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const saleAndRevenueData = saleAndRevenue?.data?.map((item) => ({
    ...item,
    date: moment(item.date).format("ddd"),
  }));

  // console.log(saleAndRevenueData);

  return (
    <ResponsiveContainer width="90%" height={230}>
      <BarChart
        data={saleAndRevenueData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="30%" // Adjust gap between bars
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Thinner bars */}
        <Bar
          dataKey="totalSales"
          stackId="a"
          fill="#F3E524"
          radius={[20, 20, 0, 0]}
          barSize={10}
        />
        <Bar
          dataKey="totalRevenue"
          stackId="a"
          fill="#FFF2DC"
          radius={[20, 20, 0, 0]}
          barSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesTrackingChart;
