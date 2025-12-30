const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const SCORES_FILE = path.join(__dirname, 'scores.json');

app.get('/api/scores', (req, res) => {
    if (!fs.existsSync(SCORES_FILE)) return res.json([]);
    const data = fs.readFileSync(SCORES_FILE);
    const scores = JSON.parse(data);
    res.json(scores.sort((a, b) => b.score - a.score).slice(0, 10));
});

app.post('/api/save-score', (req, res) => {
    const { username, score, details, mode } = req.body;
    let scores = [];
    if (fs.existsSync(SCORES_FILE)) {
        scores = JSON.parse(fs.readFileSync(SCORES_FILE));
    }
    scores.push({ username, score, details, mode, date: new Date() });
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
    res.json({ success: true });
});

app.listen(5000, () => console.log("Backend 5000 portunda aktif."));