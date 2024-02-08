const db = require("../models");
const User = db.SchamasModel.User;

const querySchema = db.Joi.object({
    username: db.Joi.string().required().min(2),
    email: db.Joi.string().email().required(),
    password: db.Joi.string().required().min(8),
  });

exports.SaveUser = async (req, res) => {
    try {
      const { error } = querySchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: db.bcrypt.hashSync(req.body.password, 10),
        roles:req.roles,
      });
      
      const findUser = await User.findOne({ email: user.email });
      if (findUser) {
        return res.status(409).send('User already exists');
      }
      const savedUser = await user.save();
      console.log(savedUser);
      res.status(201).send("User Created");
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).send("Server Error");
    }
};

// const createDefaultRoles = async () => {
//   try {
//     const existingRoles = await Role.find();
    
//     if (existingRoles.length === 0) {
//       const roles = [
//         { name: 'user' },
//         { name: 'admin' }
//       ];

//       await Role.insertMany(roles);
//     }
//   } catch (error) {
//     console.error('Erreur lors de la création des rôles par défaut :', error);
//   }
// };



/*const getDefaultUserRole = async () => {
  await createDefaultRoles();
  try {
    const defaultRole = await Role.findOne({ name: 'user' });
    return defaultRole._id;
  } catch (error) {
    console.error('Error fetching default user role:', error);
    throw error;
  }
};*/


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate('roles');

      
      
      //see if user and password inputs is empty
      if (!password || !email) {
        return res.send("Username or Password is not valid ");
      }
      //verify if user exists
      if(!user){
        return res.status(401).json("user doesn't exist")
      }
      //compare db user and user input
      const passwordIsValid = await db.bcrypt.compare(password, user.password);
      if(!passwordIsValid)
      {
        return res.send("Email or Password is not correct ");
      }
      //
      const expiresIn = "1d";
      
      const token = db.jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
      }, db.secretKey, { expiresIn });
  
      res.cookie("access-token", token);
  
      // Send a success response
      return res.status(200).json({ token, id: user._id });
    } catch (error) {
      console.error("Error during authentication:", error.message);
    }
  };

exports.logout= async(req,res)=>
{
  res.clearCookie('token').send('Logout successful');
}


exports.Profile = async (req, res) => {
 console.log("profile");
 res.send("profile")
};