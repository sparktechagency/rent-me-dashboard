import { Table } from "antd";
import { useState } from "react";

const RunningOrderTable = () => {
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "trxId",
      key: "trxId",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      width: 150,
    },
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",
      width: 150,
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      width: 150,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 150,
      render: (status) => {
        let color;
        if (status === "Delivered") {
          color = "green";
        } else if (status === "Pending") {
          color = "orange";
        } else if (status === "Shipped") {
          color = "blue";
        } else if (status === "Processing") {
          color = "yellow";
        } else {
          color = "black";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  const data = [
    {
      key: "1",
      trxId: "trx12345",
      customerId: "cust001",
      vendorId: "vend001",
      package: "Standard Package",
      orderId: "ord001",
      orderDate: "2024-12-01",
      price: "$200",
      orderStatus: "Shipped",
    },
    {
      key: "2",
      trxId: "trx12346",
      customerId: "cust002",
      vendorId: "vend002",
      package: "Premium Package",
      orderId: "ord002",
      orderDate: "2024-12-02",
      price: "$350",
      orderStatus: "Pending",
    },
    {
      key: "3",
      trxId: "trx12347",
      customerId: "cust003",
      vendorId: "vend003",
      package: "Basic Package",
      orderId: "ord003",
      orderDate: "2024-12-03",
      price: "$150",
      orderStatus: "Delivered",
    },
    {
      key: "4",
      trxId: "trx12348",
      customerId: "cust004",
      vendorId: "vend004",
      package: "Standard Package",
      orderId: "ord004",
      orderDate: "2024-12-04",
      price: "$180",
      orderStatus: "Processing",
    },
    {
      key: "5",
      trxId: "trx12349",
      customerId: "cust005",
      vendorId: "vend005",
      package: "Premium Package",
      orderId: "ord005",
      orderDate: "2024-12-05",
      price: "$400",
      orderStatus: "Shipped",
    },
    {
      key: "6",
      trxId: "trx12350",
      customerId: "cust006",
      vendorId: "vend006",
      package: "Basic Package",
      orderId: "ord006",
      orderDate: "2024-12-06",
      price: "$120",
      orderStatus: "Pending",
    },
  ];

  return (
    <div className="">
      <h1 className="font-bold">Running Orders</h1>
      <Table
        className="bg-white"
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          onShowSizeChange: (current, size) => setPageSize(size),
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default RunningOrderTable;
