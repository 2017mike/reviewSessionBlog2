const { Schema, model } = require('mongoose')

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought'
  }], 
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'reaction'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    dropDups: true
  }],
}, { timestamps: true })

User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)
