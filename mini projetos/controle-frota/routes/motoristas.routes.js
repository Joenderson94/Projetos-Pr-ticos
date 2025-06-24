const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 [POST] Criar um novo motorista
router.post('/', (req, res) => {
  const { nome, cnh } = req.body;
  if (!nome || !cnh) return res.status(400).json({ erro: 'Nome e CNH são obrigatórios' });

  db.run('INSERT INTO motoristas (nome, cnh) VALUES (?, ?)', [nome, cnh], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: this.lastID, nome, cnh });
  });
});

// 🔹 [GET] Listar todos os motoristas
router.get('/', (req, res) => {
  db.all('SELECT * FROM motoristas', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// 🔹 [GET] Buscar motorista por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM motoristas WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Motorista não encontrado' });
    res.json(row);
  });
});

// 🔹 [PUT] Atualizar motorista
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nome, cnh } = req.body;

  db.run('UPDATE motoristas SET nome = ?, cnh = ? WHERE id = ?', [nome, cnh, id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Motorista não encontrado' });
    res.json({ mensagem: 'Motorista atualizado com sucesso' });
  });
});

// 🔹 [DELETE] Deletar motorista
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM motoristas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Motorista não encontrado' });
    res.json({ mensagem: 'Motorista removido com sucesso' });
  });
});

module.exports = router;
