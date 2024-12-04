const BestShortsChart = () => {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <h1 className="font-bold">Best Shorts</h1>
      <div className="flex items-center justify-center">
        <div className=" relative w-32 h-28 my-5">
          <svg
            className="absolute inset-0 transform -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* First Circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-[#FFF2DC]"
              strokeWidth="2"
            ></circle>

            {/* Second Circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-[#DE950F]"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={`10`}
              strokeLinecap="round"
            ></circle>

            {/* Third Circle */}
            <circle
              cx="18"
              cy="18"
              r="12"
              fill="none"
              className="stroke-current text-[#F3B806]"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={`55`}
              strokeLinecap="round"
            ></circle>

            {/* Fourth Circle */}
            <circle
              cx="18"
              cy="18"
              r="8"
              fill="none"
              className="stroke-current text-[#F3E524]"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={`66`}
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 bg-[#DE950F] rounded-full"></div>
          <p>40% Birthday</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 bg-[#F3B806] rounded-full"></div>
          <p>40% Birthday</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-1">
        <div className="w-3 h-2 bg-[# ] rounded-full"></div>
        <p>40% Birthday</p>
      </div>
    </div>
  );
};

export default BestShortsChart;
