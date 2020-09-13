const connection = require('../connection');
const mysql = require('mysql')
const md5 = require('md5')
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller untuk registrasi
exports.register = (req, res)=> {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ['user', 'email', post.email];

    query = mysql.format(query, table);
    connection.query(query, (error, rows)=>{
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                let query = "INSERT INTO ?? SET ?";
                let table = ['user'];
                query = mysql.format(query, table);
                connection.query(query, post, (error, rows)=> {
                    if(error){
                        console.log(error);
                    } else{
                        response.ok('Berhasil menambahkan user baru', res);
                    }
                });
            }else{
                response.ok('Email sudah terdaftar!',res)
            }
        }
    })
};

// controller login
exports.login = (req, res) => {
    let post = {
        password : req.body.password,
        email: req.body.email
    }

    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ['user', 'password', md5(post.password), 'email', post.email];

    query = mysql.format(query, table);
    connection.query(query, (error, rows) => {
        if(error){
            console.log(error);
        } else{
            if(rows.length == 1){
                let token = jwt.sign({rows}, config.secret,{
                    expiresIn: 1440
                });
                let id_user = rows[0].id;
                let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }
                let query = "INSERT INTO access_token SET ?";
                connection.query(query, data, (error, rows) => {
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message: "Token JWT Generated",
                            token: token,
                            curr_User: id_user
                        });
                    };
                })
            }else{
                res.json({
                    "Error": true,
                    "Message": "Email atau Password Salah"
                });
            };
        };
    });
};

exports.halamanRahasia = (req, res) => {
    response.ok('Halaman khusus role 2', res);
};