const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentsTable tbody');

const API_URL = 'http://localhost:5000/students';

// Fetch and render all students on page load
async function fetchStudents() {
  try {
    const res = await fetch(API_URL);
    const students = await res.json();
    tableBody.innerHTML = '';
    students.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Error fetching students:', err);
  }
}

// Handle form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const course = document.getElementById('course').value;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, course }),
    });
    if (res.ok) {
      form.reset();
      fetchStudents(); // Reload students
    }
  } catch (err) {
    console.error('Error adding student:', err);
  }
});

// Initial load
fetchStudents();
