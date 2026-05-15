var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/rede/buscarDadosRede", function(req, res){
    redeController.buscarDadosRede(req,res)
})