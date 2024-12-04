import React from "react";
import { ConfigProvider, Input, Tabs } from "antd";
import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";

const User = () => {
  const user = {
    id: "6563",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    imgUrl: "https://www.example.com/path/to/image1.jpg",
  };

  return (
    <div>
      <div className="">
        <div className="flex gap-3 items-center ">
          <img
            className="rounded-full w-16 h-16"
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s"
            }
            alt="img"
          />
          <div>
            <h1 className=" text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-400">User ID#456456 </p>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[70%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">John Doe</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg  my-2">bryanmorgan@gmail.com</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Business
            </h1>
            <p className="text-lg  my-2">Job</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg  my-2">California Street 4533</p>
          </div>
        </div>
      </div>
      <div>
        <RunningOrderTable />
      </div>
    </div>
  );
};

export default User;
