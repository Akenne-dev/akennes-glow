const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/social-login', async (req, res) => {
    const { email, name, uid } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user if they don't exist
            user = await User.create({ name, email, password: uid });
        }

        // Generate your JWT token here (use your existing createToken function)
        const token = createToken(user);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Social login failed" });
    }
});

// forgot / reset password
const { forgotPassword, resetPassword } = require('../controllers/auth.controller');

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
