import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

// Actions

// Example data based on your `users` array with imgUrl added
const dataSource = [
  {
    id: "6563",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    imgUrl: "https://www.example.com/path/to/image1.jpg",
  },
  {
    id: "6564",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Inactive",
    imgUrl: "https://www.example.com/path/to/image2.jpg",
  },
  {
    id: "6565",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    status: "Active",
    imgUrl: "https://www.example.com/path/to/image3.jpg",
  },
  {
    id: "6566",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Pending",
    imgUrl: "https://www.example.com/path/to/image4.jpg",
  },
  {
    id: "6567",
    name: "David Williams",
    email: "david.williams@example.com",
    status: "Active",
    imgUrl: "https://www.example.com/path/to/image5.jpg",
  },
  {
    id: "6568",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    status: "Inactive",
    imgUrl: "https://www.example.com/path/to/image6.jpg",
  },
  {
    id: "6569",
    name: "James Taylor",
    email: "james.taylor@example.com",
    status: "Active",
    imgUrl: "https://www.example.com/path/to/image7.jpg",
  },
  {
    id: "6570",
    name: "Jessica Wilson",
    email: "jessica.wilson@example.com",
    status: "Pending",
    imgUrl: "https://www.example.com/path/to/image8.jpg",
  },
];

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
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
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
    />
  );
};

export default App;
