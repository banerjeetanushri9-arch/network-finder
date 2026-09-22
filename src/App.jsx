// // // // import { useEffect, useState } from "react";
// // // // import "./App.css";

// // // // import {
// // // //   MapContainer,
// // // //   TileLayer,
// // // //   CircleMarker,
// // // //   Popup,
// // // //   Polyline,
// // // // } from "react-leaflet";

// // // // import "leaflet/dist/leaflet.css";

// // // // function App() {
// // // //   const [location, setLocation] = useState(null);
// // // //   const [towers, setTowers] = useState([]);
// // // //   const [error, setError] = useState("");

// // // //   // ==========================================
// // // //   // CALCULATE DISTANCE
// // // //   // ==========================================

// // // //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// // // //     const R = 6371;

// // // //     const dLat = ((lat2 - lat1) * Math.PI) / 180;
// // // //     const dLon = ((lon2 - lon1) * Math.PI) / 180;

// // // //     const a =
// // // //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // // //       Math.cos((lat1 * Math.PI) / 180) *
// // // //         Math.cos((lat2 * Math.PI) / 180) *
// // // //         Math.sin(dLon / 2) *
// // // //         Math.sin(dLon / 2);

// // // //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// // // //     return R * c;
// // // //   };

// // // //   // ==========================================
// // // //   // GET USER LOCATION
// // // //   // ==========================================

// // // //   const getLocation = () => {
// // // //     setError("");

// // // //     if (!navigator.geolocation) {
// // // //       setError("Geolocation is not supported by your browser.");
// // // //       return;
// // // //     }

// // // //     navigator.geolocation.getCurrentPosition(
// // // //       (position) => {
// // // //         setLocation({
// // // //           latitude: position.coords.latitude,
// // // //           longitude: position.coords.longitude,
// // // //         });
// // // //       },
// // // //       (error) => {
// // // //         console.log(error);
// // // //         setError("Unable to get your location.");
// // // //       }
// // // //     );
// // // //   };

// // // //   // ==========================================
// // // //   // GET TOWERS FROM BACKEND
// // // //   // ==========================================

// // // //   const getTowers = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:3000/api/towers");

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to fetch towers");
// // // //       }

// // // //       const data = await response.json();

// // // //       if (!Array.isArray(data)) {
// // // //         throw new Error("Tower data is not an array");
// // // //       }

// // // //       setTowers(data);
// // // //     } catch (error) {
// // // //       console.log(error);
// // // //       setError("Unable to fetch tower data.");
// // // //     }
// // // //   };

// // // //   // ==========================================
// // // //   // FETCH TOWERS WHEN PAGE LOADS
// // // //   // ==========================================

// // // //   useEffect(() => {
// // // //     getTowers();
// // // //   }, []);

// // // //   // ==========================================
// // // //   // FIND NEAREST TOWER
// // // //   // ==========================================

// // // //   let nearestTower = null;

// // // //   if (location && towers.length > 0) {
// // // //     let shortestDistance = Infinity;

// // // //     towers.forEach((tower) => {
// // // //       const distance = calculateDistance(
// // // //         location.latitude,
// // // //         location.longitude,
// // // //         Number(tower.latitude),
// // // //         Number(tower.longitude)
// // // //       );

// // // //       if (distance < shortestDistance) {
// // // //         shortestDistance = distance;

// // // //         nearestTower = {
// // // //           ...tower,
// // // //           distance: distance,
// // // //         };
// // // //       }
// // // //     });
// // // //   }

// // // //   // ==========================================
// // // //   // UI
// // // //   // ==========================================

// // // //   return (
// // // //     <div className="app">
// // // //       <div className="container">

// // // //         {/* HEADER */}

// // // //         <h1>Network Finder</h1>

// // // //         <p className="subtitle">
// // // //           Find nearby cellular towers
// // // //         </p>

// // // //         {/* ==================================
// // // //             USER LOCATION
// // // //         ================================== */}

// // // //         <div className="card">

// // // //           <h2>📍 Your Location</h2>

// // // //           {location ? (
// // // //             <div>

// // // //               <p>
// // // //                 <span>Latitude</span>

// // // //                 <strong>
// // // //                   {location.latitude.toFixed(7)}
// // // //                 </strong>
// // // //               </p>

// // // //               <p>
// // // //                 <span>Longitude</span>

// // // //                 <strong>
// // // //                   {location.longitude.toFixed(7)}
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

// // // //           <button onClick={getLocation}>
// // // //             Get My Location
// // // //           </button>

// // // //         </div>

// // // //         {/* ==================================
// // // //             MAP
// // // //         ================================== */}

// // // //         {location && (
// // // //           <div className="card">

// // // //             <h2>🗺️ Tower Map</h2>

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

// // // //               {/* MAP */}

// // // //               <TileLayer
// // // //                 attribution="&copy; OpenStreetMap contributors"
// // // //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // // //               />

// // // //               {/* ==================================
// // // //                   USER LOCATION
// // // //               ================================== */}

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
// // // //                   {location.latitude.toFixed(7)}

// // // //                   <br />

// // // //                   Longitude:{" "}
// // // //                   {location.longitude.toFixed(7)}

// // // //                 </Popup>

// // // //               </CircleMarker>

// // // //               {/* ==================================
// // // //                   TOWER LOCATIONS
// // // //               ================================== */}

// // // //               {towers.map((tower) => {

// // // //                 const towerLat =
// // // //                   Number(tower.latitude);

// // // //                 const towerLon =
// // // //                   Number(tower.longitude);

// // // //                 const distance =
// // // //                   calculateDistance(
// // // //                     location.latitude,
// // // //                     location.longitude,
// // // //                     towerLat,
// // // //                     towerLon
// // // //                   );

// // // //                 return (
// // // //                   <CircleMarker
// // // //                     key={tower.tower_id}
// // // //                     center={[
// // // //                       towerLat,
// // // //                       towerLon,
// // // //                     ]}
// // // //                     radius={8}
// // // //                   >

// // // //                     <Popup>

// // // //                       <strong>
// // // //                         Tower {tower.tower_id}
// // // //                       </strong>

// // // //                       <br />

