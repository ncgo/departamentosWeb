// # 1
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// # 2
var ServicesSchema = Schema ({
    id: {
        type: Number,
        required: true,
        unique:  true
    },
    userName: {
        type: String,
        unique:  true,
        required: true
    },
    fecha_reservda: {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,10)
}

UserSchema.methods.validatePassword = function(userPassword){
    return bcrypt.compare(userPassword,this.password)
}


// # 3
module.exports = mongoose.model('services', ServicesSchema);
