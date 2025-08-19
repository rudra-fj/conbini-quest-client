import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {
  // We are now defining the stores directly in the code, not fetching them.
  const stores = [
    { id: 1, name: 'FamilyMart Shinjuku', address: '1-1-5 Nishi-Shinjuku, Shinjuku-ku, Tokyo', latitude: 35.6897, longitude: 139.6987 },
    { id: 2, name: 'Lawson Shibuya', address: '2-24-12 Shibuya, Shibuya-ku, Tokyo', latitude: 35.6595, longitude: 139.7006 },
    { id: 3, name: '7-Eleven Akihabara', address: '1-15-9 Sotokanda, Chiyoda-ku, Tokyo', latitude: 35.7022, longitude: 139.7741 }
  ];
  const tokyoPosition = [35.6895, 139.6917]; // Coordinates for Tokyo

  return (
    <div className="map-container">
      <h2>Store Locations</h2>
      <MapContainer center={tokyoPosition} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stores.map(store => (
          <Marker key={store.id} position={[store.latitude, store.longitude]}>
            <Popup>
              <b>{store.name}</b><br />
              {store.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;