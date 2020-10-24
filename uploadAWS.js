const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var secret = require('./secret/ASW');
AWS.config.update({
    accessKeyId: secret.aws.AWSAccessKeyId,
    secretAccessKey: secret.aws.AWSSecretKey,
    region: 'us-east-1',
    endpoint: "https://s3.amazonaws.com"
});

const s0 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'baitapcnm',
        acl: 'public-read',
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            cb(null, file.originalname);
        }
    }),

    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
})

exports.Upload = upload;