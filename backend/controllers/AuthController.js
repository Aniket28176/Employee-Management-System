const UserModel = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashed, role: role || 'employee' });
    await user.save();

    res.status(201).json({ success: true, message: 'User created' });
  } catch (err) {
    console.error('signup error', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ success: true, message: 'Login successful', data: { token, role: user.role, name: user.name, email: user.email } });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { signup, login };
