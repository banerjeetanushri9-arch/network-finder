// // // // // require("dotenv").config();

// // // // // const express = require("express");
// // // // // const cors = require("cors");
// // // // // const { Pool } = require("pg");

// // // // // const app = express();

// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // const pool = new Pool({
// // // // //   host: process.env.DB_HOST,
// // // // //   port: process.env.DB_PORT,
// // // // //   database: process.env.DB_NAME,
// // // // //   user: process.env.DB_USER,
// // // // //   password: process.env.DB_PASSWORD,
// // // // // });

// // // // // app.get("/api/towers", async (req, res) => {
// // // // //   try {
// // // // //     const result = await pool.query(`
// // // // //       SELECT tower_id, latitude, longitude, operator, technology
// // // // //       FROM cell_towers
// // // // //       ORDER BY tower_id;
// // // // //     `);

// // // // //     res.json(result.rows);
// // // // //   } catch (error) {
// // // // //     console.error("Database error:", error);

// // // // //     res.status(500).json({
// // // // //       error: "Failed to fetch towers",
// // // // //     });
// // // // //   }
// // // // // });

// // // // // app.listen(3000, () => {
// // // // //   console.log("Server running at http://localhost:3000");
// // // // // });
// // // // require("dotenv").config();

// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const { Pool } = require("pg");

// // // // const app = express();

// // // // app.use(cors());
// // // // app.use(express.json());

// // // // /*
// // // // ========================================
// // // // POSTGRESQL CONNECTION
// // // // ========================================
// // // // */

// // // // const pool = new Pool({
// // // //   host: process.env.DB_HOST,
// // // //   port: process.env.DB_PORT,
// // // //   database: process.env.DB_NAME,
// // // //   user: process.env.DB_USER,
// // // //   password: process.env.DB_PASSWORD,
// // // // });


// // // // /*
// // // // ========================================
// // // // OLD POSTGRESQL TOWER API
// // // // ========================================
// // // // */

// // // // app.get("/api/towers", async (req, res) => {
// // // //   try {
// // // //     const result = await pool.query(`
// // // //       SELECT
// // // //         tower_id,
// // // //         latitude,
// // // //         longitude,
// // // //         operator,
// // // //         technology
// // // //       FROM cell_towers
// // // //       ORDER BY tower_id;
// // // //     `);

// // // //     res.json(result.rows);

// // // //   } catch (error) {

// // // //     console.error(
// // // //       "Database error:",
// // // //       error
// // // //     );

// // // //     res.status(500).json({
// // // //       error: "Failed to fetch towers",
// // // //     });
// // // //   }
// // // // });


// // // // /*
// // // // ========================================
// // // // OPENCELLID API
// // // // ========================================

// // // // Frontend sends:

// // // // /api/opencellid?lat=18.xxxx&lng=73.xxxx

// // // // Backend:
// // // // 1. Gets user's location
// // // // 2. Creates a small search area
// // // // 3. Calls OpenCelliD
// // // // 4. Sends cells back to React
// // // // ========================================
// // // // */

// // // // app.get("/api/opencellid", async (req, res) => {

// // // //   try {

// // // //     const { lat, lng } = req.query;


// // // //     /*
// // // //     Check location
// // // //     */

// // // //     if (!lat || !lng) {

// // // //       return res.status(400).json({
// // // //         error:
// // // //           "Latitude and longitude are required",
// // // //       });

// // // //     }


// // // //     const latitude = Number(lat);
// // // //     const longitude = Number(lng);


// // // //     /*
// // // //     Check that coordinates are valid
// // // //     */

// // // //     if (
// // // //       Number.isNaN(latitude) ||
// // // //       Number.isNaN(longitude)
// // // //     ) {

// // // //       return res.status(400).json({
// // // //         error:
// // // //           "Invalid latitude or longitude",
// // // //       });

// // // //     }


// // // //     /*
// // // //     ========================================
// // // //     SEARCH AREA
// // // //     ========================================

// // // //     Small area around the user.

// // // //     We use 0.008 degrees so that the
// // // //     bounding box stays within the
// // // //     OpenCelliD area limit.
// // // //     */

// // // //     const latOffset = 0.008;
// // // //     const lngOffset = 0.008;


// // // //     const latMin =
// // // //       latitude - latOffset;

// // // //     const latMax =
// // // //       latitude + latOffset;

// // // //     const lngMin =
// // // //       longitude - lngOffset;

// // // //     const lngMax =
// // // //       longitude + lngOffset;


// // // //     /*
// // // //     ========================================
// // // //     OPENCELLID REQUEST
// // // //     ========================================
// // // //     */

// // // //     const apiKey =
// // // //       process.env.OPENCELLID_API_KEY;


// // // //     if (!apiKey) {

// // // //       return res.status(500).json({
// // // //         error:
// // // //           "OpenCelliD API key is missing in .env",
// // // //       });

// // // //     }


// // // //     const url =
// // // //       `https://opencellid.org/cell/getInArea` +
// // // //       `?key=${encodeURIComponent(apiKey)}` +
// // // //       `&latmin=${latMin}` +
// // // //       `&lonmin=${lngMin}` +
// // // //       `&latmax=${latMax}` +
// // // //       `&lonmax=${lngMax}` +
// // // //       `&format=json` +
// // // //       `&limit=50`;


