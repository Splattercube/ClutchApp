const API_URL = "https://clutchapp-q73d.onrender.com";

function updateNavForAuth() {
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");

    const loggedOut = document.getElementById("loggedOutLinks");
    const loggedIn = document.getElementById("loggedInLinks");

    if (userId) {
        loggedOut.style.display = "none";
        loggedIn.style.display = "flex";
        document.getElementById("welcomeUser").innerHTML = `Clutch or Kick, <span class="clutch-text">${username}</span>`;
    } else {
        loggedOut.style.display = "flex";
        loggedIn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", updateNavForAuth);

document.addEventListener("click", (event) => {
    if (event.target.id === "logoutBtn") {
        event.preventDefault();
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        window.location.href = "index.html";
    }
});