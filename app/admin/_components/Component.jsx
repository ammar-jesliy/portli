"use client";

import { useContext } from "react";
import TitleComponent from "./TitleComponent";
import TextComponent from "./TextComponent";
import UrlComponent from "./UrlComponent";
import ImageComponent from "./ImageComponent";
import MapComponent from "./MapComponent";
import SpacerComponent from "./SpacerComponent";
import DividerComponent from "./DividerComponent";
import { AdminContext } from "../../_context/AdminContext";

const Component = ({ id, type }) => {
  const { removeComponent } = useContext(AdminContext);

  const renderComponent = () => {
    switch (type) {
      case "title":
        return <TitleComponent id={id} remove={removeComponent} />;
      case "text":
        return <TextComponent id={id} remove={removeComponent} />;
      case "url":
        return <UrlComponent id={id} remove={removeComponent} />;
      case "image":
        return <ImageComponent id={id} remove={removeComponent} />;
      case "map":
        return <MapComponent id={id} remove={removeComponent} />;
      case "spacer":
        return <SpacerComponent id={id} remove={removeComponent} />;
      case "divider":
        return <DividerComponent id={id} remove={removeComponent} />;
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {renderComponent()}
    </div>
  );
};

export default Component;
