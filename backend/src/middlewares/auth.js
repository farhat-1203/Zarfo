// src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import User from '../modules/auth/auth.model.js'; // Correct path to the User model

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized, user not found' });
      }

      // Check if the user is a 'hotel'
      if (req.user.role !== 'hotel') {
        return res.status(403).json({ error: 'Access denied: Must be a hotel user.' });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};