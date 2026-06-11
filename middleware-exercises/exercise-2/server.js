import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

function usernameMiddleware(req, res, next) {
    const username = req.get("X-Username");
    req.username = username ? username : null;
    next();
}

app.post("/", usernameMiddleware, (req, res) => {
    const { username, body } = req;
    let nameAnswer = "You are authenticated as " + username + ".";
    let answerStr = "You have requested information about " + body.length + " subjects: ";
    for (let i = 0; i < body.length; i++) {
        answerStr += body[i]
    }
    res.type("text").send(`${nameAnswer}\n\n${answerStr + "."}`);
});

app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});