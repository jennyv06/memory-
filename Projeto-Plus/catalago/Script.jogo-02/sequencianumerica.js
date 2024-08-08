document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.getElementById('number-display');
    const generateButton = document.getElementById('generate-number');
    const userInput = document.getElementById('user-input');
    const checkButton = document.getElementById('check-number');
    const resultDisplay = document.getElementById('result');
    
    let currentSequence = [];
    let displayTime = 275;
    
    function generateRandomSequence(length) {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(Math.floor(Math.random() * 100) + 1); 
        }
        return sequence;
    }

    function generateSequence() {
        const sequenceLength = 3; 
        currentSequence = generateRandomSequence(sequenceLength);
        
        numberDisplay.textContent = currentSequence.join(' ');
        
        setTimeout(() => {
            numberDisplay.textContent = 'Digite a sequência que viu';
            userInput.disabled = false;
            checkButton.disabled = false;
            userInput.focus();
        }, displayTime);
    }
    
    function checkSequence() {
        const userAnswer = userInput.value.split(' ').map(Number);
        if (userAnswer.length === currentSequence.length && 
            userAnswer.every((num, index) => num === currentSequence[index])) {
            resultDisplay.textContent = 'Correto!';
            resultDisplay.style.color = 'green';
        } else {
            resultDisplay.textContent = `Incorreto. A sequência era ${currentSequence.join(' ')}`;
            resultDisplay.style.color = 'red';
        }
        userInput.value = ''; 
        userInput.disabled = true;
        checkButton.disabled = true;
        generateButton.disabled = false;
    }
    
    generateButton.addEventListener('click', () => {
        generateSequence();
        generateButton.disabled = true; 
        resultDisplay.textContent = ''; 
    });

    checkButton.addEventListener('click', checkSequence);
});
