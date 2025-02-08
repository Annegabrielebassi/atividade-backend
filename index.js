import express from 'express';
import { listarTodosMedicos, buscarMedicoPorNome, buscarMedicoPorEspecialidade } from './servicos/funcoesMedicos.js';
const app = express();

app.get('/medicos', async (req, res) => {
    const nome = req.query.nome;
    const especialidade = req.query.especialidade;
    let resposta;
    if (typeof nome === 'undefined' && typeof especialidade === 'undefined') {
        resposta = await listarTodosMedicos()
    } else if (typeof nome !== 'undefined') {
        resposta = await buscarMedicoPorNome(nome)
    } else if (typeof especialidade !== 'undefined') {
        resposta = await buscarMedicoPorEspecialidade(especialidade)
    }
    if (resposta.length > 0) {
        res.json(resposta)
    } else {
        res.status(404).json({ mensagem: "Nenhum médico foi encontrado." })
    }
})


app.listen(9000, async () => {
    const data = new Date()
    console.log("Servidor iniciado na porta 9000", data);
})