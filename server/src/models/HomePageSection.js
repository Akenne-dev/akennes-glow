const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., "New Arrivals"
    sectionType: { type: String, required: true }, // "carousel", "grid", "list"
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    order: { type: Number, default: 0 } // For drag-and-drop ordering
});

module.exports = mongoose.model('HomePageSection', sectionSchema);