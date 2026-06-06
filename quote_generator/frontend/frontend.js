const quoteDom = document.getElementById("display_quote");
const authorInput = document.getElementById("author");
const quoteInput = document.getElementById("new_quote");
const submitBtn = document.getElementById("new_quote_submit");
const changeBtn = document.getElementById("change_quote");

document.addEventListener("DOMContentLoaded", async () => {
    await changeDisplayedQuote();

    changeBtn.addEventListener("click", async () => {
        await changeDisplayedQuote();
    })

    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const author = authorInput.value;
        const quote = quoteInput.value;
        if (!quote || !author) {
            alert("Empty data!");
            return
        }
        await postQuote(quote, author);
        authorInput.value = "";
        quoteInput.value = "";
    })
});

async function changeDisplayedQuote() {
    try {
        const quote = await getQuote();
        quoteDom.innerText = quote;
    } catch (error) {
        console.error("Failed to fetch the quote:", error);
    }
}

async function getQuote() {
    const res = await fetch("https://dtjifu9aql4wip5jzpktv702.hosting.codeyourfuture.io/get_quote");
    const quote = await res.text();
    return quote;
}

async function postQuote(quote, author) {
    return fetch(
        "https://dtjifu9aql4wip5jzpktv702.hosting.codeyourfuture.io/post_quote",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quote, author }),
        }
    );
}

