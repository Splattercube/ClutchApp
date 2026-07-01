document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const button = event.target.querySelector("button[type='submit']");
    button.classList.add("loading");

    fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.message === "User created successfully") {
            alert("Account created!");
            window.location.href = "index.html";
        } else {
            alert(data.error);
            button.classList.remove("loading");
        }
    });
});