const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;

const app = express();
const port = config.portNumber;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/videos/list', (req, res) => {
    res.send(config.videos.map(video => video.title));
});

app.post('/videos/play/:videoId', (req, res) => {
    // command line works:
    // vlc videos/Slender\ Specter_Startle\ Scare_Win_V.mp4 --no-video-title-show --fullscreen
    //vlc.playFile(config.videos[req.params.videoId].path);
    // childProcess.exec('vlc videos/Slender\ Specter_Startle\ Scare_Win_V.mp4 --no-video-title-show --fullscreen', (msg) => {
    //     console.log(msg);
    // });
    const vlc = spawn('cvlc', [config.videos[req.params.videoId].path, '--no-video-title-show', '--fullscreen']);
    res.send(`Got a POST request with video ID: ${config.videos[req.params.videoId].path}`);
})

app.listen(port, () => {
    console.log(`started on ${port}`);
});