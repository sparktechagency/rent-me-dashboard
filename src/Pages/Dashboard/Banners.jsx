import { Button, Space, Table } from "antd";
import { useAllBannerQuery } from "../../redux/apiSlices/banenrSlice";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Image",
    dataIndex: "imgUrl",
    key: "imgUrl",
    render: (img) => (
      <img
        src={
          img.startsWith("http")
            ? img
            : `${import.meta.env.VITE_BASE_URL}${img}`
        }
        alt="User Image"
        className="rounded-2xl w-20 h-16"
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (link) => (
      <a
        className="font-bold text-blue-600 underline"
        href={
          link.startsWith("http")
            ? link
            : `${import.meta.env.VITE_BASE_URL}${link}`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        Link
      </a>
    ),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => <span>{moment(date).format("DD-MM-YYYY")}</span>,
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive) => (
      <span style={{ color: isActive ? "green" : "red" }}>
        {isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Link to={`/update-banner/${record._id}`}>
          <Button className="border-none">
            <FaEdit />
          </Button>
        </Link>
        <Link to={`/delete-banner/${record._id}`}>
          <Button className="border-none">
            <MdDelete />
          </Button>
        </Link>
      </Space>
    ),
  },
];

const Banners = () => {
  const { data: allBanner, isLoading } = useAllBannerQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const bannerData = allBanner?.data.map((banner) => ({
    ...banner,
    key: banner._id,
  }));

  console.log(bannerData);

  return (
    <div>
      <div className="text-end my-5">
        <Link to={`/add-banner`}>
          <button className="bg-[#FFD900] h-10 px-4 rounded-md">
            + Add Banner
          </button>
        </Link>
      </div>
      <Table columns={columns} dataSource={bannerData} />
    </div>
  );
};

export default Banners;
