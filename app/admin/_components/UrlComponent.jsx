"use client";

import { useContext, useEffect, useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import DeleteComponentModal from "./DeleteComponentModal";
import { ExternalLink, Link, Move, Trash, X } from "lucide-react";
import { db } from "../../../utils";
import { components } from "../../../utils/schema";
import { eq } from "drizzle-orm";
import { AdminContext } from "../../_context/AdminContext";

const UrlComponent = ({ id, remove }) => {
  const [url, setUrl] = useState("");
  const [fetchedOgData, setFetchedOgData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [colorMenuVisible, setColorMenuVisible] = useState(false);

  const { componentData, updateComponentData } = useContext(AdminContext);

  useEffect(() => {
    fetchedOgData && saveDataToDB();
  }, [fetchedOgData]);

  useEffect(() => {
    getData();
  }, []);

  const fetchOgData = async () => {
    try {
      const response = await fetch("/api/fetch-og-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) {
        setFetchedOgData(data);
        setError(null);
      } else {
        setError(data.error);
        setFetchedOgData(null);
      }
    } catch (err) {
      setError("Failed to fetch OG data");
      setFetchedOgData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOgData();
  };

  const getData = async () => {
    const result = await db
      .select()
      .from(components)
      .where(eq(components.componentId, id));

    if (result.length > 0) {
      updateComponentData(id, result[0].data);
    } else {
      updateComponentData(id, {});
      console.log("No data found");
    }
  };

  const saveDataToDB = async () => {
    let title;

    if (fetchedOgData?.metaTags["og:title"] === undefined) {
      title = url.split("/")[2];
    } else {
      title = fetchedOgData?.metaTags["og:title"];
    }

    const data = {
      url: url,
      title: title,
      description: fetchedOgData?.metaTags.description,
      image: fetchedOgData?.metaTags["og:image"],
      favicon: fetchedOgData?.favicon,
      color: componentData[id]?.color,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, data);
      console.log("Data saved to DB");
    }
  };

  const handleChangeColor = async (color) => {
    const data = {
      url: componentData[id]?.url,
      title: componentData[id]?.title,
      description: componentData[id]?.description,
      image: componentData[id]?.image,
      favicon: componentData[id]?.favicon,
      color: color,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, { color });
    }
  };

  return (
    <div
      className={`w-full h-full rounded-[25px] flex justify-center items-center ${
        componentData[id]?.color || "bg-base-300"
      } group`}
    >
      <ComponentMenuBar orientation={"vertical"}>
        <div
          className={`absolute w-full h-full left-0 -translate-x-[120%] rounded-[10px] bg-white overflow-y-auto scrollbar-hidden flex flex-col items-center justify-around shadow ${
            !colorMenuVisible && "hidden"
          }`}
        >
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              componentData[id] && handleChangeColor("bg-primary");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-primary"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              componentData[id] && handleChangeColor("bg-secondary");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-secondary"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              componentData[id] && handleChangeColor("bg-accent");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-accent"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              componentData[id] && handleChangeColor("bg-base-300");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-base-300"></div>
          </button>
        </div>
        <button
          className={`btn btn-sm btn-ghost px-2 drag-handle text-gray-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <Move size={16} />
        </button>
        {(componentData[id] && Object.keys(componentData[id]).length === 0) || (
          <>
            <button
              className="btn btn-sm btn-ghost px-2"
              onClick={() => setColorMenuVisible(!colorMenuVisible)}
            >
              {colorMenuVisible ? (
                <X size={16} />
              ) : (
                <div
                  className={`h-4 w-4 rounded-full ${
                    componentData[id]?.color || "bg-base-300"
                  }`}
                ></div>
              )}
            </button>
            <a
              href={componentData[id]?.url}
              target="_blank"
              className="btn btn-sm btn-ghost px-2"
            >
              <ExternalLink size={16} />
            </a>
          </>
        )}
        <div className="h-[1px] w-[16px] bg-gray-300 rounded-full my-1"></div>
        <button
          className="btn btn-sm btn-ghost px-2 text-red-600"
          onClick={() => setModalVisible(!modalVisible)}
        >
          <Trash size={16} />
        </button>
        {modalVisible && (
          <DeleteComponentModal
            setModalVisible={setModalVisible}
            id={id}
            remove={remove}
          />
        )}
      </ComponentMenuBar>
      {componentData[id] &&
        (Object.keys(componentData[id]).length === 0 ||
        componentData[id] === undefined ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input w-36 px-2 text-sm rounded-r-none focus:outline-none"
                placeholder="Enter URL"
              />
              <button
                type="submit"
                className={`btn rounded-l-none btn-primary`}
              >
                <Link size={16} />
                Add
              </button>
            </form>
            {error && (
              <p className="text-xs font-medium text-red-600">Invalid url</p>
            )}
          </div>
        ) : (
          <div className="w-full h-full p-4 flex flex-col gap-1 justify-between url-container">
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-5">
                <div
                  className={`w-14 h-14 bg-base-200/50 rounded-[10px] overflow-hidden flex items-center justify-center`}
                >
                  <div className="w-8 h-8 rounded">
                    <img
                      src={componentData[id]?.favicon}
                      alt="Favicon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-start justify-center flex-col">
                  <p
                    className={`text-base font-bold leading-tight line-clamp-1 text-ellipsis ${
                      componentData[id]?.color === "bg-accent"
                        ? "text-primary-content"
                        : "text-" +
                          componentData[id]?.color?.split("-")[1] +
                          "-content"
                    }`}
                  >
                    {componentData[id]?.title}
                  </p>
                  <p
                    className={`text-sm font-semibold opacity-70  ${
                      componentData[id]?.color === "bg-accent"
                        ? "text-primary-content"
                        : "text-" +
                          componentData[id]?.color?.split("-")[1] +
                          "-content"
                    }`}
                  >
                    {componentData[id]?.url?.split("/")[2]}
                  </p>
                </div>
              </div>
              <p
                className={`text-xs font-medium leading-tight line-clamp-2 text-ellipsis px-2 ${
                  componentData[id]?.color === "bg-accent"
                    ? "text-primary-content"
                    : "text-" +
                      componentData[id]?.color?.split("-")[1] +
                      "-content"
                }`}
              >
                {componentData[id]?.description}
              </p>
            </div>
            {componentData[id]?.image ? (
              <div className="w-full aspect-[13/6] bg-base-200/50 rounded-[10px] overflow-hidden">
                <img
                  src={componentData[id]?.image}
                  alt="OG image"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[13/6] bg-base-200/50 rounded-[10px] overflow-hidden flex items-center justify-center">
                <img
                  src={componentData[id]?.favicon}
                  alt="No image found"
                  className="w-fit h-fit object-contain"
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default UrlComponent;
