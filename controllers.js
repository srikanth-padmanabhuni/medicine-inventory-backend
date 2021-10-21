
const medicineServices = require("./services");
const { staticData } = require("./staticdata");
const supportingMethods = require("./supportingMethods");

const getAllMedicines = staticData.baseUrl + staticData.getAllMedicines;
const getMedicine = staticData.baseUrl + staticData.getMedicine;
const updateMedicine = staticData.baseUrl + staticData.updateMedicine;
const deleteMedicine = staticData.baseUrl + staticData.deleteMedicine;
const createMedicine = staticData.baseUrl + staticData.createMedicine;

exports.getMedicines = async () => {
    console.log("In controllers.js");
    var req = await supportingMethods.makeNdGetReqObj(getAllMedicines, {}, 'GET');
    const allMedicines = await medicineServices.getAllMedicines(req);
    return Promise.resolve(allMedicines);;
}

exports.getMedicineById = async (id) => {
    const url = await supportingMethods.getUrlByReplacingId(getMedicine, id);
    var req = await supportingMethods.makeNdGetReqObj(url, {}, 'GET');
    const medicine = await medicineServices.getMedicineById(req);
    return Promise.resolve(medicine);;
}

exports.updateMedicineById = async (id, medicineObj) => {
    const url = await supportingMethods.getUrlByReplacingId(updateMedicine, id);
    var req = await supportingMethods.makeNdGetReqObj(url, medicineObj, 'POST');
    const updatedMedicine = await medicineServices.updateMedicineById(req);
    return Promise.resolve(updatedMedicine);;
}

exports.deleteMedicineById = async (id) => {
    const url = await supportingMethods.getUrlByReplacingId(deleteMedicine, id);
    var req = await supportingMethods.makeNdGetReqObj(url, {}, 'DELETE');
    const deletedMedicine = await medicineServices.deleteMedicineById(req);
    return Promise.resolve(deletedMedicine);;
}

exports.createNewMedicine = async (medicineObj) => {
    var req = await supportingMethods.makeNdGetReqObj(createMedicine, medicineObj, 'POST');
    const createdMedicine = await medicineServices.createMedicine(req);
    return Promise.resolve(createdMedicine);;
}