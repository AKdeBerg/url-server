const express = require('express');
const multer  = require('multer')
const cors = require('cors');

const app = express();
const port = 4000;
const UPLOAD_FOLDER = './uploads';

// multer
const upload = multer({ 
    dest: UPLOAD_FOLDER
})

// middleware
app.use(cors());

// routes
app.get('/', cors(), (req, res) => {
    res.send('I have receive your req');
});

app.post('/upload', cors(), upload.single('file'), (req, res) => {
    res.send('I have receive your req');
});

app.listen(port, () => {
    console.log('Listening to port 4000');
})