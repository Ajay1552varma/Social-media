const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');



const routers = require('./routes/index');
const { read } = require('fs');

// config middlewares
require('dotenv').config();
require('./config/passport-jwtConfig')
require('./config/passport-facebookConfig')

// create a app instance
const app = express();
app.use(cors())


// Add headers before the routes are defined

// test
app.set('view engine','ejs');

// middleares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// passport middleware
app.use(passport.initialize())


// all routes
app.use(routers);

module.exports = app;
