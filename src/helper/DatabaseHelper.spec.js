const DatabaseHelper = require('./DatabaseHelper');

describe('Testing topic/helper/DatabaseHelper.js -> enviroment', () => {
  const properties = {
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_ENABLE_SSL: Number(process.env.MONGO_ENABLE_SSL),
  };

  it('Testing Properties Enviroment', () => {
    expect(DatabaseHelper.enviroment()).toEqual(properties);
  });
});
