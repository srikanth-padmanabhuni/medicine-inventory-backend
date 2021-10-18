/**
 * AUTHOR: Srikanth Padmanabhuni
 * APP: medicine-inventory-backend
 */

/**
 * Initializations and import Required Modules
 */
require('dotenv').config();
const express = require('express')
const app = express();
const got = require('got');
const port = process.env.PORT || "8000";

const getAllMedicines = process.env.GET_ALL_MEDICINES_URL
const getMedicine = process.env.GET_MEDICINE_URL
const updateMedicine = process.env.UPDATE_MEDICINE_URL
const deleteMedicine = process.env.DELETE_MEDICINE_URL
const createMedicine = process.env.CREATE_MEDICINE_URL

const regex = /{id}/ig;

/**
 * Supporting Functions
 * @param {INTEGER} statusCode 
 * @param {STRING} message 
 * @returns {JSON}
 */

function handleResponse(statusCode, message) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(message)
    }
}

function getUrlByReplacingId(url, id) {
    console.log(url, id);
    let urlWithId = url.toString();
    urlWithId = urlWithId.replace(regex, id);
    return urlWithId;
}

/**
 * Server Activation
 */
 app.listen(port, () => {
    console.log(`Server running on port : ${port}/`)
  });

  /**
   * Routes Definition
   */
  app.get('/', (req, res) => {
    console.log("/ is hitted");
    got.get(getAllMedicines, {responseType: 'json'})
    .then((allMedicines) => {
        console.log(allMedicines);
        return res.status(200).send(JSON.stringify(allMedicines.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.get('/get/medicine/:id', (req, res) => {
    const url = getUrlByReplacingId(getMedicine, req.params.id);
    console.log(url);
    got.get(url, {responseType: 'json'})
    .then((medicineData) => {
        console.log(medicineData);
        return res.status(200).send(JSON.stringify(medicineData.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.post('/create/medicine', (req, res) => {
    const reqBody = JSON.parse(req.body);
    console.log(reqBody);
    got.post(createMedicine, { body: reqBody, responseType: 'json'})
    .then((createdMedicine) => {
        console.log(createMedicine);
        return res.status(200).send(JSON.stringify(createdMedicine.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.put('/update/medicine/:id', (req, res) => {
    const reqBody = JSON.parse(req.body);
    const url = getUrlByReplacingId(updateMedicine, req.params.id);
    console.log(url);
    got.put(url, { body: reqBody, responseType: 'json'})
    .then((updatedMedicine) => {
        console.log(updateMedicine);
        return res.status(200).send(JSON.stringify(updatedMedicine.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.delete('/delete/medicine/:id', (req, res) => {
    const url = getUrlByReplacingId(deleteMedicine, req.params.id);
    console.log(url);
    got.delete(url, { body: reqBody, responseType: 'json'})
    .then((deletedResponse) => {
        console.log(deletedResponse);
        return res.status(200).send(JSON.stringify(deletedResponse.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })