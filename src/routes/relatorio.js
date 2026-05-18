var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController")

router.get("/:servidor/:email", function(req, res){
    relatorioController.gerarRelatorio(req,res)
});


module.exports = router;