// // // //     console.log(
// // // //       "Requesting cells from OpenCelliD..."
// // // //     );


// // // //     const response =
// // // //       await fetch(url);


// // // //     const data =
// // // //       await response.json();


// // // //     console.log(
// // // //       "OpenCelliD response received"
// // // //     );


// // // //     /*
// // // //     ========================================
// // // //     HANDLE API ERROR
// // // //     ========================================
// // // //     */

// // // //     if (!response.ok) {

// // // //       console.error(
// // // //         "OpenCelliD HTTP error:",
// // // //         data
// // // //       );

// // // //       return res.status(response.status).json({
// // // //         error:
// // // //           "OpenCelliD request failed",

// // // //         details: data,
// // // //       });

// // // //     }


// // // //     /*
// // // //     OpenCelliD can return an error
// // // //     inside a successful HTTP response.
// // // //     */

// // // //     if (data.error) {

// // // //       console.error(
// // // //         "OpenCelliD API error:",
// // // //         data
// // // //       );

// // // //       return res.status(400).json({
// // // //         error:
// // // //           data.error,

// // // //         code:
// // // //           data.code,
// // // //       });

// // // //     }


// // // //     /*
// // // //     ========================================
// // // //     GET CELLS
// // // //     ========================================
// // // //     */

// // // //     const cells =
// // // //       Array.isArray(data.cells)
// // // //         ? data.cells
// // // //         : [];


// // // //     /*
// // // //     ========================================
// // // //     CONVERT OPENCELLID DATA
// // // //     ========================================

// // // //     We convert the response into a
// // // //     simple structure for React.
// // // //     */

// // // //     const formattedCells =
// // // //       cells.map((cell) => ({

// // // //         cell_id:
// // // //           cell.cellid,

// // // //         latitude:
// // // //           Number(cell.lat),

// // // //         longitude:
// // // //           Number(cell.lon),

// // // //         mcc:
// // // //           cell.mcc,

// // // //         mnc:
// // // //           cell.mnc,

// // // //         lac:
// // // //           cell.lac,

// // // //         radio:
// // // //           cell.radio,

// // // //         range:
// // // //           cell.range,

// // // //         samples:
// // // //           cell.samples,

// // // //         created:
// // // //           cell.created,

// // // //         updated:
// // // //           cell.updated,

// // // //       }));


// // // //     /*
// // // //     ========================================
// // // //     SEND TO REACT
// // // //     ========================================
// // // //     */

// // // //     res.json({

// // // //       count:
// // // //         formattedCells.length,

// // // //       cells:
// // // //         formattedCells,

// // // //     });


// // // //   } catch (error) {

// // // //     console.error(
// // // //       "OpenCelliD error:",
// // // //       error
// // // //     );


// // // //     res.status(500).json({

// // // //       error:
// // // //         "Failed to fetch OpenCelliD data",

// // // //     });

// // // //   }

// // // // });


// // // // /*
// // // // ========================================
// // // // HOME ROUTE
// // // // ========================================
// // // // */

// // // // app.get("/", (req, res) => {

// // // //   res.send(
// // // //     "Network Finder Backend is running!"
// // // //   );

// // // // });


// // // // /*
// // // // ========================================
// // // // START SERVER
// // // // ========================================
// // // // */

// // // // app.listen(3000, () => {

// // // //   console.log(
// // // //     "Server running at http://localhost:3000"
// // // //   );

// // // // });


// // // require("dotenv").config();

// // // const express = require("express");
// // // const cors = require("cors");
// // // const { Pool } = require("pg");

// // // const app = express();

// // // app.use(cors());
// // // app.use(express.json());


// // // /*
// // // ========================================
// // // POSTGRESQL CONNECTION
// // // ========================================
// // // */

// // // const pool = new Pool({
// // //   host: process.env.DB_HOST,
// // //   port: process.env.DB_PORT,
// // //   database: process.env.DB_NAME,
// // //   user: process.env.DB_USER,
// // //   password: process.env.DB_PASSWORD,
// // // });


// // // /*
// // // ========================================
// // // POSTGRESQL TOWERS
// // // ========================================
// // // */

// // // app.get("/api/towers", async (req, res) => {
// // //   try {
// // //     const result = await pool.query(`
// // //       SELECT
// // //         tower_id,
// // //         latitude,
// // //         longitude,
// // //         operator,
// // //         technology
// // //       FROM cell_towers
// // //       ORDER BY tower_id;
// // //     `);

// // //     res.json(result.rows);

// // //   } catch (error) {
// // //     console.error("Database error:", error);

// // //     res.status(500).json({
// // //       error: "Failed to fetch towers",
// // //       details: error.message,
// // //     });
// // //   }
// // // });


// // // /*
// // // ========================================
// // // OPENCELLID
// // // ========================================
// // // */

// // // app.get("/api/opencellid", async (req, res) => {

// // //   try {

// // //     /*
// // //     Get user's location
// // //     */

// // //     const { lat, lng } = req.query;


