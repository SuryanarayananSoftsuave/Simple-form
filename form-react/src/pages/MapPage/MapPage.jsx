import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./MapPage.module.css";

// Fix Leaflet default marker icons not showing under Vite/Webpack bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapPage() {
  return (
    <div className={`page-content ${styles.pageWrapper}`}>
      <MapContainer
        center={[13.0827, 80.2707]}
        zoom={10}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[13.0827, 80.2707]}>
          <Popup>Chennai</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
