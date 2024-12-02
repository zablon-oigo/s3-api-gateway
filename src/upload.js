const AWS=require("aws-sdk")
const s3= new AWS.S3()

const BUCKET_NAME=process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.handler= async event =>{
    const response={
        isBase64Encoded: false,
        statusCode: 200,
    };
    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const params = {
            Bucket: BUCKET_NAME,
            Key: parsedBody.fileKey,
            Body: decodedFile,
            ContentType: "image/jpeg",
        };
        const uploadResult = await s3.upload(params).promise();
    }catch (e) {
        console.error("Failed to upload file: ", e);
        response.body = JSON.stringify({ message: "File failed to upload.", errorMessage: e });
        response.statusCode = 500;
    }

}