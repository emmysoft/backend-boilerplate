const express = require('express');
const port = 3000;
const app = express();

//Routes
app.get('/name/:user_name', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.end('<html><body>' + 
    '<h1>Hello' + req.params.user_name + '</h1>' + 
    '</body></html>'
    );
});

app.get('*', (request, response) => {
    response.end(`Hello World!`)
});

//Connect to server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});