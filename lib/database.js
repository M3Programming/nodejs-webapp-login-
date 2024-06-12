const mysql = require('mysql')
require("dotenv").config()
const DB_DATABASE = process.env.DB_DATABASE
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_HOST = process.env.DB_HOST

let conn = mysql.createConnection({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

conn.connect(function (err){
    if(err){
        console.log(err);
    }else{
        console.log("Connection Established")
    }
});

module.exports = conn;
