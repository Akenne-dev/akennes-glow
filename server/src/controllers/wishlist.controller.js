const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product');

async function getWishlist(req, res) {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        res.json({ products: wishlist ? wishlist.products : [] });
    } catch (error) {
        res.status(500).json({ error: 'Unable to load wishlist' });
    }
}

async function toggleWishlist(req, res) {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
            return res.json({ inWishlist: true, products: wishlist.products });
        }

        const index = wishlist.products.findIndex((id) => id.equals(productId));
        if (index > -1) {
            wishlist.products.splice(index, 1);
        } else {
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.json({ inWishlist: index === -1, products: wishlist.products });
    } catch (error) {
        res.status(500).json({ error: 'Unable to update wishlist' });
    }
}

module.exports = {
    getWishlist,
    toggleWishlist,
};
