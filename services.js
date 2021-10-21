const got = require('got');
const supportingMethods = require('./supportingMethods');

exports.getAllMedicines = async (req) => {
    console.log(req);
    const response = await got.get(req).then((allMedicines) => {
        return (supportingMethods.createResponse(200, JSON.stringify(allMedicines.body)));
    })
    .catch((error) => {
        return (supportingMethods.createResponse(500, JSON.stringify(error.message)));
    });
    return Promise.resolve(response);
}

exports.getMedicineById = async (req) => {
    console.log(req);
    const response = await got.get(req)
    .then((medicineData) => {
        console.log(medicineData);
        return supportingMethods.createResponse(200, JSON.stringify(medicineData.body));
    })
    .catch((error) => {
        return supportingMethods.createResponse(500, JSON.stringify(error.message));
    })
    return Promise.resolve(response);
}

exports.updateMedicineById = async (req) => {
    console.log(req);
    const response  = await got.put(req)
    .then((updatedMedicine) => {
        console.log(updateMedicine);
        return supportingMethods.createResponse(200, JSON.stringify(updatedMedicine.body));
    })
    .catch((error) => {
        return supportingMethods.createResponse(500, JSON.stringify(error.message));
    })
    return Promise.resolve(response);
}

exports.deleteMedicineById = async (req) => {
    console.log(req);
    const response = await got.delete(req)
    .then((deletedResponse) => {
        console.log(deletedResponse);
        return supportingMethods.createResponse(200, JSON.stringify(deletedResponse.body));
    })
    .catch((error) => {
        return supportingMethods.createResponse(500, JSON.stringify(error.message));
    })
    return Promise.resolve(response);
}

exports.createMedicine = async (req) => {
    console.log(req);
    const response = await got.post(req)
    .then((createdMedicine) => {
        console.log(createMedicine);
        return supportingMethods.createResponse(200, JSON.stringify(createdMedicine.body));
    })
    .catch((error) => {
        return supportingMethods.createResponse(500, JSON.stringify(error.message));
    })
    return Promise.resolve(response);
}