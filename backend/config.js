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
  };
  
  module.exports = config;
  