fetch(`${API_URL}/clips`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const feed = document.getElementById("clipFeed");

        const rankImages = {
            Unrated: "images/ranks/unrated.webp",
            Iron: "images/ranks/iron.webp",
            Bronze: "images/ranks/bronze.webp",
            Silver: "images/ranks/silver.webp",
            Gold: "images/ranks/gold.webp",
            Platinum: "images/ranks/platinum.webp",
            Diamond: "images/ranks/diamond.webp",
            Ascendant: "images/ranks/ascendant.webp",
            Immortal: "images/ranks/immortal.webp",
            Radiant: "images/ranks/radiant.webp"
        }
        const agentImages = {
            Astra: "images/agents/astra.webp",
            Breach: "images/agents/breach.webp",
            Brimstone: "images/agents/brimstone.webp",
            Chamber: "images/agents/chamber.webp",
            Clove: "images/agents/clove.webp",
            Cypher: "images/agents/cypher.webp",
            Deadlock: "images/agents/deadlock.webp",
            Fade: "images/agents/fade.webp",
            Gecko: "images/agents/gecko.webp",
            Harbor: "images/agents/harbor.webp",
            Iso: "images/agents/iso.webp",
            Jett: "images/agents/jett.webp",
            "Kay/o": "images/agents/kayo.webp",
            Killjoy: "images/agents/killjoy.webp",
            Miks: "images/agents/miks.webp",
            Neon: "images/agents/neon.webp",
            Omen: "images/agents/omen.webp",
            Phoenix: "images/agents/phoenix.webp",
            Raze: "images/agents/raze.webp",
            Reyna: "images/agents/reyna.webp",
            Sage: "images/agents/sage.webp",
            Skye: "images/agents/skye.webp",
            Sova: "images/agents/sova.webp",
            Tejo: "images/agents/tejo.webp",
            Veto: "images/agents/veto.webp",
            Viper: "images/agents/viper.webp",
            Vyse: "images/agents/vyse.webp",
            Waylay: "images/agents/waylay.webp",
            Yoru: "images/agents/yoru.webp"
        }

        data.clips.forEach(clip => {
            const card = document.createElement("div");

            card.innerHTML = `
                <div class = "clip-card">

                    <video width="400" controls>
                        <source src="${API_URL}/${clip.video_path}" type="video/mp4">
                    </video>

                    <div class = "clip-info">
                        <div class="clip-top">
                            <h3>${clip.username || "Unknown User"}</h3>
                            <div class="clip-right">
                                <img src="${agentImages[clip.agent]}" alt="${clip.agent}" class="agent-icon">
                                <img src="${rankImages[clip.rank]}" alt="${clip.rank}" class="rank-icon">
                            </div>
                        </div>
                        <p class="clip-caption">${clip.caption}</p>
                    </div>

                    <div class = "clip-reacts">
                        <button class="like-btn" onclick="likeClip(${clip.id}, this)">
                            &hearts;
                        </button>
                        <p id="likes-${clip.id}">${clip.likes}</p>
                    </div>

                    <hr>
                </div>
            `;

            feed.appendChild(card);
        });
    });

function likeClip(clipId, button) {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
        alert("Log in to like this clip!");
        return;
    }
    
    fetch(`${API_URL}/clips/${clipId}/like`, {
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
            document.getElementById(`likes-${clipId}`).textContent = data.likes;
            button.classList.add("liked");
        } else {
            alert(data.error);
        }
    });
}