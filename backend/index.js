const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes.js');

const { auth } = require('./middlewares/authMiddleware.js');

const app = express();

const mongoUri = 'mongodb+srv://vercel-admin-user:strongpassword@cluster0.dnelox4.mongodb.net/?retryWrites=true&w=majority';

const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect(mongoUri, connectionParams);
        console.log('database connected successfully');
    } catch (error) {
        console.error(error);
    }
};

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(auth);
app.use(routes);

database();

app.listen(3030, () => console.log('App is listening to port 3000...'));