const pool = require("./db");
const prompt = require("prompt-sync")();

async function deleteUser() {
  const choice = prompt("Delete by (1) ID or (2) Email? ");

  let query = "";
  let value;

  if (choice === "1") {
    const id = prompt("Enter user ID to delete: ");
    query = "DELETE FROM users WHERE id = $1";
    value = [id];
  } else if (choice === "2") {
    const email = prompt("Enter user Email to delete: ");
    query = "DELETE FROM users WHERE email = $1";
    value = [email];
  } else {
    console.log("❌ Invalid choice");
    return;
  }

  try {
    const result = await pool.query(query, value);
    if (result.rowCount === 0) {
      console.log("⚠️ No user found with the given input.");
    } else {
      console.log("✅ User deleted successfully!");
    }
  } catch (err) {
    console.error("❌ Error deleting user:", err.message);
  } finally {
    pool.end();
  }
}

module.exports = { deleteUser };
