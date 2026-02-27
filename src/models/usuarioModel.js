var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        select idFuncionario, nome, email from Funcionario
            where email = '${email}' and senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(fk_empresa, nome, cpf, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO Funcionario (fk_empresa, nome, cpf, email, senha) VALUES ('${fk_empresa}', '${nome}', '${cpf}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT token_empresa FROM Empresa`;

  return database.executar(instrucaoSql);
}

function empresa(codigo) {
  var instrucaoSql = `SELECT * FROM Empresa where token_empresa = '${codigo}'`;

  return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    empresa
};