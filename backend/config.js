// require dotenv
require('dotenv').config();
const config = {
    app: {
      port: process.env.PORT || 3000,
      secretKey : process.env.SECRET_KEY
    },
  
    db: {
      uri: process.env.URI,
    },

    mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
  };
  
  module.exports = config;
  