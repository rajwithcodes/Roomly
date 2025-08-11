// ✅ Express (web framework) ko import kar rahe hain
const express = require('express');
// ✅ Mongoose (MongoDB ke saath interact karne ke liye) import kar rahe hain
const mongoose = require('mongoose');
// ✅ Apna Listing model import kar rahe hain (path correct hai)
const Listing = require('./models/listing.js');
// ✅ Express app initialize
const app = express();
// ✅ Node.js ka built-in 'path' module import (path handling ke liye)
const path = require('path');
// ✅ method-override middleware import — PUT aur DELETE request ko HTML form se simulate karne ke liye
const methodOverride = require('method-override');
// ✅ Port define kar diya — ispe server chalega
const ejsMate=require('ejs-mate');
const port = 3000;
// ✅ MongoDB local connection URL
const mongo_URL = 'mongodb://127.0.0.1:27017/Roomly';

// ✅ MongoDB se connect hone wala async function
async function main() {
    try {
        await mongoose.connect(mongo_URL); // Database se connection try
        console.log('✅ Connected to MongoDB'); // Agar connection ho gaya to ye log aayega
    } catch (err) {
        console.error('❌ Database connection error:', err); // Agar error aaye to usko console mein print karo
    }
}
main(); // ✅ Function ko call kar diya


// ✅ EJS ko templating engine ke roop mein set kar rahe hain
app.set('view engine', 'ejs');
// ✅ Views folder ka path set kar rahe hain jahan hamari .ejs files hongi
app.set('views', path.join(__dirname, 'views'));
// ✅ Static files (CSS, images, JS) ke liye 'public' folder set kar diya
app.use(express.static(path.join(__dirname, 'public'))); 
// ✅ Form se data ko parse karne ke liye middleware (url-encoded data)
app.use(express.urlencoded({ extended: true }));
// ✅ HTML form se PUT/DELETE request bhejne ke liye `_method` query parameter ka use
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
const wrapAsync = require('./utils/wrapAsync.js'); // ✅ wrapAsync utility ko import kar rahe hain
const ExpressError = require('./utils/expressError.js'); // ✅ ExpressError utility ko import kar rahe hain

// ✅ Root route — just testing whether server is running or not
app.get('/', (req, res) => {
    res.render('listings/Home');
});

// ✅ Show all listings page — saari listings database se fetch karke render karega
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    // ❌ Galat: 'listings/index.ejs'
    // ✅ Sahi: sirf 'listings/index' likhna hota hai ('.ejs' likhne ki zarurat nahi)
    res.render('listings/index', { allListings });
}); 

// ✅ Form to create a new listing — new.ejs render karta hai
app.get('/listings/new', (req, res) => {
    res.render('listings/new');
});

// ✅ Show route — ek specific listing ko ID ke basis pe dikhata hai
app.get('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params; // URL se id extract kar rahe hain
    const listing = await Listing.findById(id); // Database se listing fetch kar rahe hain
    res.render('listings/show', { listing }); // show.ejs ko bhej rahe hain data ke saath
}));

// ✅ Create route — form se nayi listing submit karne par yeh trigger hota hai
app.post('/listings', wrapAsync(async (req, res,next) => {
    if (!req.body.listing) { // Agar form se data nahi aaya to error throw karte hain
        throw new ExpressError(400, 'Invalid Listing Data'); // 400 Bad Request error
    };
    const newListing = new Listing(req.body.listing); // Form data se naya Listing object bana rahe hain
    await newListing.save(); // Database mein save kar diya
    res.redirect('/listings'); // Baad mein listings page pe redirect kar diya
    
}));

// ✅ Edit route — ek listing ka edit form dikhata hai
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit', { listing });
}));

// ✅ Update route — edit form se updated data save karta hai
app.put('/listings/:id', wrapAsync(async (req, res) => {
    if (!req.body.listing) { // Agar form se data nahi aaya to error throw karte hain
        throw new ExpressError(400, 'Invalid Listing Data'); // 400 Bad Request error
    };
    let { id } = req.params;
    // req.body.listing object mein updated values hoti hain
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`); // Update ke baad detail page pe redirect
}));

// ✅ Delete route — ek listing ko database se hata deta hai
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); // Listing ko delete kar diya
    console.log(`Listing with ID ${id} deleted:`, deletedListing); // Console mein confirmation
    res.redirect('/listings'); // Saari listings wale page pe redirect
}));
app.use((req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render("error.ejs",{err}); // Error page render karte hain
    // res.status(statusCode).send(message);
    console.error(err);
});


// ✅ Server start kar diya — ab browser pe http://localhost:3000 pe chalega
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
