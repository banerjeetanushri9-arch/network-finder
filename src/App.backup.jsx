// import { useEffect, useState } from "react";
// import "./App.css";

// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   Polyline,
// } from "react-leaflet";

// import "leaflet/dist/leaflet.css";

// function App() {
//   const [location, setLocation] = useState(null);
//   const [towers, setTowers] = useState([]);
//   const [error, setError] = useState("");

//   // ==========================================
//   // CALCULATE DISTANCE
//   // ==========================================

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;

//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // ==========================================
//   // GET USER LOCATION
//   // ==========================================

//   const getLocation = () => {
//     setError("");

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.log(error);
//         setError("Unable to get your location.");
//       }
//     );
//   };

//   // ==========================================
//   // GET TOWERS FROM BACKEND
//   // ==========================================

//   const getTowers = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/towers");

//       if (!response.ok) {
//         throw new Error("Failed to fetch towers");
//       }

//       const data = await response.json();

//       setTowers(data);
//     } catch (error) {
//       console.log(error);
//       setError("Unable to fetch tower data.");
//     }
//   };

//   // ==========================================
//   // FETCH TOWERS WHEN PAGE LOADS
//   // ==========================================

//   useEffect(() => {
//     getTowers();
//   }, []);

//   // ==========================================
//   // FIND NEAREST TOWER
//   // ==========================================

//   let nearestTower = null;

//   if (location && towers.length > 0) {
//     let shortestDistance = Infinity;

//     towers.forEach((tower) => {
//       const distance = calculateDistance(
//         location.latitude,
//         location.longitude,
//         Number(tower.latitude),
//         Number(tower.longitude)
//       );

//       if (distance < shortestDistance) {
//         shortestDistance = distance;

//         nearestTower = {
//           ...tower,
//           distance: distance,
//         };
//       }
//     });
//   }

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="app">
//       <div className="container">

//         {/* HEADER */}

//         <h1>Network Finder</h1>

//         <p className="subtitle">
//           Find nearby cellular towers
//         </p>

//         {/* ==================================
//             USER LOCATION
//         ================================== */}

//         <div className="card">

//           <h2>📍 Your Location</h2>

//           {location ? (
//             <div>

//               <p>
//                 <span>Latitude</span>

//                 <strong>
//                   {location.latitude.toFixed(7)}
//                 </strong>
//               </p>

//               <p>
//                 <span>Longitude</span>

//                 <strong>
//                   {location.longitude.toFixed(7)}
//                 </strong>
//               </p>

//             </div>
//           ) : (
//             <p className="placeholder">
//               Location not fetched yet
//             </p>
//           )}

//           {error && (
//             <p className="error">
//               {error}
//             </p>
//           )}

//           <button onClick={getLocation}>
//             Get My Location
//           </button>

//         </div>

//         {/* ==================================
//             MAP
//         ================================== */}

//         {location && (
//           <div className="card">

//             <h2>🗺️ Tower Map</h2>

//             <MapContainer
//               center={[
//                 location.latitude,
//                 location.longitude,
//               ]}
//               zoom={14}
//               style={{
//                 height: "400px",
//                 width: "100%",
//                 borderRadius: "14px",
//               }}
//             >

//               {/* OPEN STREET MAP */}

//               <TileLayer
//                 attribution="&copy; OpenStreetMap contributors"
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />

//               {/* ==================================
//                   USER LOCATION
//               ================================== */}

//               <CircleMarker
//                 center={[
//                   location.latitude,
//                   location.longitude,
//                 ]}
//                 radius={10}
//               >

//                 <Popup>

//                   <strong>
//                     Your Location
//                   </strong>

//                   <br />

//                   Latitude:{" "}
//                   {location.latitude.toFixed(7)}

//                   <br />

//                   Longitude:{" "}
//                   {location.longitude.toFixed(7)}

//                 </Popup>

//               </CircleMarker>

