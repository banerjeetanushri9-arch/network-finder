// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import "./App.css";

// // // // // // // import {
// // // // // // //   MapContainer,
// // // // // // //   TileLayer,
// // // // // // //   CircleMarker,
// // // // // // //   Popup,
// // // // // // //   Polyline,
// // // // // // // } from "react-leaflet";

// // // // // // // import "leaflet/dist/leaflet.css";

// // // // // // // function App() {
// // // // // // //   const [location, setLocation] = useState(null);
// // // // // // //   const [towers, setTowers] = useState([]);
// // // // // // //   const [error, setError] = useState("");

// // // // // // //   // ==========================================
// // // // // // //   // CALCULATE DISTANCE
// // // // // // //   // ==========================================

// // // // // // //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// // // // // // //     const R = 6371;

// // // // // // //     const dLat = ((lat2 - lat1) * Math.PI) / 180;
// // // // // // //     const dLon = ((lon2 - lon1) * Math.PI) / 180;

// // // // // // //     const a =
// // // // // // //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // // // // // //       Math.cos((lat1 * Math.PI) / 180) *
// // // // // // //         Math.cos((lat2 * Math.PI) / 180) *
// // // // // // //         Math.sin(dLon / 2) *
// // // // // // //         Math.sin(dLon / 2);

// // // // // // //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// // // // // // //     return R * c;
// // // // // // //   };

// // // // // // //   // ==========================================
// // // // // // //   // GET USER LOCATION
// // // // // // //   // ==========================================

// // // // // // //   const getLocation = () => {
// // // // // // //     setError("");

// // // // // // //     if (!navigator.geolocation) {
// // // // // // //       setError("Geolocation is not supported by your browser.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     navigator.geolocation.getCurrentPosition(
// // // // // // //       (position) => {
// // // // // // //         setLocation({
// // // // // // //           latitude: position.coords.latitude,
// // // // // // //           longitude: position.coords.longitude,
// // // // // // //         });
// // // // // // //       },
// // // // // // //       (error) => {
// // // // // // //         console.log(error);
// // // // // // //         setError("Unable to get your location.");
// // // // // // //       }
// // // // // // //     );
// // // // // // //   };

// // // // // // //   // ==========================================
// // // // // // //   // GET TOWERS FROM BACKEND
// // // // // // //   // ==========================================

// // // // // // //   const getTowers = async () => {
// // // // // // //     try {
// // // // // // //       const response = await fetch("http://localhost:3000/api/towers");

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error("Failed to fetch towers");
// // // // // // //       }

// // // // // // //       const data = await response.json();

// // // // // // //       if (!Array.isArray(data)) {
// // // // // // //         throw new Error("Tower data is not an array");
// // // // // // //       }

// // // // // // //       setTowers(data);
// // // // // // //     } catch (error) {
// // // // // // //       console.log(error);
// // // // // // //       setError("Unable to fetch tower data.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ==========================================
// // // // // // //   // FETCH TOWERS WHEN PAGE LOADS
// // // // // // //   // ==========================================

// // // // // // //   useEffect(() => {
// // // // // // //     getTowers();
// // // // // // //   }, []);

// // // // // // //   // ==========================================
// // // // // // //   // FIND NEAREST TOWER
// // // // // // //   // ==========================================

// // // // // // //   let nearestTower = null;

// // // // // // //   if (location && towers.length > 0) {
// // // // // // //     let shortestDistance = Infinity;

// // // // // // //     towers.forEach((tower) => {
// // // // // // //       const distance = calculateDistance(
// // // // // // //         location.latitude,
// // // // // // //         location.longitude,
// // // // // // //         Number(tower.latitude),
// // // // // // //         Number(tower.longitude)
// // // // // // //       );

// // // // // // //       if (distance < shortestDistance) {
// // // // // // //         shortestDistance = distance;

// // // // // // //         nearestTower = {
// // // // // // //           ...tower,
// // // // // // //           distance: distance,
// // // // // // //         };
// // // // // // //       }
// // // // // // //     });
// // // // // // //   }

// // // // // // //   // ==========================================
// // // // // // //   // UI
// // // // // // //   // ==========================================

// // // // // // //   return (
// // // // // // //     <div className="app">
// // // // // // //       <div className="container">

// // // // // // //         {/* HEADER */}

// // // // // // //         <h1>Network Finder</h1>

// // // // // // //         <p className="subtitle">
// // // // // // //           Find nearby cellular towers
// // // // // // //         </p>

// // // // // // //         {/* ==================================
// // // // // // //             USER LOCATION
// // // // // // //         ================================== */}

// // // // // // //         <div className="card">

// // // // // // //           <h2>📍 Your Location</h2>

// // // // // // //           {location ? (
// // // // // // //             <div>

// // // // // // //               <p>
// // // // // // //                 <span>Latitude</span>

// // // // // // //                 <strong>
// // // // // // //                   {location.latitude.toFixed(7)}
// // // // // // //                 </strong>
// // // // // // //               </p>

// // // // // // //               <p>
// // // // // // //                 <span>Longitude</span>

// // // // // // //                 <strong>
// // // // // // //                   {location.longitude.toFixed(7)}
// // // // // // //                 </strong>
// // // // // // //               </p>

// // // // // // //             </div>
// // // // // // //           ) : (
// // // // // // //             <p className="placeholder">
// // // // // // //               Location not fetched yet
// // // // // // //             </p>
// // // // // // //           )}

// // // // // // //           {error && (
// // // // // // //             <p className="error">
// // // // // // //               {error}
// // // // // // //             </p>
// // // // // // //           )}

// // // // // // //           <button onClick={getLocation}>
// // // // // // //             Get My Location
// // // // // // //           </button>

// // // // // // //         </div>

// // // // // // //         {/* ==================================
// // // // // // //             MAP
// // // // // // //         ================================== */}

// // // // // // //         {location && (
// // // // // // //           <div className="card">

// // // // // // //             <h2>🗺️ Tower Map</h2>

// // // // // // //             <MapContainer
// // // // // // //               center={[
// // // // // // //                 location.latitude,
// // // // // // //                 location.longitude,
// // // // // // //               ]}
// // // // // // //               zoom={14}
// // // // // // //               style={{
// // // // // // //                 height: "400px",
// // // // // // //                 width: "100%",
// // // // // // //                 borderRadius: "14px",
// // // // // // //               }}
// // // // // // //             >

// // // // // // //               {/* MAP */}

// // // // // // //               <TileLayer
// // // // // // //                 attribution="&copy; OpenStreetMap contributors"
// // // // // // //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // // // // //               />

// // // // // // //               {/* ==================================
// // // // // // //                   USER LOCATION
// // // // // // //               ================================== */}

// // // // // // //               <CircleMarker
// // // // // // //                 center={[
// // // // // // //                   location.latitude,
// // // // // // //                   location.longitude,
// // // // // // //                 ]}
// // // // // // //                 radius={10}
// // // // // // //               >

// // // // // // //                 <Popup>

// // // // // // //                   <strong>
// // // // // // //                     Your Location
// // // // // // //                   </strong>

// // // // // // //                   <br />

// // // // // // //                   Latitude:{" "}
// // // // // // //                   {location.latitude.toFixed(7)}

// // // // // // //                   <br />

// // // // // // //                   Longitude:{" "}
// // // // // // //                   {location.longitude.toFixed(7)}

// // // // // // //                 </Popup>

// // // // // // //               </CircleMarker>

// // // // // // //               {/* ==================================
// // // // // // //                   TOWER LOCATIONS
// // // // // // //               ================================== */}

// // // // // // //               {towers.map((tower) => {

// // // // // // //                 const towerLat =
// // // // // // //                   Number(tower.latitude);

// // // // // // //                 const towerLon =
// // // // // // //                   Number(tower.longitude);

// // // // // // //                 const distance =
// // // // // // //                   calculateDistance(
// // // // // // //                     location.latitude,
// // // // // // //                     location.longitude,
// // // // // // //                     towerLat,
// // // // // // //                     towerLon
// // // // // // //                   );

// // // // // // //                 return (
// // // // // // //                   <CircleMarker
// // // // // // //                     key={tower.tower_id}
// // // // // // //                     center={[
// // // // // // //                       towerLat,
// // // // // // //                       towerLon,
// // // // // // //                     ]}
// // // // // // //                     radius={8}
// // // // // // //                   >

// // // // // // //                     <Popup>

// // // // // // //                       <strong>
// // // // // // //                         Tower {tower.tower_id}
// // // // // // //                       </strong>

// // // // // // //                       <br />

// // // // // // //                       Operator:{" "}
// // // // // // //                       {tower.operator}

// // // // // // //                       <br />

// // // // // // //                       Technology:{" "}
// // // // // // //                       {tower.technology}

// // // // // // //                       <br />

// // // // // // //                       Distance:{" "}
// // // // // // //                       {distance.toFixed(2)} km

// // // // // // //                     </Popup>

// // // // // // //                   </CircleMarker>
// // // // // // //                 );
// // // // // // //               })}

// // // // // // //               {/* ==================================
// // // // // // //                   LINE TO NEAREST TOWER
// // // // // // //               ================================== */}

// // // // // // //               {nearestTower && (

// // // // // // //                 <Polyline
// // // // // // //                   positions={[
// // // // // // //                     [
// // // // // // //                       location.latitude,
// // // // // // //                       location.longitude,
// // // // // // //                     ],

// // // // // // //                     [
// // // // // // //                       Number(nearestTower.latitude),
// // // // // // //                       Number(nearestTower.longitude),
// // // // // // //                     ],
// // // // // // //                   ]}
// // // // // // //                   pathOptions={{
// // // // // // //                     color: "#1e3a5f",
// // // // // // //                     weight: 4,
// // // // // // //                   }}
// // // // // // //                 />

// // // // // // //               )}

// // // // // // //             </MapContainer>

// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* ==================================
// // // // // // //             NEAREST TOWER
// // // // // // //         ================================== */}

// // // // // // //         {nearestTower && (

// // // // // // //           <div className="card nearest">

// // // // // // //             <h2>🎯 Nearest Tower</h2>

// // // // // // //             <h3>
// // // // // // //               Tower {nearestTower.tower_id}
// // // // // // //             </h3>

// // // // // // //             <p>
// // // // // // //               <span>Operator</span>

// // // // // // //               <strong>
// // // // // // //                 {nearestTower.operator}
// // // // // // //               </strong>
// // // // // // //             </p>

// // // // // // //             <p>
// // // // // // //               <span>Technology</span>

// // // // // // //               <strong>
// // // // // // //                 {nearestTower.technology}
// // // // // // //               </strong>
// // // // // // //             </p>

// // // // // // //             <p>
// // // // // // //               <span>Distance</span>

// // // // // // //               <strong>
// // // // // // //                 {nearestTower.distance.toFixed(2)} km
// // // // // // //               </strong>
// // // // // // //             </p>

// // // // // // //           </div>

// // // // // // //         )}

// // // // // // //         {/* ==================================
// // // // // // //             ALL TOWERS
// // // // // // //         ================================== */}

// // // // // // //         <div className="card">

// // // // // // //           <h2>📡 Stored Towers</h2>

// // // // // // //           {towers.length === 0 ? (

// // // // // // //             <p className="placeholder">
// // // // // // //               No towers found.
// // // // // // //             </p>

// // // // // // //           ) : (

// // // // // // //             towers.map((tower) => {

// // // // // // //               let distance = null;

// // // // // // //               if (location) {

// // // // // // //                 distance =
// // // // // // //                   calculateDistance(
// // // // // // //                     location.latitude,
// // // // // // //                     location.longitude,
// // // // // // //                     Number(tower.latitude),
// // // // // // //                     Number(tower.longitude)
// // // // // // //                   );

// // // // // // //               }

// // // // // // //               return (

// // // // // // //                 <div
// // // // // // //                   className="tower"
// // // // // // //                   key={tower.tower_id}
// // // // // // //                 >

// // // // // // //                   <div>

// // // // // // //                     <strong>
// // // // // // //                       Tower {tower.tower_id}
// // // // // // //                     </strong>

// // // // // // //                     <p>
// // // // // // //                       {tower.operator} ·{" "}
// // // // // // //                       {tower.technology}
// // // // // // //                     </p>

// // // // // // //                   </div>

// // // // // // //                   <div>

// // // // // // //                     <p>
// // // // // // //                       {Number(
// // // // // // //                         tower.latitude
// // // // // // //                       ).toFixed(7)}
// // // // // // //                     </p>

// // // // // // //                     <p>
// // // // // // //                       {Number(
// // // // // // //                         tower.longitude
// // // // // // //                       ).toFixed(7)}
// // // // // // //                     </p>

// // // // // // //                     {distance !== null && (

// // // // // // //                       <p>
// // // // // // //                         📏{" "}
// // // // // // //                         {distance.toFixed(2)} km
// // // // // // //                       </p>

// // // // // // //                     )}

// // // // // // //                   </div>

// // // // // // //                 </div>

// // // // // // //               );

// // // // // // //             })

// // // // // // //           )}

// // // // // // //         </div>

// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default App;


// // // // // // import { useEffect, useState } from "react";

// // // // // // import {
// // // // // //   MapContainer,
// // // // // //   TileLayer,
// // // // // //   CircleMarker,
// // // // // //   Popup,
// // // // // //   Polyline,
// // // // // // } from "react-leaflet";

// // // // // // import "leaflet/dist/leaflet.css";
// // // // // // import "./App.css";


// // // // // // /*
// // // // // // ========================================
// // // // // // DISTANCE CALCULATION
// // // // // // ========================================
// // // // // // */

// // // // // // function calculateDistance(
// // // // // //   lat1,
// // // // // //   lon1,
// // // // // //   lat2,
// // // // // //   lon2
// // // // // // ) {

// // // // // //   const R = 6371;

// // // // // //   const dLat =
// // // // // //     ((lat2 - lat1) * Math.PI) / 180;

// // // // // //   const dLon =
// // // // // //     ((lon2 - lon1) * Math.PI) / 180;


// // // // // //   const a =
// // // // // //     Math.sin(dLat / 2) ** 2 +

// // // // // //     Math.cos(
// // // // // //       (lat1 * Math.PI) / 180
// // // // // //     ) *

// // // // // //     Math.cos(
// // // // // //       (lat2 * Math.PI) / 180
// // // // // //     ) *

// // // // // //     Math.sin(dLon / 2) ** 2;


// // // // // //   const c =
// // // // // //     2 *
// // // // // //     Math.atan2(
// // // // // //       Math.sqrt(a),
// // // // // //       Math.sqrt(1 - a)
// // // // // //     );


// // // // // //   return R * c;
// // // // // // }


// // // // // // /*
// // // // // // ========================================
// // // // // // APP
// // // // // // ========================================
// // // // // // */

// // // // // // function App() {


// // // // // //   /*
// // // // // //   ======================================
// // // // // //   STATES
// // // // // //   ======================================
// // // // // //   */

// // // // // //   const [location, setLocation] =
// // // // // //     useState(null);


// // // // // //   const [cells, setCells] =
// // // // // //     useState([]);


// // // // // //   const [nearestCell, setNearestCell] =
// // // // // //     useState(null);


// // // // // //   const [loading, setLoading] =
// // // // // //     useState(false);


// // // // // //   const [error, setError] =
// // // // // //     useState("");


// // // // // //   /*
// // // // // //   ======================================
// // // // // //   GET USER LOCATION
// // // // // //   ======================================
// // // // // //   */

// // // // // //   const getLocation = () => {

// // // // // //     setError("");


// // // // // //     if (!navigator.geolocation) {

// // // // // //       setError(
// // // // // //         "Geolocation is not supported by your browser."
// // // // // //       );

// // // // // //       return;
// // // // // //     }


// // // // // //     navigator.geolocation.getCurrentPosition(

// // // // // //       (position) => {

// // // // // //         setLocation({

// // // // // //           latitude:
// // // // // //             position.coords.latitude,

// // // // // //           longitude:
// // // // // //             position.coords.longitude,

// // // // // //         });

// // // // // //       },


// // // // // //       (err) => {

// // // // // //         console.error(err);

// // // // // //         setError(
// // // // // //           "Unable to get your location."
// // // // // //         );

// // // // // //       },


// // // // // //       {
// // // // // //         enableHighAccuracy: true,
// // // // // //       }

// // // // // //     );

// // // // // //   };


// // // // // //   /*
// // // // // //   ======================================
// // // // // //   FETCH OPENCELLID CELLS
// // // // // //   ======================================
// // // // // //   */

// // // // // //   useEffect(() => {

// // // // // //     if (!location) {
// // // // // //       return;
// // // // // //     }


// // // // // //     const getCells = async () => {

// // // // // //       try {

// // // // // //         setLoading(true);

// // // // // //         setError("");


// // // // // //         const url =
// // // // // //           `http://localhost:3000/api/opencellid` +
// // // // // //           `?lat=${location.latitude}` +
// // // // // //           `&lng=${location.longitude}`;


// // // // // //         const response =
// // // // // //           await fetch(url);


// // // // // //         const data =
// // // // // //           await response.json();


// // // // // //         console.log(
// // // // // //           "OpenCelliD data:",
// // // // // //           data
// // // // // //         );


// // // // // //         if (!response.ok) {

// // // // // //           throw new Error(
// // // // // //             data.error ||
// // // // // //             "Failed to fetch OpenCelliD data"
// // // // // //           );

// // // // // //         }


// // // // // //         if (
// // // // // //           !data.cells ||
// // // // // //           !Array.isArray(data.cells)
// // // // // //         ) {

// // // // // //           throw new Error(
// // // // // //             "Invalid data received from OpenCelliD"
// // // // // //           );

// // // // // //         }


// // // // // //         setCells(data.cells);


// // // // // //       } catch (err) {

// // // // // //         console.error(err);

// // // // // //         setError(
// // // // // //           err.message ||
// // // // // //           "Unable to fetch nearby cells."
// // // // // //         );


// // // // // //         setCells([]);

// // // // // //       } finally {

// // // // // //         setLoading(false);

// // // // // //       }

// // // // // //     };


// // // // // //     getCells();

// // // // // //   }, [location]);


// // // // // //   /*
// // // // // //   ======================================
// // // // // //   FIND NEAREST CELL
// // // // // //   ======================================
// // // // // //   */

// // // // // //   useEffect(() => {

// // // // // //     if (
// // // // // //       !location ||
// // // // // //       cells.length === 0
// // // // // //     ) {

// // // // // //       setNearestCell(null);

// // // // // //       return;

// // // // // //     }


// // // // // //     let nearest = null;

// // // // // //     let shortestDistance =
// // // // // //       Infinity;


// // // // // //     cells.forEach((cell) => {

// // // // // //       const distance =
// // // // // //         calculateDistance(

// // // // // //           location.latitude,

// // // // // //           location.longitude,

// // // // // //           Number(cell.latitude),

// // // // // //           Number(cell.longitude)

// // // // // //         );


// // // // // //       if (
// // // // // //         distance <
// // // // // //         shortestDistance
// // // // // //       ) {

// // // // // //         shortestDistance =
// // // // // //           distance;


// // // // // //         nearest = {

// // // // // //           ...cell,

// // // // // //           distance,

// // // // // //         };

// // // // // //       }

// // // // // //     });


