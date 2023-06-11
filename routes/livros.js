const express = require('express');
const router = express.Router();
const livroDao = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
    try {
        const livros = await livroDao.obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os livros.' });
    }
});

router.post('/', async (req, res) => {
    const livro = req.body;
    try {
        const novoLivro = await livroDao.incluir(livro);
        res.json({ message: 'Livro incluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao incluir o livro.' });
    }
});

router.delete('/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const resultado = await livroDao.excluir(codigo);
        if (resultado.deletedCount > 0) {
            res.json({ message: 'Livro excluído com sucesso.' });
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o livro.' });
    }
});

module.exports = router;