const path = require("path");
const { spawn } = require("child_process");

async function gerarRelatorio(req, res){

    const { servidor, email } = req.params;
    

    const caminhoJar = path.resolve(
        "C:/Users/ricar/Documents/SP Tech/CCO/2 Semestre/Projeto/Backend/JarExecutavel/target/JarExecutavel-1.0-SNAPSHOT.jar"
    );
    let caminhoPDF = "";

    const javaProcess = spawn("java", [
        "-jar",
        "relatorio.jar",
        email,
        servidor
    ]);

    javaProcess.stdout.on("data", (data)=>{
        caminhoPDF += data.toString();
    });

    javaProcess.on("close", ()=>{

        caminhoPDF = caminhoPDF.trim();

        res.download(caminhoPDF);
    });

}

async function gerarRelatorio(req, res){

    let { servidor, email } = req.params;

    servidor = decodeURIComponent(servidor);
    email = decodeURIComponent(email);

    const caminhoJar = path.resolve(
        "C:/Users/ricar/Documents/SP Tech/CCO/2 Semestre/Projeto/Backend/JarExecutavel/target/JarExecutavel-1.0-SNAPSHOT.jar"
    );

    const javaProcess = spawn("java", [
        "-jar",
        caminhoJar,
        email,
        servidor
    ]);

    let caminhoPDF = "";

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