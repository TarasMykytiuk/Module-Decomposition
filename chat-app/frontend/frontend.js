const display_messages_dom = document.getElementById("display_messages");
const send_button = document.getElementById("send_button");
const user_input = document.getElementById("message_user");
const message_input = document.getElementById("message_text");
const reactions = {
    LIKE: "likes",
    DISLIKE: "dislikes"
}
const apiUrl = "https://oydiv147w81gg1fal8of7o9r.hosting.codeyourfuture.io";
const refreshTimeSeconds = 60;

document.addEventListener("DOMContentLoaded", async () => {
    await populateMessagesDom();
    send_button.addEventListener("click", async (event) => {
        event.preventDefault();
        const text = sanitizeInput(message_input.value);
        const user = sanitizeInput(user_input.value);
        await sendMessage(text, user);
        await populateMessagesDom();
        message_input.value = "";
        user_input.value = "";
    });
    setInterval(async () => {
        await populateMessagesDom();
    }, refreshTimeSeconds * 1000);
});

async function populateMessagesDom() {
    const messages = await getMessages();
    const reversed = messages.reverse();
    renderAllMessages(reversed);
}

function renderAllMessages(messages) {
    display_messages_dom.innerHTML = '';
    messages.forEach(message => {
        renderMessage(message);
    });
}

function renderMessage(message) {
    const div = document.createElement("div");
    div.setAttribute("id", message["id"]);
    div.classList.add("message_card");
    const h2 = document.createElement("h2");
    h2.innerHTML = message["user"];
    const p_text = document.createElement("p");
    p_text.innerHTML = message["text"];
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
        await populateMessagesDom();
    });
    dislike_button.addEventListener("click", async () => {
        await reactToMessage(div.id, reactions.DISLIKE);
        await populateMessagesDom();
    });
}

function sanitizeInput(value) {
    sanitized = value.trim()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    return sanitized;
}

async function sendMessage(text, user) {
    try {
        const response = await fetch(
            apiUrl + "/send_message",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, user })
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function reactToMessage(messageId, reaction) {
    try {
        const response = await fetch(
            apiUrl + "/react_to_message",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messageId, reaction })
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getMessages() {
    try {
        const response = await fetch(apiUrl + "/read_messages");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const messages = await response.json();
        return messages;
    } catch (error) {
        console.log(error);
    }
}

