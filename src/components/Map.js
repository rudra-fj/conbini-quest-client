import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {
  const [stores, setStores] = useState([]);
  const tokyoPosition = [35.6895, 139.6917]; // Coordinates for Tokyo

  useEffect(() => {
    axios.get('https://conbini-quest.onrender.com')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the stores!', error);
      });
  }, []);

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