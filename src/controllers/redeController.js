async function buscarDadosRede(req, res) {
    try {
        const periodo = req.params.periodo;

        const params = {
            Bucket: "horus-monitoring",
            Key: `client/empresa_1/c0:35:32:c7:0b:59/dashboard.json`
        };

        const data = await s3.getObject(params).promise();

        const json = JSON.parse(data.Body.toString("utf-8"));

        res.json(json);

    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro);
    }
}

module.exports = {
    buscarDadosRede
}