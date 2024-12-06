import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUsersQuery } from "../../redux/apiSlices/userSlice";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const { data: users, isLoading } = useUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const data = users?.data?.data;

  console.log(data);

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
      render: (text, record) => {
        // Extract name from the appropriate object
        const name =
          record?.admin?.name ||
          record?.customer?.name ||
          record?.vendor?.name ||
          "Unknown";
        const imgUrl =
          record?.admin?.imgUrl ||
          record?.customer?.imgUrl ||
          record?.vendor?.imgUrl;

        return (
          <Space>
            <Avatar src={imgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
          <Link to={`/user/profile/${record.id}`}>
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              Details
            </Button>
          </Link>

          <Button className="border border-red-600 text-red-700 ">
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
      rowKey={(record) => record.id}
    />
  );
};

export default Users;
