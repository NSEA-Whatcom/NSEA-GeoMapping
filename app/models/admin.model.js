// require mongoose
const mongoose = require('mongoose');
const { hashSync, compareSync } = require('bcryptjs');

// mongoose schema class
const Schema = mongoose.Schema;

// create admin schema
const adminSchema = new Schema({
    Username: { 
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 30,
        unique: true,
        // validate: {
        //     validator: Username => Username.doesNotExist({ Username }),
        //     message: "Username already exists"
        // } 
    },
    Password: { 
        type: String, 
        required: true, 
        minlength: 8,
        maxlength: 16, 
    }
});

adminSchema.pre('save', function () {
    // hash password
    if (this.isModified('Password')){
        this.Password = hashSync(this.Password, 10);
    }
});

adminSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};

adminSchema.methods.comparePasswords = function (password) {
    // compare passwords
    return compareSync(password, this.Password);
};

// create model from adminSchema obj
const Admin = mongoose.model('Admin', adminSchema);

// export
module.exports = Admin;