
let highScoresList = document.getElementById('highScoresList');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
highScoresList.innerHTML = highScores.map( score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');

setTimeout(() => {
    highScoresList.innerHTML = highScores.map( score => {
        return `<li class="high-score"></li>`;
    }).join('');
    localStorage.clear();
}, 8000);
