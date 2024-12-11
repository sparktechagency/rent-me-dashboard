import { Table, Input, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useOrdersQuery } from "../../../redux/apiSlices/orderSlice";
import moment from "moment";
import rentMeLogo from "../../../assets/navLogo.png";

const RunningOrderTable = ({ filterProps }) => {
  const { data: orders, isLoading } = useOrdersQuery();
  const data = orders?.data;

  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Set filteredData whenever data changes or when filterProps changes
  useEffect(() => {
    if (data) {
      const updatedData = data.map((item) => ({
        ...item,
        key: item._id, // Set a unique key for each row
      }));

      // Apply additional filtering based on filterProps
      const filtered = filterProps
        ? updatedData.filter(
            (item) =>
              item.vendorId.name
                .toLowerCase()
                .includes(filterProps.toLowerCase()) ||
              item.customerId.name
                .toLowerCase()
                .includes(filterProps.toLowerCase())
          )
        : updatedData;

      setFilteredData(filtered);
    }
  }, [data, filterProps]);

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

  const truncateWithEllipsis = (text, length = 20) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
    },
    {
      title: "Customer Name",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId) => (
        <Tooltip title={customerId?.name}>
          <span>{truncateWithEllipsis(customerId?.name)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorId",
      key: "vendorId",
      render: (vendorId) => (
        <Tooltip title={vendorId?.name}>
          <span>{truncateWithEllipsis(vendorId?.name)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Service",
      dataIndex: "serviceId",
      key: "serviceId",
      render: (serviceId) => (
        <Tooltip title={serviceId?.title}>
          <span>{truncateWithEllipsis(serviceId?.title)}</span>
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
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
