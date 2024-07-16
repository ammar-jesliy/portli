import React, { useContext } from "react";
import Component from "./Component";
import { UserPageContext } from "../../_context/UserPageContext";
import ReactGridLayout from "react-grid-layout";

const DesktopContent = () => {

  const { layouts } = useContext(UserPageContext)

  const desktopLayout = layouts[0]?.desktopLayout || [];

  return (
    <div className="max-w-[916px] w-[90%] mx-auto mt-16 pt-5 pb-44">
      <ReactGridLayout
        className="layout"
        layout={desktopLayout}
        cols={6}
        rowHeight={58}
        width={916}
        margin={[20, 20]}
        compactType="vertical"
        containerPadding={[0, 0]}
        isDraggable={false}
        isResizable={false}
      >
        {desktopLayout.map((component, index) => (
          <div key={component.i}>
            <Component id={component.i} type={component.i.split("-")[0]} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default DesktopContent;
