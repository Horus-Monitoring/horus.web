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

// Componentes
router.post("/cadastrarComponente", function (req, res) {
    servidoresController.cadastrarComponente(req, res);
})

router.get("/abrirDetalhes/:id", function (req, res) {
    servidoresController.abrirDetalhes(req, res);
})

module.exports = router;