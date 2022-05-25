const fs = require('fs');
const file = require('../../order1.json');
var xml = require('xml');

/** Command Controller Class */
class CommandController {
  /**
     * Application Command Controller
     * @param {schemaValidator} schemaValidator
     * @param {httpErrorBase} httpErrorBase return a httop error
     * @param {*} logger log app
     * @param {*} converter imagination converter 
     * @param {*} mongoDbService mongodb
     */
  constructor(
    schemaValidator,
    httpErrorBase,
    logger,
    converter,
    mongoDbService
  ) {

    if (
      !schemaValidator ||
      !httpErrorBase ||
      !logger ||
      !converter ||
      !mongoDbService
    ) {
      throw new Error(`Invalid Constructor Args - : 
      validator - ${schemaValidator} 
      errorBase - ${httpErrorBase} 
      logger -  ${logger}
      converter =${converter}
      mongodb- ${mongo}`);
      
    }
    
    this._schemaValidator = schemaValidator;
    this._httpErrorBase = httpErrorBase;
    this._logger = logger;
    this._converter = converter;
    this._mongoDbService = mongoDbService;
  }

  /**
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     */
  async convertToXML(req, res, next) {
  
    try {
      const rules = await this._mongoDbService.indexAllRulles();
      if (rules.length > 0) {
        const fileName = req.files.file.name;
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
       
        fs.writeFile('order1.json', data, (err) => {
  if (err)
throw new this._httpErrorBase(400, error.message);

});
      });
        const objectMapped = await this.mappingObject(file, rules);
        const converterd = await this._converter.getInstance(objectMapped);
        const fileXml = require( '../../data.xml');
        if (!fileXml) {
          throw new this._httpErrorBase(400,'There is no Xml File.')
        }
        res.header('Content-Type', 'application/xml');
        res.send(xml(fileXml)).status(200);

      } else {
        res.send('There is No Rule found. Check with admin to register new rules to conversion.')
      }
    
      
    } catch (err) {
      this._logger.error(`[Convert Service] ${err}`);

      if (err.status && err.message) {
        res.status(err.status).send(err.message);
      }
      err.status = 500;
      err.message = 'Internal server Error';
      return next(err);
    }
  }

   /**
   * @param {*} jsonData Json 
   * @param {*} Rules Rules  
   */
  async mappingObject(jsonData, rules) {

    try {
      let customerPoline = 0;
      let SalesOrders = {
        Orders: {
          OrderHeader: {
            OrderActionType: null,
            Customer: null,
            OrderDate: null,
            InvoiceTerms: null,
            Currency: null,
            ShippingInstrs: null,
            CustomerName: null,
            ShipAddress1: null,
            ShipAddress2: null,
            ShipAddress3: null,
            ShipAddress4: null,
            ShipPostalCode: null,
            Email: null,
          },
          OrderDetails: {
            StockLine: [],
            CommentLine: {
              CustomerPoLine: null,
              LineActionType: null,
              Comment: null,
            
            },
            FreightLine: {
              CustomerPoLine: null,
              LineActionType: null,
              FreightValue: null,
              FreightCost: null
            }
          
          
          }
        }
      };
    
      function incrementCustomerPoline() {
        customerPoline = customerPoline+1;
        return customerPoline;
      }

      function AtributeTarget(lentght, SalesOrders, targetSplited, attributed) {
        
        if (targetSplited[1] === 'StockLine') {
          return null;
        }
         
        switch (lentght) {
        
          case 1:
            SalesOrders.Orders.targetSplited[0] = attributed;

            break;

          case 2:
         
            targetSplited[0] !== undefined ? SalesOrders.Orders[targetSplited[0]][targetSplited[1]] = attributed :
              SalesOrders.Orders.OrderHeader.targetAreSplited[1] = attributed;
            
            break;
          case 3:
         
            SalesOrders.Orders[targetSplited[0]][targetSplited[1]][targetSplited[2]] = attributed;
            
            break;
          case 4:
           
            SalesOrders.Orders[targetSplited[0]][targetSplited[1][targetSplited[2]]][targetSplited[3]] = attributed
           
            break;
        }
      }
    
      function getFromItems(splits) {
        let count = 0;
        if (splits[0] = 'items') {
        
         
          jsonData.items.map(e => {
            Object.entries(e).forEach(([key, value]) => {

              //MONTAR O OBJETO
              //SalesOrders.Orders.OrderDetails. 
              const StockLine = {
                CustomerPoLine: incrementCustomerPoline(),
                StockCode: e.sku ? e.sku : 'Not Found',
                Warehouse: e.extension_attributes.suggested_inventory_source ? e.extension_attributes.suggested_inventory_source : null,
                OrderQty: e.qty_ordered ? e.qty_ordered : null,
                OrderUom: e.extension_attributes.unit_of_measure ? e.extension_attributes.unit_of_measure : null,
                Price: e.price ? e.price : null,
                PriceUom: e.extension_attributes.unit_of_measure_price ? e.extension_attributes.unit_of_measure_price : null,
                PriceCode: 'TEST',
                AlwaysUsePriceEntered: 'Y',
                AlwaysUseDiscountEntered: "N",
                CustRequestDate: e.created_at ? e.created_at.split(" ")[0] : null,
              }
             
              SalesOrders.Orders.OrderDetails.StockLine.push(StockLine);
            })
          }
      
          )
        }
      }
        
      
      for (let i = 0; i <= rules.length; i++) {

        let targetSplited = [];
        let targetAreSplited = [false,0];

        if (rules[i]) {
          targetSplited = rules[i].target.split('.');
        }
        if (targetSplited.length > 1) {
          targetAreSplited = [true, targetSplited.length];
        }


        if (rules[i] && rules[i].origin === "") {
          if (targetAreSplited[0] = true) {
            AtributeTarget(targetAreSplited[1], SalesOrders, targetSplited, rules[i].static)
          } else {
            AtributeTarget(targetAreSplited[1], SalesOrders, targetSplited, rules[i].static)
          }
           
        } else if ((rules[i] && rules[i].origin !== "")) {

          const splits = rules[i].origin.split('.');
           
          if (splits.length === 3) {
            (splits[0] === 'items' && targetAreSplited[0] == true && targetSplited[1] === 'StockLine') ? getFromItems(splits) :
              Object.entries(jsonData).forEach(([key, value]) => {
                AtributeTarget(targetAreSplited[0], SalesOrders, targetSplited, jsonData[splits[0]][splits[1]][splits[2]]);
              });
          }
          if (splits.length == 2) {
           
            (splits[0] === 'items' && targetAreSplited[0] == true && targetSplited[1] === 'StockLine') ? getFromItems(splits, SalesOrders.Orders[rules[i].target], jsonData[splits[0]][splits[1]]) :
              Object.entries(jsonData).forEach(([key, value]) => {
                AtributeTarget(targetAreSplited[1], SalesOrders, targetSplited, jsonData[splits[0]][splits[1]])
            
              });
          }
          if (splits.length === 1) {
              
            Object.entries(jsonData).forEach(([key, value]) => {
              AtributeTarget(targetAreSplited[1], SalesOrders, targetSplited, jsonData[splits[0]])
            })
            console.log(splits)
          }
              
               
         
        }
        
      
       
      }
      SalesOrders.Orders.OrderDetails.CommentLine.CustomerPoLine = incrementCustomerPoline();
      SalesOrders.Orders.OrderDetails.FreightLine.CustomerPoLine = incrementCustomerPoline();
      let dateSplited = SalesOrders.Orders.OrderHeader.OrderDate.split(" ")[0];
      SalesOrders.Orders.OrderHeader.OrderDate = dateSplited
      let str = SalesOrders.Orders.OrderHeader.ShippingInstrs;
      str=(str && str.length>40)?str.substr(0, 41):null
      SalesOrders.Orders.OrderHeader.ShippingInstrs = str;

      str = SalesOrders.Orders.OrderHeader.CustomerName;
      str = (str && str.length>40) ? str.substr(0, 41) : null;
     
      return SalesOrders;
    } catch (e) {
       console.log(e)
      throw new this._httpErrorBase(400, e.message);
    }
  
  }
  /**
   * @param {*} req Express request
   * @param {*} res Express response
   * @param {*} next Express next
   */
   async insertNewFieldRule(req, res, next) {
     try {
     
       //validar objetos require
       let objectSaved = [];

       for (let i = 0; i < req.body.length; i++){
         const objetcExist = await this._mongoDbService.findRuleConvertion(req.body[i].origin, req.body[i].conversion);
         if (objetcExist == false) {
           const ruleSaved = await this._mongoDbService.createRule(req.body[i]);
           objectSaved.push(ruleSaved)
         }          
       
       }
      res.send(objectSaved.length>1?objectSaved:'No rule to change' ).status(200);
     } catch (e) {
       console.log(e)
      throw new this._httpErrorBase(400, e.message);
    }
  
  }
  /**
     * @param {Object} schema
     * @param {Object} data
     */
  async validateSchema(schema, data) {
    try {
      return await this._schemaValidator.validate(schema, data);
    } catch (error) {
      console.log(error);
      throw new this._httpErrorBase(400, error.message);
    }
  }

 
}


module.exports = (
    
    schemaValidator,
    httpErrorBase,
    logger,
    converter,
    mongoDbService

) =>
  new CommandController(
     schemaValidator,
    httpErrorBase,
    logger,
    converter,
    mongoDbService
  );
