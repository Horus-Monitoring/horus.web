var database = require("../database/config")

// Servidores
function cadastrarServidor(nome, ip, localizacao, sistemaOperacional, statusInicial, fkEmpresa) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, ip, localizacao, sistemaOperacional, statusInicial, fkEmpresa);

    var instrucaoSql = `
        INSERT INTO servidor (nome, ip, localizacao, sistema_operacional, status_inicial, fk_empresa) VALUES ('${nome}', '${ip}', '${localizacao}', '${sistemaOperacional}', '${statusInicial}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirServidores(fkEmpresa) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucaoSql = `
        SELECT * FROM servidor WHERE fk_empresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarServidores(fkEmpresa) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucaoSql = `
        SELECT id_servidor, nome FROM servidor WHERE fk_empresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Componentes
function cadastrarComponente(fkServidor, fkComponente, marca, modelo, statusInicial) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkServidor, fkComponente, marca, modelo, statusInicial);

    var instrucaoSql = `
        INSERT INTO servidor_componente (fk_servidor, fk_componente, marca, modelo, status_inicial) VALUES ('${fkServidor}', '${fkComponente}', '${marca}', '${modelo}', '${statusInicial}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarServidor,
    exibirServidores,
    listarServidores,
    cadastrarComponente
};