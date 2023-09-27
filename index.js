// Import packages
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Database

const connectToDatabase = require('./databases/mainmongodb');
connectToDatabase();

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

const Headers = require ('./middlewares/header')

const ReqDomain = require ('./middlewares/reqdomain')
app.use(ReqDomain);

//Routes

// Add redirection to naveenportfolio.site
app.get('/', (req, res) => {
    res.redirect('https://naveenportfolio.site');
  });

const TestData = require('./routes/testdata');
app.use('/', TestData);

const EMS = require('./routes/ems/index');
app.use('/ems', EMS) , Headers;

const MediaX = require('./routes/mediax/index');
app.use('/mediax', MediaX) , Headers;

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));