import { Button, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { useOrdersQuery } from "../../../redux/apiSlices/orderSlice";
import { useEffect, useState } from "react";
import moment from "moment";
const RunningOrdersTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const { data: orders, isLoading } = useOrdersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const data = orders?.data?.map((order, index) => ({
    ...order,
    key: order.orderId || index.toString(),
  }));

  const runningOrders = [
    { orderNo: "4566626", budget: "486", userName: "Bryan Chris" },
    { orderNo: "4566627", budget: "512", userName: "Alex Johnson" },
    { orderNo: "4566628", budget: "429", userName: "Samantha Lee" },
    { orderNo: "4566629", budget: "389", userName: "Michael Brown" },
  ];

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Budget",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `$${text}`,
    },
    {
      title: "Service",
      dataIndex: "preference",
      key: "preference",
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
  ];

  const data2 = runningOrders.slice(0, 3).map((order, index) => ({
    key: index.toString(),
    orderNo: order.orderNo,
    budget: order.budget,
    userName: order.userName,
    orderDetails: <Link className="text-blue-600 underline">View Details</Link>,
  }));

  return (
    <div className="border bg-white h-[300px] p-5 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold mb-2">Running Orders</h1>
        <Link to={"/analytics"}>
          <Button className="bg-[#FFE133] border-[#FFE133]">View All</Button>
        </Link>
      </div>
      <Table columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default RunningOrdersTable;