//               {/* ==================================
//                   TOWER LOCATIONS
//               ================================== */}

//               {towers.map((tower) => {

//                 const towerLat =
//                   Number(tower.latitude);

//                 const towerLon =
//                   Number(tower.longitude);

//                 const distance =
//                   calculateDistance(
//                     location.latitude,
//                     location.longitude,
//                     towerLat,
//                     towerLon
//                   );

//                 return (
//                   <CircleMarker
//                     key={tower.tower_id}
//                     center={[
//                       towerLat,
//                       towerLon,
//                     ]}
//                     radius={8}
//                   >

//                     <Popup>

//                       <strong>
//                         Tower {tower.tower_id}
//                       </strong>

//                       <br />

//                       Operator:{" "}
//                       {tower.operator}

//                       <br />

//                       Technology:{" "}
//                       {tower.technology}

//                       <br />

//                       Distance:{" "}
//                       {distance.toFixed(2)} km

//                     </Popup>

//                   </CircleMarker>
//                 );
//               })}

//               {/* ==================================
//                   LINE TO NEAREST TOWER
//               ================================== */}

//               {nearestTower && (

//                 <Polyline
//                   positions={[
//                     [
//                       location.latitude,
//                       location.longitude,
//                     ],

//                     [
//                       Number(
//                         nearestTower.latitude
//                       ),
//                       Number(
//                         nearestTower.longitude
//                       ),
//                     ],
//                   ]}
//                   pathOptions={{
//                     color: "#1e3a5f",
//                     weight: 4,
//                   }}
//                 />

//               )}

//             </MapContainer>

//           </div>
//         )}

//         {/* ==================================
//             NEAREST TOWER
//         ================================== */}

//         {nearestTower && (

//           <div className="card nearest">

//             <h2>🎯 Nearest Tower</h2>

//             <h3>
//               Tower {nearestTower.tower_id}
//             </h3>

//             <p>
//               <span>Operator</span>

//               <strong>
//                 {nearestTower.operator}
//               </strong>
//             </p>

//             <p>
//               <span>Technology</span>

//               <strong>
//                 {nearestTower.technology}
//               </strong>
//             </p>

//             <p>
//               <span>Distance</span>

//               <strong>
//                 {nearestTower.distance.toFixed(2)} km
//               </strong>
//             </p>

//           </div>

//         )}

//         {/* ==================================
//             ALL TOWERS
//         ================================== */}

//         <div className="card">

//           <h2>📡 Stored Towers</h2>

//           {towers.length === 0 ? (

//             <p className="placeholder">
//               No towers found.
//             </p>

//           ) : (

//             towers.map((tower) => {

//               let distance = null;

//               if (location) {

//                 distance =
//                   calculateDistance(
//                     location.latitude,
//                     location.longitude,
//                     Number(tower.latitude),
//                     Number(tower.longitude)
//                   );

//               }

//               return (

//                 <div
//                   className="tower"
//                   key={tower.tower_id}
//                 >

//                   <div>

//                     <strong>
//                       Tower {tower.tower_id}
//                     </strong>

//                     <p>
//                       {tower.operator} ·{" "}
//                       {tower.technology}
//                     </p>

//                   </div>

//                   <div>

//                     <p>
//                       {Number(
//                         tower.latitude
//                       ).toFixed(7)}
//                     </p>

//                     <p>
//                       {Number(
//                         tower.longitude
//                       ).toFixed(7)}
//                     </p>

//                     {distance !== null && (

//                       <p>
//                         📏{" "}
//                         {distance.toFixed(2)} km
//                       </p>

//                     )}

//                   </div>

//                 </div>

//               );

//             })

//           )}

//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./App.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Haversine distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Automatically move map to user location
function MapUpdater({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 16);
    }
  }, [location, map]);

  return null;
}

