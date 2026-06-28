document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.message === "Login successful") {
            localStorage.setItem("user_id", data.user.id);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("email", data.user.email);
            
            alert("Login successful!");
            window.location.href = "home.html";
        } else {
            alert(data.error);
        }
    });
});