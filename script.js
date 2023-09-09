let questions = [
    {
        "question": "Wer hat HTML erfunden",
        "answer_1": "Peter Pan",
        "answer_2": "Robin Hood",
        "answer_3": "Tem Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": "answer_3"
    },

    {
        "question": "Wer hat HTML erfunden2",
        "answer_1": "Peter Pan",
        "answer_2": "Robin Hood",
        "answer_3": "Tem Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": "answer_3"
    },

    {
        "question": "Wer hat HTML erfunden4",
        "answer_1": "Peter Pan",
        "answer_2": "Robin Hood",
        "answer_3": "Tem Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": "answer_3"
    }
]

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('number-of-questions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    updateProgressBar();

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';

    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('right-questions').innerHTML = rightQuestions;

    document.getElementById('header-image').src = 'img/brain result.png';
}

function updateToNextQuestion(){
    let question = questions[currentQuestion];

    document.getElementById('next-button').disabled = true;
    document.getElementById('current-number-of-question').innerHTML = currentQuestion + 1;

    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar(){
    let percent = currentQuestion / questions.length;
    let percentRight = rightQuestions / questions.length;

    percent = percent * 100;
    percentRight = percentRight * 100;

    document.getElementById('progress-bar').style.width = `${percent}%`;
    document.getElementById('progress-bar2').style.width = `${percentRight}%`;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let answer = selection.at(-1);
    let rightAnswer = question['right_answer'];
    let rightNumber = rightAnswer.at(-1);

    if (rightAnswerSelected(answer, rightNumber)) {
        success(selection); 
    }
    else {
        fail(selection, rightAnswer);
    }

    document.getElementById('next-button').disabled = false;
}

function success(selection){
    document.getElementById(selection).parentNode.classList.add('bg-success');
    rightQuestions++;
    AUDIO_SUCCESS.play();
}

function fail(selection, rightAnswer){
    document.getElementById(rightAnswer).parentNode.classList.add('bg-success');
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    AUDIO_FAIL.play();
}

function rightAnswerSelected(answer, rightNumber){
    return answer == rightNumber;
}

function nextQuestion() {
    currentQuestion++;

    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');

}

function restartGame() {
    rightQuestions = 0;
    currentQuestion = 0;

    document.getElementById('header-image').src = 'img/pencil.jpg';

    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';

    showQuestion();
}

