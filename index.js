const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// middleware
app.use(cors());

// routes
app.get('/', cors(), (req, res) => {
    res.send('I have receive your req');
})

app.listen(port, () => {
    console.log('Listening to port 4000');
})