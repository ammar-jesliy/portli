import React, { useContext } from "react";
import Component from "./Component";
import { UserPageContext } from "../../_context/UserPageContext";
import ReactGridLayout from "react-grid-layout";

const MobileContent = () => {

  const { layouts } = useContext(UserPageContext)

  const mobileLayout = layouts[0]?.mobileLayout || [];

  return (
    <div className="relative max-w-[320px] mx-auto mt-9 pt-14 pb-44">
      <ReactGridLayout
        className="layout"
        layout={mobileLayout}
        cols={2}
        rowHeight={63}
        width={320}
        margin={[16, 16]}
        compactType="vertical"
        containerPadding={[0, 0]}
        isDraggable={false}
        isResizable={false}
      >
        {mobileLayout.map((component, index) => (
          <div key={component.i}>
            <Component id={component.i} type={component.i.split("-")[0]} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}

export default MobileContent