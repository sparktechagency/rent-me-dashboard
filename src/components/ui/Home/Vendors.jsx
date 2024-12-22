import { useVendorsConversionDataQuery } from "../../../redux/apiSlices/dashboardSlice";
import randomImg from "../../../assets/randomProfile2.jpg";
import rentMeLogo from "../../../assets/navLogo.png";

const Vendors = () => {
  const { data: vendorsConversionData, isLoading } =
    useVendorsConversionDataQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const vendorsData = vendorsConversionData?.data;

  const topVendors = [...(vendorsData || [])]
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  return (
    <div className="md:w-[60%] border h-[290px] bg-white rounded-2xl pb-5 md:flex flex-col justify-center">
      <p className="text-base font-semibold px-10 py-4">Vendors</p>
      <div className="md:flex flex-col px-10 gap-4">
        {topVendors?.map((value, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              className="w-7 h-7 rounded-full"
              src={
                value?.profileImg
                  ? value.profileImg.startsWith("http")
                    ? value.profileImg
                    : `${import.meta.env.VITE_BASE_URL}${value.profileImg}`
                  : randomImg
              }
              alt={value?.name}
            />

            <h1 className="text-sm font-medium w-32 truncate">{value?.name}</h1>

            <div className="flex items-center flex-1">
              <div className="w-full bg-[#FFF2DC] rounded-full h-2.5">
                <div
                  className="bg-[#F3E524] h-2.5 rounded-full"
                  style={{ width: `${value.conversionRate}%` }}
                ></div>
              </div>
            </div>

            <p className="text-sm font-medium">
              {value?.conversionRate.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
