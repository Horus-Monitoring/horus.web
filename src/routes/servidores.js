var express = require("express");
var router = express.Router();

var servidoresController = require("../controllers/servidoresController");

router.post("/cadastrarServidor", function (req, res) {
    servidoresController.cadastrarServidor(req, res);
})

module.exports = router;