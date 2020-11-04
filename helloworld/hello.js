const express = require('express');
const app = express();


app.get('*', (request, response) => {
    response.end(`Hello World!`)
})
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})