// // // // // //     setNearestCell(nearest);

// // // // // //   }, [location, cells]);


// // // // // //   /*
// // // // // //   ======================================
// // // // // //   RETURN UI
// // // // // //   ======================================
// // // // // //   */

// // // // // //   return (

// // // // // //     <div className="app">

// // // // // //       <div className="container">


// // // // // //         {/* =================================
// // // // // //             HEADER
// // // // // //         ================================= */}

// // // // // //         <h1>
// // // // // //           Network Finder
// // // // // //         </h1>


// // // // // //         <p className="subtitle">
// // // // // //           Find nearby cellular cells
// // // // // //         </p>



// // // // // //         {/* =================================
// // // // // //             LOCATION CARD
// // // // // //         ================================= */}

// // // // // //         <div className="card">

// // // // // //           <h2>
// // // // // //             📍 Your Location
// // // // // //           </h2>


// // // // // //           {location ? (

// // // // // //             <div>

// // // // // //               <p>

// // // // // //                 <span>
// // // // // //                   Latitude
// // // // // //                 </span>

// // // // // //                 <strong>
// // // // // //                   {location.latitude.toFixed(7)}
// // // // // //                 </strong>

// // // // // //               </p>


// // // // // //               <p>

// // // // // //                 <span>
// // // // // //                   Longitude
// // // // // //                 </span>

// // // // // //                 <strong>
// // // // // //                   {location.longitude.toFixed(7)}
// // // // // //                 </strong>

// // // // // //               </p>

// // // // // //             </div>

// // // // // //           ) : (

// // // // // //             <p className="placeholder">
// // // // // //               Location not fetched yet
// // // // // //             </p>

// // // // // //           )}



// // // // // //           {error && (

// // // // // //             <p className="error">
// // // // // //               {error}
// // // // // //             </p>

// // // // // //           )}



// // // // // //           <button onClick={getLocation}>
// // // // // //             Get My Location
// // // // // //           </button>

// // // // // //         </div>



// // // // // //         {/* =================================
// // // // // //             LOADING
// // // // // //         ================================= */}

// // // // // //         {loading && (

// // // // // //           <div className="card">

// // // // // //             <p>
// // // // // //               🔄 Searching nearby cells...
// // // // // //             </p>

// // // // // //           </div>

// // // // // //         )}



// // // // // //         {/* =================================
// // // // // //             MAP
// // // // // //         ================================= */}

// // // // // //         {location && (

// // // // // //           <div className="card">

// // // // // //             <h2>
// // // // // //               🗺️ Cell Map
// // // // // //             </h2>


// // // // // //             <MapContainer

// // // // // //               center={[
// // // // // //                 location.latitude,
// // // // // //                 location.longitude,
// // // // // //               ]}

// // // // // //               zoom={14}

// // // // // //               style={{
// // // // // //                 height: "400px",
// // // // // //                 width: "100%",
// // // // // //                 borderRadius: "14px",
// // // // // //               }}

// // // // // //             >


// // // // // //               {/* =================================
// // // // // //                   MAP TILES
// // // // // //               ================================= */}

// // // // // //               <TileLayer

// // // // // //                 attribution=
// // // // // //                   "&copy; OpenStreetMap contributors"

// // // // // //                 url=
// // // // // //                   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

// // // // // //               />



// // // // // //               {/* =================================
// // // // // //                   USER LOCATION
// // // // // //               ================================= */}

// // // // // //               <CircleMarker

// // // // // //                 center={[
// // // // // //                   location.latitude,
// // // // // //                   location.longitude,
// // // // // //                 ]}

// // // // // //                 radius={10}

// // // // // //               >

// // // // // //                 <Popup>

// // // // // //                   <strong>
// // // // // //                     Your Location
// // // // // //                   </strong>

// // // // // //                   <br />

// // // // // //                   Latitude:

// // // // // //                   {" "}

// // // // // //                   {location.latitude.toFixed(7)}

// // // // // //                   <br />

// // // // // //                   Longitude:

// // // // // //                   {" "}

// // // // // //                   {location.longitude.toFixed(7)}

// // // // // //                 </Popup>

// // // // // //               </CircleMarker>



// // // // // //               {/* =================================
// // // // // //                   OPENCELLID CELLS
// // // // // //               ================================= */}

// // // // // //               {cells.map((cell, index) => (

// // // // // //                 <CircleMarker

// // // // // //                   key={
// // // // // //                     `${cell.cell_id}-${index}`
// // // // // //                   }

// // // // // //                   center={[
// // // // // //                     Number(cell.latitude),
// // // // // //                     Number(cell.longitude),
// // // // // //                   ]}

// // // // // //                   radius={8}

// // // // // //                 >

// // // // // //                   <Popup>

// // // // // //                     <strong>
// // // // // //                       Cell{" "}
// // // // // //                       {cell.cell_id}
// // // // // //                     </strong>


// // // // // //                     <br />

// // // // // //                     MCC:
// // // // // //                     {" "}
// // // // // //                     {cell.mcc}


// // // // // //                     <br />

// // // // // //                     MNC:
// // // // // //                     {" "}
// // // // // //                     {cell.mnc}


// // // // // //                     <br />

// // // // // //                     LAC/TAC:
// // // // // //                     {" "}
// // // // // //                     {cell.lac}


// // // // // //                     <br />

// // // // // //                     Radio:
// // // // // //                     {" "}
// // // // // //                     {cell.radio || "Unknown"}


// // // // // //                     <br />

// // // // // //                     Range:
// // // // // //                     {" "}
// // // // // //                     {cell.range
// // // // // //                       ? `${cell.range} m`
// // // // // //                       : "N/A"}


// // // // // //                     <br />

// // // // // //                     Distance:
// // // // // //                     {" "}

// // // // // //                     {location

// // // // // //                       ? calculateDistance(

// // // // // //                           location.latitude,

// // // // // //                           location.longitude,

// // // // // //                           Number(
// // // // // //                             cell.latitude
// // // // // //                           ),

// // // // // //                           Number(
// // // // // //                             cell.longitude
// // // // // //                           )

// // // // // //                         ).toFixed(2)

// // // // // //                       : "--"}

// // // // // //                     {" "}km

// // // // // //                   </Popup>

// // // // // //                 </CircleMarker>

// // // // // //               ))}



// // // // // //               {/* =================================
// // // // // //                   LINE TO NEAREST CELL
// // // // // //               ================================= */}

// // // // // //               {nearestCell && (

// // // // // //                 <Polyline

// // // // // //                   positions={[

// // // // // //                     [
// // // // // //                       location.latitude,
// // // // // //                       location.longitude,
// // // // // //                     ],


// // // // // //                     [
// // // // // //                       Number(
// // // // // //                         nearestCell.latitude
// // // // // //                       ),

// // // // // //                       Number(
// // // // // //                         nearestCell.longitude
// // // // // //                       ),

// // // // // //                     ],

// // // // // //                   ]}


// // // // // //                   pathOptions={{
// // // // // //                     color: "#1e3a5f",
// // // // // //                     weight: 4,
// // // // // //                   }}

// // // // // //                 />

// // // // // //               )}

// // // // // //             </MapContainer>

// // // // // //           </div>

// // // // // //         )}



// // // // // //         {/* =================================
// // // // // //             NEAREST CELL
// // // // // //         ================================= */}

// // // // // //         {nearestCell && (

// // // // // //           <div className="card nearest">

// // // // // //             <h2>
// // // // // //               🎯 Nearest Cell
// // // // // //             </h2>


// // // // // //             <h3>
// // // // // //               Cell{" "}
// // // // // //               {nearestCell.cell_id}
// // // // // //             </h3>


// // // // // //             <p>

// // // // // //               <span>
// // // // // //                 MCC
// // // // // //               </span>

// // // // // //               <strong>
// // // // // //                 {nearestCell.mcc}
// // // // // //               </strong>

// // // // // //             </p>


// // // // // //             <p>

// // // // // //               <span>
// // // // // //                 MNC
// // // // // //               </span>

// // // // // //               <strong>
// // // // // //                 {nearestCell.mnc}
// // // // // //               </strong>

// // // // // //             </p>


// // // // // //             <p>

// // // // // //               <span>
// // // // // //                 LAC/TAC
// // // // // //               </span>

// // // // // //               <strong>
// // // // // //                 {nearestCell.lac}
// // // // // //               </strong>

// // // // // //             </p>


// // // // // //             <p>

// // // // // //               <span>
// // // // // //                 Radio
// // // // // //               </span>

// // // // // //               <strong>
// // // // // //                 {nearestCell.radio ||
// // // // // //                   "Unknown"}
// // // // // //               </strong>

// // // // // //             </p>


// // // // // //             <p>

// // // // // //               <span>
// // // // // //                 Distance
// // // // // //               </span>

// // // // // //               <strong>
// // // // // //                 {nearestCell.distance.toFixed(2)}
// // // // // //                 {" "}km
// // // // // //               </strong>

// // // // // //             </p>

// // // // // //           </div>

// // // // // //         )}



// // // // // //         {/* =================================
// // // // // //             ALL CELLS
// // // // // //         ================================= */}

// // // // // //         <div className="card">

// // // // // //           <h2>
// // // // // //             📡 OpenCelliD Cells
// // // // // //           </h2>


// // // // // //           {cells.length === 0 ? (

// // // // // //             <p className="placeholder">

// // // // // //               {loading
// // // // // //                 ? "Searching..."
// // // // // //                 : "No cells found yet."}

// // // // // //             </p>

// // // // // //           ) : (

// // // // // //             cells.map((cell, index) => {

// // // // // //               const distance =
// // // // // //                 location

// // // // // //                   ? calculateDistance(

// // // // // //                       location.latitude,

// // // // // //                       location.longitude,

// // // // // //                       Number(
// // // // // //                         cell.latitude
// // // // // //                       ),

// // // // // //                       Number(
// // // // // //                         cell.longitude
// // // // // //                       )

// // // // // //                     )

// // // // // //                   : null;


// // // // // //               return (

// // // // // //                 <div
// // // // // //                   className="tower"
// // // // // //                   key={
// // // // // //                     `${cell.cell_id}-${index}`
// // // // // //                   }
// // // // // //                 >

// // // // // //                   <div>

// // // // // //                     <strong>
// // // // // //                       Cell{" "}
// // // // // //                       {cell.cell_id}
// // // // // //                     </strong>


// // // // // //                     <p>
// // // // // //                       MCC {cell.mcc}
// // // // // //                       {" · "}
// // // // // //                       MNC {cell.mnc}
// // // // // //                     </p>


// // // // // //                     <p>
// // // // // //                       {cell.radio ||
// // // // // //                         "Unknown radio"}
// // // // // //                     </p>

// // // // // //                   </div>


// // // // // //                   <div>

// // // // // //                     <p>
// // // // // //                       {Number(
// // // // // //                         cell.latitude
// // // // // //                       ).toFixed(4)}
// // // // // //                     </p>


// // // // // //                     <p>
// // // // // //                       {Number(
// // // // // //                         cell.longitude
// // // // // //                       ).toFixed(4)}
// // // // // //                     </p>


// // // // // //                     {distance !== null && (

// // // // // //                       <p>

// // // // // //                         📏{" "}

// // // // // //                         {distance.toFixed(2)}

// // // // // //                         {" "}km

// // // // // //                       </p>

// // // // // //                     )}

// // // // // //                   </div>

// // // // // //                 </div>

// // // // // //               );

// // // // // //             })

// // // // // //           )}

// // // // // //         </div>



// // // // // //         {/* =================================
// // // // // //             DATA SOURCE
// // // // // //         ================================= */}

// // // // // //         <div className="card">

// // // // // //           <p className="placeholder">

// // // // // //             Cell data provided by
// // // // // //             OpenCelliD.

// // // // // //           </p>

// // // // // //         </div>


// // // // // //       </div>

// // // // // //     </div>

// // // // // //   );

// // // // // // }


// // // // // // export default App;


// // // // // import { useEffect, useState } from "react";

// // // // // import {
// // // // //   MapContainer,
// // // // //   TileLayer,
// // // // //   CircleMarker,
// // // // //   Popup,
// // // // //   Polyline,
// // // // // } from "react-leaflet";

// // // // // import "leaflet/dist/leaflet.css";
// // // // // import "./App.css";

// // // // // /*
// // // // // ========================================
// // // // // DISTANCE CALCULATION
// // // // // ========================================
// // // // // */

// // // // // function calculateDistance(
// // // // //   lat1,
// // // // //   lon1,
// // // // //   lat2,
// // // // //   lon2
// // // // // ) {
// // // // //   const R = 6371;

// // // // //   const dLat =
// // // // //     ((lat2 - lat1) * Math.PI) / 180;

// // // // //   const dLon =
// // // // //     ((lon2 - lon1) * Math.PI) / 180;

// // // // //   const a =
// // // // //     Math.sin(dLat / 2) ** 2 +
// // // // //     Math.cos((lat1 * Math.PI) / 180) *
// // // // //       Math.cos((lat2 * Math.PI) / 180) *
// // // // //       Math.sin(dLon / 2) ** 2;

// // // // //   const c =
// // // // //     2 *
// // // // //     Math.atan2(
// // // // //       Math.sqrt(a),
// // // // //       Math.sqrt(1 - a)
// // // // //     );

// // // // //   return R * c;
// // // // // }

// // // // // /*
// // // // // ========================================
// // // // // VALIDATE CELL COORDINATES
// // // // // ========================================

// // // // // OpenCelliD can sometimes return records
// // // // // without valid latitude/longitude values.

// // // // // Leaflet cannot accept NaN coordinates.

// // // // // This function makes sure only valid
// // // // // coordinates reach CircleMarker/Polyline.
// // // // // ========================================
// // // // // */

// // // // // function getValidCoordinates(cell) {
// // // // //   const latitude = Number(cell?.latitude);
// // // // //   const longitude = Number(cell?.longitude);

// // // // //   if (
// // // // //     !Number.isFinite(latitude) ||
// // // // //     !Number.isFinite(longitude)
// // // // //   ) {
// // // // //     return null;
// // // // //   }

// // // // //   if (
// // // // //     latitude < -90 ||
// // // // //     latitude > 90 ||
// // // // //     longitude < -180 ||
// // // // //     longitude > 180
// // // // //   ) {
// // // // //     return null;
// // // // //   }

// // // // //   return [latitude, longitude];
// // // // // }

// // // // // /*
// // // // // ========================================
// // // // // APP
// // // // // ========================================
// // // // // */

// // // // // function App() {
// // // // //   /*
// // // // //   ======================================
// // // // //   STATES
// // // // //   ======================================
// // // // //   */

// // // // //   const [location, setLocation] =
// // // // //     useState(null);

// // // // //   const [cells, setCells] =
// // // // //     useState([]);

// // // // //   const [nearestCell, setNearestCell] =
// // // // //     useState(null);

// // // // //   const [loading, setLoading] =
// // // // //     useState(false);

// // // // //   const [error, setError] =
// // // // //     useState("");

// // // // //   /*
// // // // //   ======================================
// // // // //   GET USER LOCATION
// // // // //   ======================================
// // // // //   */

// // // // //   const getLocation = () => {
// // // // //     setError("");

// // // // //     if (!navigator.geolocation) {
// // // // //       setError(
// // // // //         "Geolocation is not supported by your browser."
// // // // //       );

// // // // //       return;
// // // // //     }

// // // // //     navigator.geolocation.getCurrentPosition(
// // // // //       (position) => {
// // // // //         const latitude =
// // // // //           Number(position.coords.latitude);

// // // // //         const longitude =
// // // // //           Number(position.coords.longitude);

// // // // //         if (
// // // // //           !Number.isFinite(latitude) ||
// // // // //           !Number.isFinite(longitude)
// // // // //         ) {
// // // // //           setError(
// // // // //             "Invalid location received from your browser."
// // // // //           );

// // // // //           return;
// // // // //         }

// // // // //         setLocation({
// // // // //           latitude,
// // // // //           longitude,
// // // // //         });
// // // // //       },

// // // // //       (err) => {
// // // // //         console.error(err);

// // // // //         setError(
// // // // //           "Unable to get your location."
// // // // //         );
// // // // //       },

// // // // //       {
// // // // //         enableHighAccuracy: true,
// // // // //       }
// // // // //     );
// // // // //   };

// // // // //   /*
// // // // //   ======================================
// // // // //   FETCH OPENCELLID CELLS
// // // // //   ======================================
// // // // //   */

// // // // //   useEffect(() => {
// // // // //     if (!location) {
// // // // //       return;
// // // // //     }

// // // // //     const getCells = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         setError("");

// // // // //         const url =
// // // // //           `http://localhost:3000/api/opencellid` +
// // // // //           `?lat=${location.latitude}` +
// // // // //           `&lng=${location.longitude}`;

// // // // //         const response =
// // // // //           await fetch(url);

// // // // //         const data =
// // // // //           await response.json();

// // // // //         console.log(
// // // // //           "OpenCelliD data:",
// // // // //           data
// // // // //         );

// // // // //         if (!response.ok) {
// // // // //           throw new Error(
// // // // //             data.error ||
// // // // //               "Failed to fetch OpenCelliD data"
// // // // //           );
// // // // //         }

// // // // //         if (
// // // // //           !data.cells ||
// // // // //           !Array.isArray(data.cells)
// // // // //         ) {
// // // // //           throw new Error(
// // // // //             "Invalid data received from OpenCelliD"
// // // // //           );
// // // // //         }

// // // // //         /*
// // // // //         ----------------------------------
// // // // //         FILTER INVALID CELLS
// // // // //         ----------------------------------
// // // // //         */

// // // // //         const validCells =
// // // // //           data.cells.filter((cell) => {
// // // // //             const coordinates =
// // // // //               getValidCoordinates(cell);

// // // // //             if (!coordinates) {
// // // // //               console.warn(
// // // // //                 "Skipping cell with invalid coordinates:",
// // // // //                 cell
// // // // //               );

// // // // //               return false;
// // // // //             }

// // // // //             return true;
// // // // //           });

// // // // //         console.log(
// // // // //           "Valid OpenCelliD cells:",
// // // // //           validCells
// // // // //         );

// // // // //         console.log(
// // // // //           "Invalid cells removed:",
// // // // //           data.cells.length -
// // // // //             validCells.length
// // // // //         );

// // // // //         setCells(validCells);
// // // // //       } catch (err) {
// // // // //         console.error(err);

// // // // //         setError(
// // // // //           err.message ||
// // // // //             "Unable to fetch nearby cells."
// // // // //         );

// // // // //         setCells([]);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     getCells();
// // // // //   }, [location]);

// // // // //   /*
// // // // //   ======================================
// // // // //   FIND NEAREST CELL
// // // // //   ======================================
// // // // //   */

// // // // //   useEffect(() => {
// // // // //     if (
// // // // //       !location ||
// // // // //       cells.length === 0
// // // // //     ) {
// // // // //       setNearestCell(null);
// // // // //       return;
// // // // //     }

// // // // //     let nearest = null;

// // // // //     let shortestDistance =
// // // // //       Infinity;

// // // // //     cells.forEach((cell) => {
// // // // //       const coordinates =
// // // // //         getValidCoordinates(cell);

// // // // //       /*
// // // // //       Ignore invalid coordinates.
// // // // //       */

