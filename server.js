/* --- This will serve as the main server of the application --- */

import 'dotenv/config';
import express from 'express';
import expressHbs from 'express-handlebars';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

/* -------- INITIALIZATION -------- */

// Run express
const app = express();

// Initialize bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Initialize session
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.error('Session store error:', error);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));

/* -------- INITIALIZE HANDLEBARS -------- */

// Import public folder (folder containing assets)
app.use(express.static('public'));

// Create Handlebars object
const Handlebars = expressHbs.create({
    extname: '.hbs',
    defaultLayout: 'main' // default layout is main.hbs
});

// Use .hbs as handlebars file
app.engine('.hbs', Handlebars.engine);
app.set('view engine', '.hbs');

/* -------- FRONTEND ROUTES -------- */

// Landing page
app.get('/', (req, res) => {
    res.render('landing', { title: 'Landing' });
});

// Help page
app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' });
});

// Home page
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Login page
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Order History page
app.get('/order-history', (req, res) => {
    res.render('order-history', { title: 'Order History' });
});

// Register page
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Reviews page
app.get('/reviews', (req, res) => {
    res.render('reviews', { title: 'Reviews' });
});

// Selected Restaurant page
app.get('/selectedresto', (req, res) => {
    res.render('selectedresto', { title: 'Selected Restaurant' });
});

// Settings page
app.get('/settings', (req, res) => {
    res.render('settings', { title: 'Settings' });
});

// View Cart page
app.get('/viewcart', (req, res) => {
    res.render('viewcart', { title: 'View Cart' });
});

/* -------- CONNECT TO MONGODB -------- */
mongoose.connect(process.env.MONGODB_URI, { dbname: process.env.DB_NAME })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

/* -------- START SERVER -------- */
app.listen(process.env.PORT, () => {
    console.log('Server is starting at port', process.env.PORT);
});
