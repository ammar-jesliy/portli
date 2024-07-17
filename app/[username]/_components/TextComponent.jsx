import React from "react";

const TextComponent = ({ data }) => {
  return (
    <div
      className={`w-full h-full rounded-[25px] p-4 flex flex-col gap-3 ${data?.color}`}
    >
      {data?.titleVisible && (
        <h3
          className={`text-base font-bold px-3 h-8 ${
            data?.color === "bg-accent"
              ? "text-primary-content"
              : "text-" + data?.color.split("-")[1] + "-content"
          }`}
        >
          {data?.title}
        </h3>
      )}
      <p
        className={`text-sm font-medium px-3 flex-1 leading-tight ${
          data?.color === "bg-accent"
            ? "text-primary-content"
            : "text-" + data?.color.split("-")[1] + "-content"
        }`}
      >
        {data?.text}
      </p>
    </div>
  );
};

export default TextComponent;
