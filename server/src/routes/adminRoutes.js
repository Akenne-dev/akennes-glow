const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const HomePageSection = require('../models/HomePageSection');

// Add a product

router.post('/add-product', async (req, res) => {
    try {
        const { name, price, category, imageUrl, isFeatured } = req.body;
        const newProduct = new Product({ name, price, category, imageUrl, isFeatured });
        await newProduct.save();
        res.status(201).json({ message: "Product Added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/edit-product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete-product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Update which products go into a section
router.put('/update-section/:id', async (req, res) => {
    const updatedSection = await HomePageSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSection);
});



module.exports = router;