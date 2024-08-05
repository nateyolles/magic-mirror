const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const VLC = require('vlc-client');
//const spawn = require('child_process').spawn;

const vlc = new VLC.Client({
    ip: 'localhost',
    port: 3000,
    username: 'vlc',
    password: '1234'
});

const app = express();
const port = config.portNumber;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/videos/list', (req, res) => {
    res.send(config.videos.map(video => video.title));
});

app.post('/videos/play/:videoId', (req, res) => {
    const index = req.params.videoId;
    const path = config.videos[index].path;

    console.log(`POST for play received. Index: ${index}, Path: ${path}`);
    // const vlc = spawn('cvlc', [path, '--no-video-title-show', '--fullscreen']);
    // vlc.stderr.on('data', function(data) {
    //     console.log('Error: ' + data.toString());
    // });
    // vlc.on('exit', function(code){
    //     console.log('Exit code: ' + code);
    // });
    vlc.playFile(path);
    res.send(`POST for play received. Index: ${index}, Path: ${path}`);
});

app.listen(port, () => {
    console.log(`started on ${port}`);
});