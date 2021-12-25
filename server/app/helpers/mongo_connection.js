require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('connected', ()=>{
    console.log('Mongo-- Connected, database:', connection.name);
});

connection.on('error', (err)=>{
    console.log('Mongo-- Error:', err);
});

connection.on('disconnected', ()=>{
    console.log('Mongo-- Disconnected:', connection.name);
});

process.on('SIGINT', async ()=>{
    await connection.close();
    process.exit(0);
});

module.exports = connection;