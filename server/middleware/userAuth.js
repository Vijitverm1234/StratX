import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  // Skip authentication for /api/auth/is-auth
  if (req.path === '/api/auth/is-auth') {
    return next();
  }

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id; // Attach user ID to request
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default userAuth;