const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function buscarDadosRede(req, res) {
    try {

        const command = new GetObjectCommand({
            Bucket: "horus-monitoring",
            Key: "client/empresa_1/c0:35:32:c7:0b:59/dashboard.json"
        });

        const data = await s3.send(command);

        const jsonString = await data.Body.transformToString();

        const json = JSON.parse(jsonString);

        res.json(json);

    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro);
    }
}

module.exports = {
    buscarDadosRede
}