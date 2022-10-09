const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

app.use(express.json());
app.use(cors())

const port = 8000;

app.use('/mail', require('./routes/route.js'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})