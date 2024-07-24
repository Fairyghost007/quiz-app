let score = 0;
let questionNumber = 0;
const quiz = [
    {
        question: "En CSS, quelle propriété est utilisée pour changer la couleur du texte d'un élément ?",
        reponses: [
            { text: "font-color", etat: false },
            { text: "text-color", etat: false },
            { text: "color", etat: true }
        ]
    },
    {
        question: "En HTML, quelle balise est utilisée pour insérer une image?",
        reponses: [
            { text: "<img>", etat: true },
            { text: "<p>", etat: false },
            { text: "<image>", etat: false }
        ]
    },
    {
        question: "En JavaScript, quelle méthode est utilisée pour ajouter un élément à la fin d'un tableau?",
        reponses: [
            { text: "push()", etat: true },
            { text: "add()", etat: false },
            { text: "append()", etat: false }
        ]
    }
];

function loadQuestion() {
    if (questionNumber < quiz.length) {
        const currentQuestion = quiz[questionNumber];
        document.getElementById('question').innerText = currentQuestion.question;
        currentQuestion.reponses.forEach((reponse, i) => {
            document.getElementById(`label${i + 1}`).innerText = reponse.text;
            document.getElementById(`res${i + 1}`).value = reponse.etat;
            document.getElementById(`res${i + 1}`).checked = false;
        });
    } else {
        displayScore();
    }
}

function validateForm(event) {
    event.preventDefault();
    const selectedReponse = document.querySelector('input[name="reponse"]:checked');
    if (!selectedReponse) {
        alert("Veuillez sélectionner une réponse avant de continuer.");
        return false;
    }
    if (selectedReponse && selectedReponse.value === 'true') {
        score++;
    }
    questionNumber++;
    loadQuestion();
}


function displayScore() {
    let scoreDiv = document.getElementById('score');
    if (!scoreDiv) {
        scoreDiv = document.createElement('div');
        scoreDiv.id = 'score';
        scoreDiv.className = 'mt-4 text-xl font-semibold text-gray-800';
        document.getElementById('container').appendChild(scoreDiv);
    }
    scoreDiv.innerText = "Votre score est: " + score;
    scoreDiv.className = 'p-2 rounded text-center bg-white';
    document.querySelector('form').style.display = 'none';

    const existingButton = document.getElementById('restartButton');
    if (existingButton) {
        existingButton.remove();
    }

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Recommencer';
    restartButton.className = 'bg-blue-500 text-white w-full px-4 py-2 rounded mt-4';
    restartButton.id = 'restartButton';
    restartButton.onclick = restart;

    document.getElementById('container').appendChild(restartButton);
}

function restart() {
    score = 0;
    questionNumber = 0;
    loadQuestion();
    document.querySelector('form').style.display = 'block';

    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.remove();
    }

    const scoreDiv = document.getElementById('score');
    if (scoreDiv) {
        scoreDiv.remove();
    }
}
