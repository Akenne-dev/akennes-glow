const express = require('express');
const router = express.Router();
const userRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');

router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
