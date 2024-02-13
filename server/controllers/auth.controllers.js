const db = require("../models");
const User = db.SchamasModel.User;
const {createToken} = require("../middleware/tokenCreation")
const nodemailer = require('nodemailer');

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
    res.status(201).send("User Created");
  
     // Générer un token pour la vérification de l'email
     const emailVerificationToken = createToken(savedUser._id, savedUser.username, savedUser.email);
    // Envoyer l'email de vérification
    sendVerificationEmail(user.email, emailVerificationToken);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Server Error");
  }
};

function sendVerificationEmail(email, token) {
  // Créer un transporteur nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'salmaelhani7@gmail.com',
      pass: 'iswbqzzlrzxwqsra',
    },
  });

  // Lien de vérification dans l'email
  const verificationLink = `http://localhost:5173/verify-email/${token}`;


  // Contenu de l'email
  const mailOptions = {
    from: 'ismail.kes2001@gmail.com',
    to: email,
    subject: 'Vérification d\'email',
    text: `Cliquez sur le lien suivant pour vérifier votre email : ${verificationLink}`,
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decodedToken = db.jwt.verify(token, db.secretKey);
    const userId = decodedToken.id;
    // Mettez à jour le champ isEmailVerified de l'utilisateur dans la base de données
    const result = await User.findByIdAndUpdate(userId, { isEmailVerified: true }, { new: true });

    if (!result) {
      console.log('User not found or not updated.');
      return res.status(404).send('User not found or not updated.');
    } 

    console.log('Updated User:', result);

    res.status(200).send('Email verified successfully. Vous pouvez maintenant vous connecter.');
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(400).send('Invalid or expired token.');
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
      console.log(user);
      //see if user and password inputs is empty
      if (!password || !email) {
        return res.status(400).send("email or Password is not valid ");
      }
      
      if ( !user.isEmailVerified ) {
        return res.status(401).json({ message: " vérifier votre e-mail pour activer votre compte." });
      }

      
      const passwordIsValid = await db.bcrypt.compare(password, user.password);
      if(!user || !passwordIsValid ){
        return res.status(401).json("Email or Password is not correct ");
      }
      
      const token = createToken(user);  
      res.cookie('access_token', token);
      
      return res.status(200).json({ token, id: user._id, role: user.roles.name});
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