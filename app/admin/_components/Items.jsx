import React from "react";
import { ALargeSmall, Image, Heading, MapPinned, Link2 } from "lucide-react";

const Items = () => {
  return (
    <div className="absolute flex flex-wrap px-4 py-3 w-full bg-base-100 left-0 top-[-10px] translate-y-[-100%] rounded-2xl border-2 border-base-300 gap-1 justify-between animate-slide-up">
      <button className="btn btn-ghost px-2">
        <ALargeSmall size={24} />
        <p className="w-[55px] text-left">Text box</p>
      </button>
      <button className="btn btn-ghost px-2">
        <Image size={24} />
        <p className="w-[55px] text-left">Image</p>
      </button>
      <button className="btn btn-ghost px-2">
        <Heading size={24} />
        <p className="w-[55px] text-left">Title</p>
      </button>
      <button className="btn btn-ghost px-2">
        <MapPinned size={24} />
        <p className="w-[55px] text-left">Map</p>
      </button>
      <button className="btn btn-ghost px-2">
        <Link2 size={24} />
        <p className="w-[55px] text-left">URL</p>
      </button>
    </div>
  );
};

export default Items;
