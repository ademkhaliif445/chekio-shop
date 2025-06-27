// Load users and purchases from localStorage (if any)
const users = JSON.parse(localStorage.getItem("users")) || [];
const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

// Function to check if the user is logged in
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Function to protect routes
function protectRoute() {
  if (!isLoggedIn()) {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
  }
}

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUserEmail", email); // Save the logged-in user's email
    window.location.href = "products.html"; // Redirect to protected page
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

// Handle registration form submission
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim(); // Add a "name" input field in your registration form
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    alert("This email is already registered. Please use a different email.");
    return;
  }

  const newUser = { name, email, password }; // Store the user's name
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! You can now log in.");
  window.location.href = "login.html";
});

// Handle logout button click
document.getElementById("logoutButton")?.addEventListener("click", function () {
  console.log("Logout button clicked"); // Debugging statement
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUserEmail"); // Clear the logged-in user's email
  alert("You have been logged out.");
  window.location.href = "index.html";
});

// On page load, update the navigation bar
function updateNavigationBar() {
  const loginLink = document.getElementById("loginLink");
  const logoutNavItem = document.getElementById("logoutNavItem");

  if (isLoggedIn()) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutNavItem) logoutNavItem.style.display = "block";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (logoutNavItem) logoutNavItem.style.display = "none";
  }
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  updateNavigationBar();
});

// Function to save a purchase
function savePurchase(email, product, price) {
  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  // Use map to create a new array with all purchases (including the new one)
  purchases = [
    ...purchases,
    { email, product, price }
  ];

  localStorage.setItem("purchases", JSON.stringify(purchases));
}

// Example: Save a purchase when the user clicks "Complete Purchase"
document.getElementById("complete-purchase")?.addEventListener("click", function () {
  const currentUserEmail = localStorage.getItem("currentUserEmail");

  if (!currentUserEmail) {
    alert("You must be logged in to complete a purchase.");
    return;
  }

  // Example product and price
  const product = "Example Product";
  const price = 19.99;

  // Save the purchase
  savePurchase(currentUserEmail, product, price);

  alert("Purchase completed successfully!");
  window.location.href = "profile.html"; // Redirect to profile page
});