var servidoresModel = require("../models/servidoresModel");

// Servidores
function cadastrarServidor(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    var nome = req.body.nomeServer;
    var ip = req.body.ipServer;
    var localizacao = req.body.localizacaoServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var statusInicial = req.body.statusInicialServer;
    console.log("Servidores Controller");

    if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("IP está undefined!");
    } else if (localizacao == undefined) {
        res.status(400).send("Localização está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("Sistema Operacional está undefined!");
    } else if (statusInicial == undefined) {
        res.status(400).send("Status inicial está undefined!");
    } else {
        
        servidoresModel.cadastrarServidor(nome, ip, localizacao, sistemaOperacional, statusInicial, fkEmpresa)
            .then(
                (resultado => {
                    res.json(resultado);
                })
            ).catch(
                (erro => {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o servidor!\nErro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }) 
            );
    }
}

function exibirServidores(req, res) {
    var fkEmpresa = req.params.fkEmpresa
    
    servidoresModel.exibirServidores(fkEmpresa)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao exibir os servidores!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}

function listarServidores(req, res) {
    var fkEmpresa = req.params.fkEmpresa
    
    servidoresModel.listarServidores(fkEmpresa)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar os servidores!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}

// Componentes
function cadastrarComponente(req, res) {
    var fkServidor = req.body.fkServidorServer
    var fkComponente = req.body.fkComponenteServer;
    var marca = req.body.marcaServer;
    var modelo = req.body.modeloServer;
    var statusInicial = req.body.statusInicialServer;

    if (fkServidor == undefined) {
        res.status(400).send("fkServidor está undefined!");
    } else if (fkComponente == undefined) {
        res.status(400).send("fkComponente está undefined!");
    } else if (marca == undefined) {
        res.status(400).send("marca está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("modelo está undefined!");
    } else if (statusInicial == undefined) {
        res.status(400).send("statusInicial está undefined!");
    } else {
        
        servidoresModel.cadastrarComponente(fkServidor, fkComponente, marca, modelo, statusInicial)
            .then(
                (resultado => {
                    res.json(resultado);
                })
            ).catch(
                (erro => {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o servidor!\nErro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }) 
            );
    }
}

module.exports = {
    cadastrarServidor,
    exibirServidores,
    listarServidores,
    cadastrarComponente
}