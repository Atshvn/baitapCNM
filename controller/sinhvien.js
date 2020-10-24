var AWS = require("aws-sdk");
var _ = require('lodash');
var formidable =require('formidable');
var secret = require('../secret/ASW');
//cai dat dyamodb
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": secret.aws.AWSAccessKeyId, "secretAccessKey":secret.aws.AWSSecretKey ,
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
//get toan bo sinh vien
module.exports.getAllSinhVien = function (req, res) {
    let params = {
        TableName: "SinhVien"
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            res.end(JSON.stringify({ error: 'Lỗi không thể truy xuất dữ liệu' }));
        } else {
            res.render('index', {data: data});
        }
    });
};

// get page them sinh vien
module.exports.getAddSinhVien = function(req, res){
    res.render('add');
}
// get page update sinh vien
module.exports.getUpdateSinhVien = function(req, res){
    let params = {
        TableName: "SinhVien",
        Key: {
            id: req.params.id
          },
    };
    docClient.get(params, function (err, data) {
        if (err) {
          res.send("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        } else {
            // res.send(
            //     "users::fetchOneByKey::success - " + JSON.stringify(data, null, 2)
            //   );
            res.render('update', { data: data});
        }
      });

}
// them sinh vien
module.exports.createSinhVien = function (req, res, next) {
    const { ma_sinhvien, ten_sinhvien, namsinh, ma_lop, upload } = req.body;
    const id = (Math.floor(Math.random() * 1000)).toString();
    let params = {
        TableName: 'SinhVien',
        Item:
        {
            id: id,
            ma_sinhvien: ma_sinhvien,
            ten_sinhvien: ten_sinhvien,
            ma_lop: ma_lop,
            avatar: upload,
            namsinh: namsinh
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.redirect('/sinhvien');
        }
    });
};

//upload hinh 
module.exports.Upload = function (req, res) {
    const form = new formidable.IncomingForm();

    form.on('file', (field, file) => { });

    form.on('error', (err) => { });

    form.on('end', () => { });

    form.parse(req);
},

//cap nhat thong tin sinh vien
module.exports.updateSinhVien = function (req, res) {
    const { id, ma_sinhvien, ten_sinhvien, namsinh, ma_lop, upload } = req.body;
    const params = {
        TableName: 'SinhVien',
        Key: {
            id: id
        },
        UpdateExpression: "set  ma_sinhvien = :ma_sinhvien, ten_sinhvien = :ten_sinhvien , namsinh = :namsinh, ma_lop = :ma_lop, avatar =:avatar",
        ExpressionAttributeValues: {
            
            ":ma_sinhvien": ma_sinhvien,
            ":ten_sinhvien": ten_sinhvien,
            ":ma_lop": ma_lop,
            ":avatar": upload,
            ":namsinh": namsinh,

        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
        if (err) {
            res.send("users::save::error - " + JSON.stringify(err, null, 2));
        } else {
            res.redirect('/sinhvien');
        }
    });
};
//xoa sinh vien klhoi danh sach
module.exports.deleteSinhVien = function (req, res) {
    var params = {
        TableName: 'SinhVien',
        Key: {
            "id": req.params.id
        }
    };
    docClient.delete(params, function (err, data) {

        if (err) {
            res.send("users::delete::error - " + JSON.stringify(err, null, 2));
        } else {
            res.redirect('/sinhvien');
        }
    });
};