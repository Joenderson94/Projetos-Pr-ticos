let timeInSeconds = 0;
let timerInterval;
let isRunning = false;

// Função para atualizar o display do temporizador
function updateDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Função para definir o tempo
function setTime(opsegundos) {
    // Se o temporizador está rodando, pausar e limpar o intervalo
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }

    // Atualiza o tempo
    timeInSeconds = opsegundos;
    updateDisplay();
}

// Função para iniciar o temporizador
function startTimer() {
    if (isRunning) return; // Evita iniciar o timer se já estiver rodando

    isRunning = true;

    timerInterval = setInterval(() => {
        if (timeInSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            return;
        }
        timeInSeconds--;
        updateDisplay();
    }, 1000);
}

// Função para lidar com o pressionamento de teclas
function atalho(event) {
    switch (event.key) {
        case '8': // Define o tempo para 2 min
            setTime(120);
            break;
        case '4': // Define o tempo para 1:25 min
            setTime(75);
            break;
        case '5': // Define o tempo para 1:25 min
            setTime(75);
            break;
        case '7': // Define o tempo para 30 seg
            setTime(30);
            break;
        case '6': // Define o tempo para 30 seg
            setTime(60);
            break;
        case '0': // Tecla Espaço para iniciar o temporizador
            startTimer();
            break;
        default:
            break;
    }
}

// Adiciona o evento de clique ao botão "Iniciar"
document.getElementById('startButton').addEventListener('click', startTimer);

// Adiciona os eventos de clique aos botões de tempo
document.querySelectorAll('button[data-time]').forEach(button => {
    button.addEventListener('click', () => {
        const time = parseInt(button.getAttribute('data-time'), 10);
        setTime(time);
    });
});

// Adiciona o evento de pressionamento de tecla ao documento
document.addEventListener('keydown', atalho);