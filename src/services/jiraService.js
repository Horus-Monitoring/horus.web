const axios = require("axios");

const JIRA_EMAIL = "vitoria.psilva@sptech.school";
const JIRA_TOKEN = "";
const JIRA_DOMINIO = "horusmonitoring";

const servidorModel = require("../models/servidoresModel")

async function buscarIssues(fkFuncionario, fkEmpresa) {
    try {
        const response = await axios.get(
            `https://${JIRA_DOMINIO}.atlassian.net/rest/api/3/search/jql`,
            {
                params: {
                    jql: "project = KAN AND created >= -7d",
                    fields: [
                        "summary",
                        "status",
                        "priority",
                        "created",
                        "resolutiondate",
                        "issuetype",
                        "labels"
                    ]
                },

                headers: {
                    Accept: "application/json"
                },

                auth: {
                    username: JIRA_EMAIL,
                    password: JIRA_TOKEN
                }
            }
        );

        const incidentes = response.data.issues.map(issue => {

            const labels = issue.fields.labels || [];

            const componentesValidos = [
                "cpu", "ram", "disco", "rede", "temperatura", "processos"
            ];

            const componente = labels.find(
                label => componentesValidos.includes(label)
            );

            const servidor = labels.find(
                label => !componentesValidos.includes(label)
            );

            return {

                id: issue.id,

                key: issue.key,

                titulo: issue.fields.summary,

                status: issue.fields.status.name,

                prioridade: issue.fields.priority.name,

                criadoEm: issue.fields.created,

                resolvidoEm: issue.fields.resolutiondate,

                componente: componente || "desconhecido",

                servidor: servidor || "desconhecido"

            };
        });

        // pega os servidores que o analista tem acesso
        const servidores = await servidorModel.listarServidoresComAcesso(fkEmpresa, fkFuncionario);

        // guarda o hostname desses servidores
        const servidoresPermitidos = servidores.filter(s => s.tem_acesso == 1).map(s => s.hostname.toLowerCase());

        // filtra os incidentes do jira com base no hostname
        const incidentesFiltrados = incidentes.filter(incidente => servidoresPermitidos.includes(incidente.servidor.toLowerCase())
    );

        return incidentesFiltrados;
    } catch (erro) {
        console.log(
            "Erro Jira:",
            erro.response?.data || erro.message
        );

        throw erro;
    }
}

async function filtrarDashboard(fkFuncionario, fkEmpresa) {
    const incidentes = await buscarIssues(fkFuncionario, fkEmpresa);

    var ativos = incidentes.filter(
        i => i.resolvidoEm == null
    )

    var resolvidos = incidentes.filter(
        i => i.resolvidoEm != null
    )

    var criticos = incidentes.filter(
        i => i.prioridade == "Highest"
    )

    var altos = incidentes.filter(
        i => i.prioridade == "High"
    )

    var medios = incidentes.filter(
        i => i.prioridade == "Medium"
    )

    var baixos = incidentes.filter(
        i => i.prioridade == "Low"
    )

    return{
        incidentes: incidentes,
        incidentesAtivos: ativos.length,
        incidentesResolvidos: resolvidos.length,
        criticos: criticos.length,
        altos: altos.length,
        medios: medios.length,
        baixos: baixos.length
    }
}

module.exports = {
    buscarIssues,
    filtrarDashboard
};