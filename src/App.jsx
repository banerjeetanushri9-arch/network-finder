import { useEffect, useState } from "react";
import "./App.css";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function App() {
  const [location, setLocation] = useState(null);
  const [towers, setTowers] = useState([]);
  const [error, setError] = useState("");

  // ==========================================
  // CALCULATE DISTANCE
  // ==========================================

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // ==========================================
  // GET USER LOCATION
  // ==========================================

  const getLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        setError("Unable to get your location.");
      }
    );
  };

  // ==========================================
  // GET TOWERS FROM BACKEND
  // ==========================================

  const getTowers = async () => {
    try {
      const response = await fetch("http://localhost:3000/towers");

      if (!response.ok) {
        throw new Error("Failed to fetch towers");
      }

      const data = await response.json();

      setTowers(data);
    } catch (error) {
      console.log(error);
      setError("Unable to fetch tower data.");
    }
  };

  // ==========================================
  // FETCH TOWERS WHEN PAGE LOADS
  // ==========================================

  useEffect(() => {
    getTowers();
  }, []);

  // ==========================================
  // FIND NEAREST TOWER
  // ==========================================

  let nearestTower = null;

  if (location && towers.length > 0) {
    let shortestDistance = Infinity;

    towers.forEach((tower) => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        Number(tower.latitude),
        Number(tower.longitude)
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;

        nearestTower = {
          ...tower,
          distance: distance,
        };
      }
    });
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="app">
      <div className="container">

        {/* HEADER */}

        <h1>Network Finder</h1>

        <p className="subtitle">
          Find nearby cellular towers
        </p>

        {/* ==================================
            USER LOCATION
        ================================== */}

        <div className="card">

          <h2>📍 Your Location</h2>

          {location ? (
            <div>

              <p>
                <span>Latitude</span>

                <strong>
                  {location.latitude.toFixed(7)}
                </strong>
              </p>

              <p>
                <span>Longitude</span>

                <strong>
                  {location.longitude.toFixed(7)}
                </strong>
              </p>

            </div>
          ) : (
            <p className="placeholder">
              Location not fetched yet
            </p>
          )}

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button onClick={getLocation}>
            Get My Location
          </button>

        </div>

        {/* ==================================
            MAP
        ================================== */}

        {location && (
          <div className="card">

            <h2>🗺️ Tower Map</h2>

            <MapContainer
              center={[
                location.latitude,
                location.longitude,
              ]}
              zoom={14}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: "14px",
              }}
            >

              {/* OPEN STREET MAP */}

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* ==================================
                  USER LOCATION
              ================================== */}

              <CircleMarker
                center={[
                  location.latitude,
                  location.longitude,
                ]}
                radius={10}
              >

                <Popup>

                  <strong>
                    Your Location
                  </strong>

                  <br />

                  Latitude:{" "}
                  {location.latitude.toFixed(7)}

                  <br />

                  Longitude:{" "}
                  {location.longitude.toFixed(7)}

                </Popup>

              </CircleMarker>

              {/* ==================================
                  TOWER LOCATIONS
              ================================== */}

              {towers.map((tower) => {

                const towerLat =
                  Number(tower.latitude);

                const towerLon =
                  Number(tower.longitude);

                const distance =
                  calculateDistance(
                    location.latitude,
                    location.longitude,
                    towerLat,
                    towerLon
                  );

                return (
                  <CircleMarker
                    key={tower.tower_id}
                    center={[
                      towerLat,
                      towerLon,
                    ]}
                    radius={8}
                  >

                    <Popup>

                      <strong>
                        Tower {tower.tower_id}
                      </strong>

                      <br />

                      Operator:{" "}
                      {tower.operator}

                      <br />

                      Technology:{" "}
                      {tower.technology}

                      <br />

                      Distance:{" "}
                      {distance.toFixed(2)} km

                    </Popup>

                  </CircleMarker>
                );
              })}

              {/* ==================================
                  LINE TO NEAREST TOWER
              ================================== */}

              {nearestTower && (

                <Polyline
                  positions={[
                    [
                      location.latitude,
                      location.longitude,
                    ],

                    [
                      Number(
                        nearestTower.latitude
                      ),
                      Number(
                        nearestTower.longitude
                      ),
                    ],
                  ]}
                  pathOptions={{
                    color: "#1e3a5f",
                    weight: 4,
                  }}
                />

              )}

            </MapContainer>

          </div>
        )}

        {/* ==================================
            NEAREST TOWER
        ================================== */}

        {nearestTower && (

          <div className="card nearest">

            <h2>🎯 Nearest Tower</h2>

            <h3>
              Tower {nearestTower.tower_id}
            </h3>

            <p>
              <span>Operator</span>

              <strong>
                {nearestTower.operator}
              </strong>
            </p>

            <p>
              <span>Technology</span>

              <strong>
                {nearestTower.technology}
              </strong>
            </p>

            <p>
              <span>Distance</span>

              <strong>
                {nearestTower.distance.toFixed(2)} km
              </strong>
            </p>

          </div>

        )}

        {/* ==================================
            ALL TOWERS
        ================================== */}

        <div className="card">

          <h2>📡 Stored Towers</h2>

          {towers.length === 0 ? (

            <p className="placeholder">
              No towers found.
            </p>

          ) : (

            towers.map((tower) => {

              let distance = null;

              if (location) {

                distance =
                  calculateDistance(
                    location.latitude,
                    location.longitude,
                    Number(tower.latitude),
                    Number(tower.longitude)
                  );

              }

              return (

                <div
                  className="tower"
                  key={tower.tower_id}
                >

                  <div>

                    <strong>
                      Tower {tower.tower_id}
                    </strong>

                    <p>
                      {tower.operator} ·{" "}
                      {tower.technology}
                    </p>

                  </div>

                  <div>

                    <p>
                      {Number(
                        tower.latitude
                      ).toFixed(7)}
                    </p>

                    <p>
                      {Number(
                        tower.longitude
                      ).toFixed(7)}
                    </p>

                    {distance !== null && (

                      <p>
                        📏{" "}
                        {distance.toFixed(2)} km
                      </p>

                    )}

                  </div>

                </div>

              );

            })

          )}

        </div>

      </div>
    </div>
  );
}

export default App;