// // // //                       Operator:{" "}
// // // //                       {tower.operator}

// // // //                       <br />

// // // //                       Technology:{" "}
// // // //                       {tower.technology}

// // // //                       <br />

// // // //                       Distance:{" "}
// // // //                       {distance.toFixed(2)} km

// // // //                     </Popup>

// // // //                   </CircleMarker>
// // // //                 );
// // // //               })}

// // // //               {/* ==================================
// // // //                   LINE TO NEAREST TOWER
// // // //               ================================== */}

// // // //               {nearestTower && (

// // // //                 <Polyline
// // // //                   positions={[
// // // //                     [
// // // //                       location.latitude,
// // // //                       location.longitude,
// // // //                     ],

// // // //                     [
// // // //                       Number(nearestTower.latitude),
// // // //                       Number(nearestTower.longitude),
// // // //                     ],
// // // //                   ]}
// // // //                   pathOptions={{
// // // //                     color: "#1e3a5f",
// // // //                     weight: 4,
// // // //                   }}
// // // //                 />

// // // //               )}

// // // //             </MapContainer>

// // // //           </div>
// // // //         )}

// // // //         {/* ==================================
// // // //             NEAREST TOWER
// // // //         ================================== */}

// // // //         {nearestTower && (

// // // //           <div className="card nearest">

// // // //             <h2>🎯 Nearest Tower</h2>

// // // //             <h3>
// // // //               Tower {nearestTower.tower_id}
// // // //             </h3>

// // // //             <p>
// // // //               <span>Operator</span>

// // // //               <strong>
// // // //                 {nearestTower.operator}
// // // //               </strong>
// // // //             </p>

// // // //             <p>
// // // //               <span>Technology</span>

// // // //               <strong>
// // // //                 {nearestTower.technology}
// // // //               </strong>
// // // //             </p>

// // // //             <p>
// // // //               <span>Distance</span>

// // // //               <strong>
// // // //                 {nearestTower.distance.toFixed(2)} km
// // // //               </strong>
// // // //             </p>

// // // //           </div>

// // // //         )}

// // // //         {/* ==================================
// // // //             ALL TOWERS
// // // //         ================================== */}

// // // //         <div className="card">

// // // //           <h2>📡 Stored Towers</h2>

// // // //           {towers.length === 0 ? (

// // // //             <p className="placeholder">
// // // //               No towers found.
// // // //             </p>

// // // //           ) : (

// // // //             towers.map((tower) => {

// // // //               let distance = null;

// // // //               if (location) {

// // // //                 distance =
// // // //                   calculateDistance(
// // // //                     location.latitude,
// // // //                     location.longitude,
// // // //                     Number(tower.latitude),
// // // //                     Number(tower.longitude)
// // // //                   );

// // // //               }

// // // //               return (

// // // //                 <div
// // // //                   className="tower"
// // // //                   key={tower.tower_id}
// // // //                 >

// // // //                   <div>

// // // //                     <strong>
// // // //                       Tower {tower.tower_id}
// // // //                     </strong>

// // // //                     <p>
// // // //                       {tower.operator} ·{" "}
// // // //                       {tower.technology}
// // // //                     </p>

// // // //                   </div>

// // // //                   <div>

// // // //                     <p>
// // // //                       {Number(
// // // //                         tower.latitude
// // // //                       ).toFixed(7)}
// // // //                     </p>

// // // //                     <p>
// // // //                       {Number(
// // // //                         tower.longitude
// // // //                       ).toFixed(7)}
// // // //                     </p>

// // // //                     {distance !== null && (

// // // //                       <p>
// // // //                         📏{" "}
// // // //                         {distance.toFixed(2)} km
// // // //                       </p>

// // // //                     )}

// // // //                   </div>

// // // //                 </div>

// // // //               );

// // // //             })

// // // //           )}

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

// // // function calculateDistance(
// // //   lat1,
// // //   lon1,
// // //   lat2,
// // //   lon2
// // // ) {

// // //   const R = 6371;

// // //   const dLat =
// // //     ((lat2 - lat1) * Math.PI) / 180;

// // //   const dLon =
// // //     ((lon2 - lon1) * Math.PI) / 180;


// // //   const a =
// // //     Math.sin(dLat / 2) ** 2 +

// // //     Math.cos(
// // //       (lat1 * Math.PI) / 180
// // //     ) *

// // //     Math.cos(
// // //       (lat2 * Math.PI) / 180
// // //     ) *

// // //     Math.sin(dLon / 2) ** 2;


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

// // //         setLocation({

// // //           latitude:
// // //             position.coords.latitude,

// // //           longitude:
// // //             position.coords.longitude,

// // //         });

// // //       },


// // //       (err) => {

// // //         console.error(err);

// // //         setError(
// // //           "Unable to get your location."
// // //         );

// // //       },


// // //       {
// // //         enableHighAccuracy: true,
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


// // //         const response =
// // //           await fetch(url);


// // //         const data =
// // //           await response.json();


// // //         console.log(
// // //           "OpenCelliD data:",
// // //           data
// // //         );


// // //         if (!response.ok) {

// // //           throw new Error(
// // //             data.error ||
// // //             "Failed to fetch OpenCelliD data"
// // //           );

// // //         }


// // //         if (
// // //           !data.cells ||
// // //           !Array.isArray(data.cells)
// // //         ) {

// // //           throw new Error(
// // //             "Invalid data received from OpenCelliD"
// // //           );

// // //         }


// // //         setCells(data.cells);


// // //       } catch (err) {

// // //         console.error(err);

// // //         setError(
// // //           err.message ||
// // //           "Unable to fetch nearby cells."
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

// // //     let shortestDistance =
// // //       Infinity;


// // //     cells.forEach((cell) => {

// // //       const distance =
// // //         calculateDistance(

// // //           location.latitude,

// // //           location.longitude,

// // //           Number(cell.latitude),

// // //           Number(cell.longitude)

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
// // //                   {location.latitude.toFixed(7)}
// // //                 </strong>

// // //               </p>


// // //               <p>

// // //                 <span>
// // //                   Longitude
// // //                 </span>

// // //                 <strong>
// // //                   {location.longitude.toFixed(7)}
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



