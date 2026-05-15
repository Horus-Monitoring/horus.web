var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/rede/:servidor/:periodo", function(req, res){
    redeController.buscarDadosRede(req,res)
})