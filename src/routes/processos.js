var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/capturarDados", function (req, res) {
    processosController.capturarDados(req, res);
})

module.exports = router;