function App() {
  const [towers, setTowers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestTower, setNearestTower] = useState(null);

  const [route, setRoute] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);

  const [loading, setLoading] = useState(true);
  const [routing, setRouting] = useState(false);
  const [error, setError] = useState("");

  // Fetch towers
  useEffect(() => {
    fetch("http://localhost:3000/api/towers")
      .then((response) => response.json())
      .then((data) => {
        setTowers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load tower data.");
        setLoading(false);
      });
  }, []);

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        setError("Could not get your current location.");
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  // Find nearest tower
  useEffect(() => {
    if (!userLocation || towers.length === 0) return;

    let nearest = null;
    let shortestDistance = Infinity;

    towers.forEach((tower) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        Number(tower.latitude),
        Number(tower.longitude)
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;

        nearest = {
          ...tower,
          distance,
        };
      }
    });

    setNearestTower(nearest);
  }, [userLocation, towers]);

  // Get actual road route
  useEffect(() => {
    if (!userLocation || !nearestTower) return;

    async function getRoute() {
      try {
        setRouting(true);
        setRoute(null);

        const url =
          `http://localhost:3000/api/route?` +
          `startLat=${userLocation.lat}` +
          `&startLng=${userLocation.lng}` +
          `&endLat=${nearestTower.latitude}` +
          `&endLng=${nearestTower.longitude}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Route request failed");
        }

        const data = await response.json();

        // GeoJSON coordinates are [longitude, latitude]
        const coordinates = data.geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );

        setRoute(coordinates);

        setRouteDistance(data.distance / 1000);

        setRouteDuration(data.duration / 60);
      } catch (err) {
        console.error(err);
        setError("Could not calculate road route.");
      } finally {
        setRouting(false);
      }
    }

    getRoute();
  }, [userLocation, nearestTower]);

  if (loading) {
    return <h2>Loading tower data...</h2>;
  }

  return (
    <div className="app">
      <h1>📡 Cell Tower Finder</h1>

      {error && <div className="error">{error}</div>}

      <div className="info">
        {userLocation && (
          <p>
            <b>Your Location:</b>{" "}
            {userLocation.lat.toFixed(6)},{" "}
            {userLocation.lng.toFixed(6)}
          </p>
        )}

        {nearestTower && (
          <>
            <p>
              <b>Nearest Tower:</b> Tower {nearestTower.tower_id}
            </p>

            <p>
              <b>Operator:</b> {nearestTower.operator}
            </p>

            <p>
              <b>Technology:</b> {nearestTower.technology}
            </p>

            <p>
              <b>Straight-line Distance:</b>{" "}
              {nearestTower.distance.toFixed(2)} km
            </p>

            {routing && <p>🛣️ Calculating road route...</p>}

            {routeDistance !== null && (
              <p>
                <b>Road Distance:</b>{" "}
                {routeDistance.toFixed(2)} km
              </p>
            )}

            {routeDuration !== null && (
              <p>
                <b>Estimated Travel Time:</b>{" "}
                {Math.round(routeDuration)} minutes
              </p>
            )}
          </>
        )}
      </div>

      {userLocation && (
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={16}
          style={{ height: "600px", width: "100%" }}
        >
          <MapUpdater location={userLocation} />

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User location */}
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              <b>You are here</b>
            </Popup>
          </Marker>

          {/* Tower markers */}
          {towers.map((tower) => (
            <Marker
              key={tower.tower_id}
              position={[
                Number(tower.latitude),
                Number(tower.longitude),
              ]}
            >
              <Popup>
                <b>Cell Tower {tower.tower_id}</b>
                <br />
                Operator: {tower.operator}
                <br />
                Technology: {tower.technology}
                <br />
                Latitude: {tower.latitude}
                <br />
                Longitude: {tower.longitude}
              </Popup>
            </Marker>
          ))}

          {/* ACTUAL ROAD ROUTE */}
          {route && (
            <Polyline
              positions={route}
              pathOptions={{
                color: "blue",
                weight: 6,
              }}
            />
          )}
        </MapContainer>
      )}
    </div>
  );
}

export default App;