# 🏠 Roomly

Roomly is a web-based property listing application that allows users to post and view available room rentals. It is designed as a lightweight and customizable platform where listings can be added, viewed, edited, and removed — perfect for rental property management or hostel finders.

---

## 📚 Table of Contents
- [📌 Project Overview](#-project-overview)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [🔧 Installation](#-installation)
- [🏃 Usage](#-usage)
- [🔗 Routes](#-routes)
- [🧱 Database Model](#-database-model)
- [🖼️ View Templates](#-view-templates)
- [⚠️ Error Handling](#️-error-handling)
- [🛡️ Future Enhancements](#-future-enhancements)
- [📃 License](#-license)
- [🤝 Contributing](#-contributing)
- [🙌 Acknowledgements](#-acknowledgements)

---

## 📌 Project Overview
Roomly provides a simple interface to post and manage property listings for rent.  
The backend is built using **Node.js**, **Express.js**, and **MongoDB** (with **Mongoose**), and the frontend uses **EJS** templating for rendering views. It supports all basic CRUD operations and now includes **custom error handling** for better reliability.

---

## 🚀 Features
- 🏡 View all room listings
- ➕ Add a new room listing
- ✏️ Edit existing listings
- ❌ Delete listings
- 📜 Server-side form rendering with EJS
- 📁 Static file serving for CSS/images
- 🧱 MongoDB schema for structured data
- 🛣️ RESTful routing architecture
- 🧰 Method override to support PUT/DELETE via forms
- ⚠️ Custom error handling with **ExpressError** class
- 🚫 **404 Page Not Found** handling
- 💥 Centralized error display using `error.ejs`
- 🛡️ Asynchronous error handling using `wrapAsync`

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS (custom styles)
- Bootstrap (optional)
- EJS + ejs-mate (templating with layout support)

**Backend:**
- Node.js
- Express.js
- Mongoose (MongoDB ORM)
- method-override

**Utilities:**
- `wrapAsync.js` — Utility to handle async route errors
- `expressError.js` — Custom error class for structured error handling

**Database:**
- MongoDB (local connection)

---

## 📁 Folder Structure
Roomly/
│
├── models/
│ └── listing.js # Mongoose schema for listings
│
├── public/
│ └── css/
│ └── style.css # Custom styles
│
├── utils/
│ ├── wrapAsync.js # Async error handling wrapper
│ └── expressError.js # Custom error class
│
├── views/
│ ├── layouts/
│ │ └── layout.ejs # Base layout template
│ ├── listings/
│ │ ├── index.ejs # View all listings
│ │ ├── new.ejs # Form to add a new listing
│ │ ├── show.ejs # View a single listing
│ │ ├── edit.ejs # Edit listing form
│ ├── error.ejs # Error display page
│ └── home.ejs # Homepage
│
├── app.js # Main Express server file
├── package.json # Project config and dependencies
└── README.md # Project documentation

---

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/roomly.git
   cd roomly
Install dependencies


npm install
Start your MongoDB server
If MongoDB is installed locally:




http://localhost:3000

🏃 Usage
Navigate to the homepage.

Click on “Add Listing” to create a new room listing.

View all listings, click on any to see its detail page.

Edit or delete listings using the buttons available on the detail page.

🔗 Routes
Method	Route	Description
GET	/	Homepage
GET	/listings	Show all listings
GET	/listings/new	Form to create a new listing
POST	/listings	Create a new listing
GET	/listings/:id	Show one listing
GET	/listings/:id/edit	Edit form for listing
PUT	/listings/:id	Update listing
DELETE	/listings/:id	Delete listing

🧱 Database Model
Listing Model (using Mongoose) includes:

Field	Type	Description
title	String	Name of the room/listing
description	String	Details about the room
price	Number	Rental price
location	String	Address or area
image	String	URL to an image (optional)

All fields are required except the image.

🖼️ View Templates
Roomly uses EJS with ejs-mate for layouts.
This ensures consistent design across all pages.

home.ejs: Welcome screen

listings/index.ejs: Shows all listings

listings/new.ejs: Form to create a new listing

listings/show.ejs: Details of a specific listing

listings/edit.ejs: Edit form

error.ejs: Displays error messages for server-side errors

⚠️ Error Handling
Roomly now includes robust error handling:

1. Custom Error Class (ExpressError)
Allows setting custom status codes and messages.

2. Async Error Wrapper (wrapAsync)
Eliminates repetitive try-catch in async routes.

3. 404 Page Not Found Handling
Any undefined route triggers a Page Not Found error.

4. Central Error Middleware
All errors are caught and displayed via error.ejs.

🛡️ Future Enhancements
✅ Add user authentication (login/register)
✅ File upload (local or Cloudinary)
✅ Search and filter listings
✅ Ratings and reviews
✅ Google Maps integration for location
✅ Responsive UI with Bootstrap or Tailwind

📃 License
This project is licensed under the MIT License.

🤝 Contributing
Feel free to fork this repo, raise issues, or submit PRs. Contributions are welcome!

🙌 Acknowledgements
Inspired by real-estate and hostel listing platforms.

Built as a learning project using Express, MongoDB, and EJS.
