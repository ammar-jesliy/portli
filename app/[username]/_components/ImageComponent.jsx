import Image from "next/image";
import React from "react";

const ImageComponent = ({ data }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BASE_URL;

  return (
    <div className="w-full relative h-full rounded-[25px] bg-base-300">
      {data?.filename && (
        <>
          <Image
            src={BASE_URL + data?.filename.replace("/", "%2f") + "?alt=media"}
            alt="Image"
            fill
            sizes="100%"
            className="rounded-[25px] object-cover"
            unoptimized={true}
          />
          {data?.label && (
            <div className="absolute left-4 bottom-4 max-w-[calc(100%-80px)] h-6 bg-white rounded-full px-3 flex items-center">
              <p className="w-full line-clamp-1 text-ellipsis text-xs font-semibold">
                {data?.label.trim()}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageComponent;
