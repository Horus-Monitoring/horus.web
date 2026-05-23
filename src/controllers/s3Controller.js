const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function buscarDadosS3(req, res) {

    try {

        const command = new GetObjectCommand({

            Bucket: "bucket-teste-sprint-3-2026",

            Key:
                `client/gestor/empresa_1/dashboard_gestor.json`
        });

        const data = await s3.send(command);

        const jsonString =
            await data.Body.transformToString();

        const json = JSON.parse(jsonString);

        res.json(json);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro ao buscar dados do S3"
        });
    }
}

module.exports = {
    buscarDadosS3
}