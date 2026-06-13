const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Akennes Glow API' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
