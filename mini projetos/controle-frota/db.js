const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/frota.db'); // vai criar esse arquivo

// Criar tabelas se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS motoristas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cnh TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS veiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modelo TEXT NOT NULL,
    placa TEXT NOT NULL,
    status TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS solicitacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motorista_id INTEGER NOT NULL,
    veiculo_id INTEGER NOT NULL,
    data_solicitacao TEXT NOT NULL,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id),
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
  )`);
});

module.exports = db;
