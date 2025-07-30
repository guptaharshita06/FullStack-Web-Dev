const prompt = require("prompt-sync")({ sigint: true });
const pool = require("./db");

async function insertUser() {
  try {
    const name = prompt("👤 Enter name: ");
    const email = prompt("📧 Enter email: ");
    const age = prompt("🎂 Enter age: ");

    const result = await pool.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );

    console.log("✅ User added successfully:", result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting user:", err.message);
  } finally {
    pool.end(); // connection close
  }
}

module.exports = { insertUser };  // ✅ Export the function
