const User = require('../models/user.model');

async function getUsers(req, res) {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to load users' });
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password, role, avatar } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role, avatar });
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json(userObj);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create user' });
    }
}

module.exports = {
    getUsers,
    createUser,
};
