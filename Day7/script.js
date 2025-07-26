// 1. User array
const users = [
  { name: "Kunal", branch: "AI/DS", email: "kunal@example.com", year: 2023 },
  { name: "Riya", branch: "CSE", email: "riya@example.com", year: 2022 },
  { name: "Aman", branch: "ECE", email: "aman@example.com", year: 2024 },
  { name: "Sara", branch: "ME", email: "sara@example.com", year: 2023 },
  { name: "Neha", branch: "CSE", email: "neha@example.com", year: 2025 },
];

// 2. Display users
function displayUsers(list) {
  const container = document.getElementById("userContainer");
  container.innerHTML = "";
  list.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `<h3>${user.name}</h3><p>${user.branch}</p>`;
    container.appendChild(card);
  });
}

// 3. Search functionality
document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.branch.toLowerCase().includes(searchTerm)
  );
  displayUsers(filtered);
});

// 4. Sort by year (optional)
function sortByYear() {
  const sorted = [...users].sort((a, b) => a.year - b.year);
  displayUsers(sorted);
}

// Initial render
displayUsers(users);
