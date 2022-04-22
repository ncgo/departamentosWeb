// # 1
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// # 2
var UserSchema = Schema ({
    id: {
        type: String,
        required: true,
        unique:  true
    },
    userName: {
        type: String,
        unique:  true,
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
        default: "driver"
    }
},{timestamps: true});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,10)
}

UserSchema.methods.validatePassword = function(userPassword){
    return bcrypt.compare(userPassword,this.password)
}


// # 3
module.exports = mongoose.model('users', UserSchema);
