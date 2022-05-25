/** Dependencies */
const express = require('express');
const mongoDb = require('adapter-mongoose-driver');
const imaginationConverter = require('imagination-media-xml-converter')
const mongoDbService = require('./service/MongoDbService');
const Ajv = require('ajv');
const DatabaseHelper = require('./helper/DatabaseHelper');
const config = require('../config/general');
const queryController = require('./controller/QueryController');
const Validator = require('../src/helper/Validator');
 const xmlparser = require('express-xml-bodyparser');
const commandController = require('./controller/CommandController');

const httpErrorBase = require('./error/httpErrorBase');
const validator = new Validator(new Ajv({strictTuples: false}));

const logger = require('./logger');

const databaseService = mongoDbService(
    mongoDb,
    DatabaseHelper,
    config.mongo.ENABLE_SSL,
);
const command = commandController(
    validator,
    httpErrorBase,
    logger,
    imaginationConverter,
    databaseService,
);
const query = queryController(databaseService);

const router = express.Router();
router.post('/convert',xmlparser({trim: false, explicitArray: false}), command.convertToXML.bind(command));
router.get('/health', query.health.bind(query));
router.post('/createNewRule',command.insertNewFieldRule.bind(command))
module.exports = {router};
