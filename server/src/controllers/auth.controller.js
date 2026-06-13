const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

function createToken(user) {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES,
        }
    );
}

const crypto = require('crypto');
const { sendResetPasswordEmail } = require('../services/email.service');

async function register(req, res) {
    try {
        const { name, email, password, role, avatar } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role, avatar });
        const token = createToken(user);

        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        };

        res.status(201).json({ user: userResponse, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to register user' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = createToken(user);
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        };

        res.json({ user: userResponse, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to login' });
    }
}

async function getMe(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    res.json({ user: req.user });
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // For security don't reveal whether email exists
            return res.status(200).json({ message: 'If that email is registered, you will receive a reset link' });
        }

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        try {
            await sendResetPasswordEmail({ to: user.email, resetToken });
            return res.status(200).json({ message: 'Reset email sent' });
        } catch (err) {
            // cleanup on failure
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;
            await user.save({ validateBeforeSave: false });
            console.error('Error sending email', err);
            return res.status(500).json({ error: 'Unable to send reset email' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to process request' });
    }
}

async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token is invalid or has expired' });
        }

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        const jwtToken = createToken(user);

        res.json({ message: 'Password reset successful', token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to reset password' });
    }
}

module.exports = {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
};
