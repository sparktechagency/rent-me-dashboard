import { useBestServicesQuery } from "../../../redux/apiSlices/dashboardSlice";
import rentMeLogo from "../../../assets/navLogo.png";

const BestShortsChart = () => {
  const { data: bestServices, isLoading } = useBestServicesQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const chartData = bestServices?.data || [];

  return (
    <div className="bg-white border rounded-2xl p-4">
      <h1 className="font-bold">Best Services</h1>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-28 my-5">
          <svg
            className="absolute inset-0 transform -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            {chartData?.slice(0, 3)?.map((service, index) => (
              <circle
                key={service._id}
                cx="18"
                cy="18"
                r={16 - index * 4} // Adjust radius based on index
                fill="none"
                className={`stroke-current ${
                  index === 0
                    ? "text-[#DE950F]"
                    : index === 1
                    ? "text-[#F3B806]"
                    : "text-[#F3E524]"
                }`}
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - service.orderPercentage} // Dynamically set percentage
                strokeLinecap="round"
              ></circle>
            ))}
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-center my-1 flex-wrap gap-1">
        {chartData.map((service, index) => (
          <div key={service._id} className="flex items-center gap-1">
            <div
              className={`w-3 h-2 ${
                index === 0
                  ? "bg-[#DE950F]"
                  : index === 1
                  ? "bg-[#F3B806]"
                  : "bg-[#F3E524]"
              } rounded-full`}
            ></div>
            <p>{`${service.orderPercentage.toFixed(1)}% ${
              service.serviceName
            }`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestShortsChart;
