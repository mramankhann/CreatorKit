const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function() { return !this.isGuest; }
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      required: function() { return !this.isGuest; }
    },
    password: {
      type: String,
      required: function() { return !this.isGuest; }
    },
    isGuest: {
      type: Boolean,
      default: false
    },
    deviceId: {
      type: String,
      sparse: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving (Mongoose 7+ promise-based middleware)
userSchema.pre('save', async function() {
  if (!this.isModified('password') || this.isGuest) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (this.isGuest || !this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
