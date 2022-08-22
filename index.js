const express = require('express');
const path = require('path');
const multer  = require('multer')
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 4000;
const UPLOAD_FOLDER = './uploads';



// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        // extract the file extension
        const fileExt = path.extname(file.originalname);
        // modify filename
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') + '-' + Date.now();
        
        cb(null, fileName + fileExt)
    },
});


const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 2000000, // 2 MB
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'text/csv' || file.mimetype === 'application/zip') {
            cb(null, true);
        } else {
            cb(new Error("Only .csv and .zip files are allowed!"))
        }
    }
});

// my sql pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// connection
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
})

// middleware
app.use(cors());

// routes
app.get('/', cors(), (req, res) => {
    res.send('I have receive your req');
});

app.post('/upload', cors(), upload.single('file'), (req, res) => {
    res.send('The file has been uploaded successfully');
});

// defaulr error handler
app.use((err, req, res, next) => {
    if(err) {
        console.log('The erro is ', err)
        res.status(500).send(err.message);
    } else {
        res.send("success")
    }
});

app.listen(port, () => {
    console.log('Listening to port 4000');
})