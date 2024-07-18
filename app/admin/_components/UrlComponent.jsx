"use client";

import { useEffect, useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import DeleteComponentModal from "./DeleteComponentModal";
import { Link, Move, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { db } from "../../../utils";
import { components } from "../../../utils/schema";
import { eq } from "drizzle-orm";

const UrlComponent = ({ id, remove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [ogData, setOgData] = useState(null);
  const [fetchedOgData, setFetchedOgData] = useState(null);
  const [error, setError] = useState(null);

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
        console.log(data)
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
      setOgData(result[0].data);
    } else {
      console.log("No data found");
    }
  };

  const saveDataToDB = async () => {
    const data = {
      url: url,
      title: fetchedOgData?.metaTags["og:title"],
      description: fetchedOgData?.metaTags.description,
      image: fetchedOgData?.metaTags["og:image"],
      favicon: fetchedOgData?.favicon,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      setOgData(data);
      console.log("Data saved to DB");
    }
  };

  return (
    <div
      className={`w-full h-full rounded-[25px] flex justify-center items-center bg-base-300 group`}
    >
      <ComponentMenuBar orientation={"vertical"}>
        <button
          className={`btn btn-sm btn-ghost px-2 drag-handle text-gray-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <Move size={16} />
        </button>
        <button className="btn btn-sm btn-ghost px-2 text-gray-800">
          <Pencil size={16} />
        </button>
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
      {!ogData ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input w-36 px-2 text-sm rounded-r-none focus:outline-none"
              placeholder="Enter URL"
            />
            <button type="submit" className={`btn rounded-l-none btn-primary`}>
              <Link size={16} />
              Add
            </button>
          </form>
          {error && (
            <p className="text-xs font-medium text-red-600">Invalid url</p>
          )}
        </div>
      ) : (
        <a href={ogData?.url} target="_blank" className="w-full h-full p-4 flex flex-col gap-1 justify-between url-container">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-5">
              <div className="w-14 h-14 bg-base-200 rounded-[10px] overflow-hidden flex items-center justify-center">
                <div className="w-8 h-8 bg-base-100">
                  <img
                    src={ogData?.favicon}
                    alt="Favicon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-start justify-center flex-col">
                <p className="text-base font-bold leading-tight line-clamp-1 text-ellipsis">
                  {ogData?.title}
                </p>
                <p className="text-sm font-semibold opacity-70">
                  {ogData?.url.split("/")[2]}
                </p>
              </div>
            </div>
            <p className="text-xs font-medium leading-tight line-clamp-2 text-ellipsis">
              {ogData?.description}
            </p>
          </div>
          {ogData?.image ? (
            <div className="w-full aspect-[13/6] bg-base-200 rounded-[10px] overflow-hidden">
              <img
                src={ogData?.image}
                alt="OG image"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[13/6] bg-base-200 rounded-[10px] overflow-hidden flex items-center justify-center">
              <img
                src={ogData?.favicon}
                alt="No image found"
                className="w-fit h-fit object-contain"
              />
            </div>
          )}
        </a>
      )}
    </div>
  );
};

export default UrlComponent;
