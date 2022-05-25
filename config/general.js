const config = {

  app: {
    NAME: process.env.APP_NAME,
    PORT: process.env.APP_PORT,
  },
   mongo: {
    HOST: process.env.MONGO_HOST,
    DATABASE: process.env.MONGO_DATABASE,
    PORT: process.env.MONGO_PORT,
    USERNAME: process.env.MONGO_USERNAME,
    PASSWORD: process.env.MONGO_PASSWORD,
    ENABLE_SSL: Number(process.env.MONGO_ENABLE_SSL),
  },
 
  logger: {
    topicArn: process.env.LOGGER_TOPIC_ARN,
  },
 
};

module.exports = config;
