/** Dependencies */
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const mongoDb = require('adapter-mongoose-driver');
const Ajv = require('ajv');
const AWS = require('aws-sdk');
const config = require('../config/general');
const mongoDbService = require('./service/MongoDbService');
const s3Service = require('./service/S3Service');
const Validator = require('../src/helper/Validator');
const fileHandlerHelper = require('./helper/FileHelper');
const DatabaseHelper = require('./helper/DatabaseHelper');
const commandController = require('./controller/CommandController');
const queryController = require('./controller/QueryController');
const httpErrorBase = require('./error/httpErrorBase');
const validator = new Validator(new Ajv({strictTuples: false}));
const baseUrl = {
  cpfValidateSerpro: config.services.url.CPF_VALIDATOR_SERPRO,
};
const bcrypt = require('bcrypt');
const logger = require('./logger');

const ApiService = require('./service/ApisService');
const api = new ApiService(axios, baseUrl, httpErrorBase);

const PATH = '/register';
const fileHelper = fileHandlerHelper(fs);

const databaseService = mongoDbService(
    mongoDb,
    DatabaseHelper,
    fileHelper,
    config.mongo.ENABLE_SSL,
);

const s3Client = new AWS.S3({signatureVersion: 'v4'});
const awsS3Service = s3Service(config, s3Client);

const command = commandController(
    PATH,
    databaseService,
    awsS3Service,
    axios,
    baseUrl,
    validator,
    httpErrorBase,
    api,
    logger,
    bcrypt,
);

const query = queryController(PATH, databaseService, awsS3Service);

const router = express.Router();
router.post('/create', command.createNewUser.bind(command));
router.get('/health', query.health.bind(query));
module.exports = {path: PATH, router};
