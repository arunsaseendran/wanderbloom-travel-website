#  Tour Management System (MERN Stack)

A full-stack **MERN (MongoDB, Express, React, Node.js)** application designed to manage tours and bookings efficiently.
The system provides features such as tour browsing, intelligent search with auto-suggestions, booking management, reviews, and wishlist functionality.
It demonstrates practical application of modern web development using the MERN stack with a focus on scalability, usability, and clean architecture.

---

##  Features

- **Tour Search with Auto-Suggest**  
  Search tours by typing the first few letters of a city or tour title. Suggestions come from the MongoDB dataset in real-time.

- **Browse Tours**  
  Explore all available tours with filters for price, duration, and location.

- **Tour Details Page**  
  View complete details of each tour including description, sample gallery placeholder, and Google Maps location link.

- **Bookings**  
  Users can book tours and view their bookings under "My Bookings".

- **Wishlist**  
  Add tours to a wishlist for future reference.

- **Reviews & Ratings**  
  Users can leave reviews on tours and see average ratings.


---

## ⚙️ Tech Stack

- **Frontend:** React (Vite), React Router, Axios, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT + bcrypt for secure user login & registration  

---

## 🛠️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/arunsaseendran/wanderbloom-travel-website.git
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
```

Edit `.env` file and update values:
```
MONGO_URI=mongodb://127.0.0.1:27017/tourx
JWT_SECRET_KEY=yourSecretKey
PORT=5000
```

Install dependencies:
```bash
npm install
```

Seed database with sample users & tours:
```bash
npm run seed
```

Start backend server:
```bash
npm start
```
Backend runs at → **http://localhost:5000**

---

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs at → **http://localhost:5173**  
(Vite proxy is already configured to send `/api` requests to the backend.)

---

##  Available Pages

- `/` → Home page with search bar & tour listing  
- `/tours/:id` → Tour details page  
- `/wishlist` → Saved tours  
- `/bookings` → User bookings  
- `/login` & `/register` → User authentication  

---

##  Future Enhancements

- **Admin Panel** → Manage tours, users, and bookings (add/edit/delete)  
- **Image Uploads** → Allow uploading real tour images (Cloudinary or Firebase)  
- **Payment Gateway** → Stripe or Razorpay integration  
- **Pagination & Sorting** → Handle large data efficiently  

---

##  Author

**Arun Saseendran N P**  