// // //           <button onClick={getLocation}>
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


// // //               {/* =================================
// // //                   MAP TILES
// // //               ================================= */}

// // //               <TileLayer

// // //                 attribution=
// // //                   "&copy; OpenStreetMap contributors"

// // //                 url=
// // //                   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

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

// // //                   Latitude:

// // //                   {" "}

// // //                   {location.latitude.toFixed(7)}

// // //                   <br />

// // //                   Longitude:

// // //                   {" "}

// // //                   {location.longitude.toFixed(7)}

// // //                 </Popup>

// // //               </CircleMarker>



// // //               {/* =================================
// // //                   OPENCELLID CELLS
// // //               ================================= */}

// // //               {cells.map((cell, index) => (

// // //                 <CircleMarker

// // //                   key={
// // //                     `${cell.cell_id}-${index}`
// // //                   }

// // //                   center={[
// // //                     Number(cell.latitude),
// // //                     Number(cell.longitude),
// // //                   ]}

// // //                   radius={8}

// // //                 >

// // //                   <Popup>

// // //                     <strong>
// // //                       Cell{" "}
// // //                       {cell.cell_id}
// // //                     </strong>


// // //                     <br />

// // //                     MCC:
// // //                     {" "}
// // //                     {cell.mcc}


// // //                     <br />

// // //                     MNC:
// // //                     {" "}
// // //                     {cell.mnc}


// // //                     <br />

// // //                     LAC/TAC:
// // //                     {" "}
// // //                     {cell.lac}


// // //                     <br />

// // //                     Radio:
// // //                     {" "}
// // //                     {cell.radio || "Unknown"}


// // //                     <br />

// // //                     Range:
// // //                     {" "}
// // //                     {cell.range
// // //                       ? `${cell.range} m`
// // //                       : "N/A"}


// // //                     <br />

// // //                     Distance:
// // //                     {" "}

// // //                     {location

// // //                       ? calculateDistance(

// // //                           location.latitude,

// // //                           location.longitude,

// // //                           Number(
// // //                             cell.latitude
// // //                           ),

// // //                           Number(
// // //                             cell.longitude
// // //                           )

// // //                         ).toFixed(2)

// // //                       : "--"}

// // //                     {" "}km

// // //                   </Popup>

// // //                 </CircleMarker>

// // //               ))}



// // //               {/* =================================
// // //                   LINE TO NEAREST CELL
// // //               ================================= */}

// // //               {nearestCell && (

// // //                 <Polyline

// // //                   positions={[

// // //                     [
// // //                       location.latitude,
// // //                       location.longitude,
// // //                     ],


// // //                     [
// // //                       Number(
// // //                         nearestCell.latitude
// // //                       ),

// // //                       Number(
// // //                         nearestCell.longitude
// // //                       ),

// // //                     ],

// // //                   ]}


// // //                   pathOptions={{
// // //                     color: "#1e3a5f",
// // //                     weight: 4,
// // //                   }}

// // //                 />

// // //               )}

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
// // //                 Distance
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.distance.toFixed(2)}
// // //                 {" "}km
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

// // //             cells.map((cell, index) => {

// // //               const distance =
// // //                 location

// // //                   ? calculateDistance(

// // //                       location.latitude,

// // //                       location.longitude,

// // //                       Number(
// // //                         cell.latitude
// // //                       ),

// // //                       Number(
// // //                         cell.longitude
// // //                       )

// // //                     )

// // //                   : null;


// // //               return (

// // //                 <div
// // //                   className="tower"
// // //                   key={
// // //                     `${cell.cell_id}-${index}`
// // //                   }
// // //                 >

// // //                   <div>

// // //                     <strong>
// // //                       Cell{" "}
// // //                       {cell.cell_id}
// // //                     </strong>


// // //                     <p>
// // //                       MCC {cell.mcc}
// // //                       {" · "}
// // //                       MNC {cell.mnc}
// // //                     </p>


// // //                     <p>
// // //                       {cell.radio ||
// // //                         "Unknown radio"}
// // //                     </p>

// // //                   </div>


// // //                   <div>

// // //                     <p>
// // //                       {Number(
// // //                         cell.latitude
// // //                       ).toFixed(4)}
// // //                     </p>


// // //                     <p>
// // //                       {Number(
// // //                         cell.longitude
// // //                       ).toFixed(4)}
// // //                     </p>


// // //                     {distance !== null && (

// // //                       <p>

// // //                         📏{" "}

// // //                         {distance.toFixed(2)}

// // //                         {" "}km

// // //                       </p>

// // //                     )}

// // //                   </div>

// // //                 </div>

// // //               );

// // //             })

// // //           )}

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
// // VALIDATE CELL COORDINATES
// // ========================================

// // OpenCelliD can sometimes return records
// // without valid latitude/longitude values.

// // Leaflet cannot accept NaN coordinates.

// // This function makes sure only valid
// // coordinates reach CircleMarker/Polyline.
// // ========================================
// // */

// // function getValidCoordinates(cell) {
// //   const latitude = Number(cell?.latitude);
// //   const longitude = Number(cell?.longitude);

// //   if (
// //     !Number.isFinite(latitude) ||
// //     !Number.isFinite(longitude)
// //   ) {
// //     return null;
// //   }

// //   if (
// //     latitude < -90 ||
// //     latitude > 90 ||
// //     longitude < -180 ||
// //     longitude > 180
// //   ) {
// //     return null;
// //   }

// //   return [latitude, longitude];
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
// //         const latitude =
// //           Number(position.coords.latitude);

// //         const longitude =
// //           Number(position.coords.longitude);

// //         if (
// //           !Number.isFinite(latitude) ||
// //           !Number.isFinite(longitude)
// //         ) {
// //           setError(
// //             "Invalid location received from your browser."
// //           );

// //           return;
// //         }

// //         setLocation({
// //           latitude,
// //           longitude,
// //         });
// //       },

// //       (err) => {
// //         console.error(err);

// //         setError(
// //           "Unable to get your location."
// //         );
// //       },

// //       {
// //         enableHighAccuracy: true,
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
// //               "Failed to fetch OpenCelliD data"
// //           );
// //         }

