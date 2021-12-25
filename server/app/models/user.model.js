const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Missing username!'],
        minlength: [6, 'Username must be at least 6 character'],
        maxlength: [12, 'Username must be short than 12 character']
    },
    password: {
        type: String,
        required: [true, 'Missing password!'],
        minlength: [4, 'Password must be at least 4 character'],
        maxlength: [10, 'Password must be short than 10 character'],
    }
});

UserSchema.pre('save', function(next){
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashPassword;
        next();
    }
    catch(err){
        next(err);
    }
});

UserSchema.methods.isCorrectPassword = function(inputPassword){
    try{
        const isCorrect = bcrypt.compareSync(inputPassword, this.password);
        return isCorrect;
    }
    catch(err){
        console.log('Compare password error:', err);
    }
    
};

module.exports = mongoose.model('users', UserSchema);