// // // // //       if (!coordinates) {
// // // // //         console.warn(
// // // // //           "Skipping invalid cell while calculating nearest:",
// // // // //           cell
// // // // //         );

// // // // //         return;
// // // // //       }

// // // // //       const [
// // // // //         latitude,
// // // // //         longitude,
// // // // //       ] = coordinates;

// // // // //       const distance =
// // // // //         calculateDistance(
// // // // //           location.latitude,
// // // // //           location.longitude,
// // // // //           latitude,
// // // // //           longitude
// // // // //         );

// // // // //       if (
// // // // //         Number.isFinite(distance) &&
// // // // //         distance < shortestDistance
// // // // //       ) {
// // // // //         shortestDistance =
// // // // //           distance;

// // // // //         nearest = {
// // // // //           ...cell,
// // // // //           distance,
// // // // //         };
// // // // //       }
// // // // //     });

// // // // //     setNearestCell(nearest);
// // // // //   }, [location, cells]);

// // // // //   /*
// // // // //   ======================================
// // // // //   RETURN UI
// // // // //   ======================================
// // // // //   */

// // // // //   return (
// // // // //     <div className="app">
// // // // //       <div className="container">

// // // // //         {/* =================================
// // // // //             HEADER
// // // // //         ================================= */}

// // // // //         <h1>
// // // // //           Network Finder
// // // // //         </h1>

// // // // //         <p className="subtitle">
// // // // //           Find nearby cellular cells
// // // // //         </p>

// // // // //         {/* =================================
// // // // //             LOCATION CARD
// // // // //         ================================= */}

// // // // //         <div className="card">

// // // // //           <h2>
// // // // //             📍 Your Location
// // // // //           </h2>

// // // // //           {location ? (
// // // // //             <div>

// // // // //               <p>
// // // // //                 <span>
// // // // //                   Latitude
// // // // //                 </span>

// // // // //                 <strong>
// // // // //                   {location.latitude.toFixed(
// // // // //                     7
// // // // //                   )}
// // // // //                 </strong>
// // // // //               </p>

// // // // //               <p>
// // // // //                 <span>
// // // // //                   Longitude
// // // // //                 </span>

// // // // //                 <strong>
// // // // //                   {location.longitude.toFixed(
// // // // //                     7
// // // // //                   )}
// // // // //                 </strong>
// // // // //               </p>

// // // // //             </div>
// // // // //           ) : (
// // // // //             <p className="placeholder">
// // // // //               Location not fetched yet
// // // // //             </p>
// // // // //           )}

// // // // //           {error && (
// // // // //             <p className="error">
// // // // //               {error}
// // // // //             </p>
// // // // //           )}

// // // // //           <button onClick={getLocation}>
// // // // //             Get My Location
// // // // //           </button>

// // // // //         </div>

// // // // //         {/* =================================
// // // // //             LOADING
// // // // //         ================================= */}

// // // // //         {loading && (
// // // // //           <div className="card">

// // // // //             <p>
// // // // //               🔄 Searching nearby cells...
// // // // //             </p>

// // // // //           </div>
// // // // //         )}

// // // // //         {/* =================================
// // // // //             MAP
// // // // //         ================================= */}

// // // // //         {location && (
// // // // //           <div className="card">

// // // // //             <h2>
// // // // //               🗺️ Cell Map
// // // // //             </h2>

// // // // //             <MapContainer
// // // // //               center={[
// // // // //                 location.latitude,
// // // // //                 location.longitude,
// // // // //               ]}
// // // // //               zoom={14}
// // // // //               style={{
// // // // //                 height: "400px",
// // // // //                 width: "100%",
// // // // //                 borderRadius: "14px",
// // // // //               }}
// // // // //             >

// // // // //               {/* =================================
// // // // //                   MAP TILES
// // // // //               ================================= */}

// // // // //               <TileLayer
// // // // //                 attribution="&copy; OpenStreetMap contributors"
// // // // //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // // //               />

// // // // //               {/* =================================
// // // // //                   USER LOCATION
// // // // //               ================================= */}

// // // // //               <CircleMarker
// // // // //                 center={[
// // // // //                   location.latitude,
// // // // //                   location.longitude,
// // // // //                 ]}
// // // // //                 radius={10}
// // // // //               >

// // // // //                 <Popup>

// // // // //                   <strong>
// // // // //                     Your Location
// // // // //                   </strong>

// // // // //                   <br />

// // // // //                   Latitude:{" "}
// // // // //                   {location.latitude.toFixed(
// // // // //                     7
// // // // //                   )}

// // // // //                   <br />

// // // // //                   Longitude:{" "}
// // // // //                   {location.longitude.toFixed(
// // // // //                     7
// // // // //                   )}

// // // // //                 </Popup>

// // // // //               </CircleMarker>

// // // // //               {/* =================================
// // // // //                   OPENCELLID CELLS
// // // // //               ================================= */}

// // // // //               {cells.map(
// // // // //                 (cell, index) => {
// // // // //                   const coordinates =
// // // // //                     getValidCoordinates(
// // // // //                       cell
// // // // //                     );

// // // // //                   /*
// // // // //                   Safety check.

// // // // //                   This should normally never
// // // // //                   happen because invalid cells
// // // // //                   were already filtered after
// // // // //                   the API response.
// // // // //                   */

// // // // //                   if (!coordinates) {
// // // // //                     console.warn(
// // // // //                       "Skipping invalid map cell:",
// // // // //                       cell
// // // // //                     );

// // // // //                     return null;
// // // // //                   }

// // // // //                   const [
// // // // //                     latitude,
// // // // //                     longitude,
// // // // //                   ] = coordinates;

// // // // //                   const distance =
// // // // //                     calculateDistance(
// // // // //                       location.latitude,
// // // // //                       location.longitude,
// // // // //                       latitude,
// // // // //                       longitude
// // // // //                     );

// // // // //                   return (
// // // // //                     <CircleMarker
// // // // //                       key={`${cell.cell_id}-${index}`}
// // // // //                       center={coordinates}
// // // // //                       radius={8}
// // // // //                     >

// // // // //                       <Popup>

// // // // //                         <strong>
// // // // //                           Cell{" "}
// // // // //                           {cell.cell_id}
// // // // //                         </strong>

// // // // //                         <br />

// // // // //                         MCC:
// // // // //                         {" "}
// // // // //                         {cell.mcc}

// // // // //                         <br />

// // // // //                         MNC:
// // // // //                         {" "}
// // // // //                         {cell.mnc}

// // // // //                         <br />

// // // // //                         LAC/TAC:
// // // // //                         {" "}
// // // // //                         {cell.lac}

// // // // //                         <br />

// // // // //                         Radio:
// // // // //                         {" "}
// // // // //                         {cell.radio ||
// // // // //                           "Unknown"}

// // // // //                         <br />

// // // // //                         Range:
// // // // //                         {" "}

// // // // //                         {cell.range
// // // // //                           ? `${cell.range} m`
// // // // //                           : "N/A"}

// // // // //                         <br />

// // // // //                         Distance:
// // // // //                         {" "}

// // // // //                         {Number.isFinite(
// // // // //                           distance
// // // // //                         )
// // // // //                           ? distance.toFixed(
// // // // //                               2
// // // // //                             )
// // // // //                           : "--"}

// // // // //                         {" "}km

// // // // //                       </Popup>

// // // // //                     </CircleMarker>
// // // // //                   );
// // // // //                 }
// // // // //               )}

// // // // //               {/* =================================
// // // // //                   LINE TO NEAREST CELL
// // // // //               ================================= */}

// // // // //               {nearestCell &&
// // // // //                 (() => {
// // // // //                   const coordinates =
// // // // //                     getValidCoordinates(
// // // // //                       nearestCell
// // // // //                     );

// // // // //                   if (!coordinates) {
// // // // //                     return null;
// // // // //                   }

// // // // //                   return (
// // // // //                     <Polyline
// // // // //                       positions={[
// // // // //                         [
// // // // //                           location.latitude,
// // // // //                           location.longitude,
// // // // //                         ],

// // // // //                         coordinates,
// // // // //                       ]}
// // // // //                       pathOptions={{
// // // // //                         color:
// // // // //                           "#1e3a5f",
// // // // //                         weight: 4,
// // // // //                       }}
// // // // //                     />
// // // // //                   );
// // // // //                 })()}

// // // // //             </MapContainer>

// // // // //           </div>
// // // // //         )}

// // // // //         {/* =================================
// // // // //             NEAREST CELL
// // // // //         ================================= */}

// // // // //         {nearestCell && (
// // // // //           <div className="card nearest">

// // // // //             <h2>
// // // // //               🎯 Nearest Cell
// // // // //             </h2>

// // // // //             <h3>
// // // // //               Cell{" "}
// // // // //               {nearestCell.cell_id}
// // // // //             </h3>

// // // // //             <p>

// // // // //               <span>
// // // // //                 MCC
// // // // //               </span>

// // // // //               <strong>
// // // // //                 {nearestCell.mcc}
// // // // //               </strong>

// // // // //             </p>

// // // // //             <p>

// // // // //               <span>
// // // // //                 MNC
// // // // //               </span>

// // // // //               <strong>
// // // // //                 {nearestCell.mnc}
// // // // //               </strong>

// // // // //             </p>

// // // // //             <p>

// // // // //               <span>
// // // // //                 LAC/TAC
// // // // //               </span>

// // // // //               <strong>
// // // // //                 {nearestCell.lac}
// // // // //               </strong>

// // // // //             </p>

// // // // //             <p>

// // // // //               <span>
// // // // //                 Radio
// // // // //               </span>

// // // // //               <strong>
// // // // //                 {nearestCell.radio ||
// // // // //                   "Unknown"}
// // // // //               </strong>

// // // // //             </p>

// // // // //             <p>

// // // // //               <span>
// // // // //                 Distance
// // // // //               </span>

// // // // //               <strong>
// // // // //                 {Number.isFinite(
// // // // //                   nearestCell.distance
// // // // //                 )
// // // // //                   ? nearestCell.distance.toFixed(
// // // // //                       2
// // // // //                     )
// // // // //                   : "--"}

// // // // //                 {" "}km
// // // // //               </strong>

// // // // //             </p>

// // // // //           </div>
// // // // //         )}

// // // // //         {/* =================================
// // // // //             ALL CELLS
// // // // //         ================================= */}

// // // // //         <div className="card">

// // // // //           <h2>
// // // // //             📡 OpenCelliD Cells
// // // // //           </h2>

// // // // //           {cells.length === 0 ? (

// // // // //             <p className="placeholder">

// // // // //               {loading
// // // // //                 ? "Searching..."
// // // // //                 : "No cells found yet."}

// // // // //             </p>

// // // // //           ) : (

// // // // //             cells.map(
// // // // //               (cell, index) => {

// // // // //                 const coordinates =
// // // // //                   getValidCoordinates(
// // // // //                     cell
// // // // //                   );

// // // // //                 if (!coordinates) {
// // // // //                   return null;
// // // // //                 }

// // // // //                 const [
// // // // //                   latitude,
// // // // //                   longitude,
// // // // //                 ] = coordinates;

// // // // //                 const distance =
// // // // //                   location
// // // // //                     ? calculateDistance(
// // // // //                         location.latitude,
// // // // //                         location.longitude,
// // // // //                         latitude,
// // // // //                         longitude
// // // // //                       )
// // // // //                     : null;

// // // // //                 return (

// // // // //                   <div
// // // // //                     className="tower"
// // // // //                     key={`${cell.cell_id}-${index}`}
// // // // //                   >

// // // // //                     <div>

// // // // //                       <strong>
// // // // //                         Cell{" "}
// // // // //                         {cell.cell_id}
// // // // //                       </strong>

// // // // //                       <p>
// // // // //                         MCC {cell.mcc}
// // // // //                         {" · "}
// // // // //                         MNC {cell.mnc}
// // // // //                       </p>

// // // // //                       <p>
// // // // //                         {cell.radio ||
// // // // //                           "Unknown radio"}
// // // // //                       </p>

// // // // //                     </div>

// // // // //                     <div>

// // // // //                       <p>
// // // // //                         {latitude.toFixed(
// // // // //                           4
// // // // //                         )}
// // // // //                       </p>

// // // // //                       <p>
// // // // //                         {longitude.toFixed(
// // // // //                           4
// // // // //                         )}
// // // // //                       </p>

// // // // //                       {distance !== null &&
// // // // //                         Number.isFinite(
// // // // //                           distance
// // // // //                         ) && (

// // // // //                         <p>
// // // // //                           📏{" "}
// // // // //                           {distance.toFixed(
// // // // //                             2
// // // // //                           )}
// // // // //                           {" "}km
// // // // //                         </p>

// // // // //                       )}

// // // // //                     </div>

// // // // //                   </div>

// // // // //                 );
// // // // //               }
// // // // //             )

// // // // //           )}

// // // // //         </div>

// // // // //         {/* =================================
// // // // //             DATA SOURCE
// // // // //         ================================= */}

// // // // //         <div className="card">

// // // // //           <p className="placeholder">
// // // // //             Cell data provided by
// // // // //             OpenCelliD.
// // // // //           </p>

// // // // //         </div>

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;


// // // // import { useEffect, useState } from "react";
// // // // import {
// // // //   MapContainer,
// // // //   TileLayer,
// // // //   CircleMarker,
// // // //   Popup,
// // // //   Polyline,
// // // // } from "react-leaflet";

// // // // import "leaflet/dist/leaflet.css";
// // // // import "./App.css";


// // // // /*
// // // // ========================================
// // // // CALCULATE DISTANCE
// // // // ========================================
// // // // */

// // // // function calculateDistance(
// // // //   lat1,
// // // //   lon1,
// // // //   lat2,
// // // //   lon2
// // // // ) {
// // // //   const R = 6371;

// // // //   const dLat =
// // // //     ((lat2 - lat1) * Math.PI) / 180;

// // // //   const dLon =
// // // //     ((lon2 - lon1) * Math.PI) / 180;

// // // //   const a =
// // // //     Math.sin(dLat / 2) ** 2 +
// // // //     Math.cos(
// // // //       (lat1 * Math.PI) / 180
// // // //     ) *
// // // //       Math.cos(
// // // //         (lat2 * Math.PI) / 180
// // // //       ) *
// // // //       Math.sin(dLon / 2) ** 2;

// // // //   const c =
// // // //     2 *
// // // //     Math.atan2(
// // // //       Math.sqrt(a),
// // // //       Math.sqrt(1 - a)
// // // //     );

// // // //   return R * c;
// // // // }


// // // // /*
// // // // ========================================
// // // // VALIDATE COORDINATES
// // // // ========================================
// // // // */

// // // // function getValidCoordinates(cell) {
// // // //   const latitude = Number(
// // // //     cell?.latitude
// // // //   );

// // // //   const longitude = Number(
// // // //     cell?.longitude
// // // //   );

// // // //   if (
// // // //     !Number.isFinite(latitude) ||
// // // //     !Number.isFinite(longitude)
// // // //   ) {
// // // //     return null;
// // // //   }

// // // //   if (
// // // //     latitude < -90 ||
// // // //     latitude > 90 ||
// // // //     longitude < -180 ||
// // // //     longitude > 180
// // // //   ) {
// // // //     return null;
// // // //   }

// // // //   return [latitude, longitude];
// // // // }


// // // // /*
// // // // ========================================
// // // // APP
// // // // ========================================
// // // // */

// // // // function App() {

// // // //   /*
// // // //   ======================================
// // // //   STATES
// // // //   ======================================
// // // //   */

// // // //   const [location, setLocation] =
// // // //     useState(null);

// // // //   const [cells, setCells] =
// // // //     useState([]);

// // // //   const [nearestCell, setNearestCell] =
// // // //     useState(null);

// // // //   const [loading, setLoading] =
// // // //     useState(false);

// // // //   const [error, setError] =
// // // //     useState("");


// // // //   /*
// // // //   ======================================
// // // //   GET USER LOCATION
// // // //   ======================================
// // // //   */

// // // //   const getLocation = () => {

// // // //     setError("");

// // // //     if (!navigator.geolocation) {

// // // //       setError(
// // // //         "Geolocation is not supported by your browser."
// // // //       );

// // // //       return;
// // // //     }

// // // //     navigator.geolocation.getCurrentPosition(

// // // //       (position) => {

// // // //         const latitude =
// // // //           Number(
// // // //             position.coords.latitude
// // // //           );

// // // //         const longitude =
// // // //           Number(
// // // //             position.coords.longitude
// // // //           );

// // // //         if (
// // // //           !Number.isFinite(latitude) ||
// // // //           !Number.isFinite(longitude)
// // // //         ) {

// // // //           setError(
// // // //             "Invalid location received."
// // // //           );

// // // //           return;
// // // //         }

// // // //         setLocation({
// // // //           latitude,
// // // //           longitude,
// // // //         });

// // // //       },

// // // //       (err) => {

// // // //         console.error(
// // // //           "Location error:",
// // // //           err
// // // //         );

// // // //         setError(
// // // //           "Unable to get your location. Please allow location access."
// // // //         );

// // // //       },

// // // //       {
// // // //         enableHighAccuracy: true,
// // // //         timeout: 10000,
// // // //         maximumAge: 0,
// // // //       }

// // // //     );
// // // //   };


// // // //   /*
// // // //   ======================================
// // // //   FETCH OPENCELLID CELLS
// // // //   ======================================
// // // //   */

// // // //   useEffect(() => {

// // // //     if (!location) {
// // // //       return;
// // // //     }

// // // //     const getCells = async () => {

// // // //       try {

// // // //         setLoading(true);

// // // //         setError("");

// // // //         const url =
// // // //           `http://localhost:3000/api/opencellid` +
// // // //           `?lat=${location.latitude}` +
// // // //           `&lng=${location.longitude}`;

// // // //         console.log(
// // // //           "Fetching OpenCelliD:",
// // // //           url
// // // //         );

// // // //         const response =
// // // //           await fetch(url);

// // // //         const data =
// // // //           await response.json();

// // // //         console.log(
// // // //           "OpenCelliD data:",
// // // //           data
// // // //         );


// // // //         /*
// // // //         ==================================
// // // //         CHECK RESPONSE
// // // //         ==================================
// // // //         */

// // // //         if (!response.ok) {

// // // //           throw new Error(
// // // //             data.error ||
// // // //               "Failed to fetch OpenCelliD data"
// // // //           );

// // // //         }


// // // //         if (
// // // //           !data.cells ||
// // // //           !Array.isArray(data.cells)
// // // //         ) {

// // // //           throw new Error(
// // // //             "Invalid data received from OpenCelliD"
// // // //           );

// // // //         }


// // // //         /*
// // // //         ==================================
// // // //         IMPORTANT:
// // // //         OPENCELLID USES lat / lon

// // // //         Convert them into:
// // // //         latitude / longitude
// // // //         ==================================
// // // //         */

// // // //         const cleanedCells =
// // // //           data.cells

// // // //             .map((cell) => {

// // // //               const latitude =
// // // //                 Number(cell.lat);

// // // //               const longitude =
// // // //                 Number(cell.lon);

// // // //               return {
// // // //                 ...cell,

// // // //                 latitude,
// // // //                 longitude,
// // // //               };

// // // //             })

// // // //             .filter((cell) => {

