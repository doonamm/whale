const {signUp, signIn, signOut, test} = require('../controllers/user.controller');
const {verifyAccessToken, verifyRefreshToken} = require('../helpers/jwt_service');

module.exports = (app)=>{
    app.post('/signup', signUp);
    app.post('/signin', signIn);
    app.post('/signout', verifyRefreshToken, signOut);
    app.get('/test', verifyAccessToken, test)
};