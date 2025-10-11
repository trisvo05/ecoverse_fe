"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
delete (L.Icon.Default.prototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapProps = {
  height?: string;
  width?: string;
};

export default function Map({ height = "100%", width = "100%" }: MapProps) {
  const locations = [
    { id: 1, name: "Viện Khoa học Kĩ thuật Bưu điện", position: [21.046184, 105.789463] as [number, number] },
    { id: 2, name: "Học viện Ngân hàng", position: [21.007262, 105.833139] as [number, number] },
    { id: 3, name: "Học viện Công nghệ Bưu chính Viễn thông", position: [20.96667, 105.78333] as [number, number] },
  ];

  return (
    <MapContainer
      center={[20.96667, 105.78333]}
      zoom={10}
      style={{ height, width }}
      className="z-1"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.position}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
