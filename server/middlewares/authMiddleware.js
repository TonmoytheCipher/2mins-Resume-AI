const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // Check if the request has an authorization header with a token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // The token looks like "Bearer eyJhbGci...", so we split it to get just the token part
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using your secret key from the .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's ID to the request so the next function knows who they are!
      req.user = decoded; 
      
      next(); // Pass the baton to the next function
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };