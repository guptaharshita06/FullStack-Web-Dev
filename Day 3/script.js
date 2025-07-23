const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");

submitBtn.addEventListener("click", () => {
  const name = nameInput.value;
  output.textContent = "Hello, " + name + "!";
});
