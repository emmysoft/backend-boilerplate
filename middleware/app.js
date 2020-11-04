//import and instantiate dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const timeout = require('connect-timeout');
const methodOverride = require('method-override');
const responseTIme = require('response-time');
const favicon = require('connect-favicon');
const serverIndex = require('sever-index');
const vhost = require('vhost');
const busboy = require('connect-busboy');
const errorhandler = require('error-handler');

const app = express();
//configure settings
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('port', processs.env.PORT || 3000);
app.set('view engine', jade);
app.use(compression({ threshold : 1 }));
app.use(logger('combined'));
app.use(methodOverride('_method')); //query string for method-Override
app.use(responseTIme(4));
app.use(favicon(path.join('public', 'favicon.ico')));

//apply middleware
app.use('/shared', serveIndex(
    path.join('public', 'shared'),
    { 'icons': true }
));

app.use(express.static('public'));

//apply bodyParser middleware
app.use(bodyParser.json({
    strict: false,
    reviver: (key, value) => {
        if( key.substr(0,1) === '_'){
            return undefined; 
        } else {
            return value;
        }
    },
    limit: 5000   //5000 kilobytes
}));

//bodyParser.urlencoded()
app.use(bodyParser.urlencoded({ limit: 10000 })); //it works similar to the bodyParser.json function

//cookie-parser
app.use(cookieParser('emmysoft is a full stack developer but loves backend programming'))

//express-session
app.use(session());

//csrf
app.use(csrf());
//override default function - use default name 
app.use(express.csrf({
    value: (req) => {
        return (req.body && req.body.cross_site_request_forgery_value);
    }
}));

//define routes
app.use('/upload', busboy({ immediate: true }));
app.use('/upload', (req, res) => {
    req.busboy.on('file', (fieldname, file , filename, _encoding, _mimetype) => {
        file.on('data', (data) => {
            fs.writeFile('upload' + fieldname + filename, data);
        });
        file.on('end', () => {
            console.log('File' + filename + 'is ended');
        });
    });
    req.busboy.on('finish', () => {
        console.log('Busboy is finished');
        res.status(201).end();
    })
});

//set timeout
app.get('/slow-request', timeout('1s'), (req, _res, next) => {
    setTimeout( () => {
        if (req.timedout) return false;
        return next();
    }, 999 + Math.round(Math.random()));
}, (_req, res, _next) => {
    res.send('ok');
}
);

//Routes and boot-up
//methodOverride
app.use(methodOverride('X-HTTP-Method-Override'));

app.delete('/purchase-orders', (res, _req) => {
    console.log('The DELETE route has been triggered');
    res.status(204).end();
});

//response time
app.get('/response-time', (res, _req) => {
    setTimeout( () => {
        res.status(200).end();
    }, 513);
});

app.get('/', (_req, res) => {
    res.send('Pro Express.js Middleware');
});

app.get('/compression', (_req, res) => {
    res.render('index');
})

//apply error handlers
app.use(errorhandlers());
//connect server
const server = app.listen('port', () => {
    console.log(`Express is listening on port` + server.address().port);
});

//serve Index
app.use('/shared', serveIndex (
    path.join('public', 'shared'),
    { 'icons': true }
));
app.use(express.static('public'));
/* end of code */

//ESSENTIAL MIDDLEWARE
/* compression -- npm install compression -SE -- app.use(compression())*/ 
/* morgan --npm install morgan -SE --app.use(logger('common')) --app.use(logger('dev')*/
/* body-parser --npm install body-parser -SE*/
/* cookie-parser --npm install cookie-parser -SE*/
/* express-session --npm install express-session -SE*/
/* csurf --npm install csrf -SE --const csurf = require('csrf'); --app.use(csrf())*/
/* expression.static or serve-static */
/* connect-Timeout --npm install connect-timeout -SE*/
/* errorhandler --npm install errorhandler -SE*/
/* method-override --npm install method-override -SE*/
/* response-time --npm install response-time -SE*/
/* serve-favicon --npm install serve-favicon -SE*/
/* serve-index --npm install serve-index -SE*/
/* vhost --npm install vhost -SE*/
/* connect-busboy --npm install connect-busboy -SE*/
