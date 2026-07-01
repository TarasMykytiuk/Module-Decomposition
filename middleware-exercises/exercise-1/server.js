import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

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

function jsonBodyMiddleware(req, res, next) {
    let bodyData = "";
    req.on("data", (chunk) => {
        bodyData += chunk;
    });

    req.on("end", () => {
        if (!bodyData) {
            return res.status(400).send("Empty request body!");
        }
        let dataArray;
        try {
            dataArray = JSON.parse(bodyData);
        } catch (err) {
            return res.status(400).send("Invalid JSON format!");
        }
        if (!Array.isArray(dataArray)) {
            return res.status(400).send("Data has to be an array!");
        }

        for (let i = 0; i < dataArray.length; i++) {
            if (typeof (dataArray[i]) != 'string') {
                return res.status(400).send("Only strings allowed!");
                break;
            }
        }
        req.body = dataArray;
        next();
    });
}

app.post("/", usernameMiddleware, jsonBodyMiddleware, (req, res) => {
    const { username, body } = req;
    let nameAnswer = ''
    if (username !== null){
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