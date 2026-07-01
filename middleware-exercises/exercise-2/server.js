import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const registeredUsers = {
    "Ahmed": "ahmed-pass",
    "Emma": "emma-pass"
}

function usernameMiddleware(req, res, next) {
    const username = req.get("X-Username")? req.get("X-Username") : null;
    const password = req.get("X-Password");
    if (Object.keys(registeredUsers).includes(username) && password !== registeredUsers[username]){
        return res.status(400).send("Wrong credentials!");
    } else {
        req.username = username;
    }
    next();
}

app.post("/", usernameMiddleware, (req, res) => {
    const { username, body } = req;
    let nameAnswer = ''
    if (username){
        nameAnswer = "You are authenticated as " + username + ".";
    } else {
        nameAnswer = "You are not authenticated";
    }
    let answerStr = "You have requested information about " + body.length + " subjects: ";
    for (let i = 0; i < body.length; i++) {
        answerStr += body[i]
    }
    res.type("text").send(`${nameAnswer}\n\n${answerStr + "."}`);
});

app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});