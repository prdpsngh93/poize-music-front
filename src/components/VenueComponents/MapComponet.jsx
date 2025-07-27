"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Setup default leaflet marker icon
const DefaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Marker component to update position on map click
const LocationMarker = ({ position, setPosition, setAddress }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      // Reverse geocode to get address string from lat/lng
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.display_name) {
            setAddress(data.display_name);
          }
        });
    },
  });

  return position ? <Marker position={position} /> : null;
};

export default function MapLocation({ position, setPosition, setAddress }) {
  const defaultPosition = [37.7749, -122.4194]; // Fallback SF

  return (
    <MapContainer
      center={position || defaultPosition}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "250px", width: "100%" }}
      className="rounded-lg overflow-hidden z-0"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        position={position}
        setPosition={setPosition}
        setAddress={setAddress}
      />
    </MapContainer>
  );
}
