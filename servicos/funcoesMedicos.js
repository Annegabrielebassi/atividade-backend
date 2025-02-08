import pool from "./conexao.js";

async function executarConsulta(conexao, consulta) {
    let resultadoBd = await conexao.query(consulta);
    let resultado = resultadoBd[0];
    return resultado;
}

async function listarTodosMedicos() {
    const conexao = await pool.getConnection();
    const consulta = `SELECT m.id, m.nome, m.telefone, m.email, e.especialidade FROM medicos m JOIN especialidades e ON m.especialidade = e.id ORDER BY m.nome ASC`;
    let resultado = executarConsulta(conexao, consulta);
    conexao.release();
    return resultado;
}

async function buscarMedicoPorNome(nome) {
    const conexao = await pool.getConnection();
    const consulta = "SELECT m.id, m.nome, m.telefone, m.email, e.especialidade FROM medicos m JOIN especialidades e ON m.especialidade = e.id WHERE m.nome like '%" + nome + "%'";
    let resultado = executarConsulta(conexao, consulta);
    conexao.release();
    return resultado;
}

async function buscarMedicoPorEspecialidade(especialidade) {
    const conexao = await pool.getConnection();
    const consulta = `SELECT m.id, m.nome, m.telefone, m.email, e.especialidade FROM medicos m JOIN especialidades e ON m.especialidade = e.id WHERE e.especialidade = "${especialidade}"`;
    let resultado = executarConsulta(conexao, consulta);
    conexao.release();
    return resultado;
}

export { listarTodosMedicos, buscarMedicoPorNome, buscarMedicoPorEspecialidade };
