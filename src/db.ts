//create connection to mysql
const mysql = require("mysql");
import { logger } from "./winston";
export const connection = mysql.createPool({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // host: '10.2.16.147',
  // user: 'root',
  // password: 'Und1Und12020**',
  host: "10.2.16.147" || "localhost",
  user: "rizki" || "root",
  password: "R1zk!" || "Und1Und12020**",
  database: "undiundi"
});
connection.getConnection((err: any, connection: any) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      logger.error("Database undiundi connection was closed.");
      console.error("Database undiundi connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      logger.error("Database undiundi has too many connections.");
      console.error("Database undiundi has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      logger.error("Database undiundi connection was refused.");
      console.error("Database undiundi connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});

export const emailSenderConnection = mysql.createPool({
  host: "192.168.1.209" || "localhost",
  user: "yusuf",
  password: "yusuf2019**",
  database: "db_email"
  // 192.168.1.209
});

emailSenderConnection.getConnection((err: any, emailSenderConnection: any) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      logger.error("Database engine connection was closed.");
      console.error("Database engine connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      logger.error("Database engine has too many connections.");
      console.error("Database engine has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      logger.error("Database engine connection was refused.");
      console.error("Database engine connection was refused.");
    }
  }
  if (emailSenderConnection) emailSenderConnection.release();
  return;
});

// export default connection;
