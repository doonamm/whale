require('dotenv').config();
const jwt = require('jsonwebtoken');
const redisClient = require('../helpers/redis_connection');

const signAccessToken = (userId)=>{
    return new Promise((resolve, reject)=>{
        const payload = {userId};
        const secretKey = process.env.ACCESS_KEY;
        const options = {
            expiresIn: '1m'
        }
        jwt.sign(payload, secretKey, options, (err, token)=>{
            if(err){
                reject(err);
            }
            resolve(token);
        });
    });
};

const signRefreshToken = (userId)=>{
    return new Promise((resolve, reject)=>{
        const payload = {userId};
        const secret = process.env.REFRESH_KEY;
        const options = {
            expiresIn: '24h'
        }
        jwt.sign(payload, secret, options, (err, token)=>{
            if(err){
                reject(err);
            }
            redisClient.set(userId.toString(), token, 'EX', 24 * 60 * 60, (err)=>{
                if(err){
                    reject(err);
                }
                resolve(token);
            });
        });
    });
};

const verifyAccessToken = (req, res, next)=>{
    try{
        const accessToken = req.headers['x-access-token'];
        if(!accessToken){
            res.json({success: false, message: 'Accesstoken is required'});
        }

        jwt.verify(accessToken, process.env.ACCESS_KEY, (err, payload)=>{
            if(err){
                throw err;
            } 
            req.payload = payload;
            next();
        });
    }
    catch(err){
        next(err);
    }
}

const verifyRefreshToken = (req, res, next)=>{
    try{
        const refreshToken = req.headers['x-refresh-token'];
        if(!refreshToken){
            return res.json({success: false, message: 'Refreshtoken is required'});
        }
        
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, payload)=>{
            if(err){
                throw err;
            }
            redisClient.get(payload.userId.toString(), (err, reply)=>{
                if(err){
                    throw err;
                }
                if(reply !== refreshToken){
                    return res.json({success: false, message: 'Anonymous refreshtoken'});
                }
                req.payload = payload;
                next();
            });
        });
    }
    catch(err){
        next(err);
    }
}

const removeRefreshToken = (userId)=>{
    redisClient.del(userId.toString(), (err)=>{
        if(err){
            throw err;
        }
    });
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    verifyAccessToken,
    removeRefreshToken
}