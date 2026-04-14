var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        SELECT id_funcionario, nome, email, fk_empresa FROM Funcionario
            WHERE email = '${email}' AND senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarUsuario(fk_empresa, nome, email, cpf, senha, funcao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, nome, cpf, email, senha, cargo);
    
    var instrucaoSql = `
        INSERT INTO Funcionario (nome, email, cpf, senha, funcao, fk_empresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${funcao}', '${fk_empresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    autenticar,
    cadastrarUsuario
};