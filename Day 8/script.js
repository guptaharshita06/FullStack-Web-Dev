const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from refreshing page

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const year = document.getElementById("year").value.trim();
  const password = document.getElementById("password").value.trim();

  // Basic validation
  if (!name || !email || !branch || !year || !password) {
    message.style.color = "red";
    message.textContent = "Please fill all the fields.";
    return;
  }

  if (!email.includes("@")) {
    message.style.color = "red";
    message.textContent = "Email must contain '@'";
    return;
  }

  if (password.length < 6) {
    message.style.color = "red";
    message.textContent = "Password must be at least 6 characters.";
    return;
  }

  message.style.color = "green";
  message.textContent = "Registration Successful!";
});

const passwordInput = document.getElementById("password");
const strengthDisplay = document.getElementById("strength");

passwordInput.addEventListener("input", function () {
  const val = passwordInput.value;

  const hasUpper = /[A-Z]/.test(val);
  const hasLower = /[a-z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[!@#\$%\^\&*\)\(+=._-]/.test(val);
  const lengthValid = val.length >= 6;

  let strength = 0;
  if (hasUpper) strength++;
  if (hasLower) strength++;
  if (hasNumber) strength++;
  if (hasSpecial) strength++;
  if (lengthValid) strength++;

  let message = "";
  let color = "";

  switch (strength) {
    case 0:
    case 1:
    case 2:
      message = "Weak Password";
      color = "red";
      break;
    case 3:
    case 4:
      message = "Medium Strength";
      color = "orange";
      break;
    case 5:
      message = "Strong Password";
      color = "green";
      break;
  }

  strengthDisplay.textContent = message;
  strengthDisplay.style.color = color;
});
