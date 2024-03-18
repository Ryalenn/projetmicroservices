document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const guessedWord = document.getElementById('guessInput').value.toLowerCase();
    const targetWord = localStorage.getItem('targetWord');

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; 

    if (guessedWord === targetWord) {
        resultContainer.textContent = 'BRAVO';
        resultContainer.style.color = 'blue';

        document.getElementById('guessInput').value = '';

        recordScore(1);
    } else {
        for (let i = 0; i < guessedWord.length; i++) {
            const guessedLetter = guessedWord[i];
            const targetLetter = targetWord[i];

            const letterSpan = document.createElement('span');
            letterSpan.textContent = guessedLetter;

            if (guessedLetter === targetLetter) {
                letterSpan.style.backgroundColor = 'green';
            } else if (targetWord.includes(guessedLetter)) {
                letterSpan.style.backgroundColor = 'red';
            }

            resultContainer.appendChild(letterSpan);
        }

        document.getElementById('guessInput').value = '';
    }
});


function recordScore(points) {
    let score = localStorage.getItem('motusScore');
    if (!score) {
        score = 0;
    }

    score += points;

    localStorage.setItem('motusScore', score);

    updateScoreUI(score);
}


function updateScoreUI(score) {
    const scoreContainer = document.getElementById('score');
    scoreContainer.textContent = score;
}