// // //     if (!lat || !lng) {

// // //       return res.status(400).json({
// // //         error:
// // //           "Latitude and longitude are required.",
// // //       });

// // //     }


// // //     const latitude = Number(lat);
// // //     const longitude = Number(lng);


// // //     /*
// // //     Check coordinates
// // //     */

// // //     if (
// // //       Number.isNaN(latitude) ||
// // //       Number.isNaN(longitude)
// // //     ) {

// // //       return res.status(400).json({
// // //         error:
// // //           "Invalid latitude or longitude.",
// // //       });

// // //     }


// // //     /*
// // //     ========================================
// // //     SEARCH AREA
// // //     ========================================

// // //     Small area around the user.

// // //     0.008 degrees keeps the area
// // //     within the OpenCelliD limit.
// // //     */

// // //     const latOffset = 0.008;
// // //     const lngOffset = 0.008;


// // //     const latMin =
// // //       latitude - latOffset;

// // //     const latMax =
// // //       latitude + latOffset;

// // //     const lngMin =
// // //       longitude - lngOffset;

// // //     const lngMax =
// // //       longitude + lngOffset;


// // //     /*
// // //     ========================================
// // //     API KEY
// // //     ========================================
// // //     */

// // //     const apiKey =
// // //       process.env.OPENCELLID_API_KEY;


// // //     if (!apiKey) {

// // //       return res.status(500).json({

// // //         error:
// // //           "OpenCelliD API key is missing. " +
// // //           "Add OPENCELLID_API_KEY to server/.env",

// // //       });

// // //     }


// // //     /*
// // //     ========================================
// // //     BBOX
// // //     ========================================
// // //     */

// // //     const bbox =
// // //       `${latMin},${lngMin},${latMax},${lngMax}`;


// // //     /*
// // //     ========================================
// // //     OPENCELLID URL
// // //     ========================================
// // //     */

// // //     const url =
// // //       `https://opencellid.org/cell/getInArea` +
// // //       `?key=${encodeURIComponent(apiKey)}` +
// // //       `&BBOX=${encodeURIComponent(bbox)}` +
// // //       `&format=json` +
// // //       `&limit=50`;


// // //     console.log(
// // //       "Requesting OpenCelliD data..."
// // //     );

// // //     console.log(
// // //       "Search area:",
// // //       bbox
// // //     );


// // //     /*
// // //     ========================================
// // //     CALL OPENCELLID
// // //     ========================================
// // //     */

// // //     const response =
// // //       await fetch(url);


// // //     const data =
// // //       await response.json();


// // //     console.log(
// // //       "OpenCelliD HTTP status:",
// // //       response.status
// // //     );


// // //     console.log(
// // //       "OpenCelliD response:",
// // //       data
// // //     );


// // //     /*
// // //     ========================================
// // //     HTTP ERROR
// // //     ========================================
// // //     */

// // //     if (!response.ok) {

// // //       return res.status(response.status).json({

// // //         error:
// // //           data.error ||
// // //           "OpenCelliD request failed.",

// // //         code:
// // //           data.code,

// // //         details:
// // //           data,

// // //       });

// // //     }


// // //     /*
// // //     ========================================
// // //     OPENCELLID API ERROR
// // //     ========================================
// // //     */

// // //     if (data.error) {

// // //       return res.status(400).json({

// // //         error:
// // //           data.error,

// // //         code:
// // //           data.code,

// // //         details:
// // //           data,

// // //       });

// // //     }


// // //     /*
// // //     ========================================
// // //     GET CELLS
// // //     ========================================
// // //     */

// // //     const cells =
// // //       Array.isArray(data.cells)
// // //         ? data.cells
// // //         : [];


// // //     /*
// // //     ========================================
// // //     FORMAT CELLS
// // //     ========================================
// // //     */

// // //     const formattedCells =
// // //       cells
// // //         .filter((cell) => {

// // //           return (
// // //             cell.lat !== undefined &&
// // //             cell.lon !== undefined
// // //           );

// // //         })
// // //         .map((cell) => {

// // //           return {

// // //             cell_id:
// // //               cell.cellid,

// // //             latitude:
// // //               Number(cell.lat),

// // //             longitude:
// // //               Number(cell.lon),

// // //             mcc:
// // //               cell.mcc,

// // //             mnc:
// // //               cell.mnc,

// // //             lac:
// // //               cell.lac,

// // //             radio:
// // //               cell.radio,

// // //             range:
// // //               cell.range,

// // //             samples:
// // //               cell.samples,

// // //             created:
// // //               cell.created,

// // //             updated:
// // //               cell.updated,

// // //           };

// // //         });


// // //     /*
// // //     ========================================
// // //     SEND DATA TO REACT
// // //     ========================================
// // //     */

// // //     res.json({

// // //       count:
// // //         formattedCells.length,

// // //       cells:
// // //         formattedCells,

// // //     });


// // //   } catch (error) {

// // //     console.error(
// // //       "OpenCelliD server error:",
// // //       error
// // //     );


// // //     res.status(500).json({

// // //       error:
// // //         "Failed to connect to OpenCelliD.",

// // //       details:
// // //         error.message,

// // //     });

