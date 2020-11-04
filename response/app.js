const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const largeImagePath = path.join(__dirname, 'files', 'large-image.jpg');

const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('abc'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes)


//res.render
// app.get('/render', (_req, res) => {
//     res.render('render');
// });

app.get('/render-title', (_req, res) => {
    res.render('index', {title: 'Pro Express.js'})
});

//Pass callbacks to res.render
// app.get('/render-title', (_req, res) => {
//     res.render('index', {title: 'Pro Express.js'}, (error, html) => {
//         //Do something
//     });
// });

//res.locals
app.get('/locals', (_req, res) => {
    res.locals = {title: 'Pro Express.js'};
    res.render('index');
});

//res.set
app.set('/set-html', (_req, res) => {
    res.set('Content-Type', 'text/html');
    res.end('<html><body>' + '<h1>Express.js Guide' + '</body></html>');
});

app.get('/set-csv', function(req, res) {
    var body = 'title, tags\n' +
    'Practical Node.js, node.js express.js\n' +
    'Rapid Prototyping with JS, backbone.js node.js mongodb\n' +
    'JavaScript: The Good Parts, javascript\n';
    res.set({'Content-Type': 'text/csv',
    'Content-Length': body.length,
    'Set-Cookie': ['type=reader', 'language=javascript']});
    res.end(body);
    });

//res.status
app.get('/status', (_req, res) => {
    res.status(200).end();
});

//res.send
app.get('set-ok', (_req, res) => {
    res.status(200).send({ message: 'message was successfully sent' });
});
//message for inner errors
app.get('set-err', (_req, res) => {
    res.status(500).send({ message: 'an error occured' });
});
//message for buffer value
app.get('send-buf', (_req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(new Buffer('text data that will be converted into buffer'));
});

//res.json
//using res.json() with status code
app.get('/json', (_req, res) => {
    res.status(200).json([
        {title: 'Pro Express.js'},
        {title: 'Javascript is Good'},
        {title: 'React is the best Web App Framework'}
    ]);
});
//using res.json() with no status code
app.get('/api/v1/stories/:id', (req, res) => {
    res.json(req.story);
});

//res.jsonp()
app.get('/json', (_req, res) => {
    res.status(200).jsonp([
        {title: 'Pro Express.js'},
        {title: 'Javascript is Good'},
        {title: 'React is the best Web App Framework'}
    ]);
});

//res.end
app.get('/non-stream', (_req, res) => {
    var file = fs.readFileSync(largeImagePath);
    res.end(file);
});

app.get('/non-stream', (_req, res) => {
    var file = fs.readFile(largeImagePath, (error, data) => {
        res.end(data);
    });
});

app.get('/stream1', (_req, res) => {
    var stream = fs.createReadStream(largeImagePath);
    stream.pipe(res);
});

app.get('/stream2', (_req, res) => {
    var stream = fs.createReadStream(largeImagePath);
    stream.on('data', (data) => {
        res.write(data);
    });
    stream.on('end', () => {
        res.end();
    });
});

//catch 404 and response to error handler


//res.redirect
res.redirect('/admin');
res.redirect('/admin');