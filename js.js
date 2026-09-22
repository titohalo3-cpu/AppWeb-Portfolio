const faseMessages = {
    5: {
        title: "🎁 ¡FASE 1 COMPLETADA!",
        desc: "¡Espectacular! Has respondido correctamente las primeras 5 preguntas de calentamiento.<br><br><span style='color: #ffd700; font-size: 1.5em; font-weight: bold;'>¡HAS GANADO EL REGALO Nº 1!</span><br><br>Prepárate, que ahora sube el nivel."
    },
    10: {
        title: "🎁 ¡FASE 2 SUPERADA!",
        desc: "¡No te frena nadie! Llevas 10 aciertos consecutivos esquivando trampas.<br><br><span style='color: #ffd700; font-size: 1.5em; font-weight: bold;'>¡HAS GANADO EL REGALO Nº 2!</span><br><br>Entramos oficialmente en la zona de preguntas nivel DIOS."
    },
    15: {
        title: "👑 ¡EL REY DE LOS FRIKIS!",
        desc: "¡HISTÓRICO! Te has pasado el juego completo sin pestañear.<br><br><span style='color: #ffd700; font-size: 1.8em; font-weight: bold;'>¡HAS GANADO EL REGALO Nº 3!</span><br><br>Has demostrado un Lore insuperable."
    }
};

const prizes = ["🥚", "🧱", "🐺", "🌾", "", "🌊", "👑", "", "🇰🇵", "", "🐎", "🎬", "🧬", "📓", ""];

