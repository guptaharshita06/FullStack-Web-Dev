const pool = require("./db");

pool
  .connect()
  .then(() => {
    console.log("✅ DB Connected at:", new Date().toISOString());
    process.exit();
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err.message);
    process.exit(1);
  });
