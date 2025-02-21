const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.completions.create({
            model: "gpt-4",
            prompt: `Generate optimized code for: ${prompt}`,
            max_tokens: 500
        });

        res.json({ code: response.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate code" });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
