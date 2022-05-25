class QueryController {
  /**
     * @param {MongoDbService} mongoDbService MongoDB Service
     */
  constructor(mongoDbService) {
    if (!mongoDbService ) {
      throw new Error(`Invalid Constructor Args - ${mongoDbService}`);
    }
    
    this._mongoDbService = mongoDbService;
  }

  /**
   * @param {*} req Express request
   * @param {*} res Express response
   * @param {*} next Express next
   */
   async health(req, res, next) {
    try {
      res.send().status(200);
    } catch (e) {
      e.status = e.status || 500;
      return next(e);
    }
  
   }

}

module.exports = (mongoDbService) =>
  new QueryController(mongoDbService);
