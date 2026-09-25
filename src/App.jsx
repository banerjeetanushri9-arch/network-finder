// // // import { useEffect, useState } from "react";
// // // import {
// // //   MapContainer,
// // //   TileLayer,
// // //   CircleMarker,
// // //   Popup,
// // //   Polyline,
// // //   useMap,
// // // } from "react-leaflet";

// // // import "leaflet/dist/leaflet.css";
// // // import "./App.css";

// // // /* =========================================================
// // //    CONSTANTS
// // // ========================================================= */

// // // const DEFAULT_LOCATION = {
// // //   latitude: 18.5204,
// // //   longitude: 73.8567,
// // // };

// // // const MAP_ZOOM = 15;

// // // /* =========================================================
// // //    DISTANCE
// // // ========================================================= */

// // // function calculateDistance(lat1, lon1, lat2, lon2) {
// // //   const R = 6371;

// // //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
// // //   const dLon = ((lon2 - lon1) * Math.PI) / 180;

// // //   const a =
// // //     Math.sin(dLat / 2) ** 2 +
// // //     Math.cos((lat1 * Math.PI) / 180) *
// // //       Math.cos((lat2 * Math.PI) / 180) *
// // //       Math.sin(dLon / 2) ** 2;

// // //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// // //   return R * c;
// // // }

// // // /* =========================================================
// // //    COORDINATE VALIDATION
// // // ========================================================= */

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

// // // /* =========================================================
// // //    OPENCELLID NORMALIZATION
// // // ========================================================= */

// // // function normalizeCell(cell) {
// // //   const latitude = Number(cell.latitude ?? cell.lat);
// // //   const longitude = Number(cell.longitude ?? cell.lon);

// // //   return {
// // //     ...cell,

// // //     cell_id: cell.cell_id ?? cell.cellid,

// // //     latitude,
// // //     longitude,

// // //     mcc: cell.mcc,
// // //     mnc: cell.mnc,
// // //     lac: cell.lac,
// // //     radio: cell.radio,
// // //     range: cell.range,
// // //     samples: cell.samples,
// // //     created: cell.created,
// // //     updated: cell.updated,
// // //   };
// // // }

// // // /* =========================================================
// // //    MAP CENTER UPDATER
// // // ========================================================= */

// // // function MapUpdater({ location }) {
// // //   const map = useMap();

// // //   useEffect(() => {
// // //     if (!location) return;

// // //     map.setView(
// // //       [location.latitude, location.longitude],
// // //       MAP_ZOOM,
// // //       {
// // //         animate: true,
// // //       }
// // //     );
// // //   }, [location, map]);

// // //   return null;
// // // }

// // // /* =========================================================
// // //    APP
// // // ========================================================= */

// // // function App() {
// // //   const [location, setLocation] = useState(null);

// // //   const [cells, setCells] = useState([]);

// // //   const [nearestCell, setNearestCell] = useState(null);

// // //   const [loadingLocation, setLoadingLocation] = useState(false);

// // //   const [loadingCells, setLoadingCells] = useState(false);

// // //   const [error, setError] = useState("");

// // //   const [route, setRoute] = useState([]);

// // //   const [routeLoading, setRouteLoading] = useState(false);

// // //   const [routeInfo, setRouteInfo] = useState(null);

// // //   /* =======================================================
// // //      FETCH OPENCELLID DATA
// // //   ======================================================= */

// // //   const fetchOpenCellIdData = async (userLocation) => {
// // //     try {
// // //       setLoadingCells(true);
// // //       setError("");

// // //       const url =
// // //         `http://localhost:3000/api/opencellid` +
// // //         `?lat=${userLocation.latitude}` +
// // //         `&lng=${userLocation.longitude}`;

// // //       console.log(
// // //         "Requesting OpenCelliD:",
// // //         url
// // //       );

// // //       const response = await fetch(url);

// // //       if (!response.ok) {
// // //         throw new Error(
// // //           `Backend returned HTTP ${response.status}`
// // //         );
// // //       }

// // //       const data = await response.json();

// // //       console.log(
// // //         "OpenCelliD data:",
// // //         data
// // //       );

// // //       const rawCells = Array.isArray(data)
// // //         ? data
// // //         : Array.isArray(data.cells)
// // //         ? data.cells
// // //         : [];

// // //       console.log(
// // //         "Raw cells:",
// // //         rawCells
// // //       );

// // //       const normalizedCells = rawCells
// // //         .map(normalizeCell)
// // //         .filter((cell) => {
// // //           const valid = isValidCoordinate(
// // //             cell.latitude,
// // //             cell.longitude
// // //           );

// // //           if (!valid) {
// // //             console.warn(
// // //               "Skipping invalid cell:",
// // //               cell
// // //             );
// // //           }

// // //           return valid;
// // //         });

// // //       console.log(
// // //         "Valid OpenCelliD cells:",
// // //         normalizedCells
// // //       );

// // //       setCells(normalizedCells);

// // //       /* =====================================================
// // //          FIND NEAREST CELL
// // //       ===================================================== */

// // //       let closest = null;

// // //       let smallestDistance = Infinity;

// // //       normalizedCells.forEach((cell) => {
// // //         const distance = calculateDistance(
// // //           userLocation.latitude,
// // //           userLocation.longitude,
// // //           cell.latitude,
// // //           cell.longitude
// // //         );

// // //         const cellWithDistance = {
// // //           ...cell,
// // //           distance,
// // //         };

// // //         if (distance < smallestDistance) {
// // //           smallestDistance = distance;
// // //           closest = cellWithDistance;
// // //         }
// // //       });

// // //       setNearestCell(closest);

// // //       console.log(
// // //         "Nearest cell:",
// // //         closest
// // //       );
// // //     } catch (err) {
// // //       console.error(
// // //         "OpenCelliD fetch error:",
// // //         err
// // //       );

// // //       setError(
// // //         `Could not load cell data. ${err.message}`
// // //       );

// // //       setCells([]);

// // //       setNearestCell(null);
// // //     } finally {
// // //       setLoadingCells(false);
// // //     }
// // //   };

// // //   /* =======================================================
// // //      GET USER LOCATION
// // //   ======================================================= */

// // //   const getLocation = () => {
// // //     setError("");

// // //     setLoadingLocation(true);

// // //     if (!navigator.geolocation) {
// // //       setError(
// // //         "Geolocation is not supported by this browser."
// // //       );

// // //       setLoadingLocation(false);

// // //       return;
// // //     }

// // //     console.log(
// // //       "Requesting browser location..."
// // //     );

// // //     const handleSuccess = async (position) => {
// // //       console.log(
// // //         "SUCCESS - GPS position received"
// // //       );

// // //       const latitude = Number(
// // //         position.coords.latitude
// // //       );

// // //       const longitude = Number(
// // //         position.coords.longitude
// // //       );

// // //       const accuracy = Number(
// // //         position.coords.accuracy
// // //       );

// // //       console.log(
// // //         "GPS coordinates:",
// // //         {
// // //           latitude,
// // //           longitude,
// // //           accuracy,
// // //         }
// // //       );

// // //       if (
// // //         !isValidCoordinate(
// // //           latitude,
// // //           longitude
// // //         )
// // //       ) {
// // //         setError(
// // //           "Invalid location received from your device."
// // //         );

// // //         setLoadingLocation(false);

// // //         return;
// // //       }

// // //       const userLocation = {
// // //         latitude,
// // //         longitude,
// // //       };

// // //       setLocation(userLocation);

// // //       console.log(
// // //         "User location:",
// // //         userLocation
// // //       );

// // //       await fetchOpenCellIdData(
// // //         userLocation
// // //       );

// // //       setLoadingLocation(false);
// // //     };

// // //     const handleError = (error) => {
// // //       console.error(
// // //         "GPS ERROR:",
// // //         error
// // //       );

// // //       console.error(
// // //         "GPS ERROR CODE:",
// // //         error.code
// // //       );

// // //       console.error(
// // //         "GPS ERROR MESSAGE:",
// // //         error.message
// // //       );

// // //       let message =
// // //         "Unable to determine your location.";

// // //       if (error.code === 1) {
// // //         message =
// // //           "Chrome does not have permission to access your location.";
// // //       } else if (error.code === 2) {
// // //         message =
// // //           "Mac could not determine your location. Please try again.";
// // //       } else if (error.code === 3) {
// // //         message =
// // //           "Location request timed out. Please try again.";
// // //       }

// // //       setError(message);

// // //       setLoadingLocation(false);
// // //     };

// // //     navigator.geolocation.getCurrentPosition(
// // //       handleSuccess,
// // //       handleError,
// // //       {
// // //         enableHighAccuracy: false,

// // //         /*
// // //          * Give macOS CoreLocation plenty of time.
// // //          */
// // //         timeout: 60000,

// // //         /*
// // //          * Allow a recent browser/macOS location.
// // //          */
// // //         maximumAge: 300000,
// // //       }
// // //     );
// // //   };

// // //   /* =======================================================
// // //      ROAD ROUTING
// // //   ======================================================= */

// // //   useEffect(() => {
// // //     if (!location || !nearestCell) {
// // //       setRoute([]);

// // //       setRouteInfo(null);

// // //       return;
// // //     }

// // //     const getRoadRoute = async () => {
// // //       try {
// // //         setRouteLoading(true);

// // //         setRoute([]);

// // //         setRouteInfo(null);

// // //         const userLat = Number(
// // //           location.latitude
// // //         );

// // //         const userLon = Number(
// // //           location.longitude
// // //         );

// // //         const cellLat = Number(
// // //           nearestCell.latitude
// // //         );

// // //         const cellLon = Number(
// // //           nearestCell.longitude
// // //         );

// // //         if (
// // //           !isValidCoordinate(
// // //             userLat,
// // //             userLon
// // //           ) ||
// // //           !isValidCoordinate(
// // //             cellLat,
// // //             cellLon
// // //           )
// // //         ) {
// // //           throw new Error(
// // //             "Invalid coordinates for routing."
// // //           );
// // //         }

