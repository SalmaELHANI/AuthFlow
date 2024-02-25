const db = require("../models");

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const decodedToken = db.jwt.verify(token, db.secretKey);

    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    req.user = {
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email
    };
    req.authenticated = true;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}



const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const decodedToken = db.jwt.verify(token, db.secretKey);
    const id = decodedToken.id;
    console.log(id);
    const user = await db.SchamasModel.User.findById(id).populate('roles');
    console.log("User roles:", user.roles);
    if (!user || !user.roles || user.roles.name !== 'admin') {
      return res.status(403).json({ message: 'User does not have permission' });
    }
    next();
  } catch (error) {
    console.error("Error during admin verification:", error.message);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { verifyToken, verifyAdmin };  
