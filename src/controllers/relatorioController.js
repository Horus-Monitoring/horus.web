const path = require("path");
const { spawn } = require("child_process");

async function gerarRelatorio(req, res){

    const { usuario, email, mac_address, servidor, id_empresa } = req.params;
    

    const caminhoJar = path.resolve(
        "C:/Users/ricar/Documents/SP Tech/CCO/2 Semestre/Projeto/Backend/JarExecutavel/target/JarExecutavel-1.0-SNAPSHOT.jar"
    ); //Deixar dinâmico após subir no docker da EC2 FAZER!!
    let caminhoPDF = "";

    const javaProcess = spawn("java", [
        "-jar",
        "relatorio.jar", //Mudar?  FAZER!!
        usuario,
        email,
        mac_address,
        servidor,
        id_empresa
    ]);

    javaProcess.stdout.on("data", (data)=>{
        caminhoPDF += data.toString();
    });

    javaProcess.on("close", ()=>{

        caminhoPDF = caminhoPDF.trim();

        res.download(caminhoPDF);
    });

}

module.exports = {
    gerarRelatorio
}