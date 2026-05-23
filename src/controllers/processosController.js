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

        Bucket: "horus-monitoring-leticia",

        Key: key
    });

    const data = await s3.send(command);

    const jsonString = await data.Body.transformToString();

    return JSON.parse(jsonString);
}

async function capturarDados(req, res) {

    try {

        const [processos, criticos] = await Promise.all([

            // lerJson(
            //     "client/kpis/process_raw_kpis.json"
            // ),

            lerJson(
                "client/process_raw_kpis.json"
            ),

            lerJson(
                "client/raw_criticos_4h.json"
            )

        ]);

        res.json({
            processos,
            criticos
        });

        console.log(criticos)

        //console.log("KPIS:");
        //console.log(kpis);

        //console.log("PROCESSOS:");
        //console.log(processos);

    } catch (erro) {

        console.error(
            "ERRO AWS:",
            erro
        );

        res.status(500).json({
            erro:
                "Erro ao buscar dashboard"
        });
    }
}

module.exports = {
    capturarDados
};