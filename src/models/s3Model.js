const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function buscarJsonS3(){
/* async function buscarJsonS3(empresa, mac_adress,  periodo){
        const key = `client/${empresa}/${mac_adress}/${servidor}_${periodo}.json`;*/
    const key = `client/gestor/empresa_1/dashboard.json`;

    const command = new GetObjectCommand({
        Bucket: "bucket-teste-sprint-3-2026",
        Key: key
    });

    const response = await s3.send(command);

    const jsonString = await response.Body.transformToString();

    return JSON.parse(jsonString);
}

module.exports = {
    buscarJsonS3
}