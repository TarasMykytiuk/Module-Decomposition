const display_messages_dom = document.getElementById("display_messages");
const send_button = document.getElementById("send_button");
document.addEventListener("DOMContentLoaded", async () => {
    const messages = await getMessages();
    const reversed = messages.reverse();
    reversed.forEach(message => {
        renderMessage(message);
    });
});

function renderMessage(message) {
    const div = document.createElement("div");
    div.setAttribute("id", message["id"]);
    div.classList.add("message_card");
    const h2 = document.createElement("h2");
    h2.textContent = message["user"];
    const p_text = document.createElement("p");
    p_text.textContent = message["text"];
    const p_date = document.createElement("p");
    p_date.textContent = message["time"];
    const interact_div = document.createElement("div");
    interact_div.classList.add("interact_div");
    const like_button = document.createElement("button");
    like_button.classList.add("like_button");
    like_button.textContent = "👍 " + String(message["likes"]);
    const dislike_button = document.createElement("button");
    dislike_button.classList.add("dislike_button");
    dislike_button.textContent = "👎 " + String(message["dislikes"]);
    interact_div.appendChild(like_button);
    interact_div.appendChild(dislike_button);
    div.appendChild(h2);
    div.appendChild(p_text);
    div.appendChild(p_date);
    div.appendChild(interact_div);
    display_messages_dom.appendChild(div);
}


async function getMessages() {
    const res = await fetch("https://oydiv147w81gg1fal8of7o9r.hosting.codeyourfuture.io/read_messages");
    const messages = await res.json();
    return messages;
}

