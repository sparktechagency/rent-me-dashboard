import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

// Actions

// Example data based on your `users` array with imgUrl added
const data = [
  {
    id: "6563",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    totalEarning: 5000,
  },
  {
    id: "6564",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Inactive",
    imgUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    totalEarning: 3500,
  },
  {
    id: "6565",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    status: "Active",
    imgUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    totalEarning: 6000,
  },
  {
    id: "6566",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Pending",
    imgUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    totalEarning: 4000,
  },
  {
    id: "6567",
    name: "David Williams",
    email: "david.williams@example.com",
    status: "Active",
    imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    totalEarning: 5500,
  },
  {
    id: "6568",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    status: "Inactive",
    imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    totalEarning: 4500,
  },
  {
    id: "6569",
    name: "James Taylor",
    email: "james.taylor@example.com",
    status: "Active",
    imgUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    totalEarning: 7000,
  },
  {
    id: "6570",
    name: "Jessica Wilson",
    email: "jessica.wilson@example.com",
    status: "Pending",
    imgUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    totalEarning: 3800,
  },
];

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar src={record.imgUrl} alt={text} size="large" />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Earnings",
      dataIndex: "totalEarning",
      key: "totalEarning",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Active":
            color = "green";
            break;
          case "Inactive":
            color = "red";
            break;
          case "Pending":
            color = "orange";
            break;
          default:
            color = "gray"; // Default color for unknown statuses
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            className="bg-[#FFF4E3] text-[#F3B806] border-none"
            onClick={() => handleDetails(record.id)}
          >
            Details
          </Button>

          <Button
            className="border border-red-600 text-red-700 "
            onClick={() => handleRestrict(record.id)}
          >
            Restrict
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleDetails = (id) => {
    navigate(`/user/${id}`);
  };

  const handleRestrict = (id) => {
    console.log(`Restrict clicked for user with id: ${id}`);
  };

  return (
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
  );
};

export default Vendors;
