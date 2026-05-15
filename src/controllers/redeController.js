var redeModel = require("../models/redeModel");

function buscarDadosRede(req,res){
    const servidor = req.params.servidor;
    const periodo = req.params.periodo;

    redeModel.buscarJsonS3(servidor, periodo)
        .then(resultado=>{
            res.json(resultado)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro)
        })
}

module.exports = {
    buscarDadosRede
}