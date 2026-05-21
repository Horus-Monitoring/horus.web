// npm i @aws-sdk/client-s3 (conexao entre s3 e front)
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function capturarDados(req, res) {

    try {

        const command = new GetObjectCommand({

            Bucket: "s3-raw-lab-060",

            // client -> id da empresa -> mac address -> processos.json 
            Key:
                `client/dashboard_local.json`
        });

        //console.log(Key);

        // aguardando resposta da requisição
        const data = await s3.send(command);

        // transforma json em string
        const jsonString =
            await data.Body.transformToString();

        const json = JSON.parse(jsonString);

        res.json(json);
        console.log(json);

    } catch (erro) {

        console.error("ERRO AWS:", erro);

        res.status(500).json({
            erro: "Erro ao buscar dashboard"
        });
    }
}

module.exports = {
    capturarDados
}