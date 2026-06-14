require('dotenv').config();
console.log("Checking MONGO_URI:", process.env.MONGO_URI); // Add this line
const mongoose = require('mongoose');
const app = require('./app'); // Import the app you just configured above

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected successfully");
        // Only start the server after the DB is connected
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://0.0.0.0:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });