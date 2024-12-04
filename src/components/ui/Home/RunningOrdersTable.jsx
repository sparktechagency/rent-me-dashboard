import { Space, Table, Tag } from "antd";
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

  const data = runningOrders.map((order, index) => ({
    key: index.toString(),
    orderNo: order.orderNo,
    budget: order.budget,
    userName: order.userName,
    orderDetails: <Link className="text-blue-600 underline">View Details</Link>,
  }));

  return (
    <div className="border bg-white h-[400px] p-5 rounded-2xl">
      <h1 className="font-bold mb-10">Running Orders</h1>
      {/* <Table<DataType> columns={columns} dataSource={data}></DataType> */}
      <Table columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default RunningOrdersTable;
