/* --- This will serve as the main server of the application --- */

/* -------- IMPORTS -------- */
import 'dotenv/config'; // Environment variables

// Express/hbs requirements
import express from 'express';
import expressHbs from 'express-handlebars';

// Session requirements
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session'; // Session store for MongoDB

// Mongo
import mongoose from 'mongoose';

// Others
import bodyParser from 'body-parser';
import cors from 'cors';

// To encrypt passwords for security purposes
import bcrypt from 'bcrypt';

// DB Routes
import userRoutes from './routes/userRoutes.js'; // Adjust path as needed

// DB Functions
import { getUser } from './controllers/userController.js'; // Adjust path as needed

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
app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

// Register page
app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

// View Cart page
app.get('/viewcart', (req, res) => {
    res.render('viewcart', {
        title: 'View Cart'
    });
});

/* -------- SET BACKEND ROUTES -------- */

app.use('/api/users', userRoutes); // Adjust path as needed

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
