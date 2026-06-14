
const express = require('express');
const router = express.Router();
// Import the entire controller as an object
const authController = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

// Now you can use authController.functionName for everything
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);
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

// forgot / reset password
router.post('/verify-reset-code', authController.verifyResetCode);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;
