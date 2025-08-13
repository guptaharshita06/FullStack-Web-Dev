const prompt = require("prompt-sync")();
const { insertUser } = require("./insertUser");
const { fetchUsers } = require("./fetchUsers");
const { deleteUser } = require("./deleteUser");

function showMenu() {
  console.log("\n📋 === USER MANAGEMENT MENU ===");
  console.log("1️⃣  Add User");
  console.log("2️⃣  View All Users");
  console.log("3️⃣  Delete User");
  console.log("4️⃣  Exit");
}

async function main() {
  let running = true;

  while (running) {
    showMenu();
    const choice = prompt("Choose an option (1-4): ");

    switch (choice) {
      case "1":
        await insertUser();
        break;
      case "2":
        await fetchUsers();
        break;
      case "3":
        await deleteUser();
        break;
      case "4":
        console.log("👋 Exiting program...");
        running = false;
        break;
      default:
        console.log("❌ Invalid choice. Try again.");
    }
  }
}

main();
