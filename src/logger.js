const loggerFactory = require('winston-cigarettes-logger');
const config = require('../config/general');
module.exports = loggerFactory(config.logger.topicArn, config.app.NAME);
