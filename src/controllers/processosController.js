// npm i @aws-sdk/client-s3

const {S3Client,GetObjectCommand} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function lerJson(key) {

    const command = new GetObjectCommand({

        Bucket: process.env.AWS_BUCKET,

        Key: key
    });

    const data = await s3.send(command);

    const jsonString = await data.Body.transformToString();

    return JSON.parse(jsonString);
}

async function capturarDados(req, res) {

    const mac_address =
        decodeURIComponent(req.params.mac_address);

    const id_empresa =
        req.params.id_empresa;

    try {

        const [processos, criticos] = await Promise.all([

            lerJson(
                `client/empresa_${id_empresa}/${mac_address}/process_raw_kpis.json`
            ),

            lerJson(
                `client/empresa_${id_empresa}/${mac_address}/raw_criticos_4h.json`
            )

        ]);

        res.json({
            processos,
            criticos
        });

    } catch (erro) {

        console.error("ERRO AWS:", erro);

        res.status(500).json({
            erro: "Erro ao buscar dashboard"
        });
    }
}
module.exports = {
    capturarDados
};