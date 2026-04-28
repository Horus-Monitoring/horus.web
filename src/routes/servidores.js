var express = require("express");
var router = express.Router();

var servidoresController = require("../controllers/servidoresController");

// Servidoes
router.post("/cadastrarServidor", function (req, res) {
    servidoresController.cadastrarServidor(req, res);
})

router.get("/exibirServidores/:fkEmpresa", function (req, res) {
    servidoresController.exibirServidores(req, res);
})

router.get("/listarServidores/:fkEmpresa", function (req, res) {
    servidoresController.listarServidores(req, res);
})

router.delete("/deletarServidor/:id", function (req, res) {
    servidoresController.deletarServidor(req, res);
})

// Componentes
router.post("/cadastrarComponente", function (req, res) {
    servidoresController.cadastrarComponente(req, res);
})

router.get("/abrirDetalhes/:id", function (req, res) {
    servidoresController.abrirDetalhes(req, res);
})

router.delete("/deletarComponente/:id", function (req, res) {
    servidoresController.deletarComponente(req, res);
})

router.get("/listarServidoresComAcesso/:fkEmpresa/:fkFuncionario", function (req, res) {
    servidoresController.listarServidoresComAcesso(req, res);
});

router.post("/atualizarAcessos", function (req, res) {
    servidoresController.atualizarAcessos(req, res);
});

module.exports = router;