// // //         console.log(
// // //           "Starting road routing...",
// // //           {
// // //             user: [
// // //               userLat,
// // //               userLon,
// // //             ],

// // //             cell: [
// // //               cellLat,
// // //               cellLon,
// // //             ],
// // //           }
// // //         );

// // //         /* =================================================
// // //            STEP 1
// // //            USER → NEAREST ROAD
// // //         ================================================= */

// // //         const userNearestUrl =
// // //           `https://router.project-osrm.org/nearest/v1/driving/` +
// // //           `${userLon},${userLat}?number=1`;

// // //         console.log(
// // //           "Finding nearest road to user..."
// // //         );

// // //         const userNearestResponse =
// // //           await fetch(
// // //             userNearestUrl
// // //           );

// // //         if (!userNearestResponse.ok) {
// // //           throw new Error(
// // //             "Could not find a road near your location."
// // //           );
// // //         }

// // //         const userNearestData =
// // //           await userNearestResponse.json();

// // //         if (
// // //           userNearestData.code !== "Ok" ||
// // //           !userNearestData.waypoints ||
// // //           userNearestData.waypoints.length === 0
// // //         ) {
// // //           throw new Error(
// // //             "No nearby road was found for your location."
// // //           );
// // //         }

// // //         const userWaypoint =
// // //           userNearestData.waypoints[0];

// // //         const userRoadLon = Number(
// // //           userWaypoint.location[0]
// // //         );

// // //         const userRoadLat = Number(
// // //           userWaypoint.location[1]
// // //         );

// // //         console.log(
// // //           "User snapped to road:",
// // //           userRoadLat,
// // //           userRoadLon
// // //         );

// // //         /* =================================================
// // //            STEP 2
// // //            CELL → NEAREST ROAD
// // //         ================================================= */

// // //         const cellNearestUrl =
// // //           `https://router.project-osrm.org/nearest/v1/driving/` +
// // //           `${cellLon},${cellLat}?number=1`;

// // //         console.log(
// // //           "Finding nearest road to cell..."
// // //         );

// // //         const cellNearestResponse =
// // //           await fetch(
// // //             cellNearestUrl
// // //           );

// // //         if (!cellNearestResponse.ok) {
// // //           throw new Error(
// // //             "Could not find a road near the cell."
// // //           );
// // //         }

// // //         const cellNearestData =
// // //           await cellNearestResponse.json();

// // //         if (
// // //           cellNearestData.code !== "Ok" ||
// // //           !cellNearestData.waypoints ||
// // //           cellNearestData.waypoints.length === 0
// // //         ) {
// // //           throw new Error(
// // //             "No nearby road was found for the cell."
// // //           );
// // //         }

// // //         const cellWaypoint =
// // //           cellNearestData.waypoints[0];

// // //         const cellRoadLon = Number(
// // //           cellWaypoint.location[0]
// // //         );

// // //         const cellRoadLat = Number(
// // //           cellWaypoint.location[1]
// // //         );

// // //         console.log(
// // //           "Cell snapped to road:",
// // //           cellRoadLat,
// // //           cellRoadLon
// // //         );

// // //         /* =================================================
// // //            STEP 3
// // //            ACTUAL ROAD ROUTE
// // //         ================================================= */

// // //         const routeUrl =
// // //           `https://router.project-osrm.org/route/v1/driving/` +
// // //           `${userRoadLon},${userRoadLat};` +
// // //           `${cellRoadLon},${cellRoadLat}` +
// // //           `?overview=full&geometries=geojson`;

// // //         console.log(
// // //           "Requesting road route..."
// // //         );

// // //         const routeResponse =
// // //           await fetch(routeUrl);

// // //         if (!routeResponse.ok) {
// // //           throw new Error(
// // //             "Could not calculate the road route."
// // //           );
// // //         }

// // //         const routeData =
// // //           await routeResponse.json();

// // //         console.log(
// // //           "OSRM route response:",
// // //           routeData
// // //         );

// // //         if (
// // //           routeData.code !== "Ok" ||
// // //           !routeData.routes ||
// // //           routeData.routes.length === 0
// // //         ) {
// // //           throw new Error(
// // //             "No drivable road route was found."
// // //           );
// // //         }

// // //         const selectedRoute =
// // //           routeData.routes[0];

// // //         /* =================================================
// // //            STEP 4
// // //            CONVERT ROUTE COORDINATES
// // //         ================================================= */

// // //         const routeCoordinates =
// // //           selectedRoute.geometry.coordinates.map(
// // //             ([longitude, latitude]) => [
// // //               latitude,
// // //               longitude,
// // //             ]
// // //           );

// // //         setRoute(
// // //           routeCoordinates
// // //         );

// // //         setRouteInfo({
// // //           distance:
// // //             Number(
// // //               selectedRoute.distance
// // //             ) / 1000,

// // //           duration:
// // //             Number(
// // //               selectedRoute.duration
// // //             ) / 60,

// // //           userRoadPoint: [
// // //             userRoadLat,
// // //             userRoadLon,
// // //           ],

// // //           cellRoadPoint: [
// // //             cellRoadLat,
// // //             cellRoadLon,
// // //           ],
// // //         });

// // //         console.log(
// // //           "Road route successfully created."
// // //         );

// // //         console.log(
// // //           "Route distance:",
// // //           Number(
// // //             selectedRoute.distance
// // //           ) / 1000,
// // //           "km"
// // //         );

// // //         console.log(
// // //           "Route duration:",
// // //           Number(
// // //             selectedRoute.duration
// // //           ) / 60,
// // //           "minutes"
// // //         );
// // //       } catch (err) {
// // //         console.error(
// // //           "Routing error:",
// // //           err
// // //         );

// // //         setRoute([]);

// // //         setRouteInfo(null);
// // //       } finally {
// // //         setRouteLoading(false);
// // //       }
// // //     };

// // //     getRoadRoute();
// // //   }, [location, nearestCell]);

// // //   /* =======================================================
// // //      MAP CENTER
// // //   ======================================================= */

// // //   const mapCenter = location
// // //     ? [
// // //         location.latitude,
// // //         location.longitude,
// // //       ]
// // //     : [
// // //         DEFAULT_LOCATION.latitude,
// // //         DEFAULT_LOCATION.longitude,
// // //       ];

// // //   /* =======================================================
// // //      UI
// // //   ======================================================= */

// // //   return (
// // //     <div className="app">

// // //       {/* ===================================================
// // //           HEADER
// // //       =================================================== */}

// // //       <header className="app-header">
// // //         <div>
// // //           <h1>
// // //             Cell Tower Finder
// // //           </h1>

// // //           <p>
// // //             Find nearby cellular cells and
// // //             navigate using real road routes.
// // //           </p>
// // //         </div>

// // //         <button
// // //           className="location-button"
// // //           onClick={getLocation}
// // //           disabled={loadingLocation}
// // //         >
// // //           {loadingLocation
// // //             ? "Getting Location..."
// // //             : "Get My Location"}
// // //         </button>
// // //       </header>

// // //       {/* ===================================================
// // //           ERROR
// // //       =================================================== */}

// // //       {error && (
// // //         <div className="error-card">
// // //           <strong>
// // //             Error
// // //           </strong>

// // //           <p>
// // //             {error}
// // //           </p>
// // //         </div>
// // //       )}

// // //       {/* ===================================================
// // //           LOCATION CARD
// // //       =================================================== */}

// // //       {location && (
// // //         <div className="info-card location-card">
// // //           <div>
// // //             <span className="card-label">
// // //               YOUR LOCATION
// // //             </span>

// // //             <h2>
// // //               Current Position
// // //             </h2>

// // //             <p>
// // //               Latitude:{" "}
// // //               <strong>
// // //                 {location.latitude.toFixed(
// // //                   6
// // //                 )}
// // //               </strong>
// // //             </p>

// // //             <p>
// // //               Longitude:{" "}
// // //               <strong>
// // //                 {location.longitude.toFixed(
// // //                   6
// // //                 )}
// // //               </strong>
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ===================================================
// // //           LOADING
// // //       =================================================== */}

// // //       {loadingCells && (
// // //         <div className="loading-card">
// // //           <div className="loading-spinner"></div>

// // //           <div>
// // //             <strong>
// // //               Finding nearby cellular cells...
// // //             </strong>

// // //             <p>
// // //               Fetching OpenCelliD data and
// // //               checking your nearest cell.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ===================================================
// // //           MAP
// // //       =================================================== */}

// // //       <section className="map-section">
// // //         <div className="section-heading">
// // //           <div>
// // //             <span className="card-label">
// // //               LIVE MAP
// // //             </span>

// // //             <h2>
// // //               Nearby Cellular Network
// // //             </h2>
// // //           </div>

// // //           {cells.length > 0 && (
// // //             <span className="cell-count">
// // //               {cells.length} cells found
// // //             </span>
// // //           )}
// // //         </div>

// // //         <div className="map-wrapper">
// // //           <MapContainer
// // //             center={mapCenter}
// // //             zoom={MAP_ZOOM}
// // //             scrollWheelZoom={true}
// // //             className="map"
// // //           >
// // //             <MapUpdater
// // //               location={location}
// // //             />

// // //             <TileLayer
// // //               attribution="&copy; OpenStreetMap contributors"
// // //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //             />

// // //             {/* USER LOCATION */}

// // //             {location && (
// // //               <CircleMarker
// // //                 center={[
// // //                   location.latitude,
// // //                   location.longitude,
// // //                 ]}
// // //                 radius={10}
// // //                 pathOptions={{
// // //                   color: "#1E3A5F",
// // //                   fillColor: "#3B82F6",
// // //                   fillOpacity: 1,
// // //                   weight: 3,
// // //                 }}
// // //               >
// // //                 <Popup>
// // //                   <strong>
// // //                     Your Location
// // //                   </strong>

