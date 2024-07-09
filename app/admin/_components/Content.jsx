"use client";

import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../app/_context/AdminContext";
import ReactGridLayout from "react-grid-layout";
import Component from "./Component";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Content = () => {
  const { desktopLayout, setDesktopLayout } = useContext(AdminContext);

  const handleLayoutChange = (newLayout) => {
    setDesktopLayout(newLayout);
  };

  return (
    <div className="max-w-[916px] w-[90%] rounded-[35px] mx-auto mt-16 pt-5 pb-48">
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
          <div
            key={component.i}
            className="bg-base-300 flex items-center justify-center rounded-[25px]"
          >
            <Component id={component.i} type={component.i.split("-")[0]} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Content;
