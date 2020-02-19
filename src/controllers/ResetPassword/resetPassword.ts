import { connection, emailSenderConnection } from "../../db";
import { Request, Response } from "express";
const hash = require("password-hash");
import { logger } from '../../winston'

// validate email for forgotten password
export const validateEmail = (req: Request, res: Response) => {
  const email = req.body.email;
  connection.query(
    `SELECT email FROM profiles WHERE email='${email}'`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "Email is not registered",
          success: 0,
          status: "422",
          data: {}
        });

        logger.error({
          message: "Email is not Registered",
          API: 'POST -  https://beta-api.undiundi.id/reset/validateEmail',
          query: `SELECT email FROM profiles WHERE email='${email}'`,
          err
        });
      } else {
        if (data.length < 1) {
          res.send({
            message: "E-mail is not registered",
            success: 0,
            status: "422",
            data: {}
          });

          logger.error({
            message: "Email is not Registered",
            API: 'POST -  https://beta-api.undiundi.id/reset/validateEmail',
            query: `SELECT email FROM profiles WHERE email='${email}'`,
            err
          });

        } else {
          const message = `<!doctype html>
          <html lang="en">
            <head>
              <!-- Required meta tags -->
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          
              <!-- Bootstrap CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
          
              <title>UndiUndi - Reset Password</title>
            </head>
            <body>
              <p><b>Hello!</b></p>
              <p>
                You are receiving this email because we received a password reset request for your account.
              </p>
              <div style="text-align: center;">
                <a href="https://beta-api.undiundi.id">
                  <button 
                    style="background-color: #B12A2C; font-size: 16px; border: none; color: white;
                    padding: 8px 15px; text-align: center; text-decoration: none; border-radius: 4px;
                  ">
                    Reset Password
                  </button>
                </a>
              </div>
              <p>
                If you did not request a password reset, no further action is required.
              </p>
              <p>
              Best Regards, <br><b> RedBox UndiUndi</b></P>
              <hr>
              <p style="text-decoration: none">
                If you are having trouble clicking the "Reset Password" button, copy and 
                paste the URL below into your web 
                browser:
                <br>
                https://Loremipsumdoloritametconsecteturadipiscingelit.CrascursusnislinipsumlaoreetegetullamcorperipsumfinibusSuspendissemolestieloremaliquetexblandittincidunt
              </p>
               <!-- Optional JavaScript -->
              <!-- jQuery first, then Popper.js, then Bootstrap JS -->
              <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
              <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </body>
          </html>`;
          emailSenderConnection.query(
            `INSERT INTO email_sender VALUES (NULL, 3, 'Reset Password', '${email}', '${message}', 0, NOW(), NOW(), 0, NULL, NULL)`,
            (err: any, rows: any) => {
              if (err) {
                res.send({
                  message: "Reset Password Failed",
                  success: 0,
                  status: "422",
                  data: {},
                  err
                });

                logger.error({
                  message: "Reset Password Failed",
                  API: 'POST -  https://beta-api.undiundi.id/reset/validateEmail',
                  query: `INSERT INTO email_sender VALUES (NULL, 3, 'Reset Password', '${email}', '${message}', 0, NOW(), NOW(), 0, NULL, NULL)`,
                  err
                });
              } else {
                  if (rows.affectedRows > 0) {
                    res.send({
                      message: "Please check your email to get a new password",
                      success: 1,
                      status: "200",
                      data: rows
                    });

                    logger.info({
                      message: "Insert Succes to email engine",
                      API: 'POST -  https://beta-api.undiundi.id/reset/validateEmail',
                      query: `INSERT INTO email_sender VALUES (NULL, 3, 'Reset Password', '${email}', '${message}', 0, NOW(), NOW(), 0, NULL, NULL)`,
                    });
                  } else {
                    res.send({
                      message: "Reset Password Failed",
                      success: 0,
                      status: "422",
                      data: {},
                      rows
                    });

                    logger.error({
                      message: "Reset Password Failed",
                      API: 'POST -  https://beta-api.undiundi.id/reset/validateEmail',
                      query: `INSERT INTO email_sender VALUES (NULL, 3, 'Reset Password', '${email}', '${message}', 0, NOW(), NOW(), 0, NULL, NULL)`,
                    });
                  }
              }
            });
        };
      }; 
    }
  );
};

//reset password in microsite
export const resetPasswordEmail = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = hash.generate(req.body.password);

  connection.query(
    `SELECT email FROM profiles WHERE email='${email}'`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "Update Password Failed",
          success: 0,
          status: "422",
          data: {}
        });

        logger.error({
          message: "Reset Password Failed",
          API: 'POST -  https://beta-api.undiundi.id/reset/validateEmail',
          query: `SELECT email FROM profiles WHERE email='${email}'`,
          err
        });
      } else {
          if (data.length < 1) {
            res.send({
              message: "E-mail is not registered",
              success: 0,
              status: "422",
              data: {}
            });
          } else {
              if (data.length > 0) {
                connection.query(
                  `UPDATE profiles SET password='${password}' WHERE email='${email}'`,
                  (errr: any, rows: any) => {
                    if (errr) {
                      res.send({
                        message: "Update Password Failed",
                        success: 0,
                        status: "422",
                        data: {}
                      });
                    } else {
                      res.send({
                        message: "Update Password Success",
                        success: 1,
                        status: "200",
                        data: {}
                      });
                    }
                  }
                );
              }
          }
      }
    }
  );
};

//reset password in profiles
export const resetPasswordProfiles = (req: Request, res: Response) => {
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  connection.query(
    `SELECT email FROM profiles WHERE email='${email}'`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "Update Password Failed",
          success: 0,
          status: "400",
          data: ""
        });
      }

      if (data.length < 1) {
        res.send({
          message: "E-mail is not registered",
          success: 0,
          status: "422",
          data: ""
        });
      }

      if (data.length > 0) {
        connection.query(
          `SELECT password from profiles WHERE email='${email}'`,
          (err: any, rows: any) => {
            if (err) {
              res.send({
                message: "Update Password Failed",
                success: 0,
                status: "400",
                data: ""
              });
            } else {
              const data = rows[0].password;
              const verifyPassword = hash.verify(oldPassword, data);
              if (verifyPassword === true) {
                connection.query(
                  `UPDATE profiles SET password='${newPassword}' WHERE email='${email}'`,
                  (errr: any, rows: any) => {
                    if (errr) {
                      res.send({
                        message: "Update Password Failed",
                        success: 0,
                        status: "400",
                        data: ""
                      });
                    } else {
                      res.send({
                        message: "Update Password Success",
                        success: 0,
                        status: "200",
                        data: ""
                      });
                    }
                  }
                );
              } else {
                res.send({
                  message: "Password Incorrect",
                  success: 1,
                  status: "422",
                  data: ""
                });
              }
            }
          }
        );
      }
    }
  );
};
