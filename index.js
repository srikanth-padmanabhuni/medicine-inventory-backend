/**
 * AUTHOR: Srikanth Padmanabhuni
 * APP: medicine-inventory-backend
 */

/**
 * Initializations and import Required Modules
 */

const supportingMethods = require('./supportingMethods');
const controller = require('./controllers');
const { staticData } = require('./staticdata');
const express = require('express');
const app = express();

const frontendUrl = staticData.frontendUrl;
const port = staticData.port;

/**
 * Server Activation
 */
 app.listen(port, () => {
    console.log(`Server running on port : ${port}/`)
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", frontendUrl);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  /**
   * Routes Definition
   */
  app.get('/',  (req, res) => {
    console.log("/ is hitted");
  })

  app.get('/get/medicines', async (req, res) => {
    console.log("In Index.js");
    const allMedicines = await controller.getMedicines(res);
    Promise.resolve(allMedicines)
    return res.send(allMedicines);
  })

  app.get('/get/medicine/:id',  async (req, res) => {
    const id = req.params.id;
    const medicine = await controller.getMedicineById(id);
    Promise.resolve(medicine)
    return res.send(medicine);
  })

  app.post('/create/medicine',  async (req, res) => {
    const reqBody = JSON.parse(req.body);
    
    const validReqObj = supportingMethods.isValidReqObj(reqBody);
    if(!validReqObj.isValid) {
        return res.send(supportingMethods.createResponse(500, validReqObj));
    }
    let createdMedicine = await controller.createNewMedicine(reqBody);
    Promise.resolve(createdMedicine)
    return res.send(createdMedicine);
  })

  app.put('/update/medicine/:id',  async (req, res) => {
    const reqBody = JSON.parse(req.body);
    
    const validReqObj = supportingMethods.isValidReqObj(reqBody);
    if(!validReqObj.isValid) {
        return res.send(supportingMethods.createResponse(500, validReqObj));
    }
    const id = req.params.id;

    let updatedMedicine = await controller.updateMedicineById(id, reqBody);
    Promise.resolve(updatedMedicine)
    return res.send(updatedMedicine);
  })

  app.delete('/delete/medicine/:id',  async (req, res) => {
    const id = req.params.id;
    let deletedMedicine = await controller.deleteMedicineById(id);
    Promise.resolve(deletedMedicine)
    return res.send(deletedMedicine);
  })