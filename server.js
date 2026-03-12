const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const path = require("path")
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
let conversation = [];

async function askAI(prompt) {
    
    conversation.push({
        role: "assistant",
        content: reply
    });

    conversation.push({
        role:"user",
        content: prompt
    });

    const formattedPrompt = conversation.map(m => `${m.role}: ${m.content}`)
    .join("\n");

    const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
            model: "llama3",
            prompt: formattedPrompt,
            stream: false
        }
    );

const reply = response.data.response;

console.log("AI RESPONSE:", reply);
    return reply;
}
app.post("/reset", (req, res) => {
    conversation = [];
    res.json({
        message: "lobotomized"
    });
});
app.get("/", (req,res) => {
    res.send("Local AI server runnin");
});
app.post("/chat", async (requestAnimationFrame, res) => {
    const message = requestAnimationFrame.body.message;
    try {
        const reply = await askAI(message);
        res.json({ reply });

    } catch (error) {
        res.json({
            reply: "Error: " + error.message
        });
    }
});

app.listen(3000, () => {
    console.log("AI server running on http://localhost:3000");
});