import express from 'express';
import expressHbs from 'express-handlebars';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from './model/schema_user.js'; 
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname, join } from 'path'; // Import dirname and join



// DB functions 
import { getAllRestos,
    getRestoById,
    getRestoWithMenu,
    getRestoWithReviews } from './model/controller_restaurant.js';

import { getAllCategories } from './model/controller_category.js';
import { addItemToCart } from './model/controller_viewcart.js';
import { getReviewsByRestaurantId, getAverageRatingAndCounts } from './model/controller_reviews.js'; 
import { getAllLocations } from './model/controller_location.js';  // Import location controller



// DB Schemas (even though they seem unused, DO NOT DELETE)
import Menu from './model/schema_menu.js';
import Review from './model/schema_review.js';



// Determine the current directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);







/* -------- INITIALIZATION -------- */

// Run express
const app = express();

// Initialize bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Initialize session
const MongoDBStoreSession = MongoDBStore(session);
const store = new MongoDBStoreSession({
    uri: 'mongodb://localhost:27017',
    collection: 'sessions'
});

store.on('error', function (error) {
    console.error('Session store error:', error);
});

app.use(session({
    secret: 'bob', 
    resave: false,
    saveUninitialized: false,
    store: store
}));

// Middleware to save current user
app.use(async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId).lean();
            req.user = user;
            res.locals.user = user;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    next();
});

// Middleware for authentication
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}






/* -------- INITIALIZE HANDLEBARS -------- */

// Serve static files from 'public' directory
app.use(express.static(join(__dirname, 'public'))); // Use join for cross-platform compatibility

// Create Handlebars object
const Handlebars = expressHbs.create({
    extname: '.hbs',
    // layoutsDir is not needed as you don't have a separate layouts directory
    defaultLayout: null // No default layout if `landing.hbs` should be standalone
});

// Use .hbs as handlebars file
app.engine('.hbs', Handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views')); // Set to the root views directory






/* -------- FRONTEND ROUTES -------- */

// Landing page
app.get('/', (req, res) => {
    res.render('landing', { title: 'Landing' });
});

// Other routes
app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' });
});

app.get('/home', async (req, res) => {
    const restaurants = await getAllRestos();
    const categories = await getAllCategories();

    res.render('home', {
        title: 'Home',
        restaurants,
        categories
    });
});

// To retrieve user for homepage
app.post('/home', async (req, res) => {

});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/order-history', (req, res) => {
    res.render('order-history', { title: 'Order History' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.get('/reviews', (req, res) => {
    res.render('reviews', { title: 'Reviews' });
});

// Main restaurant display
app.get('/restaurant/:id', async (req, res) => {
    const resto = await getRestoById(req.params.id);
    const menu = await getRestoWithMenu(req.params.id);

    res.render('selectedresto', {
        title: resto.name,

        // Main resto data
        restoName: resto.name,
        restoImage: resto.banner,
        address: resto.address,
        timeOpen: resto.operatingHours.startTime,
        timeClose: resto.operatingHours.endTime,
        id: req.params.id,

        // Discounted products
        menu: menu.menu
    });
});

app.get('/reviews/:id', async (req, res) => {
    const resto = await getRestoById(req.params.id);
    const reviews = await getReviewsByRestaurantId(req.params.id);
    const { averageRating, ratingCounts, totalReviews } = await getAverageRatingAndCounts(req.params.id);

    res.render('reviews', {
        title: resto.name,
        id: req.params.id,
        restoName: resto.name,

        // Reviews
        reviews: reviews,
        averageRating,
        ratingCounts,
        totalReviews
    });
});

app.get('/settings', (req, res) => {
    res.render('settings', { title: 'Settings' });
});

app.get('/viewcart', (req, res) => {
    res.render('viewcart', { title: 'View Cart' });
});







/* -------- AUTHENTICATION ROUTES -------- */

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatpassword, phone } = req.body;

    if (password !== repeatpassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Ensure the password is provided and not empty
        if (!password) {
            return res.status(400).send('Password is required');
        }

        const newUser = new User({
            firstName,
            lastName,
            login: { email, password }, // Store password as plain text
            phone
        });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send('Internal server error');
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ 'login.email': email });
        if (!user) {
            return res.status(401).send('User does not exist.');
        }

        // Compare the provided password with the stored password
        else if (password !== user.login.password) {
            return res.status(401).send('Invalid email or password');
        }

        req.session.userId = user._id;
        res.redirect('/home');
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Internal server error');
    }
});


// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Internal server error');
        }
        res.redirect('/login');
    });
});


app.post('/viewcart', addItemToCart);


/* -------- PROTECTED ROUTE MIDDLEWARE -------- */
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Protect routes
app.get('/home', requireLogin, (req, res) => {
    res.render('home', { title: 'Home' });
});




/* -------- CONNECT TO MONGODB -------- */
mongoose.connect('mongodb+srv://veryMunchAdmin:th4nkuv3rymunch@cluster0.39an52c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true, dbname: 'VeryMunchDB' }) 
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });





/* -------- START SERVER -------- */
const PORT = 3000; 
app.listen(PORT, () => {
    console.log('Server is starting at port', PORT);
});