const mainQuestions = [
    { q: "¿Cuál de estos streamers es conocido por usar siempre una máscara de búho?", options: ["Willyrex", "Fargan", "Vegetta777", "Alexby"], correct: 1 },
    { q: "¿Cómo se llama el mineral más resistente de Minecraft (añadido en versiones recientes)?", options: ["Diamante", "Netherite", "Obsidiana", "Bedrock"], correct: 1 },
    { q: "¿Cómo se llama la hija de Ethan Winters en Resident Evil Village?", options: ["Sarah", "Ellie", "Rose", "Zara"], correct: 2 },
    { q: "¿Qué objeto necesitas en Minecraft para domesticar a un lobo?", options: ["Carne", "Hueso", "Pescado", "Trigo"], correct: 1 },
    { q: "¿Cuál es el primer cultivo que te dan al empezar en Stardew Valley?", options: ["Chirivía", "Coliflor", "Patata", "Fresa"], correct: 0 },

    { q: "En el anime Attack on Titan (Shingeki no Kyojin), ¿cómo se llama el Titán que hereda Eren Jäger de su padre?", options: ["Titán Colosal", "Titán de Ataque", "Titán Acorazado", "Titán Hembra"], correct: 1 },
    { q: "¿Cuál es el título del segundo libro de la trilogía de 'El problema de los tres cuerpos' de Cixin Liu?", options: ["El fin de la muerte", "La redención del tiempo", "El bosque oscuro", "La esfera luminosa"], correct: 2 },
    { q: "En Neon Genesis Evangelion, ¿cómo se llama el mecha gigante de color morado que pilota Shinji Ikari?", options: ["EVA-00", "EVA-02", "EVA-01", "EVA-05"], correct: 2 },
    { q: "¿Cuál es la primera y más importante de las Tres Leyes de la Robótica de Isaac Asimov?", options: ["Un robot debe proteger su propia existencia", "Un robot debe obedecer las órdenes humanas", "Un robot no puede hacer daño a un ser humano o permitir que sufra daño", "Un robot no puede poseer sentimientos"], correct: 2 },
    { q: "En BioShock, ¿cómo se llama la ciudad submarina donde ocurre el juego?", options: ["Columbia", "Rapture", "Atlantis", "Arkham"], correct: 1 },

    { q: "En El Señor de los Anillos, ¿cómo se llama el poni que acompaña a los Hobbits al principio de su viaje?", options: ["Sombra Gris", "Bill", "Roach", "Brego"], correct: 1 },
    { q: "¿Qué director de cine británico dirigió las películas 'Origen', 'Interstellar' y la trilogía de 'Batman El Caballero Oscuro'?", options: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", "Martin Scorsese"], correct: 2 },
    { q: "En BioShock, ¿cuál es el nombre de la corporación que creó a las Little Sisters?", options: ["Aperture Science", "Fontaine Futuristics", "Umbrella Corp", "Vault-Tec"], correct: 1 },
    { q: "En el anime Death Note, ¿cómo se llama el Shinigami (dios de la muerte) que acompaña a Light Yagami?", options: ["Rem", "L", "Ryuk", "Near"], correct: 2 },
    { q: "PREGUNTA FINAL: ¿Cómo se llama el edificio del pueblo de Stardew Valley que debes restaurar?", options: ["Ayuntamiento", "Centro Cívico", "Almacén de Pierre", "JojaMart"], correct: 1 }
];

const backupQuestions = [
    { q: "🔄 PREGUNTA DE RESERVA: En el universo de Star Wars, ¿en qué planeta se encuentra el templo oculto de los Sith donde reside el Emperador Palpatine en el Episodio IX?", options: ["Mustafar", "Exegol", "Korriban", "Moraband"], correct: 1 },
    { q: "🔄 PREGUNTA DE RESERVA: En el juego Bloodborne, ¿cómo se llama el primer cazador que actúa como mentor en el Sueño del Cazador?", options: ["Gehrman", "Ludwig", "Laurence", "Gascoigne"], correct: 0 },
    { q: "🔄 PREGUNTA DE RESERVA: En la saga Halo, ¿cómo se llama la inteligencia artificial compañera del Jefe Maestro antes de ser corrompida por la rampancia?", options: ["Serina", "Cortana", "Isabel", "The Weapon"], correct: 1 },
    { q: "🔄 PREGUNTA DE RESERVA: ¿Cuál es el verdadero nombre del héroe 'Link' en la entrega clásica The Legend of Zelda: Ocarina of Time?", options: ["Link del Destino", "Héroe del Tiempo", "Solo Link", "Zelda"], correct: 2 }
];

let currentLevel = 0;
let lifelinesUsed = { "ll-50": false, "ll-pub": false, "ll-tel": false, "ll-pablito": false };
let activeQuestion = {};
let timers = [];
let markedIndex = null;
let countdownInterval = null;
let isPablitoUnlocked = false;
let eliminated = [];
let gameOver = false;
let answering = false;

const suspenseAudio = document.getElementById('snd-suspense');
const correctAudio = document.getElementById('snd-correct');
const wrongAudio = document.getElementById('snd-wrong');

function init() {
    renderLadder();
    activeQuestion = {...mainQuestions[currentLevel]};
}

function startGameNow() {
    document.getElementById('welcome-screen').style.display = 'none';
    loadQuestion();
}

function renderLadder() {
    const ladder = document.getElementById('prize-ladder');
    ladder.innerHTML = '';
    prizes.forEach((p, i) => {
        const div = document.createElement('div');
        let specialLabel = "";
        if ((i + 1) === 5) specialLabel = " 🎁 REGALO 1";
        if ((i + 1) === 8) specialLabel = " 🔄 COMODÍN";
        if ((i + 1) === 10) specialLabel = " 🎁 REGALO 2";
        if ((i + 1) === 11) specialLabel = " 🧙‍♂️ DESBLOQUEO";
        if ((i + 1) === 15) specialLabel = " 👑 REGALO 3";

        div.className = `step ${i === currentLevel ? 'active' : ''} ${(i + 1) % 5 === 0 ? 'safe' : ''}`;
        div.innerHTML = `<span>Nivel ${i + 1}</span> <span>${p}${specialLabel}</span>`;
        ladder.appendChild(div);
    });

    const btnPablito = document.getElementById('ll-pablito');
    if (currentLevel >= 10 && !lifelinesUsed["ll-pablito"]) {
        isPablitoUnlocked = true;
        btnPablito.classList.remove('locked');
        btnPablito.innerHTML = "🧙‍♂️ Pablito";
    } else if (!isPablitoUnlocked) {
        btnPablito.classList.add('locked');
        btnPablito.innerHTML = "🔒 Pablito (Nvl 11)";
    }
}

function loadQuestion() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
    markedIndex = null;
    eliminated = [];
    answering = false;

    suspenseAudio.pause();
    suspenseAudio.currentTime = 0;

    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`btn${i}`);
        btn.style.opacity = "0";
        btn.disabled = true;
        btn.classList.remove('marked');
        btn.style.background = "rgba(0,0,0,0.6)";
        document.getElementById(`span${i}`).innerText = activeQuestion.options[i];
    }

    document.getElementById('q-text').innerText = `${currentLevel + 1}. ${activeQuestion.q}`;

    if (currentLevel === 7) {
        checkComodinRecovery();
        return;
    }

    if (currentLevel >= 10) {
        document.getElementById('answers-grid-id').style.visibility = 'hidden';
        document.getElementById('reveal-container').style.display = 'flex';
        return;
    }

    document.getElementById('answers-grid-id').style.visibility = 'visible';
    document.getElementById('reveal-container').style.display = 'none';
    triggerButtonsFadeIn();
}

function revealAnswersNow() {
    document.getElementById('reveal-container').style.display = 'none';
    document.getElementById('answers-grid-id').style.visibility = 'visible';
    triggerButtonsFadeIn();
}

function changeQuestionNow() {
    if (backupQuestions.length === 0) {
        alert("¡Has agotado las preguntas del banco de reserva del Mago!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * backupQuestions.length);
    activeQuestion = backupQuestions.splice(randomIndex, 1)[0];
    loadQuestion();
}

function triggerButtonsFadeIn() {
    const initialDelay = 5000;
    const stepDelay = 2500;

    for (let i = 0; i < 4; i++) {
        const t = setTimeout(() => {
            const btn = document.getElementById(`btn${i}`);

            if (eliminated.includes(i)) {
                btn.style.opacity = "0.2";
                btn.disabled = true;
            } else {
                btn.style.opacity = "1";
                btn.disabled = false;
            }

            if (i === 0) {
                suspenseAudio.play().catch(() => console.log("Audio esperando interacción"));
            }
        }, initialDelay + (i * stepDelay));
        timers.push(t);
    }
}

function checkComodinRecovery() {
    suspenseAudio.pause();
    const container = document.getElementById('recovery-options-container');
    container.innerHTML = '';

    const spent = [];
    if (lifelinesUsed["ll-50"]) spent.push({ id: "ll-50", name: "50:50" });
    if (lifelinesUsed["ll-pub"]) spent.push({ id: "ll-pub", name: "👥 Público" });
    if (lifelinesUsed["ll-tel"]) spent.push({ id: "ll-tel", name: "📞 Llamada" });

    if (spent.length === 0) {
        container.innerHTML = `<p style="font-size: 1.2em; color: #aaa;">¡Madre mía, no has gastado ningún comodín! No tienes nada que recuperar. ¡Vas sobrado!</p>
                               <button class="recovery-btn" onclick="closeRecoveryModal()">CONTINUAR JUEGO</button>`;
    } else {
        spent.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'recovery-btn';
            btn.innerText = `Recuperar ${item.name}`;
            btn.onclick = () => restoreLifeline(item.id);
            container.appendChild(btn);
        });
    }
    document.getElementById('modal-recovery').style.display = 'flex';
}

function restoreLifeline(id) {
    lifelinesUsed[id] = false;
    document.getElementById(id).classList.remove('used');
    closeRecoveryModal();
}

function closeRecoveryModal() {
    document.getElementById('modal-recovery').style.display = 'none';
    document.getElementById('answers-grid-id').style.visibility = 'visible';
    triggerButtonsFadeIn();
}

function handleSelect(idx) {
    if (answering || eliminated.includes(idx)) return;

    if (markedIndex === idx) {
        checkAnswer(idx);
    } else {
        if (markedIndex !== null) {
            document.getElementById(`btn${markedIndex}`).classList.remove('marked');
        }
        markedIndex = idx;
        document.getElementById(`btn${idx}`).classList.add('marked');
    }
}

