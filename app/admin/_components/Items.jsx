import React from "react";
import { ALargeSmall, Image, Heading, MapPinned, Link2 } from "lucide-react";

const Items = ({ onItemClick }) => {
  return (
    <div className="absolute grid grid-cols-2 lg:grid-cols-4 px-4 py-3 w-full bg-base-100 left-0 top-[-10px] translate-y-[-100%] rounded-2xl border-2 border-base-300 gap-1 animate-slide-up">
      <button
        className="btn btn-ghost px-2 justify-start"
        onClick={() => {
          onItemClick({
            i: "text-" + Date.now().toString(),
            x: 0,
            y: 999,
            w: 2,
            h: 4,
            minH: 2,
            maxH: 8,
            maxW: 6,
          });
        }}
      >
        <ALargeSmall size={24} />
        <p className="w-[55px] text-left">Text box</p>
      </button>
      <button
        className="btn btn-ghost px-2 justify-start"
        onClick={() => {
          onItemClick({
            i: "image-" + Date.now().toString(),
            x: 0,
            y: 999,
            w: 2,
            h: 4,
            maxH: 8,
            maxW: 6,
          });
        }}
      >
        <Image size={24} />
        <p className="w-[55px] text-left">Image</p>
      </button>
      <button
        className="btn btn-ghost px-2 justify-start"
        onClick={() => {
          onItemClick({
            i: "title-" + Date.now().toString(),
            x: 0,
            y: 999,
            w: 6,
            h: 1,
            minH: 1,
            minW: 6,
            maxH: 1,
            maxW: 6,
            isResizable: false,
          });
        }}
      >
        <Heading size={24} />
        <p className="w-[55px] text-left">Title</p>
      </button>
      <button
        className="btn btn-ghost px-2 justify-start"
        onClick={() => {
          onItemClick({
            i: "map-" + Date.now().toString(),
            x: 0,
            y: 999,
            w: 2,
            h: 4,
            maxH: 8,
            maxW: 6,
          });
        }}
      >
        <MapPinned size={24} />
        <p className="w-[55px] text-left">Map</p>
      </button>
      <button
        className="btn btn-ghost px-2 justify-start"
        onClick={() => {
          onItemClick({
            i: "url-" + Date.now().toString(),
            x: 0,
            y: 999,
            w: 2,
            h: 4,
            maxH: 8,
            maxW: 6,
          });
        }}
      >
        <Link2 size={24} />
        <p className="w-[55px] text-left">URL</p>
      </button>
    </div>
  );
};

export default Items;
