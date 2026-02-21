var express = require("express");
var router = express.Router();

var usuarioController = require("../controller/usuarioController");

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
})

module.exports = router;