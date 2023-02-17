const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 30,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  activePet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    if (Object.keys(error.keyValue)[0] === 'email') {
      next(new Error('That email is already in use!'));
    } else if (Object.keys(error.keyValue)[0] === 'username') {
      next(new Error('That username is already in use!'));
    }
    next(new Error('Username or Email already in use!'));
  } else {
    next();
  }
});

const User = model('User', userSchema);

module.exports = User;
