const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');
const ffmpeg = require('./ffmmpeg');
app.get('/', (req, res) => {
    ffmpeg.run();
    try {
        //비동기 처리 대신
        setTimeout(function () {
            fs.statSync('./videos/edddd.m3u8');
            return res.status(200).sendFile(`${__dirname}/sample.html`);
        }, 5000);
    } catch (error) {
        //파일이 없다면 에러 발생
        if (error.code === 'ENOENT') {
            console.log('파일이 존재하지 않습니다.');
        }
    }
});
app.get('/streaming', (req, res) => {
    const range = req.headers.range;
    const videoPath = './videos/edddd.mp4';
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 128 * 2048;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;
    const header = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };
    res.writeHead(206, header);
    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
});

const server = app.listen(3000);

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
    },
});
