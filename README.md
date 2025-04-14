# 🏠 Roomly

Roomly is a **listing-based CRUD web application** where users can create, read, update, and delete room listings.  
Built using **Node.js**, **Express**, **MongoDB**, and **EJS**.

---

## 🚀 Project Status

✅ Phase 1 Complete:  
- Full backend CRUD functionality  
- Connected to MongoDB  
- EJS templating  
- Listing form pages and basic styling  
- Dynamic routing and views  

🔜 Upcoming Phases:
- 💅 Styling & UI polish  
- 🌙 Dark mode toggle  
- 📸 Image upload & preview  
- 👤 Authentication system  
- 🧠 Search & Filter features  

---

## 🛠️ Tech Stack

- 📦 Backend: **Node.js**, **Express.js**
- 🗃️ Database: **MongoDB**, **Mongoose**
- 🎨 Templating: **EJS**
- 📄 Middleware: `method-override`, `express.urlencoded`
- 🧰 Other Tools: VS Code, MongoDB Compass, Postman

---

## 📂 Folder Structure

Roomly/ │ ├── models/ │ └── listing.js # Mongoose schema/model │ ├── views/ │ ├── listings/ │ │ ├── index.ejs # All listings page │ │ ├── new.ejs # Form to add a listing │ │ ├── show.ejs # Individual listing details │ │ └── edit.ejs # Edit form │ ├── app.js # Main Express app └── package.json # NPM dependencies


## 🌐 Routes Summary

| Method | Route                | Description             |
|--------|----------------------|-------------------------|
| GET    | `/listings`          | 📋 View all listings       |
| GET    | `/listings/new`      | ➕ Form to create listing  |
| POST   | `/listings`          | 🆕 Add new listing         |
| GET    | `/listings/:id`      | 🔍 Show listing details    |
| GET    | `/listings/:id/edit` | 📝 Form to edit listing    |
| PUT    | `/listings/:id`      | ♻️ Update listing          |
| DELETE | `/listings/:id`      | ❌ Delete listing          |

---


## 🧪 Test Data

You can add listings manually from the `/listings/new` route.

**Example structure:**

```js
{
  title: "Modern Apartment",
  description: "2 BHK in Delhi, near metro",
  image: "https://source.unsplash.com/random",
  price: 12000,
  location: "Delhi",
  country: "India"
}


🧑‍💻 Author
Built with 💖 by Raj Singhania
📧 rajsinghania893@gmail.com
📱 +91 9334788274


⭐️ Show Your Support
If you like this project:

⭐ Star it on GitHub

🍴 Fork it and build your own

🐛 Submit issues or ideas for future phases

📅 Roadmap (Planned Features)
🔐 Authentication & Authorization

💾 Image upload using Multer or Cloudinary

💡 Advanced filters and sorting

🎨 Complete frontend UI with responsive design

🕹️ Admin panel for managing listings
