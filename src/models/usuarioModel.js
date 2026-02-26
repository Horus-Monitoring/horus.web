var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        select idUsuario, nome, email usuario from usuario
            where email = ? and senha = ?
    `
    console.log("executando a instrucaoSQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(fk_empresa, nome, cpf, email, senha,) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (fkEmpresa, nome, cpf, email, senha) VALUES ('${fk_empresa}', '${nome}', '${cpf}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};