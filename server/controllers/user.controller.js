const db = require("../models");
const User = db.SchamasModel.User;
const Role = db.SchamasModel.Role;

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate('roles');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateRoleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {name} = req.body;
    const targetRole = await Role.findOne({ name });
    if (!targetRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
       id,
      { roles: targetRole._id },
      { new: true }
    ).populate('roles');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        email: req.body.email,
        password: db.bcrypt.hashSync(req.body.password, 10),
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
      try {
        const deletedUser = await User.findOneAndDelete(
          { _id: req.params.id}
        );
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};  