// // // //               return (
// // // //                 Number.isFinite(
// // // //                   cell.latitude
// // // //                 ) &&
// // // //                 Number.isFinite(
// // // //                   cell.longitude
// // // //                 ) &&
// // // //                 cell.latitude >= -90 &&
// // // //                 cell.latitude <= 90 &&
// // // //                 cell.longitude >= -180 &&
// // // //                 cell.longitude <= 180
// // // //               );

// // // //             });


// // // //         console.log(
// // // //           "Cleaned OpenCelliD cells:",
// // // //           cleanedCells
// // // //         );


// // // //         /*
// // // //         ==================================
// // // //         SAVE CLEANED CELLS
// // // //         ==================================
// // // //         */

// // // //         setCells(
// // // //           cleanedCells
// // // //         );

// // // //       }

// // // //       catch (err) {

// // // //         console.error(
// // // //           "OpenCelliD error:",
// // // //           err
// // // //         );

// // // //         setError(
// // // //           err.message ||
// // // //             "Unable to fetch nearby cells."
// // // //         );

// // // //         setCells([]);

// // // //       }

// // // //       finally {

// // // //         setLoading(false);

// // // //       }

// // // //     };


// // // //     getCells();

// // // //   }, [location]);


// // // //   /*
// // // //   ======================================
// // // //   FIND NEAREST CELL
// // // //   ======================================
// // // //   */

// // // //   useEffect(() => {

// // // //     if (
// // // //       !location ||
// // // //       cells.length === 0
// // // //     ) {

// // // //       setNearestCell(null);

// // // //       return;
// // // //     }


// // // //     let nearest = null;

// // // //     let shortestDistance =
// // // //       Infinity;


// // // //     cells.forEach((cell) => {

// // // //       const coordinates =
// // // //         getValidCoordinates(
// // // //           cell
// // // //         );


// // // //       /*
// // // //       Skip invalid cells
// // // //       */

// // // //       if (!coordinates) {

// // // //         return;
// // // //       }


// // // //       const [
// // // //         latitude,
// // // //         longitude,
// // // //       ] = coordinates;


// // // //       const distance =
// // // //         calculateDistance(

// // // //           location.latitude,

// // // //           location.longitude,

// // // //           latitude,

// // // //           longitude

// // // //         );


// // // //       if (
// // // //         distance <
// // // //         shortestDistance
// // // //       ) {

// // // //         shortestDistance =
// // // //           distance;


// // // //         nearest = {

// // // //           ...cell,

// // // //           distance,

// // // //         };

// // // //       }

// // // //     });


// // // //     setNearestCell(
// // // //       nearest
// // // //     );

// // // //   }, [
// // // //     location,
// // // //     cells,
// // // //   ]);


// // // //   /*
// // // //   ======================================
// // // //   RETURN UI
// // // //   ======================================
// // // //   */

// // // //   return (

// // // //     <div className="app">

// // // //       <div className="container">


// // // //         {/* =================================
// // // //             HEADER
// // // //         ================================= */}

// // // //         <h1>
// // // //           Network Finder
// // // //         </h1>

// // // //         <p className="subtitle">
// // // //           Find nearby cellular cells
// // // //         </p>


// // // //         {/* =================================
// // // //             LOCATION CARD
// // // //         ================================= */}

// // // //         <div className="card">

// // // //           <h2>
// // // //             📍 Your Location
// // // //           </h2>


// // // //           {location ? (

// // // //             <div>

// // // //               <p>

// // // //                 <span>
// // // //                   Latitude
// // // //                 </span>

// // // //                 <strong>
// // // //                   {location.latitude.toFixed(
// // // //                     7
// // // //                   )}
// // // //                 </strong>

// // // //               </p>


// // // //               <p>

// // // //                 <span>
// // // //                   Longitude
// // // //                 </span>

// // // //                 <strong>
// // // //                   {location.longitude.toFixed(
// // // //                     7
// // // //                   )}
// // // //                 </strong>

// // // //               </p>

// // // //             </div>

// // // //           ) : (

// // // //             <p className="placeholder">
// // // //               Location not fetched yet
// // // //             </p>

// // // //           )}


// // // //           {error && (

// // // //             <p className="error">
// // // //               {error}
// // // //             </p>

// // // //           )}


// // // //           <button
// // // //             onClick={getLocation}
// // // //           >
// // // //             Get My Location
// // // //           </button>

// // // //         </div>


// // // //         {/* =================================
// // // //             LOADING
// // // //         ================================= */}

// // // //         {loading && (

// // // //           <div className="card">

// // // //             <p>
// // // //               🔄 Searching nearby cells...
// // // //             </p>

// // // //           </div>

// // // //         )}


// // // //         {/* =================================
// // // //             MAP
// // // //         ================================= */}

// // // //         {location && (

// // // //           <div className="card">

// // // //             <h2>
// // // //               🗺️ Cell Map
// // // //             </h2>


// // // //             <MapContainer

// // // //               center={[
// // // //                 location.latitude,
// // // //                 location.longitude,
// // // //               ]}

// // // //               zoom={14}

// // // //               style={{
// // // //                 height: "400px",
// // // //                 width: "100%",
// // // //                 borderRadius: "14px",
// // // //               }}

// // // //             >

// // // //               {/* =================================
// // // //                   MAP TILES
// // // //               ================================= */}

// // // //               <TileLayer

// // // //                 attribution="&copy; OpenStreetMap contributors"

// // // //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

// // // //               />


// // // //               {/* =================================
// // // //                   USER LOCATION
// // // //               ================================= */}

// // // //               <CircleMarker

// // // //                 center={[
// // // //                   location.latitude,
// // // //                   location.longitude,
// // // //                 ]}

// // // //                 radius={10}

// // // //               >

// // // //                 <Popup>

// // // //                   <strong>
// // // //                     Your Location
// // // //                   </strong>

// // // //                   <br />

// // // //                   Latitude:{" "}

// // // //                   {location.latitude.toFixed(
// // // //                     7
// // // //                   )}

// // // //                   <br />

// // // //                   Longitude:{" "}

// // // //                   {location.longitude.toFixed(
// // // //                     7
// // // //                   )}

// // // //                 </Popup>

// // // //               </CircleMarker>


// // // //               {/* =================================
// // // //                   OPENCELLID CELLS
// // // //               ================================= */}

// // // //               {cells.map(
// // // //                 (
// // // //                   cell,
// // // //                   index
// // // //                 ) => {

// // // //                   const coordinates =
// // // //                     getValidCoordinates(
// // // //                       cell
// // // //                     );


// // // //                   /*
// // // //                   Do NOT render invalid cells
// // // //                   */

// // // //                   if (
// // // //                     !coordinates
// // // //                   ) {

// // // //                     return null;
// // // //                   }


// // // //                   const [
// // // //                     latitude,
// // // //                     longitude,
// // // //                   ] = coordinates;


// // // //                   const distance =
// // // //                     calculateDistance(

// // // //                       location.latitude,

// // // //                       location.longitude,

// // // //                       latitude,

// // // //                       longitude

// // // //                     );


// // // //                   return (

// // // //                     <CircleMarker

// // // //                       key={
// // // //                         `${cell.cell_id}-${index}`
// // // //                       }

// // // //                       center={
// // // //                         coordinates
// // // //                       }

// // // //                       radius={8}

// // // //                     >

// // // //                       <Popup>

// // // //                         <strong>
// // // //                           Cell{" "}
// // // //                           {cell.cell_id}
// // // //                         </strong>

// // // //                         <br />

// // // //                         MCC:
// // // //                         {" "}
// // // //                         {cell.mcc}

// // // //                         <br />

// // // //                         MNC:
// // // //                         {" "}
// // // //                         {cell.mnc}

// // // //                         <br />

// // // //                         LAC/TAC:
// // // //                         {" "}
// // // //                         {cell.lac}

// // // //                         <br />

// // // //                         Radio:
// // // //                         {" "}
// // // //                         {cell.radio ||
// // // //                           "Unknown"}

// // // //                         <br />

// // // //                         Range:
// // // //                         {" "}

// // // //                         {cell.range
// // // //                           ? `${cell.range} m`
// // // //                           : "N/A"}

// // // //                         <br />

// // // //                         Distance:
// // // //                         {" "}

// // // //                         {distance.toFixed(
// // // //                           2
// // // //                         )}

// // // //                         {" "}km

// // // //                       </Popup>

// // // //                     </CircleMarker>

// // // //                   );

// // // //                 }

// // // //               )}


// // // //               {/* =================================
// // // //                   LINE TO NEAREST CELL
// // // //               ================================= */}

// // // //               {nearestCell && (

// // // //                 (() => {

// // // //                   const nearestCoordinates =
// // // //                     getValidCoordinates(
// // // //                       nearestCell
// // // //                     );


// // // //                   if (
// // // //                     !nearestCoordinates
// // // //                   ) {

// // // //                     return null;
// // // //                   }


// // // //                   return (

// // // //                     <Polyline

// // // //                       positions={[

// // // //                         [
// // // //                           location.latitude,
// // // //                           location.longitude,
// // // //                         ],

// // // //                         nearestCoordinates,

// // // //                       ]}

// // // //                       pathOptions={{
// // // //                         color:
// // // //                           "#1e3a5f",
// // // //                         weight: 4,
// // // //                       }}

// // // //                     />

// // // //                   );

// // // //                 })()

// // // //               )}

// // // //             </MapContainer>

// // // //           </div>

// // // //         )}


// // // //         {/* =================================
// // // //             NEAREST CELL
// // // //         ================================= */}

// // // //         {nearestCell && (

// // // //           <div className="card nearest">

// // // //             <h2>
// // // //               🎯 Nearest Cell
// // // //             </h2>


// // // //             <h3>

// // // //               Cell{" "}

// // // //               {nearestCell.cell_id}

// // // //             </h3>


// // // //             <p>

// // // //               <span>
// // // //                 MCC
// // // //               </span>

// // // //               <strong>
// // // //                 {nearestCell.mcc}
// // // //               </strong>

// // // //             </p>


// // // //             <p>

// // // //               <span>
// // // //                 MNC
// // // //               </span>

// // // //               <strong>
// // // //                 {nearestCell.mnc}
// // // //               </strong>

// // // //             </p>


// // // //             <p>

// // // //               <span>
// // // //                 LAC/TAC
// // // //               </span>

// // // //               <strong>
// // // //                 {nearestCell.lac}
// // // //               </strong>

// // // //             </p>


// // // //             <p>

// // // //               <span>
// // // //                 Radio
// // // //               </span>

// // // //               <strong>
// // // //                 {nearestCell.radio ||
// // // //                   "Unknown"}
// // // //               </strong>

// // // //             </p>


// // // //             <p>

// // // //               <span>
// // // //                 Distance
// // // //               </span>

// // // //               <strong>

// // // //                 {nearestCell.distance.toFixed(
// // // //                   2
// // // //                 )}

// // // //                 {" "}km

// // // //               </strong>

// // // //             </p>

// // // //           </div>

// // // //         )}


// // // //         {/* =================================
// // // //             ALL CELLS
// // // //         ================================= */}

// // // //         <div className="card">

// // // //           <h2>
// // // //             📡 OpenCelliD Cells
// // // //           </h2>


// // // //           {cells.length === 0 ? (

// // // //             <p className="placeholder">

// // // //               {loading
// // // //                 ? "Searching..."
// // // //                 : "No cells found yet."}

// // // //             </p>

// // // //           ) : (

// // // //             cells.map(
// // // //               (
// // // //                 cell,
// // // //                 index
// // // //               ) => {

// // // //                 const coordinates =
// // // //                   getValidCoordinates(
// // // //                     cell
// // // //                   );


// // // //                 /*
// // // //                 Skip invalid cell
// // // //                 */

// // // //                 if (
// // // //                   !coordinates
// // // //                 ) {

// // // //                   return null;
// // // //                 }


// // // //                 const [
// // // //                   latitude,
// // // //                   longitude,
// // // //                 ] = coordinates;


// // // //                 const distance =
// // // //                   location

// // // //                     ? calculateDistance(

// // // //                         location.latitude,

// // // //                         location.longitude,

// // // //                         latitude,

// // // //                         longitude

// // // //                       )

// // // //                     : null;


// // // //                 return (

// // // //                   <div

// // // //                     className="tower"

// // // //                     key={
// // // //                       `${cell.cell_id}-${index}`
// // // //                     }

// // // //                   >

// // // //                     <div>

// // // //                       <strong>

// // // //                         Cell{" "}

// // // //                         {cell.cell_id}

// // // //                       </strong>


// // // //                       <p>

// // // //                         MCC{" "}
// // // //                         {cell.mcc}

// // // //                         {" · "}

// // // //                         MNC{" "}
// // // //                         {cell.mnc}

// // // //                       </p>


// // // //                       <p>

// // // //                         {cell.radio ||
// // // //                           "Unknown radio"}

// // // //                       </p>

// // // //                     </div>


// // // //                     <div>

// // // //                       <p>

// // // //                         {latitude.toFixed(
// // // //                           4
// // // //                         )}

// // // //                       </p>


// // // //                       <p>

// // // //                         {longitude.toFixed(
// // // //                           4
// // // //                         )}

// // // //                       </p>


// // // //                       {distance !== null && (

// // // //                         <p>

// // // //                           📏{" "}

// // // //                           {distance.toFixed(
// // // //                             2
// // // //                           )}

// // // //                           {" "}km

// // // //                         </p>

// // // //                       )}

// // // //                     </div>

// // // //                   </div>

// // // //                 );

// // // //               }

// // // //             )

// // // //           )}

// // // //         </div>


// // // //         {/* =================================
// // // //             DATA SOURCE
// // // //         ================================= */}

// // // //         <div className="card">

// // // //           <p className="placeholder">

// // // //             Cell data provided by
// // // //             OpenCelliD.

// // // //           </p>

// // // //         </div>


// // // //       </div>

// // // //     </div>

// // // //   );

// // // // }


// // // // export default App;



// // // import { useEffect, useState } from "react";

// // // import {
// // //   MapContainer,
// // //   TileLayer,
// // //   CircleMarker,
// // //   Popup,
// // //   Polyline,
// // // } from "react-leaflet";

// // // import "leaflet/dist/leaflet.css";
// // // import "./App.css";

// // // /*
// // // ========================================
// // // DISTANCE CALCULATION
// // // ========================================
// // // */

// // // function calculateDistance(lat1, lon1, lat2, lon2) {
// // //   const R = 6371;

// // //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
// // //   const dLon = ((lon2 - lon1) * Math.PI) / 180;

// // //   const a =
// // //     Math.sin(dLat / 2) ** 2 +
// // //     Math.cos((lat1 * Math.PI) / 180) *
// // //       Math.cos((lat2 * Math.PI) / 180) *
// // //       Math.sin(dLon / 2) ** 2;

// // //   const c =
// // //     2 *
// // //     Math.atan2(
// // //       Math.sqrt(a),
// // //       Math.sqrt(1 - a)
// // //     );

// // //   return R * c;
// // // }

// // // /*
// // // ========================================
// // // VALIDATE COORDINATES
// // // ========================================
// // // */

// // // function isValidCoordinate(latitude, longitude) {
// // //   return (
// // //     Number.isFinite(latitude) &&
// // //     Number.isFinite(longitude) &&
// // //     latitude >= -90 &&
// // //     latitude <= 90 &&
// // //     longitude >= -180 &&
// // //     longitude <= 180
// // //   );
// // // }

// // // /*
// // // ========================================
// // // NORMALIZE OPENCELLID DATA

// // // OpenCelliD can return:

// // // lat / lon

// // // Our database/frontend uses:

// // // latitude / longitude
// // // ========================================
// // // */

// // // function normalizeCell(cell) {
// // //   const latitude = Number(
// // //     cell.latitude ?? cell.lat
// // //   );

// // //   const longitude = Number(
// // //     cell.longitude ?? cell.lon
// // //   );

// // //   if (
// // //     !isValidCoordinate(
// // //       latitude,
// // //       longitude
// // //     )
// // //   ) {
// // //     console.warn(
// // //       "Skipping cell with invalid coordinates:",
// // //       cell
// // //     );

// // //     return null;
// // //   }

// // //   return {
// // //     ...cell,

// // //     cell_id:
// // //       cell.cell_id ??
// // //       cell.cellid ??
// // //       null,

// // //     latitude,
// // //     longitude,

// // //     mcc:
// // //       cell.mcc ?? null,

// // //     mnc:
// // //       cell.mnc ?? null,

// // //     lac:
// // //       cell.lac ?? null,

// // //     radio:
// // //       cell.radio ?? null,

// // //     range:
// // //       cell.range ?? null,

// // //     samples:
// // //       cell.samples ?? null,

// // //     created:
// // //       cell.created ?? null,

// // //     updated:
// // //       cell.updated ?? null,
// // //   };
// // // }

// // // /*
// // // ========================================
// // // APP
// // // ========================================
// // // */

// // // function App() {
// // //   /*
// // //   ======================================
// // //   STATES
// // //   ======================================
// // //   */

// // //   const [location, setLocation] =
// // //     useState(null);

// // //   const [cells, setCells] =
// // //     useState([]);

// // //   const [nearestCell, setNearestCell] =
// // //     useState(null);

// // //   const [loading, setLoading] =
// // //     useState(false);

// // //   const [error, setError] =
// // //     useState("");

// // //   /*
// // //   ======================================
// // //   GET USER LOCATION
// // //   ======================================
// // //   */

// // //   const getLocation = () => {
// // //     setError("");

// // //     if (!navigator.geolocation) {
// // //       setError(
// // //         "Geolocation is not supported by your browser."
// // //       );

// // //       return;
// // //     }

// // //     navigator.geolocation.getCurrentPosition(
// // //       (position) => {
// // //         const latitude =
// // //           Number(position.coords.latitude);

// // //         const longitude =
// // //           Number(position.coords.longitude);

// // //         if (
// // //           !isValidCoordinate(
// // //             latitude,
// // //             longitude
// // //           )
// // //         ) {
// // //           setError(
// // //             "Invalid location received from browser."
// // //           );

// // //           return;
// // //         }

// // //         setLocation({
// // //           latitude,
// // //           longitude,
// // //         });
// // //       },

// // //       (err) => {
// // //         console.error(
// // //           "Location error:",
// // //           err
// // //         );

// // //         setError(
// // //           "Unable to get your location."
// // //         );
// // //       },

// // //       {
// // //         enableHighAccuracy: true,
// // //         timeout: 15000,
// // //         maximumAge: 0,
// // //       }
// // //     );
// // //   };

// // //   /*
// // //   ======================================
// // //   FETCH OPENCELLID CELLS
// // //   ======================================
// // //   */

// // //   useEffect(() => {
// // //     if (!location) {
// // //       return;
// // //     }

// // //     const getCells = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError("");

// // //         const url =
// // //           `http://localhost:3000/api/opencellid` +
// // //           `?lat=${location.latitude}` +
// // //           `&lng=${location.longitude}`;

// // //         console.log(
// // //           "Requesting OpenCelliD:",
// // //           url
// // //         );

// // //         const response =
// // //           await fetch(url);

// // //         const data =
// // //           await response.json();

// // //         console.log(
// // //           "FULL OPENCELLID RESPONSE:",
// // //           data
// // //         );

