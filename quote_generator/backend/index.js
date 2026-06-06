import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const quotes = [
    {
        quote: "Either write something worth reading or do something worth writing.",
        author: "Benjamin Franklin",
    },
    {
        quote: "I should have been more kind.",
        author: "Clive James",
    },
];

function pickRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

app.get("/get_quote", (req, res) => {
    const quote = pickRandomQuote();
    res.send(`"${quote.quote}" -${quote.author}`);
});

app.post("/post_quote", (req, res) => {
    const { quote, author } = req.body;
    if (!quote || !author) {
        return res.status(400).send("Empty data!");
    }

    quotes.push({ quote: quote, author: author });
    return res.status(200).json({ message: "Success!" });
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));