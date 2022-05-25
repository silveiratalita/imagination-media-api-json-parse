/** Dependencies */
const schemas = require('../schema');

/** Service MongoDB Class */
class MongoDbService {
  /**
     * Application MongoDB Service
     * @param {*} mongoDb Database Instance
     * @param {DatabaseHelper} DatabaseHelper Database Helper
     * @param {FileHelper} fileHelper File Helper
     * @param {*} sslCa Use SSL (Path File)
     */
  constructor(mongoDb, DatabaseHelper, sslCa = false) {
    if (!mongoDb || !DatabaseHelper ) {
      throw new Error(`Invalid Constructor Args - : ${mongoDb} -
      ${DatabaseHelper}`);
    }

    const enviroment = DatabaseHelper.enviroment();
    const ssl = sslCa ? fileHelper.keyPair() : null;
    this._instanceMongoDb = this._getConnector(
        mongoDb,
        enviroment.MONGO_HOST,
        enviroment.MONGO_USERNAME,
        enviroment.MONGO_PASSWORD,
        enviroment.MONGO_DATABASE,
        enviroment.MONGO_PORT,
        ssl,
    );
  }

  /**
     * Get Connector MongoDB
     * @param {*} mongoDb
     * @param {String} host
     * @param {String} username
     * @param {String} password
     * @param {String} database
     * @param {String} port
     * @param {*} ssl
     * @return {*} MongoDb Instance
     */
  _getConnector(mongoDb, host, username, password, database, port, ssl) {
    if (!mongoDb || !host || !username || !password || !database || !port) {
      throw new Error(`Invalid Get Connector Args - : ${mongoDb} - ${host} -
      ${username} - ${password} - ${database} - ${port}`);
    }
    return mongoDb.getInstance(
        host,
        username,
        password,
        database,
        port,
        ssl,
    );
  }

  /**
     * Build model by schema
     * @param {*} conn Connection
     * @param {*} schema Schema
     * @return {*} TopicModel
     */
  async _buildModel(conn, schema) {
    if (!conn) {
      throw new Error(`Invalid Build Models Args - : ${conn}`);
    }
    return await this._instanceMongoDb.getModel(conn, schema);
  }

  /**
     * Build model by schema
     * @param {*} mappObject User to save
     */
  async createRule(mappObject) {
    const conn = await this._instanceMongoDb.getConnection();
    const MappModel = await this._buildModel(conn, schemas.mapp);
    const newMappObject = await new MappModel(mappObject);
    await this._instanceMongoDb.createDocument(MappModel, newMappObject);
    await newMappObject.save();
    return newMappObject;
  }
  /**
     * Build model by schema
     * @param {*} origin origin to find
     * @param {*} convertion origin to find
     */
  async findRuleConvertion(origin,convertion) {
    const conn = await this._instanceMongoDb.getConnection();
    const MappModel = await this._buildModel(conn, schemas.mapp);
    const ruleFound = await MappModel.findOne({ oigin: origin, convertion: convertion });
    if (ruleFound === null) {
      return false;
    } else {
      return true;
    }
  }
  /**
     * Build model by schema
     * @param {*} origin origin to find
     * @param {*} convertion origin to find
     */
  async indexAllRulles() {
    const conn = await this._instanceMongoDb.getConnection();
    const MappModel = await this._buildModel(conn, schemas.mapp);
    const indexRuless = await MappModel.find();
    return indexRuless;
  }
}

/**
 * Get MongoDB Service
 * @param {*} mongoDb Database Instance
 * @param {DatabaseHelper} DatabaseHelper Database Helper
 * @param {FileHelper} fileHelper File Helper
 * @param {*} sslCa Use SSL (Path File)
 * @param {*} logger Logger
 * @return {MongoDbService} Service Instance
 */
module.exports = (mongoDb, DatabaseHelper, fileHelper, sslCa, logger) =>
  new MongoDbService(mongoDb, DatabaseHelper, fileHelper, sslCa, logger);
