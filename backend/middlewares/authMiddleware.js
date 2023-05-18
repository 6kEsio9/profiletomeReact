const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const secret = 'hdasuidhasuia';

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    let token = req.headers['x-authorization'];
    if(token){
        try{

            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
        }catch(err){
            console.log(err);
            return res.redirect('/404');
        }
    };

    next();
};

exports.isAuth = (req, res, next) => {

    const user = req.headers['x-authorization'];

    if(!user){
        return res.redirect('/404');
    }

    next();
};