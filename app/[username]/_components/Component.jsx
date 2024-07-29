"use client"

import React, { useContext } from "react";
import TitleComponent from "./TitleComponent";
import TextComponent from "./TextComponent";
import UrlComponent from "./UrlComponent";
import ImageComponent from "./ImageComponent";
import MapComponent from "./MapComponent";
import { UserPageContext } from "../../_context/UserPageContext";
import SpacerComponent from "../../admin/_components/SpacerComponent";

const Component = ({ id, type }) => {

  const { userComponents } = useContext(UserPageContext)

  const data = userComponents.find((component) => component.componentId === id)?.data

  const renderComponent = () => {
    switch (type) {
      case "title":
        return <TitleComponent data={data} />;
      case "text":
        return <TextComponent data={data} />;
      case "url":
        return <UrlComponent data={data} />;
      case "image":
        return <ImageComponent data={data} />;
      case "map":
        return <MapComponent data={data} />;
      case "spacer":
        return <SpacerComponent data={data} />;
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {renderComponent()}
    </div>
  );
};

export default Component;
