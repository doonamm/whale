const redis = require('redis');

const redisClient = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
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