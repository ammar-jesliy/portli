import React from "react";

const UrlComponent = ({ data }) => {
  return (
    <>
      {data && (
        <div
          className={`w-full h-full rounded-[25px] ${
            data?.color || "bg-base-300"
          } bg-opacity-85 hover:bg-opacity-100`}
        >
          <a
            href={data?.url}
            target="_blank"
            className="w-full h-full p-4 flex flex-col gap-1 justify-between url-container"
          >
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-5">
                <div
                  className={`w-14 h-14 bg-base-200/50 rounded-[10px] overflow-hidden flex items-center justify-center`}
                >
                  <div className="w-8 h-8 rounded">
                    <img
                      src={data?.favicon}
                      alt="Favicon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-start justify-center flex-col">
                  <p
                    className={`text-base font-bold leading-tight line-clamp-1 text-ellipsis ${
                      data?.color &&
                      (data?.color === "bg-accent"
                        ? "text-primary-content"
                        : "text-" + data?.color?.split("-")[1] + "-content")
                    }`}
                  >
                    {data?.title}
                  </p>
                  <p
                    className={`text-sm font-semibold opacity-70  ${
                      data?.color &&
                      (data?.color === "bg-accent"
                        ? "text-primary-content"
                        : "text-" + data?.color?.split("-")[1] + "-content")
                    }`}
                  >
                    {data?.url?.split("/")[2]}
                  </p>
                </div>
              </div>
              <p
                className={`text-xs font-medium leading-tight line-clamp-2 text-ellipsis px-2 ${
                  data?.color &&
                  (data?.color === "bg-accent"
                    ? "text-primary-content"
                    : "text-" + data?.color?.split("-")[1] + "-content")
                }`}
              >
                {data?.description}
              </p>
            </div>
            {data?.image ? (
              <div className="w-full aspect-[12/6.3] bg-base-200/50 rounded-[10px] overflow-hidden">
                <img
                  src={data?.image}
                  alt="OG image"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[12/6.3] bg-base-200/50 rounded-[10px] overflow-hidden flex items-center justify-center">
                <img
                  src={data?.favicon}
                  alt="No image found"
                  className="w-fit h-fit object-contain"
                />
              </div>
            )}
          </a>
        </div>
      )}
    </>
  );
};

export default UrlComponent;
