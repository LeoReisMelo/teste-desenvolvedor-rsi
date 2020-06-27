require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const app = express();
/* Database setup*/
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
app.use(routes);

module.exports = app;