// // //   }

// // // });


// // // /*
// // // ========================================
// // // HOME ROUTE
// // // ========================================
// // // */

// // // app.get("/", (req, res) => {

// // //   res.send(
// // //     "Network Finder Backend is running!"
// // //   );

// // // });


// // // /*
// // // ========================================
// // // START SERVER
// // // ========================================
// // // */

// // // app.listen(3000, () => {

// // //   console.log(
// // //     "Server running at http://localhost:3000"
// // //   );

// // // });


// // require("dotenv").config();

// // const express = require("express");
// // const cors = require("cors");
// // const { Pool } = require("pg");

// // const app = express();

// // app.use(cors());
// // app.use(express.json());


// // /*
// // ========================================
// // POSTGRESQL CONNECTION
// // ========================================
// // */

// // const pool = new Pool({
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// //   database: process.env.DB_NAME,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// // });


// // /*
// // ========================================
// // TEST DATABASE CONNECTION
// // ========================================
// // */

// // pool.connect()
// //   .then((client) => {

// //     console.log("DATABASE CONNECTION SUCCESS");

// //     client.release();

// //   })
// //   .catch((error) => {

// //     console.error(
// //       "DATABASE CONNECTION FAILED:",
// //       error.message
// //     );

// //   });


// // /*
// // ========================================
// // OLD POSTGRESQL TOWER API
// // ========================================
// // */

// // app.get("/api/towers", async (req, res) => {

// //   try {

// //     const result = await pool.query(`
// //       SELECT
// //         tower_id,
// //         latitude,
// //         longitude,
// //         operator,
// //         technology
// //       FROM cell_towers
// //       ORDER BY tower_id;
// //     `);


// //     res.json(result.rows);


// //   } catch (error) {

// //     console.error(
// //       "Database error:",
// //       error
// //     );


// //     res.status(500).json({

// //       error:
// //         "Failed to fetch towers",

// //       details:
// //         error.message,

// //     });

// //   }

// // });


// // /*
// // ========================================
// // OPENCELLID API
// // ========================================
// // */

// // app.get("/api/opencellid", async (req, res) => {

// //   try {

// //     /*
// //     ======================================
// //     GET USER LOCATION
// //     ======================================
// //     */

// //     const { lat, lng } = req.query;


// //     if (!lat || !lng) {

// //       return res.status(400).json({

// //         error:
// //           "Latitude and longitude are required.",

// //       });

// //     }


// //     const latitude =
// //       Number(lat);

// //     const longitude =
// //       Number(lng);


// //     if (
// //       Number.isNaN(latitude) ||
// //       Number.isNaN(longitude)
// //     ) {

// //       return res.status(400).json({

// //         error:
// //           "Invalid latitude or longitude.",

// //       });

// //     }


// //     /*
// //     ======================================
// //     CREATE SEARCH AREA
// //     ======================================
// //     */

// //     const latOffset = 0.008;

// //     const lngOffset = 0.008;


// //     const latMin =
// //       latitude - latOffset;

// //     const latMax =
// //       latitude + latOffset;

// //     const lngMin =
// //       longitude - lngOffset;

// //     const lngMax =
// //       longitude + lngOffset;


// //     /*
// //     ======================================
// //     API KEY
// //     ======================================
// //     */

// //     const apiKey =
// //       process.env.OPENCELLID_API_KEY;


// //     if (!apiKey) {

// //       return res.status(500).json({

// //         error:
// //           "OpenCelliD API key is missing.",

// //       });

// //     }


// //     /*
// //     ======================================
// //     BBOX
// //     ======================================
// //     */

// //     const bbox =
// //       `${latMin},${lngMin},${latMax},${lngMax}`;


// //     /*
// //     ======================================
// //     OPENCELLID REQUEST
// //     ======================================
// //     */

// //     const url =
// //       `https://opencellid.org/cell/getInArea` +
// //       `?key=${encodeURIComponent(apiKey)}` +
// //       `&BBOX=${encodeURIComponent(bbox)}` +
// //       `&format=json` +
// //       `&limit=50`;


// //     console.log("");
// //     console.log(
// //       "========================================"
// //     );
// //     console.log(
// //       "REQUESTING OPENCELLID DATA"
// //     );
// //     console.log(
// //       "========================================"
// //     );

// //     console.log(
// //       "Location:",
// //       latitude,
// //       longitude
// //     );


// //     /*
// //     ======================================
// //     CALL OPENCELLID
// //     ======================================
// //     */

// //     const response =
// //       await fetch(url);


// //     const data =
// //       await response.json();


// //     console.log(
// //       "OpenCelliD status:",
// //       response.status
// //     );


// //     /*
// //     ======================================
// //     HANDLE API ERROR
// //     ======================================
// //     */

// //     if (!response.ok) {

// //       console.error(
// //         "OpenCelliD error:",
// //         data
// //       );


// //       return res.status(
// //         response.status
// //       ).json({

// //         error:
// //           data.error ||
// //           "OpenCelliD request failed.",

// //         code:
// //           data.code,

// //         details:
// //           data,

// //       });

// //     }


// //     if (data.error) {

// //       console.error(
// //         "OpenCelliD API error:",
// //         data
// //       );


