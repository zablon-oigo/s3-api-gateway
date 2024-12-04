const AWS=require("aws-sdk")
const s3= new AWS.S3()

const BUCKET_NAME=process.env.FILE_UPLOAD_BUCKET_NAME