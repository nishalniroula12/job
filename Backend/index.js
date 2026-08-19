import dotenv from "dotenv";

import app from "./app.js";

import connectdatabase from "./config/db.js";

dotenv.config();


// ==========================================
// DATABASE CONNECTION
// ==========================================

connectdatabase();


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});