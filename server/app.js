require('dotenv').config();
require('./app/helpers/mongo_connection');
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res)=>{
    res.send({
        page: "Home page",
        status: 200,
    });
});

app.get('/api', (req, res)=>{
    res.json([{name: 1, age: 1}, {name: 2, age: 2}]);
});

require('./app/routes/user.routes')(app);

app.use((err, req, res, next)=>{
    if(err){
        res.json({
            page: 'Error page',
            success: false,
            status: err.status,
            message: err.message           
        });
    }
});

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`));