var servidoresModel = require("../models/servidoresModel");

// Servidores
function cadastrarServidor(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    var nome = req.body.nomeServer;
    var ip = req.body.ipServer;
    var localizacao = req.body.localizacaoServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var limiteCpu = req.body.limiteCpuServer;
    var unidadeMedidaCpu = req.body.unidadeMedidaCpuServer;
    var limiteRam = req.body.limiteRamServer;
    var unidadeMedidaRam = req.body.unidadeMedidaRamServer;
    var limiteDisco = req.body.limiteDiscoServer;
    var unidadeMedidaDisco = req.body.unidadeMedidaDiscoServer;

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
    } else {
        
        servidoresModel.cadastrarServidor(nome, ip, localizacao, sistemaOperacional, fkEmpresa, limiteCpu, unidadeMedidaCpu, limiteRam, unidadeMedidaRam, limiteDisco, unidadeMedidaDisco)
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

function deletarServidor(req, res) {
    var id = req.params.id
    
    servidoresModel.deletarServidor(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao deletar servidor!\nErro: ",
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
    var unidadeMedida = req.body.unidadeMedidaServer;
    var componenteLimite = req.body.componenteLimiteServer;

    if (fkServidor == undefined) {
        res.status(400).send("fkServidor está undefined!");
    } else if (fkComponente == undefined) {
        res.status(400).send("fkComponente está undefined!");
    } else if (unidadeMedida == undefined) {
        res.status(400).send("Unidade medida está undefined!");
    } else if (componenteLimite == undefined) {
        res.status(400).send("Limite está undefined!");
    } else {
        
        servidoresModel.cadastrarComponente(fkServidor, fkComponente, unidadeMedida, componenteLimite)
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

function abrirDetalhes(req, res) {
    var fkServidor = req.params.id
    
    servidoresModel.abrirDetalhes(fkServidor)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao abrir os detalhes!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}

function deletarComponente(req, res) {
    var id = req.params.id
    
    servidoresModel.deletarComponente(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao deletar servidor!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}

module.exports = {
    cadastrarServidor,
    exibirServidores,
    listarServidores,
    cadastrarComponente,
    abrirDetalhes,
    deletarServidor,
    deletarComponente
}