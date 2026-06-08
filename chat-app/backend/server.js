import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
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

app.get("/read_messages", (req, res) => {
    res.json(messages);
});

app.post("/send_message", (req, res) => {
    const { text, user } = req.body;
    if (!text || !user) {
        return res.status(400).send("Empty data!");
    }
    const lastId = messages[messages.length - 1]["id"];
    const time = Date.now();
    messages.push({ id: lastId + 1, text: text, user: user, time: time, likes: 0, dislikes: 0 });
    return res.status(200).json({ message: "Success!" });
});

app.post("/react_to_message", (req, res) => {
    const { messageId, reaction } = req.body;
    if (!messageId || !reaction) {
        return res.status(400).send("Empty data!");
    }
    messages.forEach((message) => {
        if (message["id"] == parseInt(messageId)) {
            message[reaction] += 1;
            break;
        }
    })
    return res.status(200).json({ message: "Success!" });
});

app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});