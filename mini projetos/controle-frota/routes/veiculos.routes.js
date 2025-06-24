const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 [POST] Criar novo veículo
router.post('/', (req, res) => {
  const { modelo, placa, status } = req.body;
  if (!modelo || !placa || !status) {
    return res.status(400).json({ erro: 'Modelo, placa e status são obrigatórios' });
  }

  db.run(
    'INSERT INTO veiculos (modelo, placa, status) VALUES (?, ?, ?)',
    [modelo, placa, status],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, modelo, placa, status });
    }
  );
});

// 🔹 [GET] Listar todos os veículos
router.get('/', (req, res) => {
  db.all('SELECT * FROM veiculos', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// 🔹 [PUT] Atualizar um veículo
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { modelo, placa, status } = req.body;

  if (!modelo || !placa || !status) {
    return res.status(400).json({ erro: 'Modelo, placa e status são obrigatórios' });
  }

  db.run(
    'UPDATE veiculos SET modelo = ?, placa = ?, status = ? WHERE id = ?',
    [modelo, placa, status, id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Veículo não encontrado' });
      res.json({ mensagem: 'Veículo atualizado com sucesso' });
    }
  );
});

module.exports = router;
