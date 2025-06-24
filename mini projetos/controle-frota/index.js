const express = require('express');
const app = express();

// Importação das rotas
const veiculosRoutes = require('./routes/veiculos.routes');
const motoristaRoutes = require('./routes/motoristas.routes');
const solicitacoesRoutes = require('./routes/solicitacoes.routes');

// Middleware para entender JSON no corpo das requisições (deve vir antes das rotas)
app.use(express.json());

// Uso das rotas
app.use('/motoristas', motoristaRoutes);
app.use('/veiculos', veiculosRoutes);
app.use('/solicitacoes', solicitacoesRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
