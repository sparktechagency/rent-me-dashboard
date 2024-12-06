import { Table, Input, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useOrdersQuery } from "../../../redux/apiSlices/orderSlice";
import moment from "moment";

const RunningOrderTable = () => {
  const { data: orders, isLoading } = useOrdersQuery();
  const data = orders?.data;

  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Set filteredData whenever data changes
  useEffect(() => {
    if (data) {
      setFilteredData(
        data.map((item) => ({
          ...item,
          key: item._id, // Set a unique key for each row
        }))
      );
    }
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    // Filter data based on the search text
    const filtered = data
      ?.map((item) => ({
        ...item,
        key: item._id,
      }))
      .filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(value)
        )
      );
    setFilteredData(filtered);
  };

  const truncateWithEllipsis = (text, length = 10) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
    },

    {
      title: "Transaction ID",
      dataIndex: "packageId",
      key: "packageId",
      render: (text) => (
        <Tooltip title={text}>
          <span>{truncateWithEllipsis(text)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      render: (text) => (
        <Tooltip title={text}>
          <span>{truncateWithEllipsis(text)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",
      render: (text) => (
        <Tooltip title={text}>
          <span>{truncateWithEllipsis(text)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Package",
      dataIndex: "preference",
      key: "preference",
      width: 150,
    },

    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      render: (status) => {
        let color;
        if (status === "full") {
          color = "green";
        } else if (status === "pending") {
          color = "orange";
        } else if (status === "ongoing") {
          color = "blue";
        } else {
          color = "black";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color;
        if (status === "confirmed") {
          color = "green";
        } else if (status === "rejected") {
          color = "red";
        } else if (status === "ongoing") {
          color = "blue";
        } else {
          color = "black";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-white p-3 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Running Orders</h1>
        {/* Search Bar */}
        <Input
          placeholder="Search orders"
          value={searchText}
          onChange={handleSearch}
          className="mb-4 w-[50%]"
        />
      </div>
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
        dataSource={filteredData}
      />
    </div>
  );
};

export default RunningOrderTable;