// // //                   <br />

// // //                   {location.latitude.toFixed(
// // //                     6
// // //                   )}
// // //                   ,{" "}
// // //                   {location.longitude.toFixed(
// // //                     6
// // //                   )}
// // //                 </Popup>
// // //               </CircleMarker>
// // //             )}

// // //             {/* OPENCELLID CELLS */}

// // //             {cells.map(
// // //               (cell, index) => {
// // //                 const latitude =
// // //                   Number(
// // //                     cell.latitude
// // //                   );

// // //                 const longitude =
// // //                   Number(
// // //                     cell.longitude
// // //                   );

// // //                 if (
// // //                   !isValidCoordinate(
// // //                     latitude,
// // //                     longitude
// // //                   )
// // //                 ) {
// // //                   return null;
// // //                 }

// // //                 const isNearest =
// // //                   nearestCell &&
// // //                   String(
// // //                     nearestCell.cell_id
// // //                   ) ===
// // //                     String(
// // //                       cell.cell_id
// // //                     );

// // //                 return (
// // //                   <CircleMarker
// // //                     key={`${cell.cell_id}-${index}`}
// // //                     center={[
// // //                       latitude,
// // //                       longitude,
// // //                     ]}
// // //                     radius={
// // //                       isNearest
// // //                         ? 9
// // //                         : 6
// // //                     }
// // //                     pathOptions={{
// // //                       color:
// // //                         isNearest
// // //                           ? "#DC2626"
// // //                           : "#16A34A",

// // //                       fillColor:
// // //                         isNearest
// // //                           ? "#EF4444"
// // //                           : "#22C55E",

// // //                       fillOpacity: 0.8,

// // //                       weight:
// // //                         isNearest
// // //                           ? 3
// // //                           : 2,
// // //                     }}
// // //                   >
// // //                     <Popup>
// // //                       <strong>
// // //                         {isNearest
// // //                           ? "Nearest Cell"
// // //                           : "OpenCelliD Cell"}
// // //                       </strong>

// // //                       <br />

// // //                       Cell ID:{" "}
// // //                       {cell.cell_id ??
// // //                         "N/A"}

// // //                       <br />

// // //                       Radio:{" "}
// // //                       {cell.radio ??
// // //                         "N/A"}

// // //                       <br />

// // //                       MCC:{" "}
// // //                       {cell.mcc ??
// // //                         "N/A"}

// // //                       <br />

// // //                       MNC:{" "}
// // //                       {cell.mnc ??
// // //                         "N/A"}

// // //                       <br />

// // //                       LAC:{" "}
// // //                       {cell.lac ??
// // //                         "N/A"}

// // //                       <br />

// // //                       Coordinates:{" "}
// // //                       {latitude.toFixed(
// // //                         6
// // //                       )}
// // //                       ,{" "}
// // //                       {longitude.toFixed(
// // //                         6
// // //                       )}
// // //                     </Popup>
// // //                   </CircleMarker>
// // //                 );
// // //               }
// // //             )}

// // //             {/* ROAD ROUTE */}

// // //             {route.length > 1 && (
// // //               <Polyline
// // //                 positions={route}
// // //                 pathOptions={{
// // //                   color: "#2563EB",
// // //                   weight: 6,
// // //                   opacity: 0.9,
// // //                 }}
// // //               />
// // //             )}

// // //             {/* USER ROAD POINT */}

// // //             {routeInfo?.userRoadPoint && (
// // //               <CircleMarker
// // //                 center={
// // //                   routeInfo.userRoadPoint
// // //                 }
// // //                 radius={4}
// // //                 pathOptions={{
// // //                   color: "#1D4ED8",
// // //                   fillColor: "#60A5FA",
// // //                   fillOpacity: 1,
// // //                   weight: 2,
// // //                 }}
// // //               >
// // //                 <Popup>
// // //                   Road starting point
// // //                 </Popup>
// // //               </CircleMarker>
// // //             )}

// // //             {/* CELL ROAD POINT */}

// // //             {routeInfo?.cellRoadPoint && (
// // //               <CircleMarker
// // //                 center={
// // //                   routeInfo.cellRoadPoint
// // //                 }
// // //                 radius={4}
// // //                 pathOptions={{
// // //                   color: "#B91C1C",
// // //                   fillColor: "#F87171",
// // //                   fillOpacity: 1,
// // //                   weight: 2,
// // //                 }}
// // //               >
// // //                 <Popup>
// // //                   Road destination point
// // //                 </Popup>
// // //               </CircleMarker>
// // //             )}
// // //           </MapContainer>
// // //         </div>
// // //       </section>

// // //       {/* ===================================================
// // //           ROUTE STATUS
// // //       =================================================== */}

// // //       {nearestCell && (
// // //         <section className="info-card route-card">
// // //           <span className="card-label">
// // //             ROAD ROUTE
// // //           </span>

// // //           <h2>
// // //             Route to Nearest Cell
// // //           </h2>

// // //           {routeLoading && (
// // //             <div className="route-status">
// // //               <div className="loading-spinner"></div>

// // //               <p>
// // //                 Finding the nearest roads
// // //                 and calculating a
// // //                 realistic driving route...
// // //               </p>
// // //             </div>
// // //           )}

// // //           {!routeLoading &&
// // //             route.length > 1 &&
// // //             routeInfo && (
// // //               <div className="route-details">
// // //                 <div className="route-stat">
// // //                   <span>
// // //                     Road distance
// // //                   </span>

// // //                   <strong>
// // //                     {routeInfo.distance.toFixed(
// // //                       2
// // //                     )}{" "}
// // //                     km
// // //                   </strong>
// // //                 </div>

// // //                 <div className="route-stat">
// // //                   <span>
// // //                     Estimated driving time
// // //                   </span>

// // //                   <strong>
// // //                     {routeInfo.duration <
// // //                     1
// // //                       ? "< 1 min"
// // //                       : `${Math.round(
// // //                           routeInfo.duration
// // //                         )} min`}
// // //                   </strong>
// // //                 </div>
// // //               </div>
// // //             )}

// // //           {!routeLoading &&
// // //             route.length === 0 && (
// // //               <p className="muted-text">
// // //                 A road route could not be
// // //                 calculated for this cell.
// // //                 The cell coordinate may be
// // //                 too far from a drivable road.
// // //               </p>
// // //             )}
// // //         </section>
// // //       )}

// // //       {/* ===================================================
// // //           NEAREST CELL
// // //       =================================================== */}

// // //       {nearestCell && (
// // //         <section className="info-card nearest-card">
// // //           <span className="card-label">
// // //             NEAREST CELL
// // //           </span>

// // //           <h2>
// // //             Closest OpenCelliD Cell
// // //           </h2>

// // //           <div className="cell-details">
// // //             <div>
// // //               <span>
// // //                 Cell ID
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.cell_id ??
// // //                   "Unknown"}
// // //               </strong>
// // //             </div>

// // //             <div>
// // //               <span>
// // //                 Distance
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.distance.toFixed(
// // //                   2
// // //                 )}{" "}
// // //                 km
// // //               </strong>
// // //             </div>

// // //             <div>
// // //               <span>
// // //                 Radio
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.radio ??
// // //                   "Unknown"}
// // //               </strong>
// // //             </div>

// // //             <div>
// // //               <span>
// // //                 MCC
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.mcc ??
// // //                   "Unknown"}
// // //               </strong>
// // //             </div>

// // //             <div>
// // //               <span>
// // //                 MNC
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.mnc ??
// // //                   "Unknown"}
// // //               </strong>
// // //             </div>

// // //             <div>
// // //               <span>
// // //                 LAC
// // //               </span>

// // //               <strong>
// // //                 {nearestCell.lac ??
// // //                   "Unknown"}
// // //               </strong>
// // //             </div>
// // //           </div>
// // //         </section>
// // //       )}

// // //       {/* ===================================================
// // //           ALL CELLS
// // //       =================================================== */}

// // //       {cells.length > 0 && (
// // //         <section className="info-card cells-card">
// // //           <div className="section-heading">
// // //             <div>
// // //               <span className="card-label">
// // //                 OPENCELLID
// // //               </span>

// // //               <h2>
// // //                 Nearby Cells
// // //               </h2>
// // //             </div>

// // //             <span className="cell-count">
// // //               {cells.length}
// // //             </span>
// // //           </div>

// // //           <div className="cells-list">
// // //             {cells.map(
// // //               (cell, index) => {
// // //                 const distance =
// // //                   location
// // //                     ? calculateDistance(
// // //                         location.latitude,
// // //                         location.longitude,
// // //                         cell.latitude,
// // //                         cell.longitude
// // //                       )
// // //                     : null;

// // //                 const isNearest =
// // //                   nearestCell &&
// // //                   String(
// // //                     nearestCell.cell_id
// // //                   ) ===
// // //                     String(
// // //                       cell.cell_id
// // //                     );

// // //                 return (
// // //                   <div
// // //                     className={`cell-row ${
// // //                       isNearest
// // //                         ? "nearest-row"
// // //                         : ""
// // //                     }`}
// // //                     key={`${cell.cell_id}-${index}`}
// // //                   >
// // //                     <div className="cell-main">
// // //                       <strong>
// // //                         Cell{" "}
// // //                         {cell.cell_id ??
// // //                           "Unknown"}
// // //                       </strong>

// // //                       {isNearest && (
// // //                         <span className="nearest-badge">
// // //                           NEAREST
// // //                         </span>
// // //                       )}
// // //                     </div>

// // //                     <div className="cell-meta">
// // //                       <span>
// // //                         {cell.radio ??
// // //                           "Unknown"}
// // //                       </span>

// // //                       <span>
// // //                         {cell.latitude.toFixed(
// // //                           5
// // //                         )}
// // //                         ,{" "}
// // //                         {cell.longitude.toFixed(
// // //                           5
// // //                         )}
// // //                       </span>

// // //                       {distance !== null && (
// // //                         <span>
// // //                           {distance.toFixed(
// // //                             2
// // //                           )}{" "}
// // //                           km
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               }
// // //             )}
// // //           </div>
// // //         </section>
// // //       )}

