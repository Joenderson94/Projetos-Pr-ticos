const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 [POST] Solicitar um veículo
router.post('/', (req, res) => {
  const { motorista_id, veiculo_id } = req.body;
  const data = new Date().toISOString();

  if (!motorista_id || !veiculo_id) {
    return res.status(400).json({ erro: 'motorista_id e veiculo_id são obrigatórios' });
  }

  // Verifica se o veículo está disponível
  db.get('SELECT status FROM veiculos WHERE id = ?', [veiculo_id], (err, veiculo) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!veiculo) return res.status(404).json({ erro: 'Veículo não encontrado' });
    if (veiculo.status !== 'disponível') {
      return res.status(400).json({ erro: 'Veículo não está disponível' });
    }

    // Registra a solicitação
    db.run(
      'INSERT INTO solicitacoes (motorista_id, veiculo_id, data_solicitacao) VALUES (?, ?, ?)',
      [motorista_id, veiculo_id, data],
      function (err) {
        if (err) return res.status(500).json({ erro: err.message });

        // Atualiza status do veículo para "ocupado"
        db.run('UPDATE veiculos SET status = ? WHERE id = ?', ['ocupado', veiculo_id], (err) => {
          if (err) return res.status(500).json({ erro: err.message });

          res.status(201).json({
            mensagem: 'Solicitação registrada com sucesso',
            solicitacao_id: this.lastID,
            data_solicitacao: data
          });
        });
      }
    );
  });
});

// 🔹 [GET] Listar todas as solicitações
router.get('/', (req, res) => {
  db.all('SELECT * FROM solicitacoes', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// 🔹 [PUT] Finalizar uma solicitação
router.put('/:id/finalizar', (req, res) => {
  const id = req.params.id;
  const data = new Date().toISOString();

  // Busca a solicitação
  db.get('SELECT * FROM solicitacoes WHERE id = ?', [id], (err, solicitacao) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!solicitacao) return res.status(404).json({ erro: 'Solicitação não encontrada' });

    // Atualiza a solicitação com a data de finalização
    db.run(
      'UPDATE solicitacoes SET data_devolucao = ? WHERE id = ?',
      [data, id],
      (err) => {
        if (err) return res.status(500).json({ erro: err.message });

        // Libera o veículo
        db.run(
          'UPDATE veiculos SET status = ? WHERE id = ?',
          ['disponível', solicitacao.veiculo_id],
          (err) => {
            if (err) return res.status(500).json({ erro: err.message });

            res.json({ mensagem: 'Solicitação finalizada e veículo liberado', data_devolucao: data });
          }
        );
      }
    );
  });
});

module.exports = router;
