fetch("http://127.0.0.1:5000/clips")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const feed = document.getElementById("clipFeed");

        data.clips.forEach(clip => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${clip.username || "Unknown User"}</h3>
                <p>${clip.caption}</p>
                <p>Agent: ${clip.agent}</p>
                <p>Rank: ${clip.rank}</p>

                <video width="400" controls>
                    <source src="https://clutchapp.onrender.com/${clip.video_path}" type="video/mp4">
                </video>


                <p id="likes-${clip.id}">Likes: ${clip.likes}</p>
                <button onclick="likeClip(${clip.id})">
                    Like
                </button>


                <hr>
            `;

            feed.appendChild(card);
        });
    });

function likeClip(clipId) {
    const userId = localStorage.getItem("user_id");
    fetch(`https://clutchapp.onrender.com/clips/${clipId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.message === "Clip liked") {
            document.getElementById(`likes-${clipId}`).textContent =
                "Likes: " + data.likes;
        } else {
            alert(data.error);
        }
    });
}