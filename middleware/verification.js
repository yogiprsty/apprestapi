const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verification(roles){
    return (req, rest ,next) => {
        // cek authorization header
        let tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            let token = tokenWithBearer.split(' ')[1];
            // verification
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err){
                    // RES NOT REST
                    return rest.status(401).send({
                        auth: false,
                        message: 'Token tidak terdaftar'
                    });
                }else{
                    if(roles == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({
                            auth: false,
                            message: 'Gagal mengotorisasi hak anda'
                        });
                    }
                }
            })
        }else{
            return rest.status(401).send({
                auth: false,
                message: 'Token tidak tersedia'
            });
        };
    };
};

module.exports = verification;