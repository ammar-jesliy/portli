'use client'

import { useState, useEffect } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import DeleteComponentModal from "./DeleteComponentModal";
import { Move, Search, Trash } from "lucide-react";
// import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import LeafletControlGeocoder from "./LeafletControlGeocoder";
// import { db } from "../../../utils";
// import { components } from "../../../utils/schema";
// import { eq } from "drizzle-orm";

const MapComponent = ({ id, remove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState();
  // console.log(position);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const result = await db
  //     .select()
  //     .from(components)
  //     .where(eq(components.componentId, id));

  //   if (result.length > 0) {
  //     const data = result[0].data;
  //     setPosition([data?.position.lat, data?.position.lng]);
  //   }
  // };

  // const handlePositionChange = async () => {

  //   const data = {
  //     position: position,
  //   }

  //   const result = await db
  //     .update(components)
  //     .set({ data: JSON.stringify(data) })
  //     .where(eq(components.componentId, id));

  //   if (result) {
  //     console.log("Data saved successfully");
  //   } else {
  //     console.log("Failed to save data");
  //   }
  // }

  return (
    <div className="w-full h-full rounded-[25px] flex justify-center items-center bg-base-content group overflow-hidden p-3">
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
          <Search size={16} />
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

      {/* {position && <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        tap={false}
        style={{ width: "100%", height: "100%" }}
        className="z-0 rounded-[13px]"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LeafletControlGeocoder setPosition={setPosition} />
      </MapContainer>} */}
    </div>
  );
};

export default MapComponent;
