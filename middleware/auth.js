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
        tanggal_daftar: new Date(),
    }

    let query = 'SELECT email FROM ?? WHERE ??';
    let table = ['user', 'email', post.email];

    query = mysql.format(query, table);
    connection.query(query, (error, rows)=>{
        if(error){
            console.log(error);
        }else{
            if(rows.length === 0){
                query = "INSERT INTO ?? SET ??";
                table = ['user'];
                query = mysql.format(query, table);
                connection.query(query, post, (error, rows)=> {
                    if(error){
                        console.log(error);
                    } else{
                        response.ok("Berhasil menambahkan user baru");
                    }
                });
            }else{
                response.ok('Email sudah terdaftar!')
            }
        }
    })
}