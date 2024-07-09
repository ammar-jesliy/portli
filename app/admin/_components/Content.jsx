'use client'

import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../app/_context/AdminContext";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Content = () => {

  const { desktopLayout, setDesktopLayout } = useContext(AdminContext);

  const handleLayoutChange = (newLayout) => {
    setDesktopLayout(newLayout);
  }

  return (
    <div className="max-w-[916px] w-[90%] relative z-10 translate-x-[-50%] left-1/2 top-16 rounded-[35px] my-5 pb-48">
      <ReactGridLayout
        className="layout"
        layout={desktopLayout}
        cols={6}
        rowHeight={58}
        width={916}
        margin={[20, 20]}
        compactType="vertical"
        containerPadding={[0, 0]}
        onLayoutChange={handleLayoutChange}
      >
        {desktopLayout.map((component, index) => (
          <div key={component.i} className="bg-base-300 flex items-center justify-center rounded-[25px]">
            {component.i.split("-")[0]}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Content;
