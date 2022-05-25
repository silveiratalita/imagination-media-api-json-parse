/** Dependencies */
const {router} = require('./router');
const express = require('express');
const server = express();
const logger = require('./logger');
const fileupload = require("express-fileupload");
server.use(fileupload());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(router);
server.listen(3333, (err) => {
  if (err) {
    logger.error(err);
    return process.exit(1);
  }
  console.log(`listening on port  3333`);
});
