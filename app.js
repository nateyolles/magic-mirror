const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const VLC = require('vlc-client');

const app = express();
const port = config.portNumber;
const vlc = new VLC.Client({
    ip: 'localhost',
    port: 8080,
    username: 'admin',
    password: 'admin'
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/videos/list', (req, res) => {
    res.send(config.videos.map(video => video.title));
});

app.post('/videos/play/:videoId', (req, res) => {
    vlc.playFile(config.videos[req.params.videoId].path);
    res.send(`Got a POST request with video ID: ${config.videos[req.params.videoId].path}`);
})

app.listen(port, () => {
    console.log(`started on ${port}`);
});