// // //       {/* ===================================================
// // //           DATABASE STATUS
// // //       =================================================== */}

// // //       <section className="info-card database-card">
// // //         <span className="card-label">
// // //           DATA SOURCE
// // //         </span>

// // //         <h2>
// // //           OpenCelliD + Local PostgreSQL
// // //         </h2>

// // //         <p>
// // //           Cell information is retrieved
// // //           through your local backend and
// // //           stored in your PostgreSQL database.
// // //         </p>

// // //         <div className="status-row">
// // //           <span className="status-dot"></span>

// // //           <span>
// // //             Backend: localhost:3000
// // //           </span>
// // //         </div>

// // //         <div className="status-row">
// // //           <span className="status-dot"></span>

// // //           <span>
// // //             OpenCelliD data available
// // //           </span>
// // //         </div>
// // //       </section>

// // //       {/* ===================================================
// // //           ROUTING INFORMATION
// // //       =================================================== */}

// // //       <section className="info-card source-card">
// // //         <span className="card-label">
// // //           ROUTING
// // //         </span>

// // //         <h2>
// // //           How the route works
// // //         </h2>

// // //         <p>
// // //           The map first finds the nearest
// // //           drivable road to your location
// // //           and the nearest drivable road
// // //           to the selected cell. It then
// // //           calculates a road-based route
// // //           between those two points.
// // //         </p>

// // //         <p className="muted-text">
// // //           The blue line represents a
// // //           driving-road route. The cell
// // //           coordinate itself may not be
// // //           located directly on a road.
// // //         </p>
// // //       </section>

// // //     </div>
// // //   );
// // // }

// // // export default App;

// // // // import Map from "react-map-gl/maplibre";
// // // // import "maplibre-gl/dist/maplibre-gl.css";

// // // // function App() {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         width: "100vw",
// // // //         height: "100vh",
// // // //       }}
// // // //     >
// // // //       <Map
// // // //         initialViewState={{
// // // //           longitude: 73.8567,
// // // //           latitude: 18.5204,
// // // //           zoom: 12,
// // // //         }}
// // // //         style={{
// // // //           width: "100%",
// // // //           height: "100%",
// // // //         }}
// // // //         mapStyle="https://tiles.openfreemap.org/styles/liberty"
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // import Map from "react-map-gl/maplibre";
// // import { setWorkerUrl } from "maplibre-gl";
// // import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
// // import "maplibre-gl/dist/maplibre-gl.css";

// // setWorkerUrl(workerUrl);

// // // import Map from "react-map-gl/maplibre";
// // // import "maplibre-gl/dist/maplibre-gl.css";

// // function App() {
// //   return (
// //     <div
// //       style={{
// //         width: "100vw",
// //         height: "100vh",
// //       }}
// //     >
// //       <Map
// //         initialViewState={{
// //           longitude: 73.8567,
// //           latitude: 18.5204,
// //           zoom: 12,
// //         }}
// //         style={{
// //           width: "100%",
// //           height: "100%",
// //         }}
// //         mapStyle="https://tiles.openfreemap.org/styles/liberty"
// //       />
// //     </div>
// //   );
// // }

// // export default App;


