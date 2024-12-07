import React from "react";

import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";

const Header = () => {
  const { data: userData, isLoading } = useFetchAdminProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-cyan-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge count={5}>
          <FaRegBell color="#4E4E4E" size={24} />
        </Badge>
      </Link>

      {/* <Link to="/profile" className="flex  items-center gap-3"> */}
      <img
        style={{
          clipPath: "circle()",
          width: 45,
          height: 45,
        }}
        src={
          userData?.data?.profileImage
            ? `${import.meta.env.VITE_BASE_URL}${userData?.data?.profileImage}`
            : logo
        }
        alt="person-male--v2"
        className="clip"
      />
      <div className="flex flex-col gap-2 p-2">
        <p>{userData?.data?.name}</p>
        <p>{userData?.data?.role}</p>
      </div>
    </div>
  );
};

export default Header;
