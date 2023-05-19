const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes.js');

const { auth } = require('./middlewares/authMiddleware.js');

const app = express();

const dbUrl = 'mongodb://127.0.0.1:27017/profiletome';

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(auth);
app.use(routes);

mongoose.connect(dbUrl)
    .then(() => {
        app.listen(3030, () => console.log('App is listening to port 3000...'));
    })
    .catch((error) => {
        return error;
    });