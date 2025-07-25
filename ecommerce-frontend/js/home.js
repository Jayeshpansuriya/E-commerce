const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "../pages/login.html"; // 🛠 FIXED redirect to login page
}

async function fetchUserDetails() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/user/profile", { // 🛠 FIXED correct route
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById("userEmail").textContent = `Logged in as: ${data.user.email}`; // 🛠 data.user.email instead of data.email
    } else {
      alert("Invalid token, please login again.");
      localStorage.removeItem("token");
      window.location.href = "../pages/login.html";
    }

  } catch (err) { // 🛠 you used `error` but logged `err`
    console.error("Error fetching user details:", err);
    alert("Something went wrong");
  }
}

fetchUserDetails();

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../pages/login.html";
});
