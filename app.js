const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
//const VLC = require('vlc-client');
const childProcess = require('child_process');

const app = express();
const port = config.portNumber;
// const vlc = new VLC.Client({
//     ip: 'localhost',
//     port: 8080,
//     username: 'admin',
//     password: 'admin'
// });

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
    childProcess.exec('vlc videos/Slender\ Specter_Startle\ Scare_Win_V.mp4 --no-video-title-show --fullscreen', (msg) => {
        console.log(msg);
    });
    res.send(`Got a POST request with video ID: ${config.videos[req.params.videoId].path}`);
})

app.listen(port, () => {
    console.log(`started on ${port}`);
});