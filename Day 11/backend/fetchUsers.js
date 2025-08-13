const pool = require("./db");

async function fetchUsers() {
  try {
    const result = await pool.query("SELECT * FROM users");

    if (result.rows.length === 0) {
      console.log("ℹ️ No users found in the database.");
    } else {
      console.log("📋 Users in database:");
      result.rows.forEach((user) => {
        console.log(`🧑 ${user.id}. ${user.name} | ${user.email} | Age: ${user.age}`);
      });
    }
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
  } finally {
    pool.end();
  }
}

module.exports = { fetchUsers };
