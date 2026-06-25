const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // <--- ADD THIS IMPORT (Adjust path if needed)

router.get('/', async (req, res) => { // Changed to '/' because the prefix is already in app.js
    const { category } = req.query;
    try {
        const products = await Product.find({ category: category });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router; // <--- DON'T FORGET THIS