// //         if (
// //           !data.cells ||
// //           !Array.isArray(data.cells)
// //         ) {
// //           throw new Error(
// //             "Invalid data received from OpenCelliD"
// //           );
// //         }

// //         /*
// //         ----------------------------------
// //         FILTER INVALID CELLS
// //         ----------------------------------
// //         */

// //         const validCells =
// //           data.cells.filter((cell) => {
// //             const coordinates =
// //               getValidCoordinates(cell);

// //             if (!coordinates) {
// //               console.warn(
// //                 "Skipping cell with invalid coordinates:",
// //                 cell
// //               );

// //               return false;
// //             }

// //             return true;
// //           });

// //         console.log(
// //           "Valid OpenCelliD cells:",
// //           validCells
// //         );

// //         console.log(
// //           "Invalid cells removed:",
// //           data.cells.length -
// //             validCells.length
// //         );

// //         setCells(validCells);
// //       } catch (err) {
// //         console.error(err);

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
// //       const coordinates =
// //         getValidCoordinates(cell);

// //       /*
// //       Ignore invalid coordinates.
// //       */

// //       if (!coordinates) {
// //         console.warn(
// //           "Skipping invalid cell while calculating nearest:",
// //           cell
// //         );

// //         return;
// //       }

// //       const [
// //         latitude,
// //         longitude,
// //       ] = coordinates;

// //       const distance =
// //         calculateDistance(
// //           location.latitude,
// //           location.longitude,
// //           latitude,
// //           longitude
// //         );

// //       if (
// //         Number.isFinite(distance) &&
// //         distance < shortestDistance
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

// //           <button onClick={getLocation}>
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
// //                   const coordinates =
// //                     getValidCoordinates(
// //                       cell
// //                     );

// //                   /*
// //                   Safety check.

// //                   This should normally never
// //                   happen because invalid cells
// //                   were already filtered after
// //                   the API response.
// //                   */

// //                   if (!coordinates) {
// //                     console.warn(
// //                       "Skipping invalid map cell:",
// //                       cell
// //                     );

// //                     return null;
// //                   }

// //                   const [
// //                     latitude,
// //                     longitude,
// //                   ] = coordinates;

// //                   const distance =
// //                     calculateDistance(
// //                       location.latitude,
// //                       location.longitude,
// //                       latitude,
// //                       longitude
// //                     );

// //                   return (
// //                     <CircleMarker
// //                       key={`${cell.cell_id}-${index}`}
// //                       center={coordinates}
// //                       radius={8}
// //                     >

// //                       <Popup>

// //                         <strong>
// //                           Cell{" "}
// //                           {cell.cell_id}
// //                         </strong>

// //                         <br />

// //                         MCC:
// //                         {" "}
// //                         {cell.mcc}

// //                         <br />

// //                         MNC:
// //                         {" "}
// //                         {cell.mnc}

// //                         <br />

// //                         LAC/TAC:
// //                         {" "}
// //                         {cell.lac}

// //                         <br />

// //                         Radio:
// //                         {" "}
// //                         {cell.radio ||
// //                           "Unknown"}

// //                         <br />

// //                         Range:
// //                         {" "}

// //                         {cell.range
// //                           ? `${cell.range} m`
// //                           : "N/A"}

// //                         <br />

// //                         Distance:
// //                         {" "}

// //                         {Number.isFinite(
// //                           distance
// //                         )
// //                           ? distance.toFixed(
// //                               2
// //                             )
// //                           : "--"}

// //                         {" "}km

// //                       </Popup>

// //                     </CircleMarker>
// //                   );
// //                 }
// //               )}

// //               {/* =================================
// //                   LINE TO NEAREST CELL
// //               ================================= */}

// //               {nearestCell &&
// //                 (() => {
// //                   const coordinates =
// //                     getValidCoordinates(
// //                       nearestCell
// //                     );

// //                   if (!coordinates) {
// //                     return null;
// //                   }

// //                   return (
// //                     <Polyline
// //                       positions={[
// //                         [
// //                           location.latitude,
// //                           location.longitude,
// //                         ],

// //                         coordinates,
// //                       ]}
// //                       pathOptions={{
// //                         color:
// //                           "#1e3a5f",
// //                         weight: 4,
// //                       }}
// //                     />
// //                   );
// //                 })()}

// //             </MapContainer>

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
// //                 {Number.isFinite(
// //                   nearestCell.distance
// //                 )
// //                   ? nearestCell.distance.toFixed(
// //                       2
// //                     )
// //                   : "--"}

// //                 {" "}km
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

// //                 const coordinates =
// //                   getValidCoordinates(
// //                     cell
// //                   );

// //                 if (!coordinates) {
// //                   return null;
// //                 }

// //                 const [
// //                   latitude,
// //                   longitude,
// //                 ] = coordinates;

// //                 const distance =
// //                   location
// //                     ? calculateDistance(
// //                         location.latitude,
// //                         location.longitude,
// //                         latitude,
// //                         longitude
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
// //                         {latitude.toFixed(
// //                           4
// //                         )}
// //                       </p>

// //                       <p>
// //                         {longitude.toFixed(
// //                           4
// //                         )}
// //                       </p>

// //                       {distance !== null &&
// //                         Number.isFinite(
// //                           distance
// //                         ) && (

// //                         <p>
// //                           📏{" "}
// //                           {distance.toFixed(
// //                             2
// //                           )}
// //                           {" "}km
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
// //             DATA SOURCE
// //         ================================= */}

// //         <div className="card">

// //           <p className="placeholder">
// //             Cell data provided by
// //             OpenCelliD.
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
// } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import "./App.css";


// /*
// ========================================
// CALCULATE DISTANCE
// ========================================
// */

// function calculateDistance(
//   lat1,
//   lon1,
//   lat2,
//   lon2
// ) {
//   const R = 6371;

//   const dLat =
//     ((lat2 - lat1) * Math.PI) / 180;

//   const dLon =
//     ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(
//       (lat1 * Math.PI) / 180
//     ) *
//       Math.cos(
//         (lat2 * Math.PI) / 180
//       ) *
//       Math.sin(dLon / 2) ** 2;

//   const c =
//     2 *
//     Math.atan2(
//       Math.sqrt(a),
//       Math.sqrt(1 - a)
//     );

//   return R * c;
// }


// /*
// ========================================
// VALIDATE COORDINATES
// ========================================
// */

// function getValidCoordinates(cell) {
//   const latitude = Number(
//     cell?.latitude
//   );

//   const longitude = Number(
//     cell?.longitude
//   );

//   if (
//     !Number.isFinite(latitude) ||
//     !Number.isFinite(longitude)
//   ) {
//     return null;
//   }

//   if (
//     latitude < -90 ||
//     latitude > 90 ||
//     longitude < -180 ||
//     longitude > 180
//   ) {
//     return null;
//   }

//   return [latitude, longitude];
// }


// /*
// ========================================
// APP
// ========================================
// */

// function App() {

//   /*
//   ======================================
//   STATES
//   ======================================
//   */

//   const [location, setLocation] =
//     useState(null);

//   const [cells, setCells] =
//     useState([]);

//   const [nearestCell, setNearestCell] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");


//   /*
//   ======================================
//   GET USER LOCATION
//   ======================================
//   */

//   const getLocation = () => {

//     setError("");

//     if (!navigator.geolocation) {

//       setError(
//         "Geolocation is not supported by your browser."
//       );

//       return;
//     }

//     navigator.geolocation.getCurrentPosition(

//       (position) => {

//         const latitude =
//           Number(
//             position.coords.latitude
//           );

//         const longitude =
//           Number(
//             position.coords.longitude
//           );

//         if (
//           !Number.isFinite(latitude) ||
//           !Number.isFinite(longitude)
//         ) {

//           setError(
//             "Invalid location received."
//           );

//           return;
//         }

//         setLocation({
//           latitude,
//           longitude,
//         });

//       },

//       (err) => {

//         console.error(
//           "Location error:",
//           err
//         );

//         setError(
//           "Unable to get your location. Please allow location access."
//         );

//       },

//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }

//     );
//   };


//   /*
//   ======================================
//   FETCH OPENCELLID CELLS
//   ======================================
//   */

//   useEffect(() => {

//     if (!location) {
//       return;
//     }

//     const getCells = async () => {

//       try {

//         setLoading(true);

//         setError("");

//         const url =
//           `http://localhost:3000/api/opencellid` +
//           `?lat=${location.latitude}` +
//           `&lng=${location.longitude}`;

//         console.log(
//           "Fetching OpenCelliD:",
//           url
//         );

//         const response =
//           await fetch(url);

//         const data =
//           await response.json();

//         console.log(
//           "OpenCelliD data:",
//           data
//         );


//         /*
//         ==================================
//         CHECK RESPONSE
//         ==================================
//         */

//         if (!response.ok) {

//           throw new Error(
//             data.error ||
//               "Failed to fetch OpenCelliD data"
//           );

//         }


//         if (
//           !data.cells ||
//           !Array.isArray(data.cells)
//         ) {

//           throw new Error(
//             "Invalid data received from OpenCelliD"
//           );

//         }


//         /*
//         ==================================
//         IMPORTANT:
//         OPENCELLID USES lat / lon

//         Convert them into:
//         latitude / longitude
//         ==================================
//         */

//         const cleanedCells =
//           data.cells

//             .map((cell) => {

//               const latitude =
//                 Number(cell.lat);

//               const longitude =
//                 Number(cell.lon);

//               return {
//                 ...cell,

//                 latitude,
//                 longitude,
//               };

//             })

//             .filter((cell) => {

//               return (
//                 Number.isFinite(
//                   cell.latitude
//                 ) &&
//                 Number.isFinite(
//                   cell.longitude
//                 ) &&
//                 cell.latitude >= -90 &&
//                 cell.latitude <= 90 &&
//                 cell.longitude >= -180 &&
//                 cell.longitude <= 180
//               );

//             });


//         console.log(
//           "Cleaned OpenCelliD cells:",
//           cleanedCells
//         );


//         /*
//         ==================================
//         SAVE CLEANED CELLS
//         ==================================
//         */

//         setCells(
//           cleanedCells
//         );

//       }

//       catch (err) {

//         console.error(
//           "OpenCelliD error:",
//           err
//         );

//         setError(
//           err.message ||
//             "Unable to fetch nearby cells."
//         );

//         setCells([]);

//       }

//       finally {

//         setLoading(false);

//       }

//     };


//     getCells();

//   }, [location]);


//   /*
//   ======================================
//   FIND NEAREST CELL
//   ======================================
//   */

//   useEffect(() => {

//     if (
//       !location ||
//       cells.length === 0
//     ) {

//       setNearestCell(null);

//       return;
//     }


//     let nearest = null;

//     let shortestDistance =
//       Infinity;


//     cells.forEach((cell) => {

//       const coordinates =
//         getValidCoordinates(
//           cell
//         );


//       /*
//       Skip invalid cells
//       */

//       if (!coordinates) {

//         return;
//       }


//       const [
//         latitude,
//         longitude,
//       ] = coordinates;


//       const distance =
//         calculateDistance(

//           location.latitude,

//           location.longitude,

//           latitude,

//           longitude

//         );


//       if (
//         distance <
//         shortestDistance
//       ) {

//         shortestDistance =
//           distance;


//         nearest = {

//           ...cell,

//           distance,

//         };

//       }

//     });


//     setNearestCell(
//       nearest
//     );

//   }, [
//     location,
//     cells,
//   ]);


//   /*
//   ======================================
//   RETURN UI
//   ======================================
//   */

//   return (

//     <div className="app">

//       <div className="container">


//         {/* =================================
//             HEADER
//         ================================= */}

//         <h1>
//           Network Finder
//         </h1>

//         <p className="subtitle">
//           Find nearby cellular cells
//         </p>


//         {/* =================================
//             LOCATION CARD
//         ================================= */}

//         <div className="card">

//           <h2>
//             📍 Your Location
//           </h2>


//           {location ? (

//             <div>

//               <p>

//                 <span>
//                   Latitude
//                 </span>

//                 <strong>
//                   {location.latitude.toFixed(
//                     7
//                   )}
//                 </strong>

