const User = require('../models/user.model');
const createError = require('http-errors');
const {
    signAccessToken,
    signRefreshToken,
    removeRefreshToken
} = require('../helpers/jwt_service');

const signUp = async (req, res, next)=>{
    try{
        const {username, password} = req.body;
        
        const user = new User({username, password});
        const invalid = user.validateSync();
        if(invalid){
            const errorList = [];
            for(const field in invalid.errors){
                errorList.push({
                    name: invalid.name, 
                    message: invalid.errors[field].message
                });
            }
            return res.json({success: false, message: 'Invalid username or password', errorList});
        }

        const duplicatedUser = await User.findOne({username: username});
        if(duplicatedUser){
            return res.json({success: false, message: 'Duplicate username'});
        }

        user.save((err)=>{
            if(err){
                throw createError.BandwidthLimitExceeded();
            }
            return res.json({success: true});
        });
    }
    catch(err){
        next(err);
    }
};

const signIn = async (req, res, next)=>{
    try{ 
        const {username, password} = req.body;
        
        const user = await User.findOne({username: username});
        if(!user){
            return res.json({success: false, errorTarget: 'username', message: `Username ${username} is not exist!`});
        }

        const correct = user.isCorrectPassword(password);
        if(!correct){
            return res.json({success: false, errorTarget: 'password', message: 'Incorrect password!'});
        }

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);

        return res.json({success: true, accessToken, refreshToken});
    }
    catch(err){
        next(err);
    }
};

const signOut = async (req, res, next)=>{
    try{
        const {userId} = req.payload;
        removeRefreshToken(userId);
        res.json({success: true});
    }
    catch(err){
        next(err);
    }
};

const test = (req, res, next)=>{
    res.json({
        success: true,
        userId: req.payload.userId,
        list: [
            {
                name: 'cat',
                amount: 2
            },
            {
                name: 'dog',
                amount: 0
            }
        ]
    });
}

module.exports = {
    signUp,
    signIn,
    signOut,
    test
};