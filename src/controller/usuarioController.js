var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer
    var senha = req.body.senhaServer

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function(resultado) {
                    res.json(resultado)
                }
            ) .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "Houve um erro ao realizar o login! Erro: " + erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

module.exports = {
    autenticar
}