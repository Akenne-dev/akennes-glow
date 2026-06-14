const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // 'men', 'women', 'kids'
    imageUrl: { type: String, required: true }, // Cloudinary/S3 URL
    isDeal: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false } // Add this default
});

// Indexing for faster searching/filtering
productSchema.index({ category: 1, isDeal: 1 });

module.exports = mongoose.model('Product', productSchema);