import { useEffect, useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

setWorkerUrl(workerUrl);

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
   OPENCELLID NORMALIZATION
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
            console.warn("Skipping invalid cell:", cell);
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
     GET USER LOCATION
  ======================================================= */

  const getLocation = () => {
    setError("");
    setLoadingLocation(true);

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by this browser."
      );

      setLoadingLocation(false);
      return;
    }

    console.log("Requesting browser location...");

    const handleSuccess = async (position) => {
      console.log("SUCCESS - GPS position received");

      const latitude = Number(
        position.coords.latitude
      );

      const longitude = Number(
        position.coords.longitude
      );

      const accuracy = Number(
        position.coords.accuracy
      );

      console.log("GPS coordinates:", {
        latitude,
        longitude,
        accuracy,
      });

      if (
        !isValidCoordinate(
          latitude,
          longitude
        )
      ) {
        setError(
          "Invalid location received from your device."
        );

        setLoadingLocation(false);
        return;
      }

      const userLocation = {
        latitude,
        longitude,
      };

      setLocation(userLocation);

      console.log(
        "User location:",
        userLocation
      );

      await fetchOpenCellIdData(userLocation);

      setLoadingLocation(false);
    };

    const handleError = (error) => {
      console.error("GPS ERROR:", error);
      console.error("GPS ERROR CODE:", error.code);
      console.error("GPS ERROR MESSAGE:", error.message);

      let message =
        "Unable to determine your location.";

      if (error.code === 1) {
        message =
          "Chrome does not have permission to access your location.";
      } else if (error.code === 2) {
        message =
          "Mac could not determine your location. Please try again.";
      } else if (error.code === 3) {
        message =
          "Location request timed out. Please try again.";
      }

      setError(message);
      setLoadingLocation(false);
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 300000,
      }
    );
  };

  /* =======================================================
     ROAD ROUTING
  ======================================================= */

  const ROUTING_ENGINE_URL = "http://localhost:3001";

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

        const userLat = Number(
          location.latitude
        );

        const userLon = Number(
          location.longitude
        );

        const cellLat = Number(
          nearestCell.latitude
        );

        const cellLon = Number(
          nearestCell.longitude
        );

        if (
          !isValidCoordinate(
            userLat,
            userLon
          ) ||
          !isValidCoordinate(
            cellLat,
            cellLon
          )
        ) {
          throw new Error(
            "Invalid coordinates for routing."
          );
        }

        console.log(
          "Starting custom road routing...",
          {
            user: [userLat, userLon],
            cell: [cellLat, cellLon],
          }
        );

        /* =================================================
           CUSTOM ROUTING ENGINE
           USER → CUSTOM A* ROUTER → CELL

           Routing engine:
           http://localhost:3001

           Request format:
           {
             start: { lat, lon },
             end: { lat, lon }
           }
        ================================================= */

        console.log(
          "Requesting route from custom routing engine..."
        );

        const routeResponse =
          await fetch(
            `${ROUTING_ENGINE_URL}/route`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                start: {
                  lat: userLat,
                  lon: userLon,
                },

                end: {
                  lat: cellLat,
                  lon: cellLon,
                },
              }),
            }
          );

        if (!routeResponse.ok) {
          let errorMessage =
            "Could not calculate the road route.";

          try {
            const errorData =
              await routeResponse.json();

            if (errorData.error) {
              errorMessage =
                errorData.error;
            }
          } catch {
            // Keep default error message
          }

          throw new Error(
            errorMessage
          );
        }

        const routeData =
          await routeResponse.json();

        console.log(
          "Custom routing engine response:",
          routeData
        );

        if (
          !routeData.coordinates ||
          !Array.isArray(
            routeData.coordinates
          ) ||
          routeData.coordinates.length < 2
        ) {
          throw new Error(
            "Custom routing engine returned no valid route."
          );
        }

        /* =================================================
           ROUTE COORDINATE CONVERSION

           Custom engine returns:
           [latitude, longitude]

           MapLibre expects:
           [longitude, latitude]
        ================================================= */

        const routeCoordinates =
          routeData.coordinates
            .filter(
              (coordinate) =>
                Array.isArray(coordinate) &&
                coordinate.length >= 2 &&
                Number.isFinite(
                  Number(coordinate[0])
                ) &&
                Number.isFinite(
                  Number(coordinate[1])
                )
            )
            .map(
              ([lat, lon]) => [
                Number(lon),
                Number(lat),
              ]
            );

        if (
          routeCoordinates.length < 2
        ) {
          throw new Error(
            "Custom routing engine returned invalid route coordinates."
          );
        }

        setRoute(
          routeCoordinates
        );

        setRouteInfo({
          distance:
            Number(
              routeData.distanceKm
            ),

          duration: null,

          userRoadPoint: [
            routeCoordinates[0][0],
            routeCoordinates[0][1],
          ],

          cellRoadPoint: [
            routeCoordinates[
              routeCoordinates.length - 1
            ][0],

            routeCoordinates[
              routeCoordinates.length - 1
            ][1],
          ],

          startSnapDistanceKm:
            Number(
              routeData.startSnapDistanceKm
            ),

          endSnapDistanceKm:
            Number(
              routeData.endSnapDistanceKm
            ),
        });

        console.log(
          "Road route successfully created."
        );

        console.log(
          "Route distance:",
          Number(
            routeData.distanceKm
          ),
          "km"
        );

        console.log(
          "Start snap distance:",
          Number(
            routeData.startSnapDistanceKm
          ),
          "km"
        );

        console.log(
          "End snap distance:",
          Number(
            routeData.endSnapDistanceKm
          ),
          "km"
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
     MAP CENTER
  ======================================================= */

  const mapCenter = location || DEFAULT_LOCATION;

  /* =======================================================
     GEOJSON ROUTE
  ======================================================= */

  const routeGeoJSON =
    route.length > 1
      ? {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        }
      : null;

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
          <h1>
            Cell Tower Finder
          </h1>

          <p>
            Find nearby cellular cells and
            navigate using real road routes.
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
          <strong>
            Error
          </strong>

          <p>
            {error}
          </p>
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

            <h2>
              Current Position
            </h2>

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
              Fetching OpenCelliD data and
              checking your nearest cell.
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

            <h2>
              Nearby Cellular Network
            </h2>
          </div>

          {cells.length > 0 && (
            <span className="cell-count">
              {cells.length} cells found
            </span>
          )}
        </div>

        <div className="map-wrapper">

          <Map
            longitude={mapCenter.longitude}
            latitude={mapCenter.latitude}
            zoom={MAP_ZOOM}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            style={{
              width: "100%",
              height: "100%",
            }}
            scrollZoom={true}
            dragPan={true}
            doubleClickZoom={true}
          >

            {/* =================================================
                USER LOCATION
            ================================================= */}

            {location && (
              <Marker
                longitude={location.longitude}
                latitude={location.latitude}
                anchor="center"
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#2563EB",
                    border: "4px solid white",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.35)",
                  }}
                  title="Your Location"
                />
              </Marker>
            )}

            {/* =================================================
                OPENCELLID CELLS
            ================================================= */}

            {cells.map((cell, index) => {
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
                return null;
              }

              const isNearest =
                nearestCell &&
                String(
                  nearestCell.cell_id
                ) ===
                  String(
                    cell.cell_id
                  );

              return (
                <Marker
                  key={`${cell.cell_id}-${index}`}
                  longitude={longitude}
                  latitude={latitude}
                  anchor="center"
                >
                  <div
                    title={
                      isNearest
                        ? "Nearest Cell"
                        : "OpenCelliD Cell"
                    }
                    style={{
                      width: isNearest
                        ? "18px"
                        : "13px",

                      height: isNearest
                        ? "18px"
                        : "13px",

                      borderRadius: "50%",

                      background:
                        isNearest
                          ? "#EF4444"
                          : "#22C55E",

                      border:
                        isNearest
                          ? "3px solid white"
                          : "2px solid white",

                      boxShadow:
                        "0 2px 6px rgba(0,0,0,0.4)",

                      cursor: "pointer",
                    }}
                  />
                </Marker>
              );
            })}

            {/* =================================================
                ROAD ROUTE
            ================================================= */}

            {routeGeoJSON && (
              <Source
                id="road-route"
                type="geojson"
                data={routeGeoJSON}
              >
                <Layer
                  id="road-route-line"
                  type="line"
                  paint={{
                    "line-color": "#2563EB",
                    "line-width": 6,
                    "line-opacity": 0.9,
                  }}
                  layout={{
                    "line-cap": "round",
                    "line-join": "round",
                  }}
                />
              </Source>
            )}

            {/* =================================================
                USER ROAD POINT
            ================================================= */}

            {routeInfo?.userRoadPoint && (
              <Marker
                longitude={
                  routeInfo.userRoadPoint[0]
                }
                latitude={
                  routeInfo.userRoadPoint[1]
                }
                anchor="center"
              >
                <div
                  title="Road starting point"
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "#60A5FA",
                    border: "2px solid white",
                    boxShadow:
                      "0 1px 5px rgba(0,0,0,0.4)",
                  }}
                />
              </Marker>
            )}

            {/* =================================================
                CELL ROAD POINT
            ================================================= */}

            {routeInfo?.cellRoadPoint && (
              <Marker
                longitude={
                  routeInfo.cellRoadPoint[0]
                }
                latitude={
                  routeInfo.cellRoadPoint[1]
                }
                anchor="center"
              >
                <div
                  title="Road destination point"
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "#F87171",
                    border: "2px solid white",
                    boxShadow:
                      "0 1px 5px rgba(0,0,0,0.4)",
                  }}
                />
              </Marker>
            )}

          </Map>

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
                Finding the nearest roads
                and calculating a
                realistic driving route...
              </p>

            </div>
          )}

          {!routeLoading &&
            route.length > 1 &&
            routeInfo && (
              <div className="route-details">

                <div className="route-stat">
                  <span>
                    Road distance
                  </span>

                  <strong>
                    {routeInfo.distance.toFixed(2)}{" "}
                    km
                  </strong>
                </div>

                <div className="route-stat">
                  <span>
                    Estimated driving time
                  </span>

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
                A road route could not be
                calculated for this cell.
                The cell coordinate may be
                too far from a drivable road.
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

          <h2>
            Closest OpenCelliD Cell
          </h2>

          <div className="cell-details">

            <div>
              <span>
                Cell ID
              </span>

              <strong>
                {nearestCell.cell_id ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>
                Distance
              </span>

              <strong>
                {nearestCell.distance.toFixed(2)}{" "}
                km
              </strong>
            </div>

            <div>
              <span>
                Radio
              </span>

              <strong>
                {nearestCell.radio ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>
                MCC
              </span>

              <strong>
                {nearestCell.mcc ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>
                MNC
              </span>

              <strong>
                {nearestCell.mnc ??
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>
                LAC
              </span>

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

            {cells.map(
              (cell, index) => {

                const distance =
                  location
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
                    String(
                      cell.cell_id
                    );

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
                        {Number(
                          cell.latitude
                        ).toFixed(5)}
                        ,{" "}
                        {Number(
                          cell.longitude
                        ).toFixed(5)}
                      </span>

                      {distance !== null && (
                        <span>
                          {distance.toFixed(2)}{" "}
                          km
                        </span>
                      )}

                    </div>

                  </div>
                );
              }
            )}

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

        <h2>
          OpenCelliD + Local PostgreSQL
        </h2>

        <p>
          Cell information is retrieved
          through your local backend and
          stored in your PostgreSQL database.
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

        <h2>
          How the route works
        </h2>

        <p>
          The map first finds the nearest
          drivable road to your location
          and the nearest drivable road
          to the selected cell. It then
          calculates a road-based route
          between those two points.
        </p>

        <p className="muted-text">
          The blue line represents a
          driving-road route. The cell
          coordinate itself may not be
          located directly on a road.
        </p>

      </section>

    </div>
  );
}

export default App;
// import { useEffect, useMemo, useState } from "react";
// import Map, {
//   Marker,
//   Source,
//   Layer,
//   NavigationControl,
// } from "react-map-gl/maplibre";

// import { setWorkerUrl } from "maplibre-gl";
// import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

// import "maplibre-gl/dist/maplibre-gl.css";
// import "./App.css";

// setWorkerUrl(workerUrl);

// /* =========================================================
//    CONFIGURATION
// ========================================================= */

// const BACKEND_URL = "http://localhost:3000";

// const MAP_STYLE =
//   "https://tiles.openfreemap.org/styles/liberty";

// const VALHALLA_URL =
//   "https://valhalla1.openstreetmap.de/route";

// /* =========================================================
//    HELPERS
// ========================================================= */

// function isValidCoordinate(latitude, longitude) {
//   return (
//     Number.isFinite(Number(latitude)) &&
//     Number.isFinite(Number(longitude)) &&
//     Number(latitude) >= -90 &&
//     Number(latitude) <= 90 &&
//     Number(longitude) >= -180 &&
//     Number(longitude) <= 180
//   );
// }

// /* Haversine distance */
// function calculateDistance(
//   lat1,
//   lon1,
//   lat2,
//   lon2
// ) {
//   const R = 6371;

//   const dLat =
//     ((Number(lat2) - Number(lat1)) *
//       Math.PI) /
//     180;

//   const dLon =
//     ((Number(lon2) - Number(lon1)) *
//       Math.PI) /
//     180;

//   const a =
//     Math.sin(dLat / 2) *
//       Math.sin(dLat / 2) +
//     Math.cos(
//       (Number(lat1) * Math.PI) / 180
//     ) *
//       Math.cos(
//         (Number(lat2) * Math.PI) / 180
//       ) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c =
//     2 *
//     Math.atan2(
//       Math.sqrt(a),
//       Math.sqrt(1 - a)
//     );

//   return R * c;
// }

// /* Convert different backend/OpenCelliD
//    response formats into one consistent format */
// function normalizeCell(cell, index = 0) {
//   if (!cell) {
//     return null;
//   }

//   const latitude = Number(
//     cell.latitude ??
//       cell.lat ??
//       cell.latitute
//   );

//   const longitude = Number(
//     cell.longitude ??
//       cell.lon ??
//       cell.lng ??
//       cell.long
//   );

//   if (
//     !isValidCoordinate(
//       latitude,
//       longitude
//     )
//   ) {
//     return null;
//   }

//   return {
//     ...cell,

//     id:
//       cell.id ??
//       cell.cell_id ??
//       cell.cellId ??
//       `cell-${index}`,

//     cell_id:
//       cell.cell_id ??
//       cell.cellId ??
//       cell.id ??
//       `cell-${index}`,

//     latitude,
//     longitude,

//     operator:
//       cell.operator ??
//       cell.network ??
//       cell.mnc ??
//       "Unknown",

//     technology:
//       cell.technology ??
//       cell.radio ??
//       "Unknown",

//     radio:
//       cell.radio ??
//       cell.technology ??
//       "Unknown",

//     mcc:
//       cell.mcc ??
//       "Unknown",

//     mnc:
//       cell.mnc ??
//       "Unknown",

//     lac:
//       cell.lac ??
//       "Unknown",

//     range:
//       cell.range ?? null,

//     samples:
//       cell.samples ?? null,
//   };
// }

// /* =========================================================
//    APP
// ========================================================= */

// function App() {
//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [location, setLocation] =
//     useState(null);

//   const [cells, setCells] =
//     useState([]);

//   const [nearestCell, setNearestCell] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(false);

//   const [locationLoading, setLocationLoading] =
//     useState(false);

//   const [routeLoading, setRouteLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const [routeError, setRouteError] =
//     useState("");

//   const [route, setRoute] =
//     useState([]);

//   const [routeInfo, setRouteInfo] =
//     useState(null);

//   const [databaseStatus, setDatabaseStatus] =
//     useState("Not checked");

//   const [lastUpdated, setLastUpdated] =
//     useState(null);

//   /* =======================================================
//      GET USER LOCATION
//   ======================================================= */

//   const getLocation = () => {
//     setLocationLoading(true);
//     setError("");

//     console.log(
//       "Requesting browser location..."
//     );

//     if (!navigator.geolocation) {
//       setError(
//         "Geolocation is not supported by this browser."
//       );

//       setLocationLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const latitude =
//           position.coords.latitude;

//         const longitude =
//           position.coords.longitude;

//         console.log(
//           "SUCCESS - GPS position received"
//         );

//         console.log(
//           "GPS coordinates:",
//           {
//             latitude,
//             longitude,
//           }
//         );

//         if (
//           !isValidCoordinate(
//             latitude,
//             longitude
//           )
//         ) {
//           setError(
//             "Browser returned invalid GPS coordinates."
//           );

//           setLocationLoading(false);
//           return;
//         }

//         const userLocation = {
//           latitude,
//           longitude,

//           accuracy:
//             position.coords.accuracy,
//         };

//         setLocation(
//           userLocation
//         );

//         setLocationLoading(false);
//       },

//       (geoError) => {
//         console.error(
//           "GPS ERROR:",
//           geoError
//         );

//         let message =
//           "Unable to get your location.";

//         if (
//           geoError.code ===
//           geoError.PERMISSION_DENIED
//         ) {
//           message =
//             "Location permission was denied. Please allow location access in your browser.";
//         } else if (
//           geoError.code ===
//           geoError.POSITION_UNAVAILABLE
//         ) {
//           message =
//             "Your current location is unavailable.";
//         } else if (
//           geoError.code ===
//           geoError.TIMEOUT
//         ) {
//           message =
//             "Location request timed out. Please try again.";
//         }

//         setError(message);
//         setLocationLoading(false);
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

//   const fetchOpenCellIdData = async (
//     latitude,
//     longitude
//   ) => {
//     try {
//       setLoading(true);
//       setError("");
//       setRouteError("");

//       console.log(
//         "REQUESTING OPENCELLID DATA"
//       );

//       console.log(
//         "User location:",
//         latitude,
//         longitude
//       );

//       const response = await fetch(
//         `${BACKEND_URL}/api/opencellid?lat=${latitude}&lon=${longitude}`
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Backend returned HTTP ${response.status}`
//         );
//       }

//       const data =
//         await response.json();

//       console.log(
//         "OpenCelliD data:",
//         data
//       );

//       /* -----------------------------------------------
//          Support different possible backend responses
//       ----------------------------------------------- */

//       let rawCells = [];

//       if (Array.isArray(data)) {
//         rawCells = data;
//       } else if (
//         Array.isArray(data.cells)
//       ) {
//         rawCells = data.cells;
//       } else if (
//         Array.isArray(data.data)
//       ) {
//         rawCells = data.data;
//       } else if (
//         Array.isArray(data.results)
//       ) {
//         rawCells = data.results;
//       }

//       const normalizedCells =
//         rawCells
//           .map(
//             (cell, index) =>
//               normalizeCell(
//                 cell,
//                 index
//               )
//           )
//           .filter(Boolean);

//       console.log(
//         "Normalized cells:",
//         normalizedCells
//       );

//       setCells(
//         normalizedCells
//       );

//       setLastUpdated(
//         new Date()
//       );

//       setDatabaseStatus(
//         normalizedCells.length > 0
//           ? `${normalizedCells.length} cells loaded`
//           : "No cells found"
//       );

//       if (
//         normalizedCells.length === 0
//       ) {
//         setError(
//           "No valid cellular towers were returned."
//         );
//       }

//       return normalizedCells;
//     } catch (err) {
//       console.error(
//         "OpenCelliD fetch error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Failed to fetch OpenCelliD data."
//       );

//       setCells([]);
//       setDatabaseStatus(
//         "Connection failed"
//       );

//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      FIND NEAREST CELL
//   ======================================================= */

//   useEffect(() => {
//     if (
//       !location ||
//       cells.length === 0
//     ) {
//       setNearestCell(null);
//       return;
//     }

//     const validCells =
//       cells.filter((cell) =>
//         isValidCoordinate(
//           cell.latitude,
//           cell.longitude
//         )
//       );

//     if (validCells.length === 0) {
//       setNearestCell(null);
//       return;
//     }

//     const cellsWithDistance =
//       validCells.map((cell) => {
//         const distance =
//           calculateDistance(
//             location.latitude,
//             location.longitude,
//             cell.latitude,
//             cell.longitude
//           );

//         return {
//           ...cell,
//           distance,
//         };
//       });

//     cellsWithDistance.sort(
//       (a, b) =>
//         a.distance - b.distance
//     );

//     const closest =
//       cellsWithDistance[0];

//     console.log(
//       "Nearest cell:",
//       closest
//     );

//     setNearestCell(
//       closest
//     );
//   }, [location, cells]);

//   /* =======================================================
//      GET LOCATION + FETCH CELLS
//   ======================================================= */

//   const handleFindTowers = () => {
//     setError("");
//     setRouteError("");
//     setRoute([]);
//     setRouteInfo(null);

//     if (!navigator.geolocation) {
//       setError(
//         "Geolocation is not supported by this browser."
//       );
//       return;
//     }

//     setLocationLoading(true);

//     console.log(
//       "Requesting browser location..."
//     );

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const latitude =
//           position.coords.latitude;

//         const longitude =
//           position.coords.longitude;

//         console.log(
//           "SUCCESS - GPS position received"
//         );

//         console.log(
//           "GPS coordinates:",
//           {
//             latitude,
//             longitude,
//           }
//         );

//         const userLocation = {
//           latitude,
//           longitude,
//           accuracy:
//             position.coords.accuracy,
//         };

//         setLocation(
//           userLocation
//         );

//         setLocationLoading(false);

//         await fetchOpenCellIdData(
//           latitude,
//           longitude
//         );
//       },

//       (geoError) => {
//         console.error(
//           "GPS ERROR:",
//           geoError
//         );

//         let message =
//           "Unable to get your location.";

//         if (
//           geoError.code ===
//           geoError.PERMISSION_DENIED
//         ) {
//           message =
//             "Location permission was denied. Please allow location access.";
//         } else if (
//           geoError.code ===
//           geoError.POSITION_UNAVAILABLE
//         ) {
//           message =
//             "Your current location is unavailable.";
//         } else if (
//           geoError.code ===
//           geoError.TIMEOUT
//         ) {
//           message =
//             "Location request timed out. Try again.";
//         }

//         setError(message);
//         setLocationLoading(false);
//       },

//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 0,
//       }
//     );
//   };

//   /* =======================================================
//      LOAD CELLS WHEN LOCATION ALREADY EXISTS
//   ======================================================= */

//   const handleRefreshCells = async () => {
//     if (!location) {
//       getLocation();
//       return;
//     }

//     await fetchOpenCellIdData(
//       location.latitude,
//       location.longitude
//     );
//   };

//   /* =======================================================
//      VALHALLA ROAD ROUTING
//   ======================================================= */

//   useEffect(() => {
//     if (
//       !location ||
//       !nearestCell
//     ) {
//       setRoute([]);
//       setRouteInfo(null);
//       return;
//     }

//     const getRoadRoute =
//       async () => {
//         try {
//           setRouteLoading(true);
//           setRouteError("");
//           setRoute([]);
//           setRouteInfo(null);

//           const userLat =
//             Number(
//               location.latitude
//             );

//           const userLon =
//             Number(
//               location.longitude
//             );

//           const cellLat =
//             Number(
//               nearestCell.latitude
//             );

//           const cellLon =
//             Number(
//               nearestCell.longitude
//             );

//           if (
//             !isValidCoordinate(
//               userLat,
//               userLon
//             )
//           ) {
//             throw new Error(
//               "Invalid user GPS coordinates."
//             );
//           }

//           if (
//             !isValidCoordinate(
//               cellLat,
//               cellLon
//             )
//           ) {
//             throw new Error(
//               "Invalid cell coordinates."
//             );
//           }

//           console.log(
//             "================================"
//           );

//           console.log(
//             "STARTING VALHALLA ROUTING"
//           );

//           console.log(
//             "User:",
//             userLat,
//             userLon
//           );

//           console.log(
//             "Nearest cell:",
//             cellLat,
//             cellLon
//           );

//           console.log(
//             "================================"
//           );

//           /* -------------------------------------------
//              IMPORTANT

//              We DO NOT use OSRM nearest-road first.

//              Valhalla receives the actual user and
//              tower coordinates and performs the road
//              routing itself.
//           ------------------------------------------- */

//           const requestBody = {
//             locations: [
//               {
//                 lat: userLat,
//                 lon: userLon,
//                 type: "break",
//               },

//               {
//                 lat: cellLat,
//                 lon: cellLon,
//                 type: "break",
//               },
//             ],

//             costing: "auto",

//             units: "kilometers",

//             /* Ask Valhalla for GeoJSON geometry
//                instead of encoded polyline */
//             shape_format: "geojson",

//             directions_options: {
//               units: "kilometers",
//             },
//           };

//           console.log(
//             "Valhalla request:",
//             requestBody
//           );

//           const response =
//             await fetch(
//               VALHALLA_URL,
//               {
//                 method: "POST",

//                 headers: {
//                   "Content-Type":
//                     "application/json",

//                   "X-Client-Id":
//                     "cell-tower-finder",
//                 },

//                 body: JSON.stringify(
//                   requestBody
//                 ),
//               }
//             );

//           console.log(
//             "Valhalla HTTP status:",
//             response.status
//           );

//           if (!response.ok) {
//             const errorText =
//               await response.text();

//             console.error(
//               "Valhalla error response:",
//               errorText
//             );

//             throw new Error(
//               `Valhalla routing failed (${response.status})`
//             );
//           }

//           const data =
//             await response.json();

//           console.log(
//             "Valhalla response:",
//             data
//           );

//           if (
//             !data.trip
//           ) {
//             throw new Error(
//               "Valhalla did not return a trip."
//             );
//           }

//           if (
//             !data.trip.legs ||
//             data.trip.legs.length ===
//               0
//           ) {
//             throw new Error(
//               "Valhalla returned no route legs."
//             );
//           }

//           /* -------------------------------------------
//              GET ROUTE GEOMETRY
//           ------------------------------------------- */

//           const allCoordinates =
//             [];

//           data.trip.legs.forEach(
//             (leg) => {
//               if (!leg.shape) {
//                 return;
//               }

//               /* GeoJSON shape */

//               if (
//                 typeof leg.shape ===
//                 "object"
//               ) {
//                 if (
//                   Array.isArray(
//                     leg.shape.coordinates
//                   )
//                 ) {
//                   allCoordinates.push(
//                     ...leg.shape.coordinates
//                   );
//                 }
//               }

//               /* Fallback:
//                  some Valhalla servers can still
//                  return encoded polyline.
//               */

//               else if (
//                 typeof leg.shape ===
//                 "string"
//               ) {
//                 const decoded =
//                   decodePolyline6(
//                     leg.shape
//                   );

//                 allCoordinates.push(
//                   ...decoded
//                 );
//               }
//             }
//           );

//           if (
//             allCoordinates.length <
//             2
//           ) {
//             throw new Error(
//               "Valhalla returned an empty route."
//             );
//           }

//           /* -------------------------------------------
//              IMPORTANT

//              MapLibre GeoJSON uses:

//              [longitude, latitude]
//           ------------------------------------------- */

//           const validRoute =
//             allCoordinates.filter(
//               (coordinate) =>
//                 Array.isArray(
//                   coordinate
//                 ) &&
//                 coordinate.length >=
//                   2 &&
//                 isValidCoordinate(
//                   Number(
//                     coordinate[1]
//                   ),
//                   Number(
//                     coordinate[0]
//                   )
//                 )
//             );

//           if (
//             validRoute.length < 2
//           ) {
//             throw new Error(
//               "Valhalla returned invalid route coordinates."
//             );
//           }

//           console.log(
//             "Route coordinates:",
//             validRoute
//           );

//           setRoute(
//             validRoute
//           );

//           /* -------------------------------------------
//              ROUTE SUMMARY
//           ------------------------------------------- */

//           const summary =
//             data.trip.summary ||
//             {};

//           const distance =
//             Number(
//               summary.length || 0
//             );

//           const durationMinutes =
//             Number(
//               summary.time || 0
//             ) / 60;

//           setRouteInfo({
//             distance:
//               distance,

//             duration:
//               durationMinutes,

//             userRoadPoint: [
//               userLon,
//               userLat,
//             ],

//             cellRoadPoint: [
//               cellLon,
//               cellLat,
//             ],
//           });

//           console.log(
//             "================================"
//           );

//           console.log(
//             "VALHALLA ROUTE SUCCESS"
//           );

//           console.log(
//             "Distance:",
//             distance,
//             "km"
//           );

//           console.log(
//             "Duration:",
//             durationMinutes,
//             "minutes"
//           );

//           console.log(
//             "================================"
//           );
//         } catch (err) {
//           console.error(
//             "VALHALLA ROUTING ERROR:",
//             err
//           );

//           setRoute([]);
//           setRouteInfo(null);

//           setRouteError(
//             err.message ||
//               "Unable to calculate road route."
//           );
//         } finally {
//           setRouteLoading(false);
//         }
//       };

//     getRoadRoute();
//   }, [
//     location,
//     nearestCell,
//   ]);

//   /* =======================================================
//      VALHALLA POLYLINE6 FALLBACK DECODER
//   ======================================================= */

//   function decodePolyline6(
//     encoded
//   ) {
//     const coordinates = [];

//     let index = 0;
//     let latitude = 0;
//     let longitude = 0;

//     while (
//       index <
//       encoded.length
//     ) {
//       let result = 0;
//       let shift = 0;
//       let byte;

//       do {
//         byte =
//           encoded.charCodeAt(
//             index++
//           ) - 63;

//         result |=
//           (byte & 0x1f) <<
//           shift;

//         shift += 5;
//       } while (
//         byte >= 0x20
//       );

//       const deltaLatitude =
//         result & 1
//           ? ~(result >> 1)
//           : result >> 1;

//       latitude +=
//         deltaLatitude;

//       result = 0;
//       shift = 0;

//       do {
//         byte =
//           encoded.charCodeAt(
//             index++
//           ) - 63;

//         result |=
//           (byte & 0x1f) <<
//           shift;

//         shift += 5;
//       } while (
//         byte >= 0x20
//       );

//       const deltaLongitude =
//         result & 1
//           ? ~(result >> 1)
//           : result >> 1;

//       longitude +=
//         deltaLongitude;

//       /* Valhalla uses 6 decimal places */

//       coordinates.push([
//         longitude / 1e6,
//         latitude / 1e6,
//       ]);
//     }

//     return coordinates;
//   }

//   /* =======================================================
//      ROUTE GEOJSON
//   ======================================================= */

//   const routeGeoJSON =
//     useMemo(() => {
//       if (
//         !route ||
//         route.length < 2
//       ) {
//         return null;
//       }

//       return {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "LineString",
//           coordinates: route,
//         },
//       };
//     }, [route]);

//   /* =======================================================
//      MAP CENTER
//   ======================================================= */

//   const mapCenter = useMemo(() => {
//     if (location) {
//       return {
//         longitude:
//           Number(
//             location.longitude
//           ),

//         latitude:
//           Number(
//             location.latitude
//           ),

//         zoom: 15,
//       };
//     }

//     return {
//       longitude: 73.8567,
//       latitude: 18.5204,
//       zoom: 12,
//     };
//   }, [location]);

//   /* =======================================================
//      FORMATTERS
//   ======================================================= */

//   const formatDistance = (
//     distance
//   ) => {
//     if (
//       distance === null ||
//       distance === undefined ||
//       !Number.isFinite(
//         Number(distance)
//       )
//     ) {
//       return "--";
//     }

//     if (
//       Number(distance) <
//       1
//     ) {
//       return `${(
//         Number(distance) * 1000
//       ).toFixed(0)} m`;
//     }

//     return `${Number(
//       distance
//     ).toFixed(2)} km`;
//   };

//   const formatDuration = (
//     minutes
//   ) => {
//     if (
//       !Number.isFinite(
//         Number(minutes)
//       )
//     ) {
//       return "--";
//     }

//     const rounded =
//       Math.round(
//         Number(minutes)
//       );

//     if (
//       rounded < 60
//     ) {
//       return `${rounded} min`;
//     }

//     const hours =
//       Math.floor(
//         rounded / 60
//       );

//     const mins =
//       rounded % 60;

//     return `${hours}h ${mins}m`;
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div className="app">
//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <header className="app-header">
//         <div>
//           <h1>
//             Cell Tower Finder
//           </h1>

//           <p>
//             Find nearby cellular towers
//             and calculate the road route
//           </p>
//         </div>

//         <div className="header-actions">
//           <button
//             className="primary-btn"
//             onClick={
//               handleFindTowers
//             }
//             disabled={
//               locationLoading ||
//               loading
//             }
//           >
//             {locationLoading
//               ? "Getting Location..."
//               : loading
//               ? "Finding Towers..."
//               : "Find Nearby Towers"}
//           </button>
//         </div>
//       </header>

//       {/* =================================================
//           ERROR
//       ================================================= */}

//       {error && (
//         <div className="error-box">
//           <strong>
//             Error
//           </strong>

//           <span>
//             {error}
//           </span>
//         </div>
//       )}

//       {/* =================================================
//           ROUTE ERROR
//       ================================================= */}

//       {routeError && (
//         <div className="error-box">
//           <strong>
//             Routing Error
//           </strong>

//           <span>
//             {routeError}
//           </span>
//         </div>
//       )}

//       {/* =================================================
//           LOCATION CARD
//       ================================================= */}

//       <section className="info-section">
//         <div className="section-header">
//           <h2>
//             Your Location
//           </h2>

//           <button
//             className="secondary-btn"
//             onClick={
//               handleRefreshCells
//             }
//             disabled={
//               locationLoading ||
//               loading
//             }
//           >
//             Refresh
//           </button>
//         </div>

//         {location ? (
//           <div className="location-grid">
//             <div className="info-card">
//               <span className="card-label">
//                 Latitude
//               </span>

//               <strong>
//                 {location.latitude.toFixed(
//                   7
//                 )}
//               </strong>
//             </div>

//             <div className="info-card">
//               <span className="card-label">
//                 Longitude
//               </span>

//               <strong>
//                 {location.longitude.toFixed(
//                   7
//                 )}
//               </strong>
//             </div>

//             <div className="info-card">
//               <span className="card-label">
//                 Accuracy
//               </span>

//               <strong>
//                 {location.accuracy
//                   ? `${Math.round(
//                       location.accuracy
//                     )} m`
//                   : "--"}
//               </strong>
//             </div>
//           </div>
//         ) : (
//           <div className="empty-state">
//             Click "Find Nearby Towers"
//             to get your current GPS
//             location.
//           </div>
//         )}
//       </section>

//       {/* =================================================
//           MAP
//       ================================================= */}

//       <section className="map-section">
//         <div className="section-header">
//           <div>
//             <h2>
//               Cellular Network Map
//             </h2>

//             <p>
//               OpenFreeMap + MapLibre
//             </p>
//           </div>

//           <div className="map-status">
//             {loading
//               ? "Loading cells..."
//               : cells.length > 0
//               ? `${cells.length} cells`
//               : "No cells loaded"}
//           </div>
//         </div>

//         <div className="map-container">
//           <Map
//             initialViewState={
//               mapCenter
//             }
//             longitude={
//               mapCenter.longitude
//             }
//             latitude={
//               mapCenter.latitude
//             }
//             zoom={
//               mapCenter.zoom
//             }
//             mapStyle={
//               MAP_STYLE
//             }
//             style={{
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <NavigationControl
//               position="top-right"
//             />

//             {/* -----------------------------------------
//                 USER LOCATION
//             ----------------------------------------- */}

//             {location &&
//               isValidCoordinate(
//                 location.latitude,
//                 location.longitude
//               ) && (
//                 <Marker
//                   longitude={
//                     Number(
//                       location.longitude
//                     )
//                   }
//                   latitude={
//                     Number(
//                       location.latitude
//                     )
//                   }
//                   anchor="center"
//                 >
//                   <div className="user-marker">
//                     <div className="user-marker-dot" />
//                   </div>
//                 </Marker>
//               )}

//             {/* -----------------------------------------
//                 ALL CELL MARKERS
//             ----------------------------------------- */}

//             {cells.map(
//               (
//                 cell,
//                 index
//               ) => {
//                 if (
//                   !isValidCoordinate(
//                     cell.latitude,
//                     cell.longitude
//                   )
//                 ) {
//                   return null;
//                 }

//                 const isNearest =
//                   nearestCell &&
//                   String(
//                     nearestCell.id
//                   ) ===
//                     String(
//                       cell.id
//                     );

//                 return (
//                   <Marker
//                     key={
//                       `${cell.id}-${index}`
//                     }
//                     longitude={
//                       Number(
//                         cell.longitude
//                       )
//                     }
//                     latitude={
//                       Number(
//                         cell.latitude
//                       )
//                     }
//                     anchor="center"
//                   >
//                     <div
//                       className={
//                         isNearest
//                           ? "tower-marker nearest-tower-marker"
//                           : "tower-marker"
//                       }
//                       title={
//                         `${cell.operator} ${cell.technology}`
//                       }
//                     >
//                       <span>
//                         📡
//                       </span>
//                     </div>
//                   </Marker>
//                 );
//               }
//             )}

//             {/* -----------------------------------------
//                 ROUTE
//             ----------------------------------------- */}

//             {routeGeoJSON && (
//               <Source
//                 id="road-route"
//                 type="geojson"
//                 data={
//                   routeGeoJSON
//                 }
//               >
//                 <Layer
//                   id="road-route-line"
//                   type="line"
//                   paint={{
//                     "line-color":
//                       "#2563EB",

//                     "line-width": 6,

//                     "line-opacity": 0.9,
//                   }}
//                   layout={{
//                     "line-cap":
//                       "round",

//                     "line-join":
//                       "round",
//                   }}
//                 />
//               </Source>
//             )}
//           </Map>
//         </div>
//       </section>

//       {/* =================================================
//           ROUTE STATUS
//       ================================================= */}

//       <section className="info-section">
//         <div className="section-header">
//           <h2>
//             Road Routing
//           </h2>

//           <div className="route-engine">
//             {routeLoading
//               ? "Calculating..."
//               : "Valhalla"}
//           </div>
//         </div>

//         {routeLoading && (
//           <div className="loading-box">
//             Finding the road route
//             between your location and
//             the nearest cellular tower...
//           </div>
//         )}

//         {!routeLoading &&
//           routeInfo && (
//             <div className="location-grid">
//               <div className="info-card">
//                 <span className="card-label">
//                   Road Distance
//                 </span>

//                 <strong>
//                   {formatDistance(
//                     routeInfo.distance
//                   )}
//                 </strong>
//               </div>

//               <div className="info-card">
//                 <span className="card-label">
//                   Estimated Drive Time
//                 </span>

//                 <strong>
//                   {formatDuration(
//                     routeInfo.duration
//                   )}
//                 </strong>
//               </div>

//               <div className="info-card">
//                 <span className="card-label">
//                   Routing Engine
//                 </span>

//                 <strong>
//                   Valhalla
//                 </strong>
//               </div>
//             </div>
//           )}

//         {!routeLoading &&
//           !routeInfo &&
//           nearestCell && (
//             <div className="empty-state">
//               Calculating the road
//               route...
//             </div>
//           )}

//         {!nearestCell &&
//           location && (
//             <div className="empty-state">
//               No nearby cell selected
//               yet.
//             </div>
//           )}
//       </section>

//       {/* =================================================
//           NEAREST CELL
//       ================================================= */}

//       <section className="info-section">
//         <div className="section-header">
//           <h2>
//             Nearest Cell
//           </h2>
//         </div>

//         {nearestCell ? (
//           <div className="nearest-cell-card">
//             <div className="nearest-cell-main">
//               <div className="tower-icon">
//                 📡
//               </div>

//               <div>
//                 <h3>
//                   {nearestCell.operator ||
//                     "Unknown Operator"}
//                 </h3>

//                 <p>
//                   Cell ID:{" "}
//                   {nearestCell.cell_id}
//                 </p>
//               </div>
//             </div>

//             <div className="location-grid">
//               <div className="info-card">
//                 <span className="card-label">
//                   Distance
//                 </span>

//                 <strong>
//                   {formatDistance(
//                     nearestCell.distance
//                   )}
//                 </strong>
//               </div>

//               <div className="info-card">
//                 <span className="card-label">
//                   Technology
//                 </span>

//                 <strong>
//                   {nearestCell.technology ||
//                     nearestCell.radio ||
//                     "Unknown"}
//                 </strong>
//               </div>

//               <div className="info-card">
//                 <span className="card-label">
//                   Coordinates
//                 </span>

//                 <strong>
//                   {Number(
//                     nearestCell.latitude
//                   ).toFixed(
//                     6
//                   )}
//                   ,{" "}
//                   {Number(
//                     nearestCell.longitude
//                   ).toFixed(
//                     6
//                   )}
//                 </strong>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="empty-state">
//             No nearest cell available.
//           </div>
//         )}
//       </section>

//       {/* =================================================
//           ALL CELLS
//       ================================================= */}

//       <section className="info-section">
//         <div className="section-header">
//           <h2>
//             Nearby Cells
//           </h2>

//           <span>
//             {cells.length} found
//           </span>
//         </div>

//         {cells.length > 0 ? (
//           <div className="cells-table-wrapper">
//             <table className="cells-table">
//               <thead>
//                 <tr>
//                   <th>
//                     #
//                   </th>

//                   <th>
//                     Cell ID
//                   </th>

//                   <th>
//                     Operator
//                   </th>

//                   <th>
//                     Technology
//                   </th>

//                   <th>
//                     Latitude
//                   </th>

//                   <th>
//                     Longitude
//                   </th>

//                   <th>
//                     Distance
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {cells
//                   .map(
//                     (
//                       cell,
//                       index
//                     ) => {
//                       const distance =
//                         location
//                           ? calculateDistance(
//                               location.latitude,
//                               location.longitude,
//                               cell.latitude,
//                               cell.longitude
//                             )
//                           : null;

//                       const isNearest =
//                         nearestCell &&
//                         String(
//                           nearestCell.id
//                         ) ===
//                           String(
//                             cell.id
//                           );

//                       return (
//                         <tr
//                           key={
//                             `${cell.id}-row-${index}`
//                           }
//                           className={
//                             isNearest
//                               ? "nearest-row"
//                               : ""
//                           }
//                         >
//                           <td>
//                             {index +
//                               1}
//                           </td>

//                           <td>
//                             {
//                               cell.cell_id
//                             }
//                           </td>

//                           <td>
//                             {
//                               cell.operator
//                             }
//                           </td>

//                           <td>
//                             {
//                               cell.technology ||
//                               cell.radio
//                             }
//                           </td>

//                           <td>
//                             {Number(
//                               cell.latitude
//                             ).toFixed(
//                               6
//                             )}
//                           </td>

//                           <td>
//                             {Number(
//                               cell.longitude
//                             ).toFixed(
//                               6
//                             )}
//                           </td>

//                           <td>
//                             {formatDistance(
//                               distance
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     }
//                   )}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="empty-state">
//             No cellular cells loaded.
//           </div>
//         )}
//       </section>

//       {/* =================================================
//           DATABASE STATUS
//       ================================================= */}

//       <section className="info-section">
//         <div className="section-header">
//           <h2>
//             Database Status
//           </h2>
//         </div>

//         <div className="location-grid">
//           <div className="info-card">
//             <span className="card-label">
//               Backend
//             </span>

//             <strong>
//               {BACKEND_URL}
//             </strong>
//           </div>

//           <div className="info-card">
//             <span className="card-label">
//               Cell Data
//             </span>

//             <strong>
//               {databaseStatus}
//             </strong>
//           </div>

//           <div className="info-card">
//             <span className="card-label">
//               Last Updated
//             </span>

//             <strong>
//               {lastUpdated
//                 ? lastUpdated.toLocaleTimeString()
//                 : "--"}
//             </strong>
//           </div>
//         </div>
//       </section>

//       {/* =================================================
//           ROUTING INFORMATION
//       ================================================= */}

//       <section className="info-section routing-info">
//         <h2>
//           How the Route Works
//         </h2>

//         <div className="route-steps">
//           <div className="route-step">
//             <div className="step-number">
//               1
//             </div>

//             <div>
//               <strong>
//                 Browser GPS
//               </strong>

//               <p>
//                 Gets your current
//                 latitude and longitude.
//               </p>
//             </div>
//           </div>

//           <div className="route-step">
//             <div className="step-number">
//               2
//             </div>

//             <div>
//               <strong>
//                 OpenCelliD
//               </strong>

//               <p>
//                 Finds cellular cells
//                 around your location.
//               </p>
//             </div>
//           </div>

//           <div className="route-step">
//             <div className="step-number">
//               3
//             </div>

//             <div>
//               <strong>
//                 Nearest Cell
//               </strong>

//               <p>
//                 The Haversine calculation
//                 identifies the closest
//                 cell.
//               </p>
//             </div>
//           </div>

//           <div className="route-step">
//             <div className="step-number">
//               4
//             </div>

//             <div>
//               <strong>
//                 Valhalla
//               </strong>

//               <p>
//                 Calculates a real road
//                 route using the OpenStreetMap
//                 road network.
//               </p>
//             </div>
//           </div>

//           <div className="route-step">
//             <div className="step-number">
//               5
//             </div>

//             <div>
//               <strong>
//                 MapLibre
//               </strong>

//               <p>
//                 Displays the resulting
//                 road route on the map.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default App;