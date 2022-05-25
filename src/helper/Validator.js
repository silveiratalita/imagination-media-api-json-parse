/** Command Validator Class */
class Validator {
  /**
     * Application Command Controller
     * @param {Object} objAjv Object Ajv
     */
  constructor(objAjv) {
    if (!objAjv) {
      throw new Error(`Invalid Constructor Args - : ${objAjv}`);
    }
    this._objAjv = objAjv;
  }

  /**
     * Health Check Method
     * @param {*} schema Contract
     * @param {*} data SQS Data
     * @return {*} True or Error
     */
  _validate(schema, data) {
    // const ajv = new Ajv();
    if (!this._objAjv.validate(schema, data)) {
      return {
        error: this._objAjv.errorsText(),
      };
    }

    return {
      success: true,
    };
  }

  /**
     * Health Check Method
     * @param {*} schema Express Request
     * @param {*} data Express Response
     * @return {*} Express res.send()
     */
  validate(schema, data) {
    if (! schema || ! data) {
      throw new Error(`Invalid Validate Args - : ${schema} - ${data} `);
    }
    return new Promise((resolve, reject) => {
      const result = this._validate(schema, data);
      if (result.success) {
        return resolve(result.success);
      }
      return reject(result.error);
    });
  }
}

module.exports = Validator;