//               </p>


//               <p>

//                 <span>
//                   Longitude
//                 </span>

//                 <strong>
//                   {location.longitude.toFixed(
//                     7
//                   )}
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


//           <button
//             onClick={getLocation}
//           >
//             Get My Location
//           </button>

//         </div>


//         {/* =================================
//             LOADING
//         ================================= */}

//         {loading && (

//           <div className="card">

//             <p>
//               🔄 Searching nearby cells...
//             </p>

//           </div>

//         )}


//         {/* =================================
//             MAP
//         ================================= */}

//         {location && (

//           <div className="card">

//             <h2>
//               🗺️ Cell Map
//             </h2>


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

//               {/* =================================
//                   MAP TILES
//               ================================= */}

//               <TileLayer

//                 attribution="&copy; OpenStreetMap contributors"

//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

//               />


//               {/* =================================
//                   USER LOCATION
//               ================================= */}

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

//                   {location.latitude.toFixed(
//                     7
//                   )}

//                   <br />

//                   Longitude:{" "}

//                   {location.longitude.toFixed(
//                     7
//                   )}

//                 </Popup>

//               </CircleMarker>


//               {/* =================================
//                   OPENCELLID CELLS
//               ================================= */}

//               {cells.map(
//                 (
//                   cell,
//                   index
//                 ) => {

//                   const coordinates =
//                     getValidCoordinates(
//                       cell
//                     );


//                   /*
//                   Do NOT render invalid cells
//                   */

//                   if (
//                     !coordinates
//                   ) {

//                     return null;
//                   }


//                   const [
//                     latitude,
//                     longitude,
//                   ] = coordinates;


//                   const distance =
//                     calculateDistance(

//                       location.latitude,

//                       location.longitude,

//                       latitude,

//                       longitude

//                     );


//                   return (

//                     <CircleMarker

//                       key={
//                         `${cell.cell_id}-${index}`
//                       }

//                       center={
//                         coordinates
//                       }

//                       radius={8}

//                     >

//                       <Popup>

//                         <strong>
//                           Cell{" "}
//                           {cell.cell_id}
//                         </strong>

//                         <br />

//                         MCC:
//                         {" "}
//                         {cell.mcc}

//                         <br />

//                         MNC:
//                         {" "}
//                         {cell.mnc}

//                         <br />

//                         LAC/TAC:
//                         {" "}
//                         {cell.lac}

//                         <br />

//                         Radio:
//                         {" "}
//                         {cell.radio ||
//                           "Unknown"}

//                         <br />

//                         Range:
//                         {" "}

//                         {cell.range
//                           ? `${cell.range} m`
//                           : "N/A"}

//                         <br />

//                         Distance:
//                         {" "}

//                         {distance.toFixed(
//                           2
//                         )}

//                         {" "}km

//                       </Popup>

//                     </CircleMarker>

//                   );

//                 }

//               )}


//               {/* =================================
//                   LINE TO NEAREST CELL
//               ================================= */}

//               {nearestCell && (

//                 (() => {

//                   const nearestCoordinates =
//                     getValidCoordinates(
//                       nearestCell
//                     );


//                   if (
//                     !nearestCoordinates
//                   ) {

//                     return null;
//                   }


//                   return (

//                     <Polyline

//                       positions={[

//                         [
//                           location.latitude,
//                           location.longitude,
//                         ],

//                         nearestCoordinates,

//                       ]}

//                       pathOptions={{
//                         color:
//                           "#1e3a5f",
//                         weight: 4,
//                       }}

//                     />

//                   );

//                 })()

//               )}

//             </MapContainer>

//           </div>

//         )}


//         {/* =================================
//             NEAREST CELL
//         ================================= */}

//         {nearestCell && (

//           <div className="card nearest">

//             <h2>
//               🎯 Nearest Cell
//             </h2>


//             <h3>

//               Cell{" "}

//               {nearestCell.cell_id}

//             </h3>


//             <p>

//               <span>
//                 MCC
//               </span>

//               <strong>
//                 {nearestCell.mcc}
//               </strong>

//             </p>


//             <p>

//               <span>
//                 MNC
//               </span>

//               <strong>
//                 {nearestCell.mnc}
//               </strong>

//             </p>


//             <p>

//               <span>
//                 LAC/TAC
//               </span>

//               <strong>
//                 {nearestCell.lac}
//               </strong>

//             </p>


//             <p>

//               <span>
//                 Radio
//               </span>

//               <strong>
//                 {nearestCell.radio ||
//                   "Unknown"}
//               </strong>

//             </p>


//             <p>

//               <span>
//                 Distance
//               </span>

//               <strong>

//                 {nearestCell.distance.toFixed(
//                   2
//                 )}

//                 {" "}km

//               </strong>

//             </p>

//           </div>

//         )}


//         {/* =================================
//             ALL CELLS
//         ================================= */}

//         <div className="card">

//           <h2>
//             📡 OpenCelliD Cells
//           </h2>


//           {cells.length === 0 ? (

//             <p className="placeholder">

//               {loading
//                 ? "Searching..."
//                 : "No cells found yet."}

//             </p>

//           ) : (

//             cells.map(
//               (
//                 cell,
//                 index
//               ) => {

//                 const coordinates =
//                   getValidCoordinates(
//                     cell
//                   );


//                 /*
//                 Skip invalid cell
//                 */

//                 if (
//                   !coordinates
//                 ) {

//                   return null;
//                 }


//                 const [
//                   latitude,
//                   longitude,
//                 ] = coordinates;


//                 const distance =
//                   location

//                     ? calculateDistance(

//                         location.latitude,

//                         location.longitude,

//                         latitude,

//                         longitude

//                       )

//                     : null;


//                 return (

//                   <div

//                     className="tower"

//                     key={
//                       `${cell.cell_id}-${index}`
//                     }

//                   >

//                     <div>

//                       <strong>

//                         Cell{" "}

//                         {cell.cell_id}

//                       </strong>


//                       <p>

//                         MCC{" "}
//                         {cell.mcc}

//                         {" · "}

//                         MNC{" "}
//                         {cell.mnc}

//                       </p>


