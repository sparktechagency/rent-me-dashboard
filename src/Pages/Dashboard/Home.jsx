import React from "react";
import {
  FaChartGantt,
  FaUserCheck,
  FaUserGroup,
  FaUsers,
} from "react-icons/fa6";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import { GrUserNew } from "react-icons/gr";
import { TbListCheck } from "react-icons/tb";
import { LuPlaySquare } from "react-icons/lu";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";

import UserEngagement from "../../components/ui/Home/UserEngagement";

const Home = () => {
  const summaryData = [
    {
      icon: <FaUsers color="#ff5f02" className="" size={24} />,
      title: "Total User",
      price: 12478,
    },
    {
      icon: <GrUserNew color="#ff5f02" className="" size={24} />,
      title: "New Sign Ups",
      price: 478,
    },
    {
      icon: <FaUserCheck color="#ff5f02" className="" size={24} />,
      title: "Active Vendors     ",
      price: 40,
    },
    {
      icon: <TbListCheck color="#ff5f02" className="" size={24} />,
      title: "Completed Orders",
      price: 478,
    },
    {
      icon: <LuPlaySquare color="#ff5f02" className="" size={24} />,
      title: "Shop Services",
      price: 340,
    },
  ];

  const vendors = [
    {
      profileImage:
        "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?t=st=1733154044~exp=1733157644~hmac=e7a041402652658717b34432e8b2fdd9fe4bd89d6e6fe8100f5d92066e4da0ff&w=360",
      name: "Denisa Ozel",
      percent: "45",
      status: "Done",
    },
    {
      profileImage:
        "https://img.freepik.com/free-photo/woman-with-crossed-arms_23-2147574179.jpg?t=st=1733154065~exp=1733157665~hmac=f47010fc0b212169e42038b55ddca92d5b799afe9af8ca8b1664a626dd87d950&w=360",
      name: "Jessica Roy",
      percent: "20",
      status: "Progress",
    },
    {
      profileImage:
        "https://img.freepik.com/free-photo/portrait-handsome-young-man-with-arms-crossed-holding-white-headphone-around-his-neck_23-2148096439.jpg?t=st=1733153917~exp=1733157517~hmac=0bb807f759f6dfe705cec53d9323a1d62defdc6fb1e77beb20715be2e78f6cbb&w=360",
      name: "John Doe",
      percent: "88",
      status: "Done",
    },
    {
      profileImage:
        "https://img.freepik.com/free-photo/front-view-elegant-businesswoman_23-2148788834.jpg?t=st=1733154113~exp=1733157713~hmac=9ae5b6fa0ef8dcd5993ec8d242b2a1ba7a84f32f9d2a57876a1dfad1c6497aa3&w=740",
      name: "Jenny Wilson",
      percent: 70,
      status: "Done",
    },
    {
      profileImage:
        "https://img.freepik.com/free-photo/side-view-businesswoman-working-with-smartphone-laptop_23-2148788869.jpg?t=st=1733154132~exp=1733157732~hmac=d423d762b7c9bdd66b8fed3c52806287cdd3a1786d9a2df0dc939715e57b8524&w=360",
      name: "Maria Morriss",
      percent: 20,
      status: "Done",
    },
  ];

  const calculateVendorStats = (vendors) => {
    const totalVendors = vendors.length;

    const doneCount = vendors.filter(
      (vendor) => vendor.status === "Done"
    ).length;
    const progressCount = totalVendors - doneCount;

    const donePercentage = totalVendors
      ? Math.round((doneCount / totalVendors) * 100)
      : 0;
    const progressPercentage = totalVendors
      ? Math.round((progressCount / totalVendors) * 100)
      : 0;

    const totalPercent = vendors.reduce(
      (acc, vendor) => acc + parseInt(vendor.percent),
      0
    );
    const averagePercent = Math.round(totalPercent / totalVendors);

    return {
      doneCount,
      progressCount,
      donePercentage,
      progressPercentage,
      averagePercent,
    };
  };

  const vendorStats = calculateVendorStats(vendors);

  return (
    <div>
      <div className="grid md:grid-cols-5 gap-6 md:h-[80px]">
        {summaryData?.map((value, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl  py-0 px-6 flex items-center justify-start gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#fcf5f2] flex items-center justify-center">
              {value?.icon}
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-center text-2xl text-base ">
                {value?.title}
              </h2>
              <h3 className="text-center text-2xl font-semibold">
                {value?.price}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="md:flex w-full items-center gap-6 mt-6">
        <div className="md:w-5/12 bg-white border rounded-2xl py-3 flex flex-col justify-center">
          <p className="text-base font-semibold px-4 py-">User Activity</p>
          <SalesTrackingChart />
        </div>
        <div className="md:w-7/12 md:flex gap-4">
          <div className="md:w-[60%] border bg-white rounded-2xl pb-3 h-full md:flex flex-col justify-center">
            <p className="text-base font-semibold px-10 py-4">Vendors</p>
            <div className="md:flex flex-col px-10 gap-5">
              {vendors?.slice(0, 5).map((value, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={value?.profileImage}
                    alt={value?.name}
                  />

                  <h1 className="text-sm font-medium w-32 truncate">
                    {value?.name}
                  </h1>

                  <div className="flex items-center flex-1">
                    <div className="w-full bg-[#FFF2DC] rounded-full h-2.5">
                      <div
                        className="bg-[#F3E524] h-2.5 rounded-full"
                        style={{ width: `${value.percent}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm font-medium">{value?.percent}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[40%] border rounded-2xl bg-white p-4 flex flex-col items-center">
            <h1 className="text-lg font-semibold mb-4">Vendor Summary</h1>

            <div className="relative w-44 h-44 mb-6">
              <svg
                className="absolute inset-0 transform -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-[#FFF2DC]"
                  strokeWidth="4"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-[#F3E524]"
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset={`${100 - vendorStats.donePercentage}`}
                  strokeLinecap="round"
                ></circle>
              </svg>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#faf6ef] w-24 h-24 rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">
                  {vendorStats.donePercentage}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-3xl bg-[#F3E524]"></div>
                <p className="text-sm font-medium">
                  Done: {vendorStats.donePercentage}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-3xl bg-[#FFF2DC]"></div>
                <p className="text-sm font-medium">
                  Progress: {vendorStats.progressPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:flex gap-6">
        <div className="md:w-5/12 my-6 ">
          {" "}
          <RunningOrdersTable />
        </div>
        <div className="md:w-7/12 my-6 ">
          <UserEngagement />
        </div>
      </div>
    </div>
  );
};

export default Home;
