import Image from "next/image";
import React from "react";

const ImageComponent = ({ data }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BASE_URL;

  return (
    <div className="w-full h-full rounded-[25px] bg-base-300">
      {data?.filename && (
        <Image
          src={BASE_URL + data?.filename + "?alt=media"}
          alt="Image"
          fill
          className="rounded-[25px] object-cover"
        />
      )}
    </div>
  );
};

export default ImageComponent;