//                       <p>

//                         {cell.radio ||
//                           "Unknown radio"}

//                       </p>

//                     </div>


//                     <div>

//                       <p>

//                         {latitude.toFixed(
//                           4
//                         )}

//                       </p>


//                       <p>

//                         {longitude.toFixed(
//                           4
//                         )}

//                       </p>


//                       {distance !== null && (

//                         <p>

//                           📏{" "}

//                           {distance.toFixed(
//                             2
//                           )}

//                           {" "}km

//                         </p>

//                       )}

//                     </div>

//                   </div>

//                 );

//               }

//             )

//           )}

//         </div>


//         {/* =================================
//             DATA SOURCE
//         ================================= */}

//         <div className="card">

//           <p className="placeholder">

//             Cell data provided by
//             OpenCelliD.

//           </p>

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
  CircleMarker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

/*
========================================
DISTANCE CALCULATION
========================================
*/

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

/*
========================================
VALIDATE COORDINATES
========================================
*/

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

/*
========================================
NORMALIZE OPENCELLID DATA

OpenCelliD can return:

lat / lon

Our database/frontend uses:

latitude / longitude
========================================
*/

function normalizeCell(cell) {
  const latitude = Number(
    cell.latitude ?? cell.lat
  );

  const longitude = Number(
    cell.longitude ?? cell.lon
  );

  if (
    !isValidCoordinate(
      latitude,
      longitude
    )
  ) {
    console.warn(
      "Skipping cell with invalid coordinates:",
      cell
    );

    return null;
  }

  return {
    ...cell,

    cell_id:
      cell.cell_id ??
      cell.cellid ??
      null,

    latitude,
    longitude,

    mcc:
      cell.mcc ?? null,

    mnc:
      cell.mnc ?? null,

    lac:
      cell.lac ?? null,

    radio:
      cell.radio ?? null,

    range:
      cell.range ?? null,

    samples:
      cell.samples ?? null,

    created:
      cell.created ?? null,

    updated:
      cell.updated ?? null,
  };
}

/*
========================================
APP
========================================
*/

