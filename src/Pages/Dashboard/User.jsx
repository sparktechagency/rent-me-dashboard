import React from "react";
import { ConfigProvider, Input, Tabs } from "antd";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import { useUserByIdQuery } from "../../redux/apiSlices/userSlice";

const User = () => {
  const { id } = useParams();

  const { data: singleUser, isLoading } = useUserByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = singleUser?.data;
  console.log(user);

  const imgUrl =
    user?.admin?.profileImg ||
    user?.user?.profileImg ||
    user?.customer?.profileImg ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div>
      <div className="">
        <div className="flex gap-3 items-center ">
          <img
            className="rounded-full w-16 h-16"
            src={
              imgUrl?.startsWith("http")
                ? imgUrl
                : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
            }
            alt="img"
          />
          <div>
            <h1 className=" text-2xl font-bold">
              {user?.admin?.name || user?.vendor?.name || user?.customer?.name}
            </h1>
            <p className="text-sm text-gray-400">User ID: {user.id} </p>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[70%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">
              {" "}
              {user?.admin?.name || user?.vendor?.name || user?.customer?.name}
            </p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg  my-2">{user.email}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Role
            </h1>
            <p className="text-lg  my-2">{user.role}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg  my-2">
              {user?.vendor?.address ||
              user?.admin?.address ||
              user?.user?.address
                ? <p>{user?.admin?.address}</p> || (
                    <p>
                      {user?.admin?.address?.city},{" "}
                      {user?.admin?.address?.country}
                    </p>
                  ) || <p>{user?.user?.address}</p> || (
                    <p>
                      {user?.user?.address?.city},{" "}
                      {user?.user?.address?.country}
                    </p>
                  ) || <p>{user?.vendor?.address}</p> || (
                    <p>
                      {user?.vendor?.address?.city},{" "}
                      {user?.vendor?.address?.country}
                    </p>
                  )
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <RunningOrderTable
          filterProps={
            user?.vendor?.name || user?.admin?.name || user?.customer?.name
          }
        />
      </div>
    </div>
  );
};

export default User;
