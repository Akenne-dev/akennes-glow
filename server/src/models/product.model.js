const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        images: [
            {
                type: String,
                trim: true,
            },
        ],
        category: {
            type: String,
            default: 'general',
            trim: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
