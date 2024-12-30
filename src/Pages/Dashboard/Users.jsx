import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  useChangeStatusMutation,
  useUsersQuery,
} from "../../redux/apiSlices/userSlice";
import randomImg from "../../assets/randomProfile2.jpg";
import rentMeLogo from "../../assets/navLogo.png";
import toast from "react-hot-toast";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const { data: users, isLoading } = useUsersQuery();
  const [changeStatus] = useChangeStatusMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const data = users?.data?.data;
  const filteredData = data.filter((user) => user.role !== "ADMIN");

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleStatusChange = async (id) => {
    try {
      const response = await changeStatus(id);
      console.log(response);
      if (response?.data?.success) {
        toast.success("Status Updated Successfully");
      } else {
        console.error(err);
      }
    } catch (err) {
      toast.error("Failed to Update Status");
    }
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
          record?.admin?.profileImg ||
          record?.customer?.profileImg ||
          record?.vendor?.profileImg ||
          randomImg;

        const fullImgUrl = imgUrl?.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`;
        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
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
          case "active":
            color = "green";
            break;
          case "restricted":
            color = "red";
            break;
          case "Pending":
            color = "orange";
            break;
          default:
            color = "gray";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record._id}`}>
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              Details
            </Button>
          </Link>

          {record?.status === "active" ? (
            <Button
              onClick={() => handleStatusChange(record._id)}
              className="border border-red-600 text-red-700 "
            >
              Restrict
            </Button>
          ) : (
            <Button
              onClick={() => handleStatusChange(record._id)}
              className="border border-green-600 text-green-700 "
            >
              Active
            </Button>
          )}
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
      dataSource={filteredData}
      rowKey={(record) => record.id}
    />
  );
};

export default Users;
