document.addEventListener("DOMContentLoaded", function () {
    // Protect the profile page (ensure the user is logged in)
    if (!JSON.parse(localStorage.getItem("isLoggedIn"))) {
      alert("You must be logged in to view your profile.");
      window.location.href = "login.html";
      return;
    }
  
    // Retrieve the current user's email
    const currentUserEmail = localStorage.getItem("currentUserEmail");
  
    if (!currentUserEmail) {
      alert("User data not found. Please log in again.");
      window.location.href = "login.html";
      return;
    }
  
    // Retrieve the list of users and purchases from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  
    // Find the current user
    const currentUser = users.find((user) => user.email === currentUserEmail);
  
    if (!currentUser) {
      alert("User data not found. Please register or log in again.");
      window.location.href = "login.html";
      return;
    }
  
    // Display the user's name
    document.getElementById("username").textContent = currentUser.name;
  
    // Filter purchases for the current user
    const userPurchases = purchases.filter((purchase) => purchase.email === currentUserEmail);
  
    // Use map to create HTML elements for purchased products
    const productListElement = document.getElementById("product-list");
    let totalPrice = 0;
  
    if (userPurchases.length > 0) {
      const productItems = userPurchases.map((purchase) => {
        totalPrice += purchase.price; // Accumulate the total price
        return `<li>${purchase.product} - $${purchase.price.toFixed(2)}</li>`;
      });
  
      // Join the array of HTML strings and insert them into the DOM
      productListElement.innerHTML = productItems.join("");
    } else {
      productListElement.innerHTML = "<li>No purchases yet.</li>";
    }
  
    // Display the total price
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
  
    // Debugging logs
    console.log("Current User Email:", currentUserEmail);
    console.log("Users Array:", users);
    console.log("Purchases Array:", purchases);
    console.log("Filtered Purchases:", userPurchases);
  });