// //       return res.status(400).json({

// //         error:
// //           data.error,

// //         code:
// //           data.code,

// //         details:
// //           data,

// //       });

// //     }


// //     /*
// //     ======================================
// //     GET CELLS
// //     ======================================
// //     */

// //     const cells =
// //       Array.isArray(data.cells)
// //         ? data.cells
// //         : [];


// //     console.log(
// //       "Cells received:",
// //       cells.length
// //     );


// //     /*
// //     ======================================
// //     SAVE CELLS TO POSTGRESQL
// //     ======================================
// //     */

// //     for (const cell of cells) {

// //       /*
// //       Ignore incomplete records
// //       */

// //       if (
// //         cell.lat === undefined ||
// //         cell.lon === undefined
// //       ) {

// //         continue;

// //       }


// //       await pool.query(
// //         `
// //         INSERT INTO opencellid_cells (

// //           cell_id,
// //           latitude,
// //           longitude,
// //           mcc,
// //           mnc,
// //           lac,
// //           radio,
// //           range,
// //           samples,
// //           created,
// //           updated

// //         )

// //         VALUES (

// //           $1,
// //           $2,
// //           $3,
// //           $4,
// //           $5,
// //           $6,
// //           $7,
// //           $8,
// //           $9,
// //           $10,
// //           $11

// //         );
// //         `,

// //         [

// //           cell.cellid || null,

// //           Number(cell.lat),

// //           Number(cell.lon),

// //           cell.mcc || null,

// //           cell.mnc || null,

// //           cell.lac || null,

// //           cell.radio || null,

// //           cell.range || null,

// //           cell.samples || null,

// //           cell.created || null,

// //           cell.updated || null,

// //         ]

// //       );

// //     }


// //     console.log(
// //       "Saved cells to PostgreSQL:",
// //       cells.length
// //     );


// //     /*
// //     ======================================
// //     FORMAT DATA FOR REACT
// //     ======================================
// //     */

// //     const formattedCells =
// //       cells
// //         .filter((cell) => {

// //           return (
// //             cell.lat !== undefined &&
// //             cell.lon !== undefined
// //           );

// //         })
// //         .map((cell) => {

// //           return {

// //             cell_id:
// //               cell.cellid,

// //             latitude:
// //               Number(cell.lat),

// //             longitude:
// //               Number(cell.lon),

// //             mcc:
// //               cell.mcc,

// //             mnc:
// //               cell.mnc,

// //             lac:
// //               cell.lac,

// //             radio:
// //               cell.radio,

// //             range:
// //               cell.range,

// //             samples:
// //               cell.samples,

// //             created:
// //               cell.created,

// //             updated:
// //               cell.updated,

// //           };

// //         });


// //     /*
// //     ======================================
// //     SEND DATA TO REACT
// //     ======================================
// //     */

// //     res.json({

// //       count:
// //         formattedCells.length,

// //       cells:
// //         formattedCells,

// //     });


// //   } catch (error) {

// //     console.error(
// //       "Server error:",
// //       error
// //     );


// //     res.status(500).json({

// //       error:
// //         "Failed to process OpenCelliD data.",

// //       details:
// //         error.message,

// //     });

// //   }

// // });


// // /*
// // ========================================
// // GET SAVED OPENCELLID DATA
// // ========================================

// // This will be important for OFFLINE mode.

// // React can eventually use:

// // /api/saved-cells

// // instead of OpenCelliD.
// // ========================================
// // */

// // app.get("/api/saved-cells", async (req, res) => {

// //   try {

// //     const result =
// //       await pool.query(`
// //         SELECT
// //           id,
// //           cell_id,
// //           latitude,
// //           longitude,
// //           mcc,
// //           mnc,
// //           lac,
// //           radio,
// //           range,
// //           samples,
// //           created,
// //           updated,
// //           fetched_at
// //         FROM opencellid_cells
// //         ORDER BY id;
// //       `);


// //     res.json({

// //       count:
// //         result.rows.length,

// //       cells:
// //         result.rows,

// //     });


// //   } catch (error) {

// //     console.error(
// //       "Saved cells error:",
// //       error
// //     );


// //     res.status(500).json({

// //       error:
// //         "Failed to fetch saved cells.",

// //       details:
// //         error.message,

// //     });

// //   }

// // });


// // /*
// // ========================================
// // HOME ROUTE
// // ========================================
// // */

// // app.get("/", (req, res) => {

// //   res.send(
// //     "Network Finder Backend is running!"
// //   );

// // });


// // /*
// // ========================================
// // START SERVER
// // ========================================
// // */

// // app.listen(3000, () => {

// //   console.log(
// //     "Server running at http://localhost:3000"
// //   );

// // });




// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });

// // --------------------------------------------------
// // DATABASE CONNECTION TEST
// // --------------------------------------------------

// pool
//   .query("SELECT NOW()")
//   .then(() => {
//     console.log("DATABASE CONNECTION SUCCESS");
//   })
//   .catch((error) => {
//     console.error("DATABASE CONNECTION FAILED:", error.message);
//   });

// // --------------------------------------------------
// // EXISTING LOCAL TOWER API
// // --------------------------------------------------

