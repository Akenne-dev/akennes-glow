const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes'); // Your existing routes

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Make sure this matches your Vite port!
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Your base routes
app.use('/api', apiRoutes);

// --- ADD YOUR NEW ROUTES HERE ---
// Admin routes
app.use('/api/admin', require('./routes/adminRoutes'));
// Home content route
app.get('/api/home', require('./controllers/homeController').getHomePageContent);
// Product routes
app.use('/api/products', require('./routes/productRoutes')); // <--- ADD THIS LINE
// --------------------------------

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Akennes Glow API' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = app;