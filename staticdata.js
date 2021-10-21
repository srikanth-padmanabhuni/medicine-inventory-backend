module.exports.staticData = {
    baseUrl: 'https://v5qor88o39.execute-api.us-east-1.amazonaws.com/Prod',
    getAllMedicines: '/get/medicines',
    getMedicine: '/get/medicine/{id}',
    updateMedicine: '/update/medicine/{id}',
    deleteMedicine: '/delete/medicine/{id}',
    createMedicine: '/create/medicine',
    port: 8000,
    regex: /{id}/ig,
    frontendUrl: 'http://localhost:4200/'
    //https://d2qmzrrleod3wn.cloudfront.net/'
}