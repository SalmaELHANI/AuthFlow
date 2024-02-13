// User Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default:"65c4be520640282d31309a27"
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

// Role Schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Role = mongoose.model('Role', roleSchema);


module.exports = { User, Role};
