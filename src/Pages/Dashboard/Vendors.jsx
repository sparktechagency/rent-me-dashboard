import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  useUsersQuery,
  useVendorsQuery,
} from "../../redux/apiSlices/userSlice";
import moment from "moment";
import { FaStar } from "react-icons/fa6";
import randomImg from "../../assets/randomProfile2.jpg";

// Actions

// Example data based on your `users` array with imgUrl added

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: vendors, isLoading } = useVendorsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const data = vendors?.data?.data;

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
      title: "Address",
      key: "address",
      render: (record) => {
        // Extract city and other address details
        const { city, street, state, zip, country } = record.address || {};
        return (
          <span>
            {city ? `${street}, ${city}, ${state}, ${zip}, ${country}` : "N/A"}
          </span>
        );
      },
    },
    {
      title: "Vendor Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
    {
      title: "Total Reviews",
      dataIndex: ["vendor", "totalReviews"],
      key: "totalReviews",
      align: "center",
      sorter: (a, b) => a.vendor.totalReviews - b.vendor.totalReviews,
    },
    {
      title: "Rating",
      dataIndex: ["vendor", "rating"],
      key: "rating",
      sorter: (a, b) => a.vendor.rating - b.vendor.rating,
      render: (rating) => (
        <span className="flex items-center jus gap-1">
          <FaStar />
          <p>{rating}</p>
        </span>
      ),
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
      align: "center",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record.id}`}>
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              Details
            </Button>
          </Link>

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
      rowKey={(record) => record.id}
    />
  );
};

export default Vendors;
