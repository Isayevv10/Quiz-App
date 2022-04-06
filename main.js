
let question = document.getElementById('question');
let choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let progressText = document.getElementById('progressText');
let progresBarFull = document.getElementById('progresBarFull');
let scoreText = document.getElementById('score');

let questions = [];
fetch('questions.json').then( res => {
    return res.json();
}).then( loadedQuestions =>{
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
});


let correntBonus = 1;
let maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];

    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestion.length === 0 || questionCounter >= maxQuestions) {
       localStorage.setItem('mostRecentScore',score); 
       return window.location.assign('end.html');
    };

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    progresBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    let questionIndex =  Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;    

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestion.splice(questionIndex,1);
    acceptAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        if (classToApply === 'correct') {
            incrementScore(correntBonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 200);
        console.log(classToApply);
        getNewQuestion();
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


