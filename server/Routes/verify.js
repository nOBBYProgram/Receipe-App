const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
    jwt.verify(token, process.env.specialkey, (err, user) => {
      if (err) {
        return res.status(404).send("Invalid Token");
      }
  
      req.user = user;
      next(); // Call the callback function with next()
    });
  };

  module.exports = verifyToken