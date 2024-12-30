import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import rentMeLogo from "../../assets/navLogo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import { useOrderProgressQuery } from "../../redux/apiSlices/orderSlice";
import Vendors from "../../components/ui/Home/Vendors";

const Home = () => {
  const { data: orderProgress, isLoading } = useOrderProgressQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const orderPieData = orderProgress?.data;

  return (
    <div>
      <GeneralStateSection />
      <div className="md:flex w-full items-center gap-6 mt-6">
        <div className="md:w-5/12 bg-white border rounded-2xl py-3 flex flex-col justify-center">
          <p className="text-base font-semibold px-4 py-">
            Sales and Revenue Tracking
          </p>
          <SalesTrackingChart />
        </div>
        <div className="md:w-7/12 md:flex gap-4">
          <Vendors />
          <div className="md:w-[40%] border rounded-2xl bg-white p-4 flex flex-col items-center">
            <h1 className="text-lg font-semibold mb-4">Order Summary</h1>

            <div className="relative w-40 h-40 mb-6">
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
                  strokeDashoffset={
                    (100 * (100 - orderPieData?.completedPercentage)) / 100
                  }
                  strokeLinecap="round"
                ></circle>
              </svg>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#faf6ef] w-24 h-24 rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">
                  {orderPieData?.completedPercentage?.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-3xl bg-[#F3E524]"></div>
                <p className="text-sm font-medium">
                  Completed: {orderPieData?.completedPercentage?.toFixed(1)}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-3xl bg-[#FFF2DC]"></div>
                <p className="text-sm font-medium">
                  In Progress: {orderPieData?.inProgressPercentage.toFixed(1)}%
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
