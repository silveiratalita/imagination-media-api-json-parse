/** Dependencies */
const config = require('../../config/general');

/** Configurations Database */
class DatabaseHelper {
  /**
  * @typedef {object} Enviroment
  * @property {string} MONGO_HOST
  * @property {string} MONGO_DATABASE
  * @property {string} MONGO_PORT
  * @property {string} MONGO_USERNAME
  * @property {string} MONGO_PASSWORD
  */

  /**
   * Enviroments
   * @return {Enviroment}
   */
  static enviroment() {
    return {
      MONGO_HOST: config.mongo.HOST,
      MONGO_DATABASE: config.mongo.DATABASE,
      MONGO_PORT: config.mongo.PORT,
      MONGO_USERNAME: config.mongo.USERNAME,
      MONGO_PASSWORD: config.mongo.PASSWORD,
      MONGO_ENABLE_SSL: config.mongo.ENABLE_SSL,
    };
  }
}

/**
 * Get Database Helper
 * @return {DatabaseHelper} DatabaseHelper Instance
 */
module.exports = DatabaseHelper;
