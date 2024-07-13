/* --- This will serve as the main server of the application --- */


/* -------- IMPORTS -------- */
// .env
import 'dotenv/config';

// Express/hbs requirements
// The backbone of the app, basically.
import express from 'express';
import expressHbs from 'express-handlebars';

// Session requirements
// For saving user sessions (i.e., logging in)
import session from 'express-session'; // session
const store = new session.MemoryStore();

// Mongo
// To access the database
import mongoose from 'mongoose';

// Others
import bodyParser from 'body-parser';
import cors from 'cors';

// To encrypt passwords for security purposes
import bcrypt from 'bcrypt';

// DB Routes
// How the app responds to client requests (ex: GET, POST)
//import userRoutes from './model/route_user.js';

// DB Functions
// Methods for performing actions to the database
//import getUser from './model/controller_user.js';



/* -------- INITIALIZATION -------- */

// Run express
const app = express();

// Initialize bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// Initialize session
/* (Will add this soon) */



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
app.get('/', async (req, res) => {
    // Check first if user is authenticated
    // let currentUser = null;

    // if(res.locals.authenticated) {
    //     currentUser = res.locals.user.username;
    // }

    res.render('index', {
        title: 'Home'
    });
});



/* -------- SET BACKEND ROUTES -------- */

//app.use(userRoutes);



/* -------- START SERVER -------- */
app.listen(process.env.PORT, () => {
    console.log('Server is starting at port', process.env.PORT);
    // mongoose.connect(process.env.MONGODB_URI, { dbname: process.env.DB_NAME });

    // mongoose.connection.on('connected', () => {
    //     console.log('Connected to database successfully');
    // })
});