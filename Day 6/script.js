const quoteBtn = document.getElementById("quoteBtn");
const quoteDisplay = document.getElementById("quote");

const quotes = [
  "Dream big, code bigger.",
"Khud par bharosa rakho, compiler bhi galtiyan maanta hai.", 
"Every error is a step closer to perfection.",
"Seekh raha hai? Toh jeet raha hai!" ,
"Success doesn’t come overnight. It’s coded line by line.",
"Focus kro output pe, warnings apne aap hat jayengi." ,
"Write code that your future self will thank you for.",
"Koi shortcut nahi hota, bas consistent rehna padta hai.",
"From 'Hello World' to 'Hello Career' – keep going!",
"Failure is not fatal, infinite loops are."
];

const colors = ["#f8c291", "#6a89cc", "#82ccdd", "#b8e994", "#f6b93b", "#e55039"];

quoteBtn.addEventListener("click", () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  quoteDisplay.textContent = randomQuote;
  document.body.style.backgroundColor = randomColor;
});
