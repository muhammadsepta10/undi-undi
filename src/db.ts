//create connection to mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    host: '192.168.1.62',
    user: 'rizki',
    password: 'R1zk!',
    database: 'undiundi'
})

connection.connect()
export default connection