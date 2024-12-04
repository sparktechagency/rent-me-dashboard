import { Button, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
const RunningOrdersTable = () => {
  const runningOrders = [
    { orderNo: "4566626", budget: "486", userName: "Bryan Chris" },
    { orderNo: "4566627", budget: "512", userName: "Alex Johnson" },
    { orderNo: "4566628", budget: "429", userName: "Samantha Lee" },
    { orderNo: "4566629", budget: "389", userName: "Michael Brown" },
  ];

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (text) => `$${text}`,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
    },
  ];

  const data = runningOrders.slice(0, 3).map((order, index) => ({
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
