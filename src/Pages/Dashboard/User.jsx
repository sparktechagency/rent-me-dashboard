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
      <Link
        to="/users"
        className="flex items-center gap-[2px]  text-base  rounded-lg  "
      >
        {" "}
        <span>
          {" "}
          <BiLeftArrowAlt size={22} />{" "}
        </span>{" "}
        <span>Back</span>
      </Link>
      <div className="mt-10">
        <div className="flex gap-3 items-center ">
          <img
            className="rounded-full w-12 h-12"
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s"
            }
            alt="img"
          />
          <h1 className=" text-2xl font-bold">{user.name}</h1>
          <p>User ID#456456 </p>
        </div>
        <div className="grid my-10 grid-cols-2 gap-5">
          <div>
            <h1>Name</h1> <br /> <Input defaultValue={"John Doe"} />
          </div>
          <div>
            <h1>Business</h1> <br /> <Input defaultValue={"Job"} />
          </div>
          <div>
            <h1>Email</h1> <br />{" "}
            <Input defaultValue={"john.doe@example.com"} />
          </div>
          <div>
            <h1>Address</h1> <br />{" "}
            <Input defaultValue={"California Street 4533"} />
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
