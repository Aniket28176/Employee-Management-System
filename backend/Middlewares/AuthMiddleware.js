const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth) return res.status(401).json({ success: false, message: 'Authorization header missing' });

  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ success: false, message: 'Invalid authorization format' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role, name }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin role required' });
  next();
};

module.exports = { verifyToken, requireAdmin };
