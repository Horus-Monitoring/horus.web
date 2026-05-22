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

        const periodo = req.params.periodo;
        const mac_address = req.params.mac_address;
        const id_empresa = req.params.id_empresa;

        const command = new GetObjectCommand({

            Bucket: "horus-monitoring",

            Key:
                `client/empresa_${id_empresa}/${mac_address}/dashboard_rede_${periodo}.json`
        });

        const data = await s3.send(command);

        const jsonString =
            await data.Body.transformToString();

        const json = JSON.parse(jsonString);

        res.json(json);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro ao buscar dashboard"
        });
    }
}

module.exports = {
    buscarDadosRede
}