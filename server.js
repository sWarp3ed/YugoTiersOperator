const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const playersFilePath = path.join(__dirname, 'players.json');

app.get('/players', (req, res) => {
  fs.readFile(playersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading players file');
    res.json(JSON.parse(data));
  });
});

app.post('/players', (req, res) => {
  const newPlayer = req.body;
  if (!newPlayer.name) return res.status(400).send('Player name is required');

  fs.readFile(playersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading players file');
    const players = JSON.parse(data);
    players.push(newPlayer);
    fs.writeFile(playersFilePath, JSON.stringify(players, null, 2), (err) => {
      if (err) return res.status(500).send('Error writing players file');
      res.status(201).send('Player added');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
