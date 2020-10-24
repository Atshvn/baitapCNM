var controller= require('../controller/sinhvien');
var aws = require('../uploadAWS')
var express= require('express');
var router= express.Router();
module.exports= router;
router.get('/sinhvien', controller.getAllSinhVien);
router.get('/sinhvien/add', controller.getAddSinhVien);
router.get('/sinhvien/update/:id', controller.getUpdateSinhVien);
router.get('/sinhvien/delete/:id', controller.deleteSinhVien);

router.post('/sinhvien/upload', aws.Upload.any(), controller.Upload);
router.post('/addsinhvien', controller.createSinhVien);
router.post('/sinhvien/update', controller.updateSinhVien);