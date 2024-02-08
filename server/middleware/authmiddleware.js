const db = require("../models");

function verifyToken(req, res, next) {
    
    const token = req.cookies ? req.cookies['access-token'] : null;

  if (!token) {
    return res.status(400).json({ message: 'user not authenticated' })
  }
  try {
  
    const validToken = db.jwt.verify(token, db.secretKey)
    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch (err) {
    return res.status(400).json({error:err})
  }
  next(); 
}

function verifyAdmin(req, res, next) {
    verifyToken(req, res, async () => {
      if (!req.authenticated) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      try {
        const user = await db.User.findById(req.user.id).populate('roles');
        if (!user || !user.roles || user.roles.name !== 'admin') {
          return res.status(403).json({ message: 'User does not have permission' });
        }
        next();
      } catch (error) {
        console.error("Error during admin verification:", error.message);
        return res.status(500).send("Internal Server Error");
      }
    });
}

module.exports = { verifyToken, verifyAdmin};
