// # 1
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

// # 2
var UserSchema = Schema(
  {

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'tenant',
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    tower: {
      type: Schema.ObjectId,
      ref: 'towers',
      required: false,
      default: null,
    },
    apartment: {
      type: Schema.ObjectId,
      ref: 'apartments',
      required: false,
    },
    administers_towers: [
      {
        type: Schema.ObjectId,
        ref: 'towers',
        required: false,
      },
    ],
  },
  { timestamps: true }
)

UserSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validatePassword = function (userPassword) {
  return bcrypt.compare(userPassword, this.password)
}

// # 3
module.exports = mongoose.model('users', UserSchema)
