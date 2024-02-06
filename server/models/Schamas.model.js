// User Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    auto: true,
  },
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
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
});

const User = mongoose.model('User', userSchema);

// Role Schema
const roleSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }],
});

const Role = mongoose.model('Role', roleSchema);

// Permission Schema
const permissionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = { User, Role, Permission };