function App() {
  /*
  ======================================
  STATES
  ======================================
  */

  const [location, setLocation] =
    useState(null);

  const [cells, setCells] =
    useState([]);

  const [nearestCell, setNearestCell] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
  ======================================
  GET USER LOCATION
  ======================================
  */

  const getLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          Number(position.coords.latitude);

        const longitude =
          Number(position.coords.longitude);

        if (
          !isValidCoordinate(
            latitude,
            longitude
          )
        ) {
          setError(
            "Invalid location received from browser."
          );

          return;
        }

        setLocation({
          latitude,
          longitude,
        });
      },

      (err) => {
        console.error(
          "Location error:",
          err
        );

        setError(
          "Unable to get your location."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /*
  ======================================
  FETCH OPENCELLID CELLS
  ======================================
  */

  useEffect(() => {
    if (!location) {
      return;
    }

    const getCells = async () => {
      try {
        setLoading(true);
        setError("");

        const url =
          `http://localhost:3000/api/opencellid` +
          `?lat=${location.latitude}` +
          `&lng=${location.longitude}`;

        console.log(
          "Requesting OpenCelliD:",
          url
        );

        const response =
          await fetch(url);

        const data =
          await response.json();

        console.log(
          "FULL OPENCELLID RESPONSE:",
          data
        );

        console.log(
          "CELLS FROM BACKEND:",
          data.cells
        );

        console.log(
          "RAW CELL COUNT:",
          data.cells?.length
        );

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to fetch OpenCelliD data"
          );
        }

        if (
          !data.cells ||
          !Array.isArray(data.cells)
        ) {
          throw new Error(
            "Invalid cell data received from backend."
          );
        }

        /*
        ======================================
        NORMALIZE CELLS
        ======================================
        */

        const normalizedCells =
          data.cells
            .map((cell) =>
              normalizeCell(cell)
            )
            .filter(
              (cell) => cell !== null
            );

        console.log(
          "VALID NORMALIZED CELLS:",
          normalizedCells
        );

        console.log(
          "VALID CELL COUNT:",
          normalizedCells.length
        );

        /*
        ======================================
        SAVE CELLS
        ======================================
        */

        setCells(
          normalizedCells
        );

      } catch (err) {
        console.error(
          "OpenCelliD fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to fetch nearby cells."
        );

        setCells([]);

      } finally {
        setLoading(false);
      }
    };

    getCells();

  }, [location]);

  /*
  ======================================
  FIND NEAREST CELL
  ======================================
  */

  useEffect(() => {
    if (
      !location ||
      cells.length === 0
    ) {
      setNearestCell(null);
      return;
    }

    let nearest = null;
    let shortestDistance = Infinity;

    cells.forEach((cell) => {
      const latitude =
        Number(cell.latitude);

      const longitude =
        Number(cell.longitude);

      if (
        !isValidCoordinate(
          latitude,
          longitude
        )
      ) {
        return;
      }

      const distance =
        calculateDistance(
          location.latitude,
          location.longitude,
          latitude,
          longitude
        );

      if (
        distance <
        shortestDistance
      ) {
        shortestDistance =
          distance;

        nearest = {
          ...cell,
          distance,
        };
      }
    });

    setNearestCell(nearest);

  }, [location, cells]);

  /*
  ======================================
  RETURN UI
  ======================================
  */

  return (
    <div className="app">

      <div className="container">

        {/* =================================
            HEADER
        ================================= */}

        <h1>
          Network Finder
        </h1>

        <p className="subtitle">
          Find nearby cellular cells
        </p>

        {/* =================================
            LOCATION CARD
        ================================= */}

        <div className="card">

          <h2>
            📍 Your Location
          </h2>

          {location ? (
            <div>

              <p>
                <span>
                  Latitude
                </span>

                <strong>
                  {location.latitude.toFixed(
                    7
                  )}
                </strong>
              </p>

              <p>
                <span>
                  Longitude
                </span>

                <strong>
                  {location.longitude.toFixed(
                    7
                  )}
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

          <button
            onClick={getLocation}
          >
            Get My Location
          </button>

        </div>

        {/* =================================
            LOADING
        ================================= */}

        {loading && (
          <div className="card">

            <p>
              🔄 Searching nearby cells...
            </p>

          </div>
        )}

        {/* =================================
            MAP
        ================================= */}

        {location && (
          <div className="card">

            <h2>
              🗺️ Cell Map
            </h2>

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

              {/* MAP TILES */}

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* =================================
                  USER LOCATION
              ================================= */}

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
                  {location.latitude.toFixed(
                    7
                  )}

                  <br />

                  Longitude:{" "}
                  {location.longitude.toFixed(
                    7
                  )}

                </Popup>

              </CircleMarker>

              {/* =================================
                  OPENCELLID CELLS
              ================================= */}

              {cells.map(
                (cell, index) => {

                  const latitude =
                    Number(
                      cell.latitude
                    );

                  const longitude =
                    Number(
                      cell.longitude
                    );

                  /*
                  Extra safety check.
                  Leaflet NEVER receives NaN.
                  */

                  if (
                    !isValidCoordinate(
                      latitude,
                      longitude
                    )
                  ) {
                    return null;
                  }

                  return (
                    <CircleMarker
                      key={`${cell.cell_id}-${index}`}
                      center={[
                        latitude,
                        longitude,
                      ]}
                      radius={8}
                    >

                      <Popup>

                        <strong>
                          Cell{" "}
                          {cell.cell_id}
                        </strong>

                        <br />

                        MCC:{" "}
                        {cell.mcc}

                        <br />

                        MNC:{" "}
                        {cell.mnc}

                        <br />

                        LAC/TAC:{" "}
                        {cell.lac}

                        <br />

                        Radio:{" "}
                        {cell.radio ||
                          "Unknown"}

                        <br />

                        Range:{" "}
                        {cell.range
                          ? `${cell.range} m`
                          : "N/A"}

                        <br />

                        Distance:{" "}

                        {calculateDistance(
                          location.latitude,
                          location.longitude,
                          latitude,
                          longitude
                        ).toFixed(2)}

                        {" "}km

                      </Popup>

                    </CircleMarker>
                  );
                }
              )}

              {/* =================================
                  LINE TO NEAREST CELL
              ================================= */}

              {nearestCell &&
                isValidCoordinate(
                  Number(
                    nearestCell.latitude
                  ),
                  Number(
                    nearestCell.longitude
                  )
                ) && (

                  <Polyline
                    positions={[
                      [
                        location.latitude,
                        location.longitude,
                      ],

                      [
                        Number(
                          nearestCell.latitude
                        ),
                        Number(
                          nearestCell.longitude
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

        {/* =================================
            NEAREST CELL
        ================================= */}

        {nearestCell && (
          <div className="card nearest">

            <h2>
              🎯 Nearest Cell
            </h2>

            <h3>
              Cell{" "}
              {nearestCell.cell_id}
            </h3>

            <p>
              <span>
                MCC
              </span>

              <strong>
                {nearestCell.mcc}
              </strong>
            </p>

            <p>
              <span>
                MNC
              </span>

              <strong>
                {nearestCell.mnc}
              </strong>
            </p>

            <p>
              <span>
                LAC/TAC
              </span>

              <strong>
                {nearestCell.lac}
              </strong>
            </p>

            <p>
              <span>
                Radio
              </span>

              <strong>
                {nearestCell.radio ||
                  "Unknown"}
              </strong>
            </p>

            <p>
              <span>
                Latitude
              </span>

              <strong>
                {Number(
                  nearestCell.latitude
                ).toFixed(6)}
              </strong>
            </p>

            <p>
              <span>
                Longitude
              </span>

              <strong>
                {Number(
                  nearestCell.longitude
                ).toFixed(6)}
              </strong>
            </p>

            <p>
              <span>
                Distance
              </span>

              <strong>
                {nearestCell.distance.toFixed(
                  2
                )} km
              </strong>
            </p>

          </div>
        )}

        {/* =================================
            ALL CELLS
        ================================= */}

        <div className="card">

          <h2>
            📡 OpenCelliD Cells
          </h2>

          {cells.length === 0 ? (

            <p className="placeholder">

              {loading
                ? "Searching..."
                : "No cells found yet."}

            </p>

          ) : (

            <>
              <p className="cell-count">
                Found{" "}
                <strong>
                  {cells.length}
                </strong>{" "}
                nearby cells
              </p>

              {cells.map(
                (cell, index) => {

                  const distance =
                    location
                      ? calculateDistance(
                          location.latitude,
                          location.longitude,
                          Number(
                            cell.latitude
                          ),
                          Number(
                            cell.longitude
                          )
                        )
                      : null;

                  return (
                    <div
                      className="tower"
                      key={`${cell.cell_id}-${index}`}
                    >

                      <div>

                        <strong>
                          Cell{" "}
                          {cell.cell_id}
                        </strong>

                        <p>
                          MCC{" "}
                          {cell.mcc}
                          {" · "}
                          MNC{" "}
                          {cell.mnc}
                        </p>

                        <p>
                          {cell.radio ||
                            "Unknown radio"}
                        </p>

                      </div>

                      <div>

                        <p>
                          {Number(
                            cell.latitude
                          ).toFixed(6)}
                        </p>

                        <p>
                          {Number(
                            cell.longitude
                          ).toFixed(6)}
                        </p>

                        {distance !==
                          null && (
                          <p>
                            📏{" "}
                            {distance.toFixed(
                              2
                            )}{" "}
                            km
                          </p>
                        )}

                      </div>

                    </div>
                  );
                }
              )}
            </>

          )}

        </div>

        {/* =================================
            DATABASE STATUS
        ================================= */}

        <div className="card">

          <h2>
            💾 Data Status
          </h2>

          <p>
            OpenCelliD returned{" "}
            <strong>
              {cells.length}
            </strong>{" "}
            valid cells.
          </p>

          <p className="placeholder">
            Existing cells are skipped in
            PostgreSQL to prevent duplicates.
          </p>

        </div>

        {/* =================================
            DATA SOURCE
        ================================= */}

        <div className="card">

          <p className="placeholder">
            Cell data provided by
            OpenCelliD.
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;