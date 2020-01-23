//create connection to mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihanredbox'
})

connection.connect()
export default connection