// // //         console.log(
// // //           "CELLS FROM BACKEND:",
// // //           data.cells
// // //         );

// // //         console.log(
// // //           "RAW CELL COUNT:",
// // //           data.cells?.length
// // //         );

// // //         if (!response.ok) {
// // //           throw new Error(
// // //             data.error ||
// // //               "Failed to fetch OpenCelliD data"
// // //           );
// // //         }

// // //         if (
// // //           !data.cells ||
// // //           !Array.isArray(data.cells)
// // //         ) {
// // //           throw new Error(
// // //             "Invalid cell data received from backend."
// // //           );
// // //         }

// // //         /*
// // //         ======================================
// // //         NORMALIZE CELLS
// // //         ======================================
// // //         */

// // //         const normalizedCells =
// // //           data.cells
// // //             .map((cell) =>
// // //               normalizeCell(cell)
// // //             )
// // //             .filter(
// // //               (cell) => cell !== null
// // //             );

// // //         console.log(
// // //           "VALID NORMALIZED CELLS:",
// // //           normalizedCells
// // //         );

// // //         console.log(
// // //           "VALID CELL COUNT:",
// // //           normalizedCells.length
// // //         );

// // //         /*
// // //         ======================================
// // //         SAVE CELLS
// // //         ======================================
// // //         */

// // //         setCells(
// // //           normalizedCells
// // //         );

// // //       } catch (err) {
// // //         console.error(
// // //           "OpenCelliD fetch error:",
// // //           err
// // //         );

// // //         setError(
// // //           err.message ||
// // //             "Unable to fetch nearby cells."
// // //         );

// // //         setCells([]);

// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     getCells();

// // //   }, [location]);

// // //   /*
// // //   ======================================
// // //   FIND NEAREST CELL
// // //   ======================================
// // //   */

// // //   useEffect(() => {
// // //     if (
// // //       !location ||
// // //       cells.length === 0
// // //     ) {
// // //       setNearestCell(null);
// // //       return;
// // //     }

// // //     let nearest = null;
// // //     let shortestDistance = Infinity;

// // //     cells.forEach((cell) => {
// // //       const latitude =
// // //         Number(cell.latitude);

// // //       const longitude =
// // //         Number(cell.longitude);

// // //       if (
// // //         !isValidCoordinate(
// // //           latitude,
// // //           longitude
// // //         )
// // //       ) {
// // //         return;
// // //       }

// // //       const distance =
// // //         calculateDistance(
// // //           location.latitude,
// // //           location.longitude,
// // //           latitude,
// // //           longitude
// // //         );

// // //       if (
// // //         distance <
// // //         shortestDistance
// // //       ) {
// // //         shortestDistance =
// // //           distance;

// // //         nearest = {
// // //           ...cell,
// // //           distance,
// // //         };
// // //       }
// // //     });

// // //     setNearestCell(nearest);

// // //   }, [location, cells]);

// // //   /*
// // //   ======================================
// // //   RETURN UI
// // //   ======================================
// // //   */

// // //   return (
// // //     <div className="app">

// // //       <div className="container">

// // //         {/* =================================
// // //             HEADER
// // //         ================================= */}

// // //         <h1>
// // //           Network Finder
// // //         </h1>

// // //         <p className="subtitle">
// // //           Find nearby cellular cells
// // //         </p>

// // //         {/* =================================
// // //             LOCATION CARD
// // //         ================================= */}

// // //         <div className="card">

// // //           <h2>
// // //             📍 Your Location
// // //           </h2>

// // //           {location ? (
// // //             <div>

// // //               <p>
// // //                 <span>
// // //                   Latitude
// // //                 </span>

// // //                 <strong>
// // //                   {location.latitude.toFixed(
// // //                     7
// // //                   )}
// // //                 </strong>
// // //               </p>

// // //               <p>
// // //                 <span>
// // //                   Longitude
// // //                 </span>

// // //                 <strong>
// // //                   {location.longitude.toFixed(
// // //                     7
// // //                   )}
// // //                 </strong>
// // //               </p>

// // //             </div>
// // //           ) : (
// // //             <p className="placeholder">
// // //               Location not fetched yet
// // //             </p>
// // //           )}

// // //           {error && (
// // //             <p className="error">
// // //               {error}
// // //             </p>
// // //           )}

// // //           <button
// // //             onClick={getLocation}
// // //           >
// // //             Get My Location
// // //           </button>

// // //         </div>

// // //         {/* =================================
// // //             LOADING
// // //         ================================= */}

// // //         {loading && (
// // //           <div className="card">

// // //             <p>
// // //               🔄 Searching nearby cells...
// // //             </p>

// // //           </div>
// // //         )}

// // //         {/* =================================
// // //             MAP
// // //         ================================= */}

// // //         {location && (
// // //           <div className="card">

// // //             <h2>
// // //               🗺️ Cell Map
// // //             </h2>

// // //             <MapContainer
// // //               center={[
// // //                 location.latitude,
// // //                 location.longitude,
// // //               ]}
// // //               zoom={14}
// // //               style={{
// // //                 height: "400px",
// // //                 width: "100%",
// // //                 borderRadius: "14px",
// // //               }}
// // //             >

// // //               {/* MAP TILES */}

// // //               <TileLayer
// // //                 attribution="&copy; OpenStreetMap contributors"
// // //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //               />

// // //               {/* =================================
// // //                   USER LOCATION
// // //               ================================= */}

// // //               <CircleMarker
// // //                 center={[
// // //                   location.latitude,
// // //                   location.longitude,
// // //                 ]}
// // //                 radius={10}
// // //               >

// // //                 <Popup>

// // //                   <strong>
// // //                     Your Location
// // //                   </strong>

// // //                   <br />

// // //                   Latitude:{" "}
// // //                   {location.latitude.toFixed(
// // //                     7
// // //                   )}

// // //                   <br />

// // //                   Longitude:{" "}
// // //                   {location.longitude.toFixed(
// // //                     7
// // //                   )}

// // //                 </Popup>

// // //               </CircleMarker>

// // //               {/* =================================
// // //                   OPENCELLID CELLS
// // //               ================================= */}

// // //               {cells.map(
// // //                 (cell, index) => {

// // //                   const latitude =
// // //                     Number(
// // //                       cell.latitude
// // //                     );

// // //                   const longitude =
// // //                     Number(
// // //                       cell.longitude
// // //                     );

// // //                   /*
// // //                   Extra safety check.
// // //                   Leaflet NEVER receives NaN.
// // //                   */

// // //                   if (
// // //                     !isValidCoordinate(
// // //                       latitude,
// // //                       longitude
// // //                     )
// // //                   ) {
// // //                     return null;
// // //                   }

// // //                   return (
// // //                     <CircleMarker
// // //                       key={`${cell.cell_id}-${index}`}
// // //                       center={[
// // //                         latitude,
// // //                         longitude,
// // //                       ]}
// // //                       radius={8}
// // //                     >

// // //                       <Popup>

// // //                         <strong>
// // //                           Cell{" "}
// // //                           {cell.cell_id}
// // //                         </strong>

// // //                         <br />

// // //                         MCC:{" "}
// // //                         {cell.mcc}

// // //                         <br />

// // //                         MNC:{" "}
// // //                         {cell.mnc}

// // //                         <br />

// // //                         LAC/TAC:{" "}
// // //                         {cell.lac}

// // //                         <br />

// // //                         Radio:{" "}
// // //                         {cell.radio ||
// // //                           "Unknown"}

// // //                         <br />

// // //                         Range:{" "}
// // //                         {cell.range
// // //                           ? `${cell.range} m`
// // //                           : "N/A"}

// // //                         <br />

// // //                         Distance:{" "}

// // //                         {calculateDistance(
// // //                           location.latitude,
// // //                           location.longitude,
// // //                           latitude,
// // //                           longitude
// // //                         ).toFixed(2)}

// // //                         {" "}km

// // //                       </Popup>

// // //                     </CircleMarker>
// // //                   );
// // //                 }
// // //               )}

// // //               {/* =================================
// // //                   LINE TO NEAREST CELL
// // //               ================================= */}

// // //               {nearestCell &&
// // //                 isValidCoordinate(
// // //                   Number(
// // //                     nearestCell.latitude
// // //                   ),
// // //                   Number(
// // //                     nearestCell.longitude
// // //                   )
// // //                 ) && (

// // //                   <Polyline
// // //                     positions={[
// // //                       [
// // //                         location.latitude,
// // //                         location.longitude,
// // //                       ],

// // //                       [
// // //                         Number(
// // //                           nearestCell.latitude
// // //                         ),
// // //                         Number(
// // //                           nearestCell.longitude
// // //                         ),
// // //                       ],
// // //                     ]}
// // //                     pathOptions={{
// // //                       color: "#1e3a5f",
// // //                       weight: 4,
// // //                     }}
// // //                   />

// // //                 )}

// // //             </MapContainer>

// // //           </div>
// // //         )}

// // //         {/* =================================
// // //             NEAREST CELL
// // //         ================================= */}

// // //         {nearestCell && (
// // //           <div className="card nearest">

// // //             <h2>
// // //               🎯 Nearest Cell
// // //             </h2>

// // //             <h3>
// // //               Cell{" "}
// // //               {nearestCell.cell_id}
// // //             </h3>

// // //             <p>
// // //               <span>
// // //                 MCC
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.mcc}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               <span>
// // //                 MNC
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.mnc}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               <span>
// // //                 LAC/TAC
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.lac}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               <span>
// // //                 Radio
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.radio ||
// // //                   "Unknown"}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               <span>
// // //                 Latitude
// // //               </span>

// // //               <strong>
// // //                 {Number(
// // //                   nearestCell.latitude
// // //                 ).toFixed(6)}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               <span>
// // //                 Longitude
// // //               </span>

