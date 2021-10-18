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
const cors = require('cors')

const getAllMedicines = process.env.GET_ALL_MEDICINES_URL
const getMedicine = process.env.GET_MEDICINE_URL
const updateMedicine = process.env.UPDATE_MEDICINE_URL
const deleteMedicine = process.env.DELETE_MEDICINE_URL
const createMedicine = process.env.CREATE_MEDICINE_URL

const regex = /{id}/ig;

const frontendUrl = process.env.FRONEND_URL;

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

function createGetReqObj(url) {
    console.log(url);
    const getReq = {
        url: url,
        responseType: 'json'
    }
    console.log(getReq);
    return getReq;
}

function createPostReqObj(url, body) {
    const postReq = {
        url: url,
        responseType: 'json',
        body: body
    }
    console.log(postReq);
    return postReq;
}

function createDelReqObj(url, body) {
    const delReq = {
        url: url
    }
    console.log(delReq);
    return delReq;
}

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

  app.get('/get/medicines', (req, res) => {
    console.log("get all medicines");
    var req = createGetReqObj(getAllMedicines);
    got.get(req)
    .then((allMedicines) => {
        console.log(allMedicines);
        return res.status(200).send(JSON.stringify(allMedicines.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.get('/get/medicine/:id',  (req, res) => {
    const url = getUrlByReplacingId(getMedicine, req.params.id);
    console.log(url);
    var req = createGetReqObj(url);
    got.get(req)
    .then((medicineData) => {
        console.log(medicineData);
        return res.status(200).send(JSON.stringify(medicineData.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.post('/create/medicine',  (req, res) => {
    const reqBody = JSON.parse(req.body);
    console.log(reqBody);
    var req = createPostReqObj(createMedicine, reqBody);
    got.post(req)
    .then((createdMedicine) => {
        console.log(createMedicine);
        return res.status(200).send(JSON.stringify(createdMedicine.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.put('/update/medicine/:id',  (req, res) => {
    const reqBody = JSON.parse(req.body);
    const url = getUrlByReplacingId(updateMedicine, req.params.id);
    console.log(url);
    var req = createPostReqObj(url, reqBody);
    got.put(req)
    .then((updatedMedicine) => {
        console.log(updateMedicine);
        return res.status(200).send(JSON.stringify(updatedMedicine.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })

  app.delete('/delete/medicine/:id',  (req, res) => {
    const url = getUrlByReplacingId(deleteMedicine, req.params.id);
    console.log(url);
    var req = createDelReqObj(url);
    got.delete(req)
    .then((deletedResponse) => {
        console.log(deletedResponse);
        return res.status(200).send(JSON.stringify(deletedResponse.body));
    })
    .catch((error) => {
        return res.status(500).send(JSON.stringify(error.message));
    })
  })