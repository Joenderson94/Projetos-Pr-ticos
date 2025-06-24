const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/frota.db');

db.serialize(() => {
  db.run(`ALTER TABLE solicitacoes ADD COLUMN data_devolucao TEXT`, (err) => {
    if (err) {
      if (err.message.includes("duplicate column name")) {
        console.log("Coluna 'data_devolucao' já existe.");
      } else {
        console.error("Erro ao adicionar coluna:", err.message);
      }
    } else {
      console.log("Coluna 'data_devolucao' adicionada com sucesso.");
    }
  });
});