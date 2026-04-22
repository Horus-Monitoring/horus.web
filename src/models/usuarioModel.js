var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        SELECT * FROM funcionario
            WHERE email = '${email}' AND senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function deletarUsuario(id) {
    console.log("ACESSEI O MODEL USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o usuario de seu BD está rodando corretamente. \n\n function cadastrar():", id);
    

    var deletarUsuario = `
        DELETE FROM funcionario WHERE id_funcionario = ${id};
    `;

    return database.executar(deletarUsuario)
        .then(() => {
            return database.executar(deletarUsuario);
        });
}

function cadastrarUsuario(fk_empresa, nome, email, cpf, senha, funcao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, email, senha, funcao, fk_empresa);
    
    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, cpf, senha, funcao, fk_empresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${funcao}', '${fk_empresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function listarUsuarios(id,fk_empresa) {
    console.log("ACESSEI O MODEL USUARIOS \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucaoSql = `
        SELECT 
        imagem,
        nome,
        email,
        funcao,
        fk_empresa,
        FROM funcionario 
        WHERE id_funcionario = ${id} AND fk_empresa = ${fk_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrarUsuario,
    deletarUsuario,
    listarUsuarios
};