function checkAnswer(idx) {
    answering = true;
    suspenseAudio.pause();

    for (let i = 0; i < 4; i++) document.getElementById(`btn${i}`).disabled = true;

    if (idx === activeQuestion.correct) {
        correctAudio.play().catch(() => {});
        currentLevel++;
        if (faseMessages[currentLevel]) {
            showModal(faseMessages[currentLevel].title, faseMessages[currentLevel].desc);
        } else {
            nextStep();
        }
    } else {
        gameOver = true;
        wrongAudio.play().catch(() => {});
        const letra = String.fromCharCode(65 + activeQuestion.correct);
        showModal("💀 FIN DE LA PARTIDA",
            `¡Ohh! Has fallado la pregunta friki.<br>La respuesta correcta era la <b>${letra}</b>.<br><br>Reiniciando el panel...`);
        document.getElementById('modal-continue-btn').style.display = 'none';
        setTimeout(() => location.reload(), 4000);
    }
}

function nextStep() {
    if (currentLevel < 15) {
        activeQuestion = {...mainQuestions[currentLevel]};
        renderLadder();
        loadQuestion();
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    if (gameOver || currentLevel >= 15) {
        location.reload();
    } else {
        nextStep();
    }
}

function showModal(title, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerHTML = desc;
    document.getElementById('modal-continue-btn').style.display = '';
    document.getElementById('modal').style.display = 'flex';
}

function startTimeLifeline(type) {
    const key = type === 'Público' ? 'll-pub' : 'll-tel';
    if (lifelinesUsed[key] || answering) return;

    markUsed(key);
    suspenseAudio.pause();

    const modalCountdown = document.getElementById('modal-countdown');
    const titleDisplay = document.getElementById('countdown-title');
    const descDisplay = document.getElementById('countdown-desc');
    const timerDisplay = document.getElementById('timer-display');

    if (type === 'Público') {
        titleDisplay.innerText = "📢 COMODÍN DEL PÚBLICO";
        descDisplay.innerText = "¡El tiempo vuela! Pregunta al chat, abre WhatsApp o busca a contrarreloj.";
    } else {
        titleDisplay.innerText = "📞 COMODÍN DE LA LLAMADA";
        descDisplay.innerText = "¡Llamada en curso! Tienes un minuto exacto para que tu contacto te dé la respuesta.";
    }

    let timeLeft = 60;
    timerDisplay.innerText = timeLeft;
    timerDisplay.classList.remove('danger');
    modalCountdown.style.display = 'flex';

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 15) timerDisplay.classList.add('danger');

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.innerText = "¡TIEMPO! ⏰";
        }
    }, 1000);
}

function closeCountdownModal() {
    clearInterval(countdownInterval);
    document.getElementById('modal-countdown').style.display = 'none';

    const primeraVisible = document.getElementById('btn0').style.opacity !== "0";
    if (markedIndex === null && primeraVisible && !answering) {
        suspenseAudio.play().catch(e => console.log(e));
    }
}

function use5050() {
    if (lifelinesUsed["ll-50"] || answering) return;
    const correctIdx = activeQuestion.correct;
    const indices = [0, 1, 2, 3].filter(i => i !== correctIdx);
    indices.sort(() => Math.random() - 0.5);

    eliminated = indices.slice(0, 2);
    eliminated.forEach(i => {
        const btn = document.getElementById(`btn${i}`);
        if (btn.style.opacity !== "0") btn.style.opacity = "0.2";
        btn.disabled = true;
        if (markedIndex === i) {
            btn.classList.remove('marked');
            markedIndex = null;
        }
    });
    markUsed("ll-50");
}

function usePablito() {
    if (!isPablitoUnlocked || lifelinesUsed["ll-pablito"] || answering) return;
    alert("Pablito el Maguito murmura entre dientes... la correcta debería ser la " + String.fromCharCode(65 + activeQuestion.correct));
    markUsed("ll-pablito");
}

function markUsed(id) {
    lifelinesUsed[id] = true;
    document.getElementById(id).classList.add('used');
    if (id === "ll-pablito") {
        document.getElementById(id).innerHTML = "🧙‍♂️ Pablito (Gastado)";
    }
}

init();