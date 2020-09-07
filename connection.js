const mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbmahasiswa'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Connected to mysql');
});

module.exports = conn;