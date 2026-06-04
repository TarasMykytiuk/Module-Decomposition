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

app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});