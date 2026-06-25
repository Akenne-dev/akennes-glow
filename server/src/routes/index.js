const express = require('express');
const router = express.Router();
const userRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const wishlistRoutes = require('./wishlist.routes');

router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/wishlist', wishlistRoutes);

module.exports = router;
