const display_messages_dom = document.getElementById("display_messages");
const send_button = document.getElementById("send_button");
const user_input = document.getElementById("message_user");
const message_input = document.getElementById("message_text");
const reactions = {
    LIKE: "likes",
    DISLIKE: "dislikes"
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderAllMessages();

    send_button.addEventListener("click", async (event) => {
        event.preventDefault();
        const text = message_input.value;
        const user = user_input.value;
        await sendMessage(text, user);
        await renderAllMessages();
        message_input.value = "";
        user_input.value = "";
    })
});

async function renderAllMessages() {
    display_messages_dom.innerHTML = '';
    const messages = await getMessages();
    const reversed = messages.reverse();
    reversed.forEach(message => {
        renderMessage(message);
    });
}

function renderMessage(message) {
    const div = document.createElement("div");
    div.setAttribute("id", message["id"]);
    div.classList.add("message_card");
    const h2 = document.createElement("h2");
    h2.textContent = message["user"];
    const p_text = document.createElement("p");
    p_text.textContent = message["text"];
    const p_date = document.createElement("p");
    const timestamp = message["time"];
    const date = new Date(timestamp)
    p_date.textContent = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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

    like_button.addEventListener("click", async () => {
        await reactToMessage(div.id, reactions.LIKE);
        await renderAllMessages();
    });
    dislike_button.addEventListener("click", async () => {
        await reactToMessage(div.id, reactions.DISLIKE);
        await renderAllMessages();
    });
}

async function sendMessage(text, user) {
    return await fetch(
        "https://oydiv147w81gg1fal8of7o9r.hosting.codeyourfuture.io/send_message",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, user })
        }
    );
}

async function reactToMessage(messageId, reaction) {
    return await fetch(
        "https://oydiv147w81gg1fal8of7o9r.hosting.codeyourfuture.io/react_to_message",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messageId, reaction })
        }
    );
}

async function getMessages() {
    const res = await fetch("https://oydiv147w81gg1fal8of7o9r.hosting.codeyourfuture.io/read_messages");
    const messages = await res.json();
    return messages;
}

