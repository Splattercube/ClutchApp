

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    console.log("Upload clicked")
    event.preventDefault();

    const userId = localStorage.getItem("user_id");
    const video = document.getElementById("video").files[0];
    const caption = document.getElementById("caption").value;
    const agent = document.getElementById("agent").value;
    const rank = document.getElementById("rank").value;
    const button = event.target.querySelector("button[type='submit']");
    button.classList.add("loading");

    const formData = new FormData();

    formData.append("user_id", userId);
    formData.append("video", video);
    formData.append("caption", caption);
    formData.append("agent", agent);
    formData.append("rank", rank);

    fetch(`${API_URL}/clips`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.message === "Clip uploaded successfully") {
            alert("Clip uploaded!");
            window.location.href = "home.html";
        } else {
            alert(data.error);
            button.classList.remove("loading");
        }
    });
});