// // //               <strong>
// // //                 {Number(
// // //                   nearestCell.longitude
// // //                 ).toFixed(6)}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               <span>
// // //                 Distance
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.distance.toFixed(
// // //                   2
// // //                 )} km
// // //               </strong>
// // //             </p>

// // //           </div>
// // //         )}

// // //         {/* =================================
// // //             ALL CELLS
// // //         ================================= */}

// // //         <div className="card">

// // //           <h2>
// // //             📡 OpenCelliD Cells
// // //           </h2>

// // //           {cells.length === 0 ? (

// // //             <p className="placeholder">

// // //               {loading
// // //                 ? "Searching..."
// // //                 : "No cells found yet."}

// // //             </p>

// // //           ) : (

// // //             <>
// // //               <p className="cell-count">
// // //                 Found{" "}
// // //                 <strong>
// // //                   {cells.length}
// // //                 </strong>{" "}
// // //                 nearby cells
// // //               </p>

// // //               {cells.map(
// // //                 (cell, index) => {

// // //                   const distance =
// // //                     location
// // //                       ? calculateDistance(
// // //                           location.latitude,
// // //                           location.longitude,
// // //                           Number(
// // //                             cell.latitude
// // //                           ),
// // //                           Number(
// // //                             cell.longitude
// // //                           )
// // //                         )
// // //                       : null;

// // //                   return (
// // //                     <div
// // //                       className="tower"
// // //                       key={`${cell.cell_id}-${index}`}
// // //                     >

// // //                       <div>

// // //                         <strong>
// // //                           Cell{" "}
// // //                           {cell.cell_id}
// // //                         </strong>

// // //                         <p>
// // //                           MCC{" "}
// // //                           {cell.mcc}
// // //                           {" · "}
// // //                           MNC{" "}
// // //                           {cell.mnc}
// // //                         </p>

// // //                         <p>
// // //                           {cell.radio ||
// // //                             "Unknown radio"}
// // //                         </p>

// // //                       </div>

// // //                       <div>

// // //                         <p>
// // //                           {Number(
// // //                             cell.latitude
// // //                           ).toFixed(6)}
// // //                         </p>

// // //                         <p>
// // //                           {Number(
// // //                             cell.longitude
// // //                           ).toFixed(6)}
// // //                         </p>

// // //                         {distance !==
// // //                           null && (
// // //                           <p>
// // //                             📏{" "}
// // //                             {distance.toFixed(
// // //                               2
// // //                             )}{" "}
// // //                             km
// // //                           </p>
// // //                         )}

// // //                       </div>

// // //                     </div>
// // //                   );
// // //                 }
// // //               )}
// // //             </>

// // //           )}

// // //         </div>

// // //         {/* =================================
// // //             DATABASE STATUS
// // //         ================================= */}

// // //         <div className="card">

// // //           <h2>
// // //             💾 Data Status
// // //           </h2>

// // //           <p>
// // //             OpenCelliD returned{" "}
// // //             <strong>
// // //               {cells.length}
// // //             </strong>{" "}
// // //             valid cells.
// // //           </p>

// // //           <p className="placeholder">
// // //             Existing cells are skipped in
// // //             PostgreSQL to prevent duplicates.
// // //           </p>

// // //         </div>

// // //         {/* =================================
// // //             DATA SOURCE
// // //         ================================= */}

// // //         <div className="card">

// // //           <p className="placeholder">
// // //             Cell data provided by
// // //             OpenCelliD.
// // //           </p>

// // //         </div>

// // //       </div>

// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import { useEffect, useState } from "react";

// // import {
// //   MapContainer,
// //   TileLayer,
// //   CircleMarker,
// //   Popup,
// //   Polyline,
// // } from "react-leaflet";

// // import "leaflet/dist/leaflet.css";
// // import "./App.css";

// // /*
// // ========================================
// // DISTANCE CALCULATION
// // ========================================
// // */

// // function calculateDistance(
// //   lat1,
// //   lon1,
// //   lat2,
// //   lon2
// // ) {
// //   const R = 6371;

// //   const dLat =
// //     ((lat2 - lat1) * Math.PI) / 180;

// //   const dLon =
// //     ((lon2 - lon1) * Math.PI) / 180;

// //   const a =
// //     Math.sin(dLat / 2) ** 2 +
// //     Math.cos((lat1 * Math.PI) / 180) *
// //       Math.cos((lat2 * Math.PI) / 180) *
// //       Math.sin(dLon / 2) ** 2;

// //   const c =
// //     2 *
// //     Math.atan2(
// //       Math.sqrt(a),
// //       Math.sqrt(1 - a)
// //     );

// //   return R * c;
// // }

// // /*
// // ========================================
// // CHECK COORDINATES
// // ========================================
// // */

// // function isValidCoordinate(
// //   latitude,
// //   longitude
// // ) {
// //   return (
// //     Number.isFinite(latitude) &&
// //     Number.isFinite(longitude) &&
// //     latitude >= -90 &&
// //     latitude <= 90 &&
// //     longitude >= -180 &&
// //     longitude <= 180
// //   );
// // }

// // /*
// // ========================================
// // NORMALIZE OPENCELLID DATA

// // OpenCelliD gives:

// // lat
// // lon
// // cellid

// // Our React app uses:

// // latitude
// // longitude
// // cell_id
// // ========================================
// // */

// // function normalizeCell(cell) {
// //   const latitude = Number(
// //     cell.latitude ?? cell.lat
// //   );

// //   const longitude = Number(
// //     cell.longitude ?? cell.lon
// //   );

// //   return {
// //     ...cell,

// //     cell_id:
// //       cell.cell_id ??
// //       cell.cellid,

// //     latitude,

// //     longitude,
// //   };
// // }

// // /*
// // ========================================
// // APP
// // ========================================
// // */

// // function App() {
// //   /*
// //   ======================================
// //   STATES
// //   ======================================
// //   */

// //   const [location, setLocation] =
// //     useState(null);

// //   const [cells, setCells] =
// //     useState([]);

// //   const [nearestCell, setNearestCell] =
// //     useState(null);

// //   const [loading, setLoading] =
// //     useState(false);

// //   const [error, setError] =
// //     useState("");

// //   /*
// //   ======================================
// //   ROAD ROUTE STATES
// //   ======================================
// //   */

// //   const [route, setRoute] =
// //     useState([]);

// //   const [routeLoading, setRouteLoading] =
// //     useState(false);

// //   /*
// //   ======================================
// //   GET USER LOCATION
// //   ======================================
// //   */

// //   const getLocation = () => {
// //     setError("");

// //     if (!navigator.geolocation) {
// //       setError(
// //         "Geolocation is not supported by your browser."
// //       );

// //       return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         setLocation({
// //           latitude:
// //             position.coords.latitude,

// //           longitude:
// //             position.coords.longitude,
// //         });
// //       },

// //       (err) => {
// //         console.error(
// //           "Location error:",
// //           err
// //         );

// //         setError(
// //           "Unable to get your location. Please allow location access."
// //         );
// //       },

// //       {
// //         enableHighAccuracy: true,
// //         timeout: 15000,
// //         maximumAge: 0,
// //       }
// //     );
// //   };

// //   /*
// //   ======================================
// //   FETCH OPENCELLID CELLS
// //   ======================================
// //   */

// //   useEffect(() => {
// //     if (!location) {
// //       return;
// //     }

// //     const getCells = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const url =
// //           `http://localhost:3000/api/opencellid` +
// //           `?lat=${location.latitude}` +
// //           `&lng=${location.longitude}`;

// //         console.log(
// //           "Requesting OpenCelliD:",
// //           url
// //         );

// //         const response =
// //           await fetch(url);

// //         const data =
// //           await response.json();

// //         console.log(
// //           "OpenCelliD data:",
// //           data
// //         );

// //         if (!response.ok) {
// //           throw new Error(
// //             data.error ||
// //               "Failed to fetch OpenCelliD data."
// //           );
// //         }

// //         if (
// //           !data.cells ||
// //           !Array.isArray(data.cells)
// //         ) {
// //           throw new Error(
// //             "Invalid data received from OpenCelliD."
// //           );
// //         }

// //         /*
// //         ==================================
// //         NORMALIZE COORDINATES
// //         ==================================
// //         */

// //         const normalizedCells =
// //           data.cells
// //             .map(normalizeCell)
// //             .filter((cell) => {
// //               const valid =
// //                 isValidCoordinate(
// //                   cell.latitude,
// //                   cell.longitude
// //                 );

// //               if (!valid) {
// //                 console.warn(
// //                   "Skipping cell with invalid coordinates:",
// //                   cell
// //                 );
// //               }

// //               return valid;
// //             });

// //         console.log(
// //           "Valid OpenCelliD cells:",
// //           normalizedCells
// //         );

// //         console.log(
// //           "Invalid cells removed:",
// //           data.cells.length -
// //             normalizedCells.length
// //         );

// //         setCells(normalizedCells);
// //       } catch (err) {
// //         console.error(
// //           "OpenCelliD error:",
// //           err
// //         );

// //         setError(
// //           err.message ||
// //             "Unable to fetch nearby cells."
// //         );

// //         setCells([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     getCells();
// //   }, [location]);

// //   /*
// //   ======================================
// //   FIND NEAREST CELL
// //   ======================================
// //   */

// //   useEffect(() => {
// //     if (
// //       !location ||
// //       cells.length === 0
// //     ) {
// //       setNearestCell(null);
// //       return;
// //     }

// //     let nearest = null;

// //     let shortestDistance =
// //       Infinity;

// //     cells.forEach((cell) => {
// //       const latitude = Number(
// //         cell.latitude
// //       );

// //       const longitude = Number(
// //         cell.longitude
// //       );

// //       if (
// //         !isValidCoordinate(
// //           latitude,
// //           longitude
// //         )
// //       ) {
// //         return;
// //       }

// //       const distance =
// //         calculateDistance(
// //           location.latitude,
// //           location.longitude,
// //           latitude,
// //           longitude
// //         );

// //       if (
// //         distance <
// //         shortestDistance
// //       ) {
// //         shortestDistance =
// //           distance;

// //         nearest = {
// //           ...cell,
// //           distance,
// //         };
// //       }
// //     });

// //     setNearestCell(nearest);
// //   }, [location, cells]);

// //   /*
// //   ======================================
// //   GET ACTUAL ROAD ROUTE

// //   OSRM gives road-based route geometry.

// //   OSRM format:
// //   longitude,latitude

// //   Leaflet format:
// //   latitude,longitude
// //   ======================================
// //   */

// //   useEffect(() => {
// //     if (
// //       !location ||
// //       !nearestCell
// //     ) {
// //       setRoute([]);
// //       return;
// //     }

// //     const getRoute = async () => {
// //       try {
// //         setRouteLoading(true);

// //         const userLat =
// //           Number(location.latitude);

// //         const userLon =
// //           Number(location.longitude);

// //         const cellLat =
// //           Number(nearestCell.latitude);

// //         const cellLon =
// //           Number(nearestCell.longitude);

// //         if (
// //           !isValidCoordinate(
// //             userLat,
// //             userLon
// //           ) ||
// //           !isValidCoordinate(
// //             cellLat,
// //             cellLon
// //           )
// //         ) {
// //           setRoute([]);
// //           return;
// //         }

// //         /*
// //         ==================================
// //         OSRM ROUTING URL
// //         ==================================
// //         */

// //         const url =
// //           `https://router.project-osrm.org/route/v1/driving/` +
// //           `${userLon},${userLat};` +
// //           `${cellLon},${cellLat}` +
// //           `?overview=full&geometries=geojson`;

// //         console.log(
// //           "Requesting road route:",
// //           url
// //         );

// //         const response =
// //           await fetch(url);

// //         if (!response.ok) {
// //           throw new Error(
// //             "Unable to fetch road route."
// //           );
// //         }

// //         const data =
// //           await response.json();

// //         console.log(
// //           "OSRM route:",
// //           data
// //         );

// //         if (
// //           data.code !== "Ok" ||
// //           !data.routes ||
// //           data.routes.length === 0
// //         ) {
// //           throw new Error(
// //             "No road route found."
// //           );
// //         }

// //         /*
// //         ==================================
// //         CONVERT OSRM COORDINATES

// //         OSRM:
// //         [longitude, latitude]

// //         Leaflet:
// //         [latitude, longitude]
// //         ==================================
// //         */

// //         const routeCoordinates =
// //           data.routes[0].geometry.coordinates.map(
// //             ([longitude, latitude]) => [
// //               latitude,
// //               longitude,
// //             ]
// //           );

// //         setRoute(
// //           routeCoordinates
// //         );
// //       } catch (err) {
// //         console.error(
// //           "Routing error:",
// //           err
// //         );

// //         setRoute([]);
// //       } finally {
// //         setRouteLoading(false);
// //       }
// //     };

// //     getRoute();
// //   }, [location, nearestCell]);

// //   /*
// //   ======================================
// //   RETURN UI
// //   ======================================
// //   */

// //   return (
// //     <div className="app">
// //       <div className="container">

// //         {/* =================================
// //             HEADER
// //         ================================= */}

// //         <h1>
// //           Network Finder
// //         </h1>

// //         <p className="subtitle">
// //           Find nearby cellular cells
// //         </p>

// //         {/* =================================
// //             LOCATION CARD
// //         ================================= */}

// //         <div className="card">

// //           <h2>
// //             📍 Your Location
// //           </h2>

// //           {location ? (
// //             <div>

// //               <p>
// //                 <span>
// //                   Latitude
// //                 </span>

// //                 <strong>
// //                   {location.latitude.toFixed(
// //                     7
// //                   )}
// //                 </strong>
// //               </p>

// //               <p>
// //                 <span>
// //                   Longitude
// //                 </span>

// //                 <strong>
// //                   {location.longitude.toFixed(
// //                     7
// //                   )}
// //                 </strong>
// //               </p>

// //             </div>
// //           ) : (
// //             <p className="placeholder">
// //               Location not fetched yet
// //             </p>
// //           )}

// //           {error && (
// //             <p className="error">
// //               {error}
// //             </p>
// //           )}

// //           <button
// //             onClick={getLocation}
// //           >
// //             Get My Location
// //           </button>

// //         </div>

// //         {/* =================================
// //             LOADING
// //         ================================= */}

// //         {loading && (
// //           <div className="card">

// //             <p>
// //               🔄 Searching nearby cells...
// //             </p>

// //           </div>
// //         )}

// //         {/* =================================
// //             MAP
// //         ================================= */}

// //         {location && (
// //           <div className="card">

// //             <h2>
// //               🗺️ Cell Map
// //             </h2>

// //             <MapContainer
// //               center={[
// //                 location.latitude,
// //                 location.longitude,
// //               ]}
// //               zoom={14}
// //               style={{
// //                 height: "400px",
// //                 width: "100%",
// //                 borderRadius: "14px",
// //               }}
// //             >

// //               {/* =================================
// //                   MAP TILES
// //               ================================= */}

// //               <TileLayer
// //                 attribution="&copy; OpenStreetMap contributors"
// //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //               />

// //               {/* =================================
// //                   USER LOCATION
// //               ================================= */}

// //               <CircleMarker
// //                 center={[
// //                   location.latitude,
// //                   location.longitude,
// //                 ]}
// //                 radius={10}
// //               >

// //                 <Popup>

// //                   <strong>
// //                     Your Location
// //                   </strong>

// //                   <br />

// //                   Latitude:{" "}
// //                   {location.latitude.toFixed(
// //                     7
// //                   )}

// //                   <br />

// //                   Longitude:{" "}
// //                   {location.longitude.toFixed(
// //                     7
// //                   )}

// //                 </Popup>

// //               </CircleMarker>

// //               {/* =================================
// //                   OPENCELLID CELLS
// //               ================================= */}

// //               {cells.map(
// //                 (cell, index) => {

// //                   const cellLat =
// //                     Number(
// //                       cell.latitude
// //                     );

// //                   const cellLon =
// //                     Number(
// //                       cell.longitude
// //                     );

// //                   if (
// //                     !isValidCoordinate(
// //                       cellLat,
// //                       cellLon
// //                     )
// //                   ) {
// //                     return null;
// //                   }

// //                   const distance =
// //                     calculateDistance(
// //                       location.latitude,
// //                       location.longitude,
// //                       cellLat,
// //                       cellLon
// //                     );

// //                   return (
// //                     <CircleMarker
// //                       key={`${cell.cell_id}-${index}`}
// //                       center={[
// //                         cellLat,
// //                         cellLon,
// //                       ]}
// //                       radius={8}
// //                     >

// //                       <Popup>

// //                         <strong>
// //                           Cell{" "}
// //                           {cell.cell_id}
// //                         </strong>

// //                         <br />

// //                         MCC:{" "}
// //                         {cell.mcc}

// //                         <br />

// //                         MNC:{" "}
// //                         {cell.mnc}

// //                         <br />

// //                         LAC/TAC:{" "}
// //                         {cell.lac}

// //                         <br />

// //                         Radio:{" "}
// //                         {cell.radio ||
// //                           "Unknown"}

// //                         <br />

// //                         Range:{" "}
// //                         {cell.range
// //                           ? `${cell.range} m`
// //                           : "N/A"}

// //                         <br />

// //                         Distance:{" "}
// //                         {distance.toFixed(
// //                           2
// //                         )}{" "}
// //                         km

// //                       </Popup>

// //                     </CircleMarker>
// //                   );
// //                 }
// //               )}

// //               {/* =================================
// //                   ACTUAL ROAD ROUTE
// //               ================================= */}

// //               {route.length > 0 && (
// //                 <Polyline
// //                   positions={route}
// //                   pathOptions={{
// //                     color: "#1e3a5f",
// //                     weight: 5,
// //                     opacity: 0.9,
// //                   }}
// //                 />
// //               )}

// //             </MapContainer>

// //             {/* =================================
// //                 ROUTE STATUS
// //             ================================= */}

// //             {routeLoading && (
// //               <p className="placeholder">
// //                 🛣️ Finding the road route...
// //               </p>
// //             )}

// //             {!routeLoading &&
// //               route.length > 0 && (
// //                 <p className="placeholder">
// //                   🛣️ Road route found to the
// //                   nearest cell.
// //                 </p>
// //               )}

// //             {!routeLoading &&
// //               nearestCell &&
// //               route.length === 0 && (
// //                 <p className="placeholder">
// //                   ⚠️ No road route could be
// //                   found.
// //                 </p>
// //               )}

// //           </div>
// //         )}

// //         {/* =================================
// //             NEAREST CELL
// //         ================================= */}

// //         {nearestCell && (
// //           <div className="card nearest">

// //             <h2>
// //               🎯 Nearest Cell
// //             </h2>

// //             <h3>
// //               Cell{" "}
// //               {nearestCell.cell_id}
// //             </h3>

// //             <p>
// //               <span>
// //                 MCC
// //               </span>

// //               <strong>
// //                 {nearestCell.mcc}
// //               </strong>
// //             </p>

// //             <p>
// //               <span>
// //                 MNC
// //               </span>

// //               <strong>
// //                 {nearestCell.mnc}
// //               </strong>
// //             </p>

// //             <p>
// //               <span>
// //                 LAC/TAC
// //               </span>

// //               <strong>
// //                 {nearestCell.lac}
// //               </strong>
// //             </p>

// //             <p>
// //               <span>
// //                 Radio
// //               </span>

// //               <strong>
// //                 {nearestCell.radio ||
// //                   "Unknown"}
// //               </strong>
// //             </p>

// //             <p>
// //               <span>
// //                 Distance
// //               </span>

// //               <strong>
// //                 {nearestCell.distance.toFixed(
// //                   2
// //                 )}{" "}
// //                 km
// //               </strong>
// //             </p>

// //             <p>
// //               <span>
// //                 Route
// //               </span>

// //               <strong>
// //                 {routeLoading
// //                   ? "Finding..."
// //                   : route.length > 0
// //                   ? "Road route available"
// //                   : "No route"}
// //               </strong>
// //             </p>

// //           </div>
// //         )}

// //         {/* =================================
// //             ALL CELLS
// //         ================================= */}

// //         <div className="card">

// //           <h2>
// //             📡 OpenCelliD Cells
// //           </h2>

// //           {cells.length === 0 ? (
// //             <p className="placeholder">

// //               {loading
// //                 ? "Searching..."
// //                 : "No cells found yet."}

// //             </p>
// //           ) : (
// //             cells.map(
// //               (cell, index) => {

// //                 const distance =
// //                   location
// //                     ? calculateDistance(
// //                         location.latitude,
// //                         location.longitude,
// //                         Number(
// //                           cell.latitude
// //                         ),
// //                         Number(
// //                           cell.longitude
// //                         )
// //                       )
// //                     : null;

// //                 return (
// //                   <div
// //                     className="tower"
// //                     key={`${cell.cell_id}-${index}`}
// //                   >

// //                     <div>

// //                       <strong>
// //                         Cell{" "}
// //                         {cell.cell_id}
// //                       </strong>

// //                       <p>
// //                         MCC {cell.mcc}
// //                         {" · "}
// //                         MNC {cell.mnc}
// //                       </p>

// //                       <p>
// //                         {cell.radio ||
// //                           "Unknown radio"}
// //                       </p>

// //                     </div>

// //                     <div>

// //                       <p>
// //                         {Number(
// //                           cell.latitude
// //                         ).toFixed(4)}
// //                       </p>

// //                       <p>
// //                         {Number(
// //                           cell.longitude
// //                         ).toFixed(4)}
// //                       </p>

// //                       {distance !==
// //                         null && (
// //                         <p>
// //                           📏{" "}
// //                           {distance.toFixed(
// //                             2
// //                           )}{" "}
// //                           km
// //                         </p>
// //                       )}

// //                     </div>

// //                   </div>
// //                 );
// //               }
// //             )
// //           )}

// //         </div>

// //         {/* =================================
// //             DATABASE / DATA STATUS
// //         ================================= */}

// //         <div className="card">

// //           <h2>
// //             🗃️ Database Status
// //           </h2>

// //           <p>
// //             <span>
// //               Cells loaded
// //             </span>

// //             <strong>
// //               {cells.length}
// //             </strong>
// //           </p>

// //           <p>
// //             <span>
// //               Nearest cell
// //             </span>

// //             <strong>
// //               {nearestCell
// //                 ? `Cell ${nearestCell.cell_id}`
// //                 : "Not calculated"}
// //             </strong>
// //           </p>

// //           <p>
// //             <span>
// //               Route
// //             </span>

// //             <strong>
// //               {routeLoading
// //                 ? "Loading"
// //                 : route.length > 0
// //                 ? "Available"
// //                 : "Not available"}
// //             </strong>
// //           </p>

// //         </div>

// //         {/* =================================
// //             DATA SOURCE
// //         ================================= */}

// //         <div className="card">

// //           <p className="placeholder">
// //             Cell data provided by
// //             OpenCelliD.
// //           </p>

// //           <p className="placeholder">
// //             Road routing provided by
// //             OSRM.
// //           </p>

// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default App;




// import { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   Polyline,
//   useMap,
// } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import "./App.css";

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const DEFAULT_LOCATION = {
//   latitude: 18.5204,
//   longitude: 73.8567,
// };

// const MAP_ZOOM = 15;

// /* =========================================================
//    DISTANCE
// ========================================================= */

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371;

//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// }

// /* =========================================================
//    COORDINATE VALIDATION
// ========================================================= */

// function isValidCoordinate(latitude, longitude) {
//   return (
//     Number.isFinite(latitude) &&
//     Number.isFinite(longitude) &&
//     latitude >= -90 &&
//     latitude <= 90 &&
//     longitude >= -180 &&
//     longitude <= 180
//   );
// }

// /* =========================================================
//    OPEN CELL ID NORMALIZATION
// ========================================================= */

// function normalizeCell(cell) {
//   const latitude = Number(cell.latitude ?? cell.lat);
//   const longitude = Number(cell.longitude ?? cell.lon);

//   return {
//     ...cell,

//     cell_id: cell.cell_id ?? cell.cellid,

//     latitude,
//     longitude,

//     mcc: cell.mcc,
//     mnc: cell.mnc,
//     lac: cell.lac,
//     radio: cell.radio,
//     range: cell.range,
//     samples: cell.samples,
//     created: cell.created,
//     updated: cell.updated,
//   };
// }

// /* =========================================================
//    MAP CENTER COMPONENT
// ========================================================= */

// function MapUpdater({ location }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!location) return;

//     map.setView(
//       [location.latitude, location.longitude],
//       MAP_ZOOM,
//       {
//         animate: true,
//       }
//     );
//   }, [location, map]);

//   return null;
// }

// /* =========================================================
//    APP
// ========================================================= */

// function App() {
//   const [location, setLocation] = useState(null);

//   const [cells, setCells] = useState([]);

//   const [nearestCell, setNearestCell] = useState(null);

//   const [loadingLocation, setLoadingLocation] = useState(false);

//   const [loadingCells, setLoadingCells] = useState(false);

//   const [error, setError] = useState("");

//   const [route, setRoute] = useState([]);

//   const [routeLoading, setRouteLoading] = useState(false);

//   const [routeInfo, setRouteInfo] = useState(null);

//   /* =======================================================
//      GET USER LOCATION
//   ======================================================= */

//   const getLocation = () => {
//     setError("");

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by this browser.");
//       return;
//     }

//     setLoadingLocation(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const latitude = Number(position.coords.latitude);
//         const longitude = Number(position.coords.longitude);

//         if (!isValidCoordinate(latitude, longitude)) {
//           setError("Invalid location received from your device.");
//           setLoadingLocation(false);
//           return;
//         }

//         const userLocation = {
//           latitude,
//           longitude,
//         };

//         setLocation(userLocation);

//         console.log("User location:", userLocation);

//         await fetchOpenCellIdData(userLocation);

//         setLoadingLocation(false);
//       },

//       (err) => {
//         console.error("Location error:", err);

//         let message = "Unable to get your location.";

//         if (err.code === 1) {
//           message =
//             "Location permission was denied. Please allow location access.";
//         } else if (err.code === 2) {
//           message =
//             "Your location could not be determined.";
//         } else if (err.code === 3) {
//           message =
//             "Location request timed out.";
//         }

//         setError(message);
//         setLoadingLocation(false);
//       },

//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 0,
//       }
//     );
//   };

//   /* =======================================================
//      FETCH OPENCELLID DATA
//   ======================================================= */

//   const fetchOpenCellIdData = async (userLocation) => {
//     try {
//       setLoadingCells(true);
//       setError("");

//       const url =
//         `http://localhost:3000/api/opencellid` +
//         `?lat=${userLocation.latitude}` +
//         `&lng=${userLocation.longitude}`;

//       console.log("Requesting OpenCelliD:", url);

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           `Backend returned HTTP ${response.status}`
//         );
//       }

//       const data = await response.json();

//       console.log("OpenCelliD data:", data);

//       /*
//        * Backend may return either:
//        *
//        * [
//        *   {...},
//        *   {...}
//        * ]
//        *
//        * OR
//        *
//        * {
//        *   cells: [...]
//        * }
//        */

//       const rawCells = Array.isArray(data)
//         ? data
//         : Array.isArray(data.cells)
//         ? data.cells
//         : [];

//       console.log("Raw cells:", rawCells);

//       const normalizedCells = rawCells
//         .map(normalizeCell)
//         .filter((cell) => {
//           const valid = isValidCoordinate(
//             cell.latitude,
//             cell.longitude
//           );

//           if (!valid) {
//             console.warn(
//               "Skipping cell with invalid coordinates:",
//               cell
//             );
//           }

//           return valid;
//         });

//       console.log(
//         "Valid OpenCelliD cells:",
//         normalizedCells
//       );

//       setCells(normalizedCells);

//       /* =====================================================
//          FIND NEAREST CELL
//       ===================================================== */

//       let closest = null;
//       let smallestDistance = Infinity;

//       normalizedCells.forEach((cell) => {
//         const distance = calculateDistance(
//           userLocation.latitude,
//           userLocation.longitude,
//           cell.latitude,
//           cell.longitude
//         );

//         const cellWithDistance = {
//           ...cell,
//           distance,
//         };

//         if (distance < smallestDistance) {
//           smallestDistance = distance;
//           closest = cellWithDistance;
//         }
//       });

//       setNearestCell(closest);

//       console.log("Nearest cell:", closest);
//     } catch (err) {
//       console.error("OpenCelliD fetch error:", err);

//       setError(
//         `Could not load cell data. ${err.message}`
//       );

//       setCells([]);
//       setNearestCell(null);
//     } finally {
//       setLoadingCells(false);
//     }
//   };

//   /* =======================================================
//      ROAD ROUTING
     
//      IMPORTANT:
     
//      We DON'T directly route to the raw cell coordinate.
     
//      Instead:
     
//      USER LOCATION
//             ↓
//      OSRM nearest road
//             ↓
//      CELL LOCATION
//             ↓
//      OSRM nearest road
//             ↓
//      ROUTE BETWEEN ROADS
//   ======================================================= */

//   useEffect(() => {
//     if (!location || !nearestCell) {
//       setRoute([]);
//       setRouteInfo(null);
//       return;
//     }

//     const getRoadRoute = async () => {
//       try {
//         setRouteLoading(true);
//         setRoute([]);
//         setRouteInfo(null);

//         const userLat = Number(location.latitude);
//         const userLon = Number(location.longitude);

//         const cellLat = Number(nearestCell.latitude);
//         const cellLon = Number(nearestCell.longitude);

//         if (
//           !isValidCoordinate(userLat, userLon) ||
//           !isValidCoordinate(cellLat, cellLon)
//         ) {
//           console.warn(
//             "Invalid coordinates for routing."
//           );

//           return;
//         }

//         console.log(
//           "Starting road routing...",
//           {
//             user: [userLat, userLon],
//             cell: [cellLat, cellLon],
//           }
//         );

//         /* =================================================
//            STEP 1:
//            SNAP USER LOCATION TO NEAREST ROAD
//         ================================================= */

//         const userNearestUrl =
//           `https://router.project-osrm.org/nearest/v1/driving/` +
//           `${userLon},${userLat}` +
//           `?number=1`;

//         console.log(
//           "Finding nearest road to user:",
//           userNearestUrl
//         );

//         const userNearestResponse =
//           await fetch(userNearestUrl);

//         if (!userNearestResponse.ok) {
//           throw new Error(
//             "Could not find a road near your location."
//           );
//         }

//         const userNearestData =
//           await userNearestResponse.json();

//         if (
//           userNearestData.code !== "Ok" ||
//           !userNearestData.waypoints ||
//           userNearestData.waypoints.length === 0
//         ) {
//           throw new Error(
//             "No nearby road was found for your location."
//           );
//         }

//         const userWaypoint =
//           userNearestData.waypoints[0];

//         /*
//          * OSRM returns:
//          *
//          * [longitude, latitude]
//          */

//         const userRoadLon =
//           Number(userWaypoint.location[0]);

//         const userRoadLat =
//           Number(userWaypoint.location[1]);

//         console.log(
//           "User snapped to road:",
//           userRoadLat,
//           userRoadLon
//         );

//         /* =================================================
//            STEP 2:
//            SNAP CELL LOCATION TO NEAREST ROAD
//         ================================================= */

//         const cellNearestUrl =
//           `https://router.project-osrm.org/nearest/v1/driving/` +
//           `${cellLon},${cellLat}` +
//           `?number=1`;

//         console.log(
//           "Finding nearest road to cell:",
//           cellNearestUrl
//         );

//         const cellNearestResponse =
//           await fetch(cellNearestUrl);

//         if (!cellNearestResponse.ok) {
//           throw new Error(
//             "Could not find a road near the cell."
//           );
//         }

//         const cellNearestData =
//           await cellNearestResponse.json();

//         if (
//           cellNearestData.code !== "Ok" ||
//           !cellNearestData.waypoints ||
//           cellNearestData.waypoints.length === 0
//         ) {
//           throw new Error(
//             "No nearby road was found for the cell."
//           );
//         }

//         const cellWaypoint =
//           cellNearestData.waypoints[0];

//         const cellRoadLon =
//           Number(cellWaypoint.location[0]);

//         const cellRoadLat =
//           Number(cellWaypoint.location[1]);

//         console.log(
//           "Cell snapped to road:",
//           cellRoadLat,
//           cellRoadLon
//         );

//         /* =================================================
//            STEP 3:
//            CALCULATE ACTUAL ROAD ROUTE
//         ================================================= */

//         const routeUrl =
//           `https://router.project-osrm.org/route/v1/driving/` +
//           `${userRoadLon},${userRoadLat};` +
//           `${cellRoadLon},${cellRoadLat}` +
//           `?overview=full&geometries=geojson`;

//         console.log(
//           "Requesting road route:",
//           routeUrl
//         );

//         const routeResponse =
//           await fetch(routeUrl);

//         if (!routeResponse.ok) {
//           throw new Error(
//             "Could not calculate the road route."
//           );
//         }

//         const routeData =
//           await routeResponse.json();

//         console.log(
//           "OSRM route response:",
//           routeData
//         );

//         if (
//           routeData.code !== "Ok" ||
//           !routeData.routes ||
//           routeData.routes.length === 0
//         ) {
//           throw new Error(
//             "No drivable road route was found."
//           );
//         }

//         const selectedRoute =
//           routeData.routes[0];

//         /* =================================================
//            STEP 4:
//            CONVERT OSRM COORDINATES
           
//            OSRM:
//            [longitude, latitude]
           
//            Leaflet:
//            [latitude, longitude]
//         ================================================= */

//         const routeCoordinates =
//           selectedRoute.geometry.coordinates.map(
//             ([longitude, latitude]) => [
//               latitude,
//               longitude,
//             ]
//           );

//         setRoute(routeCoordinates);

//         setRouteInfo({
//           distance:
//             Number(selectedRoute.distance) / 1000,

//           duration:
//             Number(selectedRoute.duration) / 60,

//           userRoadPoint: [
//             userRoadLat,
//             userRoadLon,
//           ],

//           cellRoadPoint: [
//             cellRoadLat,
//             cellRoadLon,
//           ],
//         });

//         console.log(
//           "Road route successfully created."
//         );

//         console.log(
//           "Route distance:",
//           Number(selectedRoute.distance) / 1000,
//           "km"
//         );

//         console.log(
//           "Route duration:",
//           Number(selectedRoute.duration) / 60,
//           "minutes"
//         );
//       } catch (err) {
//         console.error(
//           "Routing error:",
//           err
//         );

//         setRoute([]);
//         setRouteInfo(null);
//       } finally {
//         setRouteLoading(false);
//       }
//     };

//     getRoadRoute();
//   }, [location, nearestCell]);

//   /* =======================================================
//      INITIAL MAP CENTER
//   ======================================================= */

//   const mapCenter = location
//     ? [
//         location.latitude,
//         location.longitude,
//       ]
//     : [
//         DEFAULT_LOCATION.latitude,
//         DEFAULT_LOCATION.longitude,
//       ];

//   /* =======================================================
//      UI
//   ======================================================= */

//   return (
//     <div className="app">
//       {/* ===================================================
//           HEADER
//       =================================================== */}

//       <header className="app-header">
//         <div>
//           <h1>Cell Tower Finder</h1>

//           <p>
//             Find nearby cellular cells and navigate using
//             real road routes.
//           </p>
//         </div>

//         <button
//           className="location-button"
//           onClick={getLocation}
//           disabled={loadingLocation}
//         >
//           {loadingLocation
//             ? "Getting Location..."
//             : "Get My Location"}
//         </button>
//       </header>

//       {/* ===================================================
//           ERROR
//       =================================================== */}

//       {error && (
//         <div className="error-card">
//           <strong>Error</strong>
//           <p>{error}</p>
//         </div>
//       )}

//       {/* ===================================================
//           LOCATION CARD
//       =================================================== */}

//       {location && (
//         <div className="info-card location-card">
//           <div>
//             <span className="card-label">
//               YOUR LOCATION
//             </span>

//             <h2>Current Position</h2>

//             <p>
//               Latitude:{" "}
//               <strong>
//                 {location.latitude.toFixed(6)}
//               </strong>
//             </p>

//             <p>
//               Longitude:{" "}
//               <strong>
//                 {location.longitude.toFixed(6)}
//               </strong>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           LOADING
//       =================================================== */}

//       {loadingCells && (
//         <div className="loading-card">
//           <div className="loading-spinner"></div>

//           <div>
//             <strong>
//               Finding nearby cellular cells...
//             </strong>

//             <p>
//               Fetching OpenCelliD data and checking
//               your nearest cell.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           MAP
//       =================================================== */}

//       <section className="map-section">
//         <div className="section-heading">
//           <div>
//             <span className="card-label">
//               LIVE MAP
//             </span>

//             <h2>Nearby Cellular Network</h2>
//           </div>

//           {cells.length > 0 && (
//             <span className="cell-count">
//               {cells.length} cells found
//             </span>
//           )}
//         </div>

//         <div className="map-wrapper">
//           <MapContainer
//             center={mapCenter}
//             zoom={MAP_ZOOM}
//             scrollWheelZoom={true}
//             className="map"
//           >
//             <MapUpdater location={location} />

//             <TileLayer
//               attribution='&copy; OpenStreetMap contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* =============================================
//                 USER LOCATION
//             ============================================= */}

//             {location && (
//               <CircleMarker
//                 center={[
//                   location.latitude,
//                   location.longitude,
//                 ]}
//                 radius={10}
//                 pathOptions={{
//                   color: "#1E3A5F",
//                   fillColor: "#3B82F6",
//                   fillOpacity: 1,
//                   weight: 3,
//                 }}
//               >
//                 <Popup>
//                   <strong>Your Location</strong>

//                   <br />

//                   {location.latitude.toFixed(6)},{" "}
//                   {location.longitude.toFixed(6)}
//                 </Popup>
//               </CircleMarker>
//             )}

//             {/* =============================================
//                 ALL OPENCELLID CELLS
//             ============================================= */}

//             {cells.map((cell, index) => {
//               const latitude = Number(
//                 cell.latitude
//               );

//               const longitude = Number(
//                 cell.longitude
//               );

//               if (
//                 !isValidCoordinate(
//                   latitude,
//                   longitude
//                 )
//               ) {
//                 return null;
//               }

//               const isNearest =
//                 nearestCell &&
//                 String(
//                   nearestCell.cell_id
//                 ) ===
//                   String(cell.cell_id);

//               return (
//                 <CircleMarker
//                   key={`${cell.cell_id}-${index}`}
//                   center={[
//                     latitude,
//                     longitude,
//                   ]}
//                   radius={isNearest ? 9 : 6}
//                   pathOptions={{
//                     color: isNearest
//                       ? "#DC2626"
//                       : "#16A34A",

//                     fillColor: isNearest
//                       ? "#EF4444"
//                       : "#22C55E",

//                     fillOpacity: 0.8,

//                     weight: isNearest ? 3 : 2,
//                   }}
//                 >
//                   <Popup>
//                     <strong>
//                       {isNearest
//                         ? "Nearest Cell"
//                         : "OpenCelliD Cell"}
//                     </strong>

//                     <br />

//                     Cell ID:{" "}
//                     {cell.cell_id ?? "N/A"}

//                     <br />

//                     Radio:{" "}
//                     {cell.radio ?? "N/A"}

//                     <br />

//                     MCC:{" "}
//                     {cell.mcc ?? "N/A"}

//                     <br />

//                     MNC:{" "}
//                     {cell.mnc ?? "N/A"}

//                     <br />

//                     LAC:{" "}
//                     {cell.lac ?? "N/A"}

//                     <br />

//                     Coordinates:{" "}
//                     {latitude.toFixed(6)},{" "}
//                     {longitude.toFixed(6)}
//                   </Popup>
//                 </CircleMarker>
//               );
//             })}

//             {/* =============================================
//                 ACTUAL ROAD ROUTE
//             ============================================= */}

//             {route.length > 1 && (
//               <Polyline
//                 positions={route}
//                 pathOptions={{
//                   color: "#2563EB",
//                   weight: 6,
//                   opacity: 0.9,
//                 }}
//               />
//             )}

//             {/* =============================================
//                 ROAD SNAP POINT - USER
//             ============================================= */}

//             {routeInfo?.userRoadPoint && (
//               <CircleMarker
//                 center={
//                   routeInfo.userRoadPoint
//                 }
//                 radius={4}
//                 pathOptions={{
//                   color: "#1D4ED8",
//                   fillColor: "#60A5FA",
//                   fillOpacity: 1,
//                   weight: 2,
//                 }}
//               >
//                 <Popup>
//                   Road starting point
//                 </Popup>
//               </CircleMarker>
//             )}

//             {/* =============================================
//                 ROAD SNAP POINT - CELL
//             ============================================= */}

//             {routeInfo?.cellRoadPoint && (
//               <CircleMarker
//                 center={
//                   routeInfo.cellRoadPoint
//                 }
//                 radius={4}
//                 pathOptions={{
//                   color: "#B91C1C",
//                   fillColor: "#F87171",
//                   fillOpacity: 1,
//                   weight: 2,
//                 }}
//               >
//                 <Popup>
//                   Road destination point
//                 </Popup>
//               </CircleMarker>
//             )}
//           </MapContainer>
//         </div>
//       </section>

//       {/* ===================================================
//           ROUTE STATUS
//       =================================================== */}

//       {nearestCell && (
//         <section className="info-card route-card">
//           <span className="card-label">
//             ROAD ROUTE
//           </span>

//           <h2>
//             Route to Nearest Cell
//           </h2>

//           {routeLoading && (
//             <div className="route-status">
//               <div className="loading-spinner"></div>

//               <p>
//                 Finding the nearest roads and
//                 calculating a realistic driving route...
//               </p>
//             </div>
//           )}

//           {!routeLoading &&
//             route.length > 1 &&
//             routeInfo && (
//               <div className="route-details">
//                 <div className="route-stat">
//                   <span>Road distance</span>

//                   <strong>
//                     {routeInfo.distance.toFixed(2)} km
//                   </strong>
//                 </div>

//                 <div className="route-stat">
//                   <span>Estimated driving time</span>

//                   <strong>
//                     {routeInfo.duration < 1
//                       ? "< 1 min"
//                       : `${Math.round(
//                           routeInfo.duration
//                         )} min`}
//                   </strong>
//                 </div>
//               </div>
//             )}

//           {!routeLoading &&
//             route.length === 0 && (
//               <p className="muted-text">
//                 A road route could not be calculated
//                 for this cell. The cell coordinate may
//                 be too far from a drivable road.
//               </p>
//             )}
//         </section>
//       )}

//       {/* ===================================================
//           NEAREST CELL
//       =================================================== */}

//       {nearestCell && (
//         <section className="info-card nearest-card">
//           <span className="card-label">
//             NEAREST CELL
//           </span>

//           <h2>Closest OpenCelliD Cell</h2>

//           <div className="cell-details">
//             <div>
//               <span>Cell ID</span>

//               <strong>
//                 {nearestCell.cell_id ??
//                   "Unknown"}
//               </strong>
//             </div>

//             <div>
//               <span>Distance</span>

//               <strong>
//                 {nearestCell.distance.toFixed(
//                   2
//                 )}{" "}
//                 km
//               </strong>
//             </div>

//             <div>
//               <span>Radio</span>

//               <strong>
//                 {nearestCell.radio ??
//                   "Unknown"}
//               </strong>
//             </div>

//             <div>
//               <span>MCC</span>

//               <strong>
//                 {nearestCell.mcc ??
//                   "Unknown"}
//               </strong>
//             </div>

//             <div>
//               <span>MNC</span>

//               <strong>
//                 {nearestCell.mnc ??
//                   "Unknown"}
//               </strong>
//             </div>

//             <div>
//               <span>LAC</span>

//               <strong>
//                 {nearestCell.lac ??
//                   "Unknown"}
//               </strong>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ===================================================
//           ALL CELLS
//       =================================================== */}

//       {cells.length > 0 && (
//         <section className="info-card cells-card">
//           <div className="section-heading">
//             <div>
//               <span className="card-label">
//                 OPENCELLID
//               </span>

//               <h2>
//                 Nearby Cells
//               </h2>
//             </div>

//             <span className="cell-count">
//               {cells.length}
//             </span>
//           </div>

//           <div className="cells-list">
//             {cells.map((cell, index) => {
//               const distance = location
//                 ? calculateDistance(
//                     location.latitude,
//                     location.longitude,
//                     cell.latitude,
//                     cell.longitude
//                   )
//                 : null;

//               const isNearest =
//                 nearestCell &&
//                 String(
//                   nearestCell.cell_id
//                 ) ===
//                   String(cell.cell_id);

//               return (
//                 <div
//                   className={`cell-row ${
//                     isNearest
//                       ? "nearest-row"
//                       : ""
//                   }`}
//                   key={`${cell.cell_id}-${index}`}
//                 >
//                   <div className="cell-main">
//                     <strong>
//                       Cell{" "}
//                       {cell.cell_id ??
//                         "Unknown"}
//                     </strong>

//                     {isNearest && (
//                       <span className="nearest-badge">
//                         NEAREST
//                       </span>
//                     )}
//                   </div>

//                   <div className="cell-meta">
//                     <span>
//                       {cell.radio ??
//                         "Unknown"}
//                     </span>

//                     <span>
//                       {cell.latitude.toFixed(
//                         5
//                       )}
//                       ,{" "}
//                       {cell.longitude.toFixed(
//                         5
//                       )}
//                     </span>

//                     {distance !== null && (
//                       <span>
//                         {distance.toFixed(
//                           2
//                         )}{" "}
//                         km
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}

//       {/* ===================================================
//           DATABASE STATUS
//       =================================================== */}

//       <section className="info-card database-card">
//         <span className="card-label">
//           DATA SOURCE
//         </span>

//         <h2>OpenCelliD + Local PostgreSQL</h2>

//         <p>
//           Cell information is retrieved through
//           your local backend and stored in your
//           PostgreSQL database.
//         </p>

//         <div className="status-row">
//           <span className="status-dot"></span>

//           <span>
//             Backend: localhost:3000
//           </span>
//         </div>

//         <div className="status-row">
//           <span className="status-dot"></span>

//           <span>
//             OpenCelliD data available
//           </span>
//         </div>
//       </section>

//       {/* ===================================================
//           ROUTING INFORMATION
//       =================================================== */}

//       <section className="info-card source-card">
//         <span className="card-label">
//           ROUTING
//         </span>

//         <h2>How the route works</h2>

//         <p>
//           The map first finds the nearest
//           drivable road to your location and the
//           nearest drivable road to the selected
//           cell. It then calculates a road-based
//           route between those two points.
//         </p>

//         <p className="muted-text">
//           The blue line represents a driving-road
//           route. The cell coordinate itself may
//           not be located directly on a road.
//         </p>
//       </section>
//     </div>
//   );
// }

// export default App;







import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

/* =========================================================
   CONSTANTS
========================================================= */

const DEFAULT_LOCATION = {
  latitude: 18.5204,
  longitude: 73.8567,
};

const MAP_ZOOM = 15;

/* =========================================================
   DISTANCE
========================================================= */

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

/* =========================================================
   COORDINATE VALIDATION
========================================================= */

function isValidCoordinate(latitude, longitude) {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/* =========================================================
   OPEN CELL ID NORMALIZATION
========================================================= */

function normalizeCell(cell) {
  const latitude = Number(cell.latitude ?? cell.lat);
  const longitude = Number(cell.longitude ?? cell.lon);

  return {
    ...cell,

    cell_id: cell.cell_id ?? cell.cellid,

    latitude,
    longitude,

    mcc: cell.mcc,
    mnc: cell.mnc,
    lac: cell.lac,
    radio: cell.radio,
    range: cell.range,
    samples: cell.samples,
    created: cell.created,
    updated: cell.updated,
  };
}

/* =========================================================
   MAP CENTER COMPONENT
========================================================= */

function MapUpdater({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.setView(
      [location.latitude, location.longitude],
      MAP_ZOOM,
      {
        animate: true,
      }
    );
  }, [location, map]);

  return null;
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [location, setLocation] = useState(null);

  const [cells, setCells] = useState([]);

  const [nearestCell, setNearestCell] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [loadingCells, setLoadingCells] = useState(false);

  const [error, setError] = useState("");

  const [route, setRoute] = useState([]);

  const [routeLoading, setRouteLoading] = useState(false);

  const [routeInfo, setRouteInfo] = useState(null);

  /* =======================================================
     GET USER LOCATION
  ======================================================= */

  const getLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = Number(position.coords.latitude);
        const longitude = Number(position.coords.longitude);

        if (!isValidCoordinate(latitude, longitude)) {
          setError("Invalid location received from your device.");
          setLoadingLocation(false);
          return;
        }

        const userLocation = {
          latitude,
          longitude,
        };

        setLocation(userLocation);

        console.log("User location:", userLocation);

        await fetchOpenCellIdData(userLocation);

        setLoadingLocation(false);
      },

      (err) => {
        console.error("Location error:", err);

        let message = "Unable to get your location.";

        if (err.code === 1) {
          message =
            "Location permission was denied. Please allow location access.";
        } else if (err.code === 2) {
          message =
            "Your location could not be determined.";
        } else if (err.code === 3) {
          message =
            "Location request timed out.";
        }

        setError(message);
        setLoadingLocation(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /* =======================================================
     FETCH OPENCELLID DATA
  ======================================================= */

  const fetchOpenCellIdData = async (userLocation) => {
    try {
      setLoadingCells(true);
      setError("");

      const url =
        `http://localhost:3000/api/opencellid` +
        `?lat=${userLocation.latitude}` +
        `&lng=${userLocation.longitude}`;

      console.log("Requesting OpenCelliD:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Backend returned HTTP ${response.status}`
        );
      }

      const data = await response.json();

      console.log("OpenCelliD data:", data);

      /*
       * Backend may return either:
       *
       * [
       *   {...},
       *   {...}
       * ]
       *
       * OR
       *
       * {
       *   cells: [...]
       * }
       */

      const rawCells = Array.isArray(data)
        ? data
        : Array.isArray(data.cells)
        ? data.cells
        : [];

      console.log("Raw cells:", rawCells);

      const normalizedCells = rawCells
        .map(normalizeCell)
        .filter((cell) => {
          const valid = isValidCoordinate(
            cell.latitude,
            cell.longitude
          );

          if (!valid) {
            console.warn(
              "Skipping cell with invalid coordinates:",
              cell
            );
          }

          return valid;
        });

      console.log(
        "Valid OpenCelliD cells:",
        normalizedCells
      );

      setCells(normalizedCells);

      /* =====================================================
         FIND NEAREST CELL
      ===================================================== */

      let closest = null;
      let smallestDistance = Infinity;

      normalizedCells.forEach((cell) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          cell.latitude,
          cell.longitude
        );

        const cellWithDistance = {
          ...cell,
          distance,
        };

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closest = cellWithDistance;
        }
      });

      setNearestCell(closest);

      console.log("Nearest cell:", closest);
    } catch (err) {
      console.error("OpenCelliD fetch error:", err);

      setError(
        `Could not load cell data. ${err.message}`
      );

      setCells([]);
      setNearestCell(null);
    } finally {
      setLoadingCells(false);
    }
  };

  /* =======================================================
     ROAD ROUTING
     
     IMPORTANT:
     
     We DON'T directly route to the raw cell coordinate.
     
     Instead:
     
     USER LOCATION
            ↓
     OSRM nearest road
            ↓
     CELL LOCATION
            ↓
     OSRM nearest road
            ↓
     ROUTE BETWEEN ROADS
  ======================================================= */

  useEffect(() => {
    if (!location || !nearestCell) {
      setRoute([]);
      setRouteInfo(null);
      return;
    }

    const getRoadRoute = async () => {
      try {
        setRouteLoading(true);
        setRoute([]);
        setRouteInfo(null);

        const userLat = Number(location.latitude);
        const userLon = Number(location.longitude);

        const cellLat = Number(nearestCell.latitude);
        const cellLon = Number(nearestCell.longitude);

        if (
          !isValidCoordinate(userLat, userLon) ||
          !isValidCoordinate(cellLat, cellLon)
        ) {
          console.warn(
            "Invalid coordinates for routing."
          );

          return;
        }

        console.log(
          "Starting road routing...",
          {
            user: [userLat, userLon],
            cell: [cellLat, cellLon],
          }
        );

        /* =================================================
           STEP 1:
           SNAP USER LOCATION TO NEAREST ROAD
        ================================================= */

        const userNearestUrl =
          `https://router.project-osrm.org/nearest/v1/driving/` +
          `${userLon},${userLat}` +
          `?number=1`;

        console.log(
          "Finding nearest road to user:",
          userNearestUrl
        );

        const userNearestResponse =
          await fetch(userNearestUrl);

        if (!userNearestResponse.ok) {
          throw new Error(
            "Could not find a road near your location."
          );
        }

        const userNearestData =
          await userNearestResponse.json();

        if (
          userNearestData.code !== "Ok" ||
          !userNearestData.waypoints ||
          userNearestData.waypoints.length === 0
        ) {
          throw new Error(
            "No nearby road was found for your location."
          );
        }

        const userWaypoint =
          userNearestData.waypoints[0];

        /*
         * OSRM returns:
         *
         * [longitude, latitude]
         */

        const userRoadLon =
          Number(userWaypoint.location[0]);

        const userRoadLat =
          Number(userWaypoint.location[1]);

        console.log(
          "User snapped to road:",
          userRoadLat,
          userRoadLon
        );

        /* =================================================
           STEP 2:
           SNAP CELL LOCATION TO NEAREST ROAD
        ================================================= */

        const cellNearestUrl =
          `https://router.project-osrm.org/nearest/v1/driving/` +
          `${cellLon},${cellLat}` +
          `?number=1`;

        console.log(
          "Finding nearest road to cell:",
          cellNearestUrl
        );

        const cellNearestResponse =
          await fetch(cellNearestUrl);

        if (!cellNearestResponse.ok) {
          throw new Error(
            "Could not find a road near the cell."
          );
        }

        const cellNearestData =
          await cellNearestResponse.json();

        if (
          cellNearestData.code !== "Ok" ||
          !cellNearestData.waypoints ||
          cellNearestData.waypoints.length === 0
        ) {
          throw new Error(
            "No nearby road was found for the cell."
          );
        }

        const cellWaypoint =
          cellNearestData.waypoints[0];

        const cellRoadLon =
          Number(cellWaypoint.location[0]);

        const cellRoadLat =
          Number(cellWaypoint.location[1]);

        console.log(
          "Cell snapped to road:",
          cellRoadLat,
          cellRoadLon
        );

        /* =================================================
           STEP 3:
           CALCULATE ACTUAL ROAD ROUTE
        ================================================= */

        const routeUrl =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${userRoadLon},${userRoadLat};` +
          `${cellRoadLon},${cellRoadLat}` +
          `?overview=full&geometries=geojson`;

        console.log(
          "Requesting road route:",
          routeUrl
        );

        const routeResponse =
          await fetch(routeUrl);

        if (!routeResponse.ok) {
          throw new Error(
            "Could not calculate the road route."
          );
        }

        const routeData =
          await routeResponse.json();

        console.log(
          "OSRM route response:",
          routeData
        );

        if (
          routeData.code !== "Ok" ||
          !routeData.routes ||
          routeData.routes.length === 0
        ) {
          throw new Error(
            "No drivable road route was found."
          );
        }

        const selectedRoute =
          routeData.routes[0];

        /* =================================================
           STEP 4:
           CONVERT OSRM COORDINATES
           
           OSRM:
           [longitude, latitude]
           
           Leaflet:
           [latitude, longitude]
        ================================================= */

        const routeCoordinates =
          selectedRoute.geometry.coordinates.map(
            ([longitude, latitude]) => [
              latitude,
              longitude,
            ]
          );

        setRoute(routeCoordinates);

        setRouteInfo({
          distance:
            Number(selectedRoute.distance) / 1000,

          duration:
            Number(selectedRoute.duration) / 60,

          userRoadPoint: [
            userRoadLat,
            userRoadLon,
          ],

          cellRoadPoint: [
            cellRoadLat,
            cellRoadLon,
          ],
        });

        console.log(
          "Road route successfully created."
        );

        console.log(
          "Route distance:",
          Number(selectedRoute.distance) / 1000,
          "km"
        );

        console.log(
          "Route duration:",
          Number(selectedRoute.duration) / 60,
          "minutes"
        );
      } catch (err) {
        console.error(
          "Routing error:",
          err
        );

        setRoute([]);
        setRouteInfo(null);
      } finally {
        setRouteLoading(false);
      }
    };

    getRoadRoute();
  }, [location, nearestCell]);

  /* =======================================================
     INITIAL MAP CENTER
  ======================================================= */

  const mapCenter = location
    ? [
        location.latitude,
        location.longitude,
      ]
    : [
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
      ];

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="app">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="app-header">
        <div>
          <h1>Cell Tower Finder</h1>

          <p>
            Find nearby cellular cells and navigate using
            real road routes.
          </p>
        </div>

        <button
          className="location-button"
          onClick={getLocation}
          disabled={loadingLocation}
        >
          {loadingLocation
            ? "Getting Location..."
            : "Get My Location"}
        </button>
      </header>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="error-card">
          <strong>Error</strong>
          <p>{error}</p>
        </div>
      )}

      {/* ===================================================
          LOCATION CARD
      =================================================== */}

      {location && (
        <div className="info-card location-card">
          <div>
            <span className="card-label">
              YOUR LOCATION
            </span>

            <h2>Current Position</h2>

            <p>
              Latitude:{" "}
              <strong>
                {location.latitude.toFixed(6)}
              </strong>
            </p>

            <p>
              Longitude:{" "}
              <strong>
                {location.longitude.toFixed(6)}
              </strong>
            </p>
          </div>
        </div>
      )}

      {/* ===================================================
          LOADING
      =================================================== */}

      {loadingCells && (
        <div className="loading-card">
          <div className="loading-spinner"></div>

          <div>
            <strong>
              Finding nearby cellular cells...
            </strong>

            <p>
              Fetching OpenCelliD data and checking
              your nearest cell.
            </p>
          </div>
        </div>
      )}

      {/* ===================================================
          MAP
      =================================================== */}

      <section className="map-section">
        <div className="section-heading">
          <div>
            <span className="card-label">
              LIVE MAP
            </span>

            <h2>Nearby Cellular Network</h2>
          </div>

          {cells.length > 0 && (
            <span className="cell-count">
              {cells.length} cells found
            </span>
          )}
        </div>

        <div className="map-wrapper">
          <MapContainer
            center={mapCenter}
            zoom={MAP_ZOOM}
            scrollWheelZoom={true}
            className="map"
          >
            <MapUpdater location={location} />

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* =============================================
                USER LOCATION
            ============================================= */}

            {location && (
              <CircleMarker
                center={[
                  location.latitude,
                  location.longitude,
                ]}
                radius={10}
                pathOptions={{
                  color: "#1E3A5F",
                  fillColor: "#3B82F6",
                  fillOpacity: 1,
                  weight: 3,
                }}
              >
                <Popup>
                  <strong>Your Location</strong>

                  <br />

                  {location.latitude.toFixed(6)},{" "}
                  {location.longitude.toFixed(6)}
                </Popup>
              </CircleMarker>
            )}

            {/* =============================================
                ALL OPENCELLID CELLS
            ============================================= */}

            {cells.map((cell, index) => {
              const latitude = Number(
                cell.latitude
              );

              const longitude = Number(
                cell.longitude
              );

              if (
                !isValidCoordinate(
                  latitude,
                  longitude
                )
              ) {
                return null;
              }

              const isNearest =
                nearestCell &&
                String(
                  nearestCell.cell_id
                ) ===
                  String(cell.cell_id);

              return (
                <CircleMarker
                  key={`${cell.cell_id}-${index}`}
                  center={[
                    latitude,
                    longitude,
                  ]}
                  radius={isNearest ? 9 : 6}
                  pathOptions={{
                    color: isNearest
                      ? "#DC2626"
                      : "#16A34A",

                    fillColor: isNearest
                      ? "#EF4444"
                      : "#22C55E",

                    fillOpacity: 0.8,

                    weight: isNearest ? 3 : 2,
                  }}
                >
                  <Popup>
                    <strong>
                      {isNearest
                        ? "Nearest Cell"
                        : "OpenCelliD Cell"}
                    </strong>

                    <br />

                    Cell ID:{" "}
                    {cell.cell_id ?? "N/A"}

                    <br />

                    Radio:{" "}
                    {cell.radio ?? "N/A"}

                    <br />

                    MCC:{" "}
                    {cell.mcc ?? "N/A"}

                    <br />

                    MNC:{" "}
                    {cell.mnc ?? "N/A"}

                    <br />

                    LAC:{" "}
                    {cell.lac ?? "N/A"}

                    <br />

                    Coordinates:{" "}
                    {latitude.toFixed(6)},{" "}
                    {longitude.toFixed(6)}
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* =============================================
                ACTUAL ROAD ROUTE
            ============================================= */}

            {route.length > 1 && (
              <Polyline
                positions={route}
                pathOptions={{
                  color: "#2563EB",
                  weight: 6,
                  opacity: 0.9,
                }}
              />
            )}

            {/* =============================================
                ROAD SNAP POINT - USER
            ============================================= */}

            {routeInfo?.userRoadPoint && (
              <CircleMarker
                center={
                  routeInfo.userRoadPoint
                }
                radius={4}
                pathOptions={{
                  color: "#1D4ED8",
                  fillColor: "#60A5FA",
                  fillOpacity: 1,
                  weight: 2,
                }}
              >
                <Popup>
                  Road starting point
                </Popup>
              </CircleMarker>
            )}

            {/* =============================================
                ROAD SNAP POINT - CELL
            ============================================= */}

            {routeInfo?.cellRoadPoint && (
              <CircleMarker
                center={
                  routeInfo.cellRoadPoint
                }
                radius={4}
                pathOptions={{
                  color: "#B91C1C",
                  fillColor: "#F87171",
                  fillOpacity: 1,
                  weight: 2,
                }}
              >
                <Popup>
                  Road destination point
                </Popup>
              </CircleMarker>
            )}
          </MapContainer>
        </div>
      </section>

      {/* ===================================================
          ROUTE STATUS
      =================================================== */}

      {nearestCell && (
        <section className="info-card route-card">
          <span className="card-label">
            ROAD ROUTE
          </span>

          <h2>
            Route to Nearest Cell
          </h2>

          {routeLoading && (
            <div className="route-status">
              <div className="loading-spinner"></div>

              <p>
                Finding the nearest roads and
                calculating a realistic driving route...
              </p>
            </div>
          )}

          {!routeLoading &&
            route.length > 1 &&
            routeInfo && (
              <div className="route-details">
                <div className="route-stat">
                  <span>Road distance</span>

                  <strong>
                    {routeInfo.distance.toFixed(2)} km
                  </strong>
                </div>

                <div className="route-stat">
                  <span>Estimated driving time</span>

                  <strong>
                    {routeInfo.duration < 1
                      ? "< 1 min"
                      : `${Math.round(
                          routeInfo.duration
                        )} min`}
                  </strong>
                </div>
              </div>
            )}

          {!routeLoading &&
            route.length === 0 && (
              <p className="muted-text">
                A road route could not be calculated
                for this cell. The cell coordinate may
                be too far from a drivable road.
              </p>
            )}
        </section>
      )}

      {/* ===================================================
          NEAREST CELL
      =================================================== */}

      {nearestCell && (
        <section className="info-card nearest-card">
          <span className="card-label">
            NEAREST CELL
          </span>

          <h2>Closest OpenCelliD Cell</h2>

          <div className="cell-details">
            <div>
              <span>Cell ID</span>

              <strong>
                {nearestCell.cell_id ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>Distance</span>

              <strong>
                {nearestCell.distance.toFixed(
                  2
                )}{" "}
                km
              </strong>
            </div>

            <div>
              <span>Radio</span>

              <strong>
                {nearestCell.radio ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>MCC</span>

              <strong>
                {nearestCell.mcc ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>MNC</span>

              <strong>
                {nearestCell.mnc ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>LAC</span>

              <strong>
                {nearestCell.lac ??
                  "Unknown"}
              </strong>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          ALL CELLS
      =================================================== */}

      {cells.length > 0 && (
        <section className="info-card cells-card">
          <div className="section-heading">
            <div>
              <span className="card-label">
                OPENCELLID
              </span>

              <h2>
                Nearby Cells
              </h2>
            </div>

            <span className="cell-count">
              {cells.length}
            </span>
          </div>

          <div className="cells-list">
            {cells.map((cell, index) => {
              const distance = location
                ? calculateDistance(
                    location.latitude,
                    location.longitude,
                    cell.latitude,
                    cell.longitude
                  )
                : null;

              const isNearest =
                nearestCell &&
                String(
                  nearestCell.cell_id
                ) ===
                  String(cell.cell_id);

              return (
                <div
                  className={`cell-row ${
                    isNearest
                      ? "nearest-row"
                      : ""
                  }`}
                  key={`${cell.cell_id}-${index}`}
                >
                  <div className="cell-main">
                    <strong>
                      Cell{" "}
                      {cell.cell_id ??
                        "Unknown"}
                    </strong>

                    {isNearest && (
                      <span className="nearest-badge">
                        NEAREST
                      </span>
                    )}
                  </div>

                  <div className="cell-meta">
                    <span>
                      {cell.radio ??
                        "Unknown"}
                    </span>

                    <span>
                      {cell.latitude.toFixed(
                        5
                      )}
                      ,{" "}
                      {cell.longitude.toFixed(
                        5
                      )}
                    </span>

                    {distance !== null && (
                      <span>
                        {distance.toFixed(
                          2
                        )}{" "}
                        km
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===================================================
          DATABASE STATUS
      =================================================== */}

      <section className="info-card database-card">
        <span className="card-label">
          DATA SOURCE
        </span>

        <h2>OpenCelliD + Local PostgreSQL</h2>

        <p>
          Cell information is retrieved through
          your local backend and stored in your
          PostgreSQL database.
        </p>

        <div className="status-row">
          <span className="status-dot"></span>

          <span>
            Backend: localhost:3000
          </span>
        </div>

        <div className="status-row">
          <span className="status-dot"></span>

          <span>
            OpenCelliD data available
          </span>
        </div>
      </section>

      {/* ===================================================
          ROUTING INFORMATION
      =================================================== */}

      <section className="info-card source-card">
        <span className="card-label">
          ROUTING
        </span>

        <h2>How the route works</h2>

        <p>
          The map first finds the nearest
          drivable road to your location and the
          nearest drivable road to the selected
          cell. It then calculates a road-based
          route between those two points.
        </p>

        <p className="muted-text">
          The blue line represents a driving-road
          route. The cell coordinate itself may
          not be located directly on a road.
        </p>
      </section>
    </div>
  );
}

export default App;