// app.get("/api/towers", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         tower_id,
//         latitude,
//         longitude,
//         operator,
//         technology
//       FROM cell_towers
//       ORDER BY tower_id;
//     `);

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Tower API error:", error.message);

//     res.status(500).json({
//       error: "Failed to fetch towers",
//     });
//   }
// });

// // --------------------------------------------------
// // OPENCELLID: GET CELLS AROUND USER
// // --------------------------------------------------

// app.get("/api/opencellid", async (req, res) => {
//   try {
//     const { lat, lng } = req.query;

//     if (!lat || !lng) {
//       return res.status(400).json({
//         error: "Latitude and longitude are required",
//       });
//     }

//     const latitude = Number(lat);
//     const longitude = Number(lng);

//     if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
//       return res.status(400).json({
//         error: "Invalid latitude or longitude",
//       });
//     }

//     const apiKey = process.env.OPENCELLID_API_KEY;

//     if (!apiKey) {
//       return res.status(500).json({
//         error: "OpenCelliD API key is missing",
//       });
//     }

//     // Keep the search area small enough for OpenCelliD.
//     const offset = 0.008;

//     const latMin = latitude - offset;
//     const latMax = latitude + offset;
//     const lngMin = longitude - offset;
//     const lngMax = longitude + offset;

//     const bbox =
//       `${latMin},${lngMin},${latMax},${lngMax}`;

//     console.log("Searching OpenCelliD around:", latitude, longitude);

//     // ------------------------------------------------
//     // STEP 1:
//     // Get cells in the user's area
//     // ------------------------------------------------

//     const areaUrl =
//       `https://opencellid.org/cell/getInArea` +
//       `?key=${encodeURIComponent(apiKey)}` +
//       `&BBOX=${encodeURIComponent(bbox)}` +
//       `&format=json` +
//       `&limit=50`;

//     const areaResponse = await fetch(areaUrl);

//     if (!areaResponse.ok) {
//       const errorText = await areaResponse.text();

//       console.error(
//         "OpenCelliD getInArea error:",
//         areaResponse.status,
//         errorText
//       );

//       return res.status(502).json({
//         error: "OpenCelliD area request failed",
//         status: areaResponse.status,
//       });
//     }

//     const areaData = await areaResponse.json();

//     const areaCells = Array.isArray(areaData.cells)
//       ? areaData.cells
//       : [];

//     console.log(
//       `OpenCelliD returned ${areaCells.length} cells`
//     );

//     // ------------------------------------------------
//     // STEP 2:
//     // Get individual position for each cell
//     // ------------------------------------------------

//     const detailedCells = [];

//     for (const cell of areaCells) {
//       try {
//         if (
//           cell.mcc == null ||
//           cell.mnc == null ||
//           cell.lac == null ||
//           cell.cellid == null
//         ) {
//           console.log(
//             "Skipping cell because identification data is missing:",
//             cell
//           );

//           continue;
//         }

//         const cellUrl =
//           `https://opencellid.org/cell/get` +
//           `?key=${encodeURIComponent(apiKey)}` +
//           `&mcc=${encodeURIComponent(cell.mcc)}` +
//           `&mnc=${encodeURIComponent(cell.mnc)}` +
//           `&lac=${encodeURIComponent(cell.lac)}` +
//           `&cellid=${encodeURIComponent(cell.cellid)}` +
//           `&format=json`;

//         const cellResponse = await fetch(cellUrl);

//         if (!cellResponse.ok) {
//           console.log(
//             `Individual lookup failed for cell ${cell.cellid}:`,
//             cellResponse.status
//           );

//           continue;
//         }

//         const cellData = await cellResponse.json();

//         // Different API responses can expose the
//         // individual cell either directly or in cells[0].
//         const detailedCell =
//           Array.isArray(cellData.cells) && cellData.cells.length > 0
//             ? cellData.cells[0]
//             : cellData;

//         const detailedLat = Number(detailedCell.lat);
//         const detailedLng = Number(detailedCell.lon);

//         if (
//           !Number.isFinite(detailedLat) ||
//           !Number.isFinite(detailedLng)
//         ) {
//           console.log(
//             `No valid coordinates for cell ${cell.cellid}`
//           );

//           continue;
//         }

//         const finalCell = {
//           cellid: Number(cell.cellid),
//           lat: detailedLat,
//           lon: detailedLng,
//           mcc: Number(cell.mcc),
//           mnc: Number(cell.mnc),
//           lac: Number(cell.lac),
//           radio: cell.radio || detailedCell.radio || null,
//           range:
//             cell.range != null
//               ? Number(cell.range)
//               : detailedCell.range != null
//               ? Number(detailedCell.range)
//               : null,
//           samples:
//             cell.samples != null
//               ? Number(cell.samples)
//               : detailedCell.samples != null
//               ? Number(detailedCell.samples)
//               : null,
//           created:
//             cell.created != null
//               ? Number(cell.created)
//               : detailedCell.created != null
//               ? Number(detailedCell.created)
//               : null,
//           updated:
//             cell.updated != null
//               ? Number(cell.updated)
//               : detailedCell.updated != null
//               ? Number(detailedCell.updated)
//               : null,
//         };

//         detailedCells.push(finalCell);

//       } catch (individualError) {
//         console.error(
//           `Error processing cell ${cell.cellid}:`,
//           individualError.message
//         );
//       }
//     }

//     console.log(
//       `Successfully obtained detailed coordinates for ${detailedCells.length} cells`
//     );

//     // ------------------------------------------------
//     // STEP 3:
//     // Save detailed cells in PostgreSQL
//     // ------------------------------------------------

//     for (const cell of detailedCells) {
//       await pool.query(
//         `
//         INSERT INTO opencellid_cells (
//           cell_id,
//           latitude,
//           longitude,
//           mcc,
//           mnc,
//           lac,
//           radio,
//           range,
//           samples,
//           created,
//           updated
//         )
//         VALUES (
//           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
//         );
//         `,
//         [
//           cell.cellid,
//           cell.lat,
//           cell.lon,
//           cell.mcc,
//           cell.mnc,
//           cell.lac,
//           cell.radio,
//           cell.range,
//           cell.samples,
//           cell.created,
//           cell.updated,
//         ]
//       );
//     }

//     // ------------------------------------------------
//     // STEP 4:
//     // Send detailed cells back to React
//     // ------------------------------------------------

//     res.json({
//       count: detailedCells.length,
//       cells: detailedCells,
//     });

//   } catch (error) {
//     console.error(
//       "Failed to process OpenCelliD data:",
//       error
//     );

//     res.status(500).json({
//       error: "Failed to process OpenCelliD data",
//       details: error.message,
//     });
//   }
// });

// // --------------------------------------------------
// // SAVED OPENCELLID CELLS
// // --------------------------------------------------

// app.get("/api/saved-cells", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         id,
//         cell_id,
//         latitude,
//         longitude,
//         mcc,
//         mnc,
//         lac,
//         radio,
//         range,
//         samples,
//         created,
//         updated,
//         fetched_at
//       FROM opencellid_cells
//       ORDER BY id;
//     `);

//     res.json(result.rows);

//   } catch (error) {
//     console.error(
//       "Saved cells error:",
//       error.message
//     );

//     res.status(500).json({
//       error: "Failed to fetch saved cells",
//     });
//   }
// });

// // --------------------------------------------------
// // START SERVER
// // --------------------------------------------------

// app.listen(3000, () => {
//   console.log(
//     "Server running at http://localhost:3000"
//   );
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// --------------------------------------------------
// DATABASE CONNECTION TEST
// --------------------------------------------------

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("DATABASE CONNECTION SUCCESS");
  })
  .catch((error) => {
    console.error(
      "DATABASE CONNECTION FAILED:",
      error.message
    );
  });

// --------------------------------------------------
// EXISTING LOCAL TOWER API
// --------------------------------------------------

app.get("/api/towers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        tower_id,
        latitude,
        longitude,
        operator,
        technology
      FROM cell_towers
      ORDER BY tower_id;
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(
      "Tower API error:",
      error.message
    );

    res.status(500).json({
      error: "Failed to fetch towers",
      details: error.message,
    });
  }
});

// --------------------------------------------------
// OPENCELLID API
// --------------------------------------------------

