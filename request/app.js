const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('/routes/index');

const app = express();

//engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', jade);
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('abc'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//req.query
app.get('/search', (req, res) => {
    console.log(req.query);
    res.end();
});

//req.params
app.get('/params/:role/:name/:status', (req, res) => {
    console.log(req.params);
    res.end(JSON.stringify(req.query) + '\r\n');
});

//req.body -- using bodyParser
app.post('/body', (req, res) => {
    console.log(req.body);
    res.end(JSON.stringify(req.body) + '\r\n');
});

//req.route -- it has the current route information
app.get('/params/:role/:name/:status', (req, res) => {
    console.log(req.params);
    console.log(req.route);
    res.end();
});

//req.cookies -- don't store sensitive in cookies
app.get('/cookies', (req, res) => {
    if (!req.cookies.counter)
        res.cookie('counter', 0);
    else
        res.cookie('counter', parseInt(req.cookies.counter, 10) + 1);
    res.status(200).send('cookies are: ', req.cookies);
});

//req.signedCookies -- can be used instead of req.cookies
app.use(cookieParser());
app.get('/signed-cookies', (req, res) => {
    if (!req.signedCookeies.counter)
        res.cookie('counter', 0, {signed: true});
    else
        res.cookie('counter', parseInt(req.cookies.counter, 10) + 1, {signed: true});
    res.status(200).send('cookies are: ', req.signedcookies);
});

//catch 404 and forward to errorhandler
app.use( (_req, _res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};

//production error handler
//will not print stacktrace
app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

const debug = require('debug')('request')

app.set('port', process.env.PORT || 8000);

const server = app.listen(app.get('port'), () => {
    debug('Server is listening on port' + server.address().port);
});


// //req.header or req.get
// req.header('content-type');
// req.get('Content-Type');
// req.get('content-type');