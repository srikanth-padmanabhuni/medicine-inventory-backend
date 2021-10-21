const { staticData } = require("./staticdata");

const regex = staticData.regex;

exports.createPostReqObj = async (url, body) => {
    const postReq = {
        url: url,
        responseType: 'json',
        body: body
    }
    return postReq;
}

exports.createDelReqObj = async (url) => {
    const delReq = {
        url: url
    }
    return delReq;
}

exports.getUrlByReplacingId = async (url, id) => {
    console.log(url, id);
    let urlWithId = url.toString();
    urlWithId = urlWithId.replace(regex, id);
    return urlWithId;
}

exports.createGetReqObj = async (url) => {
    console.log(url);
    const getReq = {
        url: url,
        responseType: 'json'
    }
    return getReq;
}

exports.makeNdGetReqObj = async (url, reqBody, reqType) => {
    switch(reqType) {
        case 'GET': return this.createGetReqObj(url);
        case 'POST': return this.createPostReqObj(url, reqBody);
        case 'DELETE': return this.createDelReqObj(url);
    }
}

exports.createResponse = async (statusCode, body) => {
    let response = {};
    response.statusCode = statusCode;
    response.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true
    }
    if (body) {
        response.body = body;
    }
    console.log(response);
    return response;
}

exports.isValidReqObj = async (medicineObj) => {
    let resp = {
        isValid: true,
        errorMessages: []
    }
    if (!medicineObj) {
        resp.isValid = false;
        resp.errorMessages.push('Please provide all valid details to create medicine.');
    } else {
        if (!medicineObj.medicineName) {
            resp.isValid = false;
            resp.errorMessages.push('Please provide a valid medicine name.');
        }
        if (!medicineObj.companyName) {
            resp.isValid = false;
            resp.errorMessages.push('Please provide company name who made medicine.')
        }
        if (!medicineObj.availableDiscount) {
            resp.isValid = false;
            resp.errorMessages.push('Please provide valid discount details.')
        }
        if (!medicineObj.cost) {
            resp.isValid = false;
            resp.errorMessages.push('Please provide valid price of medicine.')
        }
        if (!medicineObj.availableStock) {
            resp.isValid = false;
            resp.errorMessages.push('Please provide valid stock available in inventory.')
        }
        if (!medicineObj.expiryDate) {
            resp.isValid = false;
            resp.errorMessages.push('Please provide expiry date of the medcine');
        }
    }

    return resp;
}