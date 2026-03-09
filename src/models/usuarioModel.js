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

function cadastrar(fk_empresa, nome, cpf, email, senha, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, nome, cpf, email, senha, cargo);
    
    const promises = []

    var sqlFuncionario = `
        INSERT INTO Funcionario (fk_empresa, nome, cpf, email, senha) VALUES ('${fk_empresa}', '${nome}', '${cpf}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + sqlFuncionario);
    
    promises.push(database.executar(sqlFuncionario))

    var sqlCargo = `
        INSERT INTO Papel (nivel, fk_empresa) VALUES ('${cargo}', '${fk_empresa}');
    `;
    console.log("Executando a instrução SQL: \n" + sqlCargo);
    
    promises.push(database.executar(sqlCargo))

    return Promise.all(promises)

}

module.exports = {
    autenticar,
    cadastrar
};