/** Dependencies */
const Validator = require('./Validator');

describe('Testing helper/Validator.js -> constructor', () => {
  let Ajv = null;

  beforeEach(() => {
    Ajv = jasmine.createSpy();
  });

  it('Constructor Without Args', () => {
    expect(() => new Validator()).toThrowError();
  });


  it('Constructor Not Error', () => {
    expect(() => new Validator(Ajv))
        .not.toThrowError();
  });
});

describe('Testing service/MongoDbService.js -> createNewQuestion', () => {
  let Ajv = null;
  let instance = null;
  let data = {
    theme: 'Novo Topico',
    description: 'Descricao',
  };

  const schemaTopic = {
    type: 'object',
    properties: {
      theme: {type: 'string'},
      description: {type: 'string'},
    },
    required: ['theme', 'description'],
  };

  beforeEach(() => {
    Ajv = jasmine.createSpyObj('Ajv', ['validate', 'errorsText']);
    instance = new Validator(Ajv);
  });

  it('Validate Without Args', () => {
    expect(() => instance.validate()).toThrowError();
  });

  it('Validate With 1 Args', () => {
    expect(() => instance.validate(schemaTopic)).toThrowError();
  });

  it('Contract Failure', async(finish) => {
    const data = {
      theme: 'Novo Topico',
    };
    Ajv.validate.and.returnValue(false);
    try {
      await instance.validate(schemaTopic, data);
      fail('FAIL: Invalid Contract');
    } catch (err) {
      expect(Ajv.validate).toHaveBeenCalledTimes(1);
      expect(Ajv.validate).toHaveBeenCalledWith(schemaTopic, data);
      finish();
    }
  });

  it('Contract Successfully Validated', async(finish) => {
    data = {
      theme: 'Novo Topico',
      description: 'Descricao',
    };
    Ajv.validate.and.returnValue(true);
    try {
      await instance.validate(schemaTopic, data);
      finish();
    } catch (err) {
      expect(Ajv.validate).toHaveBeenCalledTimes(1);
      expect(Ajv.validate).toHaveBeenCalledWith(schemaTopic, data);
      fail('FAIL: Invalid Contract');
    }
  });
});
