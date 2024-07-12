import React from "react";
import TitleComponent from "./TitleComponent";
import TextComponent from "./TextComponent";
import UrlComponent from "./UrlComponent";
import ImageComponent from "./ImageComponent";
import MapComponent from "./MapComponent";

const Component = ({ id, type }) => {

  const renderComponent = () => {
    switch (type) {
      case "title":
        return <TitleComponent id={id} />;
      case "text":
        return <TextComponent id={id} />;
      case "url":
        return <UrlComponent id={id} />;
      case "image":
        return <ImageComponent id={id} />;
      case "map":
        return <MapComponent id={id} />;
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {renderComponent()}
    </div>
  );
};

export default Component;
