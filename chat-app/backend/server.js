import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;

const messages = new Map();
messages.set(1, {
    text: "Message 1",
    user: "User 1",
    time: Date.now() - 10000,
    likes: 1,
    dislikes: 2
});
messages.set(2, {
    text: "Message 2",
    user: "User 2",
    time: Date.now() - 5000,
    likes: 1,
    dislikes: 2
})

/*
const messages = [
    {
        id: 1,
        text: "Message 1",
        user: "User 1",
        time: Date.now() - 10000,
        likes: 1,
        dislikes: 2,
    },
    {
        id: 2,
        text: "Message 2",
        user: "User 2",
        time: Date.now() - 5000,
        likes: 1,
        dislikes: 2,
    }
]
*/
const app = express();
app.use(cors());
app.use(express.json());

app.get("/read_messages", (req, res) => {
    res.json(messages);
});

app.post("/send_message", (req, res) => {
    if (!req.body) {
        return res.status(400).send("Empty data in the request body!");
    }
    const { text, user } = req.body;
    if (!text || !user) {
        return res.status(400).send("Message text and user name is required!");
    }
    /*
    const lastId = messages.length > 0 ? messages.at(-1)["id"] : 1;
    */
    const lastId = messages.size > 0 ? Array.from(messages)[messages.size] : 1;
    const time = Date.now();
    messages.set(lastId + 1, { text: text, user: user, time: time, likes: 0, dislikes: 0 })
    /*
    messages.push({ id: lastId + 1, text: text, user: user, time: time, likes: 0, dislikes: 0 });
    */
    return res.status(200).json({ message: "Success!" });
});

app.post("/react_to_message", (req, res) => {
    const { messageId, reaction } = req.body;
    if (!messageId || !reaction) {
        return res.status(400).send("Empty data!");
    }
    /*
    messages[parseInt(messageId) - 1][reaction] += 1;
    */
    messages.get(parseInt(messageId))[reaction] += 1;
    return res.status(200).json({ message: "Success!" });
});

app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});