import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="max-w-[1250px] mx-auto flex items-center justify-center py-4 px-4 h-screen">
      <div className="flex flex-col gap-3 items-center justify-center h-[calc(100%-80px)] w-full max-w-[500px] mx-auto">
        <h2 className="font-bricolage font-medium text-xl sm:text-2xl tracking-tight leading-none text-center ">
          Coming Soon!
        </h2>
        <p className="font-poppins text-center leading-[1.2] text-sm">
          Our analytics feature is on its way! Soon, you'll have access to
          detailed insights about your site.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
