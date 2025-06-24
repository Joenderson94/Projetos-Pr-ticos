let motoristas = [];
let idCounter = 1;

const listarMotoristas = (req, res) => {
  res.json(motoristas);
};

const criarMotorista = (req, res) => {
  const { nome, usuario } = req.body;
  const novoMotorista = { id: idCounter++, nome, usuario };
  motoristas.push(novoMotorista);
  res.status(201).json(novoMotorista);
};

const buscarMotoristaPorId = (req, res) => {
  const motorista = motoristas.find(m => m.id === parseInt(req.params.id));
  if (motorista) {
    res.json(motorista);
  } else {
    res.status(404).json({ mensagem: 'Motorista não encontrado' });
  }
};

const atualizarMotorista = (req, res) => {
  const motorista = motoristas.find(m => m.id === parseInt(req.params.id));
  if (motorista) {
    motorista.nome = req.body.nome || motorista.nome;
    motorista.usuario = req.body.usuario || motorista.usuario;
    res.json(motorista);
  } else {
    res.status(404).json({ mensagem: 'Motorista não encontrado' });// Controlador responsável por lidar com as ações relacionadas aos motoristas

    // Criamos uma lista em memória para simular um banco de dados
    let motoristas = [];
    
    // Função para listar todos os motoristas
    function listarMotoristas(req, res) {
      res.json(motoristas); // Retorna todos os motoristas como JSON
    }
    
    // Função para criar um novo motorista
    function criarMotorista(req, res) {
      const novoMotorista = {
        id: Date.now(), // Gera um ID único baseado na hora atual
        nome: req.body.nome,
        cnh: req.body.cnh
      };
    
      motoristas.push(novoMotorista); // Adiciona o motorista na lista
      res.status(201).json(novoMotorista); // Retorna o novo motorista com status 201 (Criado)
    }
    
    // Função para buscar um motorista pelo ID
    function buscarMotoristaPorId(req, res) {
      const id = parseInt(req.params.id); // Pega o ID da URL e converte para número
      const motorista = motoristas.find(m => m.id === id); // Busca na lista
    
      if (motorista) {
        res.json(motorista); // Retorna se encontrou
      } else {
        res.status(404).json({ mensagem: 'Motorista não encontrado' }); // Retorna erro 404
      }
    }
    
    // Função para atualizar um motorista
    function atualizarMotorista(req, res) {
      const id = parseInt(req.params.id);
      const index = motoristas.findIndex(m => m.id === id); // Encontra o índice do motorista
    
      if (index !== -1) {
        motoristas[index] = {
          ...motoristas[index],
          nome: req.body.nome || motoristas[index].nome,
          cnh: req.body.cnh || motoristas[index].cnh
        };
        res.json(motoristas[index]);
      } else {
        res.status(404).json({ mensagem: 'Motorista não encontrado' });
      }
    }
    
    // Função para remover um motorista
    function removerMotorista(req, res) {
      const id = parseInt(req.params.id);
      const index = motoristas.findIndex(m => m.id === id);
    
      if (index !== -1) {
        motoristas.splice(index, 1); // Remove da lista
        res.json({ mensagem: 'Motorista removido com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Motorista não encontrado' });
      }
    }
    
    // Exporta todas as funções para serem usadas nas rotas
    module.exports = {
      listarMotoristas,
      criarMotorista,
      buscarMotoristaPorId,
      atualizarMotorista,
      removerMotorista
    };
    
  }
};

const removerMotorista = (req, res) => {
  motoristas = motoristas.filter(m => m.id !== parseInt(req.params.id));
  res.status(204).send();
};

module.exports = {
  listarMotoristas,
  criarMotorista,
  buscarMotoristaPorId,
  atualizarMotorista,
  removerMotorista
};
