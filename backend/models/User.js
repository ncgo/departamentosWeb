// # 1
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// # 2
var UserSchema = Schema ({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "tenant",
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: true,
        default: "N/A"
    },
},{timestamps: true});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,10)
}

UserSchema.methods.validatePassword = function(userPassword){
    return bcrypt.compare(userPassword,this.password)
}


// # 3
module.exports = mongoose.model('users', UserSchema);
