require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    auth_pass: process.env.REDIS_PASSWORD,
});

redisClient.ping((err, pong)=>{
    if(err){
        return console.log("Redis can't response");
    }
    console.log('Redis-- PING:', pong);
});

redisClient.once('connect', ()=>{
    console.log('Redis-- Connected');
});

redisClient.on('error', (err)=>{
    console.log('Redis-- Error:', err);
});

module.exports = redisClient;