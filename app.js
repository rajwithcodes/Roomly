// =======================
// 📦 Required Modules Import
// =======================
const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const port = 3000;
const { listingSchema , reviewSchema } = require('./schema.js'); // Joi schema for validation
// =======================
// 🌐 MongoDB Connection
// =======================
const mongo_URL = 'mongodb://127.0.0.1:27017/Roomly';
async function main() {
    try {
        await mongoose.connect(mongo_URL); 
        console.log('✅ Connected to MongoDB'); 
    } catch (err) {
        console.error('❌ Database connection error:', err); 
    }
}
main();
// =======================
// ⚙️ App Configuration
// =======================
app.set('view engine', 'ejs'); // Set view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Views folder path
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // For PUT & DELETE in forms
app.engine('ejs', ejsMate); // Use ejs-mate for layouts
// =======================
// 🛠 Utility Imports
// =======================
const wrapAsync = require('./utils/wrapAsync.js'); 
const ExpressError = require('./utils/expressError.js'); 
// =======================
// 🏠 Home Route
// =======================
app.get('/', (req, res) => {
    res.render('listings/Home'); // Render homepage
});
// =======================
// ✅ Middleware: Listing Validation
// =======================
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body); 
    console.log(error); // Log validation error if any
    if (error) {
        let errmessage = error.details.map((el) => el.message).join(', '); 
        throw new ExpressError(400, errmessage); // Throw custom error
    } else {
        next(); 
    }
};
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error); // Log validation error if any
    if (error) {
        let errmessage = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errmessage); // Throw custom error
    }else{
        next();
    }
}
// =======================
// 📜 Show All Listings
// =======================
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({}); // Fetch all listings
    res.render('listings/index', { allListings }); // Render listings page
}); 
// =======================
// 🆕 Form for New Listing
// =======================
app.get('/listings/new', (req, res) => {
    res.render('listings/new'); // Render new listing form
});
// =======================
// 🔍 Show Single Listing
// =======================
app.get('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params; 
    const listing = await Listing.findById(id).populate("reviews"); // Find listing by ID
    res.render('listings/show', { listing }); // Render single listing page
}));
// =======================
// ➕ Create New Listing
// =======================
app.post('/listings', validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing); // Create new listing
    await newListing.save(); // Save to DB
    res.redirect('/listings'); // Redirect to all listings
}));
// =======================
// ✏️ Edit Listing Form
// =======================
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id); // Find listing to edit
    res.render('listings/edit', { listing }); // Render edit form
}));
// =======================
// 🔄 Update Listing
// =======================
app.put('/listings/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Update listing
    res.redirect(`/listings/${id}`); // Redirect to updated listing
}));
// =======================
// ❌ Delete Listing
// =======================
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); // Delete listing
    console.log(`Listing with ID ${id} deleted:`, deletedListing); 
    res.redirect('/listings');
}));
// =======================
// 📝 Post a Review for Listing
// =======================
app.post('/listings/:id/reviews', validateReview ,wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id); // Find listing
    let newReview = new Review(req.body.review); // Create new review
    listing.reviews.push(newReview); // Add review to listing
    await newReview.save(); // Save review
    await listing.save(); // Save listing with updated reviews
    res.redirect(`/listings/${listing._id}`); // Redirect to listing detail
    console.log(`New review added to listing with ID ${listing._id}:`, newReview);
}));
// =======================
// 🗑️ Delete a Review Route
// =======================
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params; // Get listing and review IDs
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove review from listing
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`) 
    console.log(`Review with ID ${reviewId} deleted from listing with ID ${id}`);
}))
// ⚠️ 404 Page Not Found Middleware
// =======================
app.use((req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});
// =======================
// ⚠️ Global Error Handler
// =======================
app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render("error.ejs", { err }); // Render error page
    console.error(err);
});
// =======================
// 🚀 Start Server
// =======================
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