app.get("/api/opencellid", async (req, res) => {

  try {

    // ----------------------------------------------
    // GET USER LOCATION
    // ----------------------------------------------

    const { lat, lng } = req.query;

    if (!lat || !lng) {

      return res.status(400).json({
        error:
          "Latitude and longitude are required",
      });

    }

    const latitude = Number(lat);
    const longitude = Number(lng);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {

      return res.status(400).json({
        error:
          "Invalid latitude or longitude",
      });

    }

    // ----------------------------------------------
    // API KEY
    // ----------------------------------------------

    const apiKey =
      process.env.OPENCELLID_API_KEY;

    if (!apiKey) {

      return res.status(500).json({
        error:
          "OpenCelliD API key is missing",
      });

    }

    // ----------------------------------------------
    // CREATE SEARCH AREA
    // ----------------------------------------------

    const offset = 0.008;

    const latMin =
      latitude - offset;

    const latMax =
      latitude + offset;

    const lngMin =
      longitude - offset;

    const lngMax =
      longitude + offset;

    const bbox =
      `${latMin},${lngMin},${latMax},${lngMax}`;

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "REQUESTING OPENCELLID DATA"
    );
    console.log(
      "========================================"
    );

    console.log(
      "User location:",
      latitude,
      longitude
    );

    // ----------------------------------------------
    // OPENCELLID REQUEST
    // ----------------------------------------------

    const url =
      `https://opencellid.org/cell/getInArea` +
      `?key=${encodeURIComponent(apiKey)}` +
      `&BBOX=${encodeURIComponent(bbox)}` +
      `&format=json` +
      `&limit=50`;

    const response =
      await fetch(url);

    const data =
      await response.json();

    console.log(
      "OpenCelliD HTTP status:",
      response.status
    );

    // ----------------------------------------------
    // HANDLE OPENCELLID HTTP ERROR
    // ----------------------------------------------

    if (!response.ok) {

      console.error(
        "OpenCelliD HTTP error:",
        data
      );

      return res.status(response.status).json({

        error:
          data.error ||
          "OpenCelliD request failed",

        code:
          data.code,

        details:
          data,

      });

    }

    // ----------------------------------------------
    // HANDLE OPENCELLID API ERROR
    // ----------------------------------------------

    if (data.error) {

      console.error(
        "OpenCelliD API error:",
        data
      );

      return res.status(400).json({

        error:
          data.error,

        code:
          data.code,

        details:
          data,

      });

    }

    // ----------------------------------------------
    // GET CELLS
    // ----------------------------------------------

    const cells =
      Array.isArray(data.cells)
        ? data.cells
        : [];

    console.log(
      "Cells received:",
      cells.length
    );

    // ----------------------------------------------
    // SAVE CELLS TO POSTGRESQL
    // ----------------------------------------------

    let insertedCount = 0;
    let skippedCount = 0;

    for (const cell of cells) {

      // --------------------------------------------
      // IGNORE INCOMPLETE RECORDS
      // --------------------------------------------

      if (
        cell.cellid === undefined ||
        cell.cellid === null ||
        cell.lat === undefined ||
        cell.lon === undefined
      ) {

        console.log(
          "Skipping incomplete cell:",
          cell
        );

        continue;
      }

      const cellId =
        Number(cell.cellid);

      const cellLatitude =
        Number(cell.lat);

      const cellLongitude =
        Number(cell.lon);

      // --------------------------------------------
      // VALIDATE DATA
      // --------------------------------------------

      if (
        !Number.isFinite(cellId) ||
        !Number.isFinite(cellLatitude) ||
        !Number.isFinite(cellLongitude)
      ) {

        console.log(
          "Skipping invalid cell:",
          cell
        );

        continue;
      }

      // --------------------------------------------
      // INSERT
      //
      // IMPORTANT:
      // ON CONFLICT prevents duplicate cell IDs.
      // --------------------------------------------

      const result =
        await pool.query(
          `
          INSERT INTO opencellid_cells (

            cell_id,
            latitude,
            longitude,
            mcc,
            mnc,
            lac,
            radio,
            range,
            samples,
            created,
            updated

          )

          VALUES (

            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11

          )

          ON CONFLICT (cell_id)
          DO NOTHING;
          `,

          [

            cellId,

            cellLatitude,

            cellLongitude,

            cell.mcc || null,

            cell.mnc || null,

            cell.lac || null,

            cell.radio || null,

            cell.range || null,

            cell.samples || null,

            cell.created || null,

            cell.updated || null,

          ]
        );

      // --------------------------------------------
      // COUNT INSERTED / SKIPPED
      // --------------------------------------------

      if (result.rowCount === 1) {

        insertedCount++;

      } else {

        skippedCount++;

      }

    }

    console.log(
      "New cells inserted:",
      insertedCount
    );

    console.log(
      "Existing cells skipped:",
      skippedCount
    );

    // ----------------------------------------------
    // FORMAT DATA FOR REACT
    // ----------------------------------------------

    const formattedCells =
      cells
        .filter((cell) => {

          return (
            cell.cellid !== undefined &&
            cell.lat !== undefined &&
            cell.lon !== undefined
          );

        })
        .map((cell) => {

          return {

            cell_id:
              Number(cell.cellid),

            latitude:
              Number(cell.lat),

            longitude:
              Number(cell.lon),

            mcc:
              cell.mcc,

            mnc:
              cell.mnc,

            lac:
              cell.lac,

            radio:
              cell.radio,

            range:
              cell.range,

            samples:
              cell.samples,

            created:
              cell.created,

            updated:
              cell.updated,

          };

        });

    // ----------------------------------------------
    // SEND DATA TO REACT
    // ----------------------------------------------

    res.json({

      count:
        formattedCells.length,

      inserted:
        insertedCount,

      skipped:
        skippedCount,

      cells:
        formattedCells,

    });

  } catch (error) {

    console.error(
      "OpenCelliD server error:",
      error
    );

    res.status(500).json({

      error:
        "Failed to process OpenCelliD data",

      details:
        error.message,

    });

  }

});

// --------------------------------------------------
// GET SAVED OPENCELLID DATA
// --------------------------------------------------

app.get("/api/saved-cells", async (req, res) => {

  try {

    const result =
      await pool.query(`
        SELECT
          id,
          cell_id,
          latitude,
          longitude,
          mcc,
          mnc,
          lac,
          radio,
          range,
          samples,
          created,
          updated,
          fetched_at

        FROM opencellid_cells

        ORDER BY id;
      `);

    res.json({

      count:
        result.rows.length,

      cells:
        result.rows,

    });

  } catch (error) {

    console.error(
      "Saved cells error:",
      error
    );

    res.status(500).json({

      error:
        "Failed to fetch saved cells",

      details:
        error.message,

    });

  }

});

// --------------------------------------------------
// HOME ROUTE
// --------------------------------------------------

app.get("/", (req, res) => {

  res.send(
    "Network Finder Backend is running!"
  );

});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(3000, () => {

  console.log(
    "Server running at http://localhost:3000"
  );

});