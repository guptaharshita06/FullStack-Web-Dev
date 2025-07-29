const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const strengthMsg = document.getElementById("strength");
const rememberCheckbox = document.getElementById("remember");
const suggestionsBox = document.getElementById("suggestions");

// Load saved users from localStorage
let savedUsers = JSON.parse(localStorage.getItem("loginUsers")) || [];

// Show suggestions on email input
emailInput.addEventListener("input", () => {
  const query = emailInput.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matched = savedUsers.filter((user) =>
    user.email.toLowerCase().startsWith(query)
  );

  if (matched.length) {
    matched.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.email;

      // 🟡 When user selects a suggestion
      li.addEventListener("mousedown", () => {
        emailInput.value = user.email;
        passwordInput.value = user.password;

        // Hide suggestions after short delay
        setTimeout(() => {
          suggestionsBox.style.display = "none";
        }, 50);
      });

      suggestionsBox.appendChild(li);
    });

    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none";
  }
});

// Hide suggestions when focus lost from input
emailInput.addEventListener("blur", () => {
  setTimeout(() => {
    suggestionsBox.style.display = "none";
  }, 150);
});

// Password strength checker
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  let strength = 0;

  if (/[A-Z]/.test(val)) strength++;
  if (/[a-z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[!@#$%^&*]/.test(val)) strength++;
  if (val.length >= 6) strength++;

  if (!val) {
    strengthMsg.textContent = "";
    strengthMsg.className = "";
  } else if (strength <= 2) {
    strengthMsg.textContent = "Weak";
    strengthMsg.className = "strength-msg weak";
  } else if (strength <= 4) {
    strengthMsg.textContent = "Medium";
    strengthMsg.className = "strength-msg medium";
  } else {
    strengthMsg.textContent = "Strong";
    strengthMsg.className = "strength-msg strong";
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please fill in all fields.",
      confirmButtonColor: "#ff4d4d",
    });
    return;
  }

  if (rememberCheckbox.checked) {
    const existing = savedUsers.find((u) => u.email === email);

    if (existing) {
      existing.password = password;
    } else {
      savedUsers.push({ email, password });
    }

    localStorage.setItem("loginUsers", JSON.stringify(savedUsers));
  }

  form.reset();
  suggestionsBox.style.display = "none";
  strengthMsg.textContent = "";

  // SweetAlert popup for successful login
  Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: `Welcome, ${email}`,
  confirmButtonColor: "#ffd700",
  background: "#1c1c1c",
  color: "#ffd700",
}).then(() => {
  window.location.href = "Dashboard.html";
});
});

// Show/Hide Password Toggle
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("change", () => {
  passwordInput.type = togglePassword.checked ? "text" : "password";
});
