const HomePageSection = require('../models/HomePageSection');
const Product = require('../models/product'); // Import Product model

exports.getHomePageContent = async (req, res) => {
    try {
        // Only get products where isFeatured is true
        const products = await Product.find({ isFeatured: true });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching home content" });
    }
};
