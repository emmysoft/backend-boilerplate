const book = {name: 'Practical Node.js',
     publisher: 'Apress',
     keywords: 'node.js express.js mongodb websocket, OAuth',
    discount: 'PNJ15'
}
//requiring dependencies
const express = require('express'),
const path = require('path');

const app = express(); //connecting app to express

console.log(app.get('env'));

app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.set('trust proxy', true);
app.set('jsonp callback name', 'cb');
app.set('json replacer', function(key, value){
    if (key === 'disabled') {
        return undefined;
    } else {
        return value;
    }
});

app.set('json spaces', 4);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('x-powered-by', false);
app.set('subdomain offset', 3);
//app.disable('etag')

app.get('/jsonp', function(req, res) {
    res.jsonp('book');
});

app.get('/json', (req, res) => {
    res.send(book);
});

app.get('/users', (req, res) => {
    res.send('users');
});

app.get('*', (req, res) => {
    res.send('Pro Express.js Configurations');
});

//getting Environment
if (app.get === 'env'){
    app.use(function (err, res, req, next) {
        res.status(err.status || 500)
        res.render(error, {
            message: err.message,
            error: err
        });
    });
}

//creating server connection
const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port` + server.address().port);
});