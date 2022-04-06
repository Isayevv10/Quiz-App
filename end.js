
let username = document.getElementById('username');
let saveScoreBtn = document.getElementById('saveScoreBtn');
let finalScore = document.getElementById('finalScore');
let mostRecentScore = localStorage.getItem('mostRecentScore');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let maxHighScores = 5;
finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', e =>{
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore * 10,
        name:username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => {
        return b.score - a.score;
    });
    console.log(typeof highScores);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('end.html');
    
}