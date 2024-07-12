"use client";

import { AdminContext } from "../../_context/AdminContext";
import React, { useContext } from "react";
import ReactGridLayout from "react-grid-layout";
import Component from "./Component";

const MobileContent = () => {
  const { mobileLayout, setMobileLayout } = useContext(AdminContext);

  const handleLayoutChange = (newLayout) => {
    setMobileLayout(newLayout);
  };

  return (
    <div className="relative  max-w-[320px] mx-auto mt-9 pt-4 pb-44">
      <ReactGridLayout
        className="layout"
        layout={mobileLayout}
        cols={2}
        rowHeight={63}
        width={320}
        margin={[16, 16]}
        compactType="vertical"
        containerPadding={[0, 0]}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
      >
        {mobileLayout.map((component, index) => (
          <div key={component.i}>
            <Component id={component.i} type={component.i.split("-")[0]} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default MobileContent;
