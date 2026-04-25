var database = require("../database/config")

// Servidores
function cadastrarServidor(nome, ip, localizacao, sistemaOperacional, fkEmpresa, limiteCpu, unidadeMedidaCpu, limiteRam, unidadeMedidaRam, limiteDisco, unidadeMedidaDisco) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, ip, localizacao, sistemaOperacional, fkEmpresa, limiteCpu, unidadeMedidaCpu, limiteRam, unidadeMedidaRam, limiteDisco, unidadeMedidaDisco);

    var instrucaoSql = `
        INSERT INTO servidor (hostname, endereco_ip, localizacao, sistema_operacional, fk_empresa) 
        VALUES ('${nome}', '${ip}', '${localizacao}', '${sistemaOperacional}', '${fkEmpresa}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
    .then ((resultado) => {
        var idServidor = resultado.insertId;

        var componentesSql = `
            INSERT INTO servidor_componente (fk_servidor, fk_componente, unidade_medida, limite) VALUES
            ('${idServidor}', '1',  '${unidadeMedidaCpu}',  '${limiteCpu}'),
            ('${idServidor}', '2',  '${unidadeMedidaRam}',  '${limiteRam}'),
            ('${idServidor}', '3','${unidadeMedidaDisco}','${limiteDisco}');
        `;

        return database.executar(componentesSql)
    });
}

function exibirServidores(fkEmpresa) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucaoSql = `
        SELECT 
        servidor.id_servidor,
        servidor.hostname,
        servidor.localizacao,
        servidor.endereco_ip,
        servidor.sistema_operacional,
        servidor.status_servidor,
        COUNT(servidor_componente.fk_componente) AS quantidade 
        FROM servidor
        JOIN servidor_componente ON fk_servidor = id_servidor
        WHERE fk_empresa = ${fkEmpresa}
        GROUP BY 
        servidor.id_servidor,
        servidor.hostname,
        servidor.localizacao,
        servidor.endereco_ip,
        servidor.sistema_operacional,
        servidor.status_servidor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarServidores(fkEmpresa) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucaoSql = `
        SELECT 
        id_servidor, 
        hostname 
        FROM servidor 
        WHERE fk_empresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarServidor(id) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);

    var deletarComponentes = `
        DELETE FROM servidor_componente WHERE fk_servidor = ${id};
    `;

    var deletarServidor = `
        DELETE FROM servidor WHERE id_servidor = ${id};
    `;

    return database.executar(deletarComponentes)
        .then(() => {
            return database.executar(deletarServidor);
        });
}

// Componentes
function cadastrarComponente(fkServidor, fkComponente, unidadeMedida, componenteLimite) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkServidor, fkComponente, unidadeMedida, componenteLimite);

    var instrucaoSql = `
        INSERT INTO servidor_componente (fk_servidor, fk_componente, unidade_medida, limite) 
        VALUES ('${fkServidor}', '${fkComponente}', '${unidadeMedida}', '${componenteLimite}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function abrirDetalhes(fkServidor) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkServidor);

    var instrucaoSql = `
        SELECT *,
        componente.tipo AS tipo,
        servidor.hostname AS servidor
        FROM servidor_componente 
        JOIN componente ON fk_componente = id_componente
        JOIN servidor ON fk_servidor = id_servidor
        WHERE fk_servidor = '${fkServidor}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarComponente(id) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);

    var instrucaoSql = `
        DELETE FROM servidor_componente WHERE id_servidor_componente = ${id};
    `;
    return database.executar(instrucaoSql)
}

module.exports = {
    cadastrarServidor,
    exibirServidores,
    listarServidores,
    cadastrarComponente,
    abrirDetalhes,
    deletarServidor,
    deletarComponente
};