// Word Chain Game Data with Hints
const wordChains = [
    { start: "Cold", end: "Warm", hint: "Card" },
    { start: "Hate", end: "Cube", hint: "Mute" },
    { start: "Band", end: "Rent", hint: "Send" },
    { start: "Bold", end: "Wind", hint: "Mild" },
    { start: "Seat", end: "Hill", hint: "Heal" },
    { start: "Lamp", end: "Link", hint: "Lime" },
    { start: "Star", end: "Beat", hint: "Boar" },
    { start: "Wish", end: "Last", hint: "Fish" },
    { start: "Rain", end: "Wail", hint: "Gait" },
    { start: "Wind", end: "Pony", hint: "Bond" },
    { start: "Hand", end: "Went", hint: "Send" },
    { start: "Gold", end: "More", hint: "Hole" },
    { start: "Word", end: "Hare", hint: "Warm" },
    { start: "Play", end: "Trip", hint: "Tray" },
    { start: "Bold", end: "Fine", hint: "Fond" },
    { start: "Bark", end: "Muse", hint: "Mask" },
    { start: "Pole", end: "Ford", hint: "More" },
    { start: "Need", end: "Bean", hint: "Seen" },
    { start: "Rope", end: "Bate", hint: "Rite" },
    { start: "Bold", end: "Hard", hint: "Cord" },
    { start: "Dime", end: "Pint", hint: "Line" },
    { start: "Pale", end: "Fume", hint: "Same" },
    { start: "Wind", end: "Mini", hint: "Mint" },
    { start: "Fork", end: "Hard", hint: "Cord" },
    { start: "Hard", end: "Worm", hint: "Cord" },
    { start: "Pale", end: "Nape", hint: "Name" },
    { start: "Bold", end: "Bind", hint: "Fond" },
    { start: "Warm", end: "Card", hint: "Worm" },
    { start: "Tone", end: "Lake", hint: "Cane" },
    { start: "Time", end: "Pint", hint: "Lint" },
    { start: "Gold", end: "More", hint: "Hold" },
    { start: "File", end: "Hare", hint: "Mire" },
    { start: "Dine", end: "Fame", hint: "Lime" },
    { start: "Fork", end: "Ward", hint: "Cord" },
    { start: "Hand", end: "Tent", hint: "Sent" }
];

let currentChainIndex = 0;
let score = 0;

// Function to validate if a word is a valid English word
async function isValidWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok;
}

function startGame() {
    // Randomly select a word chain from the array
    currentChainIndex = Math.floor(Math.random() * wordChains.length);
    displayWordChain();
    document.getElementById('hint').innerText = '';
    document.getElementById('result').innerText = '';
    document.getElementById('inputs-container').innerHTML = '';
}

function displayWordChain() {
    const { start, end } = wordChains[currentChainIndex];
    document.getElementById('start-word').innerText = start;
    document.getElementById('end-word').innerText = end;
}

function addInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'word-input';
    document.getElementById('inputs-container').appendChild(input);
}

function removeInput() {
    const container = document.getElementById('inputs-container');
    if (container.childElementCount > 0) {
        container.removeChild(container.lastChild);
    }
}

function clearInputs() {
    document.getElementById('inputs-container').innerHTML = '';
}

async function submitWordChain() {
    const { start, end, hint } = wordChains[currentChainIndex];
    const inputs = document.querySelectorAll('.word-input');
    let words = [start];

    for (const input of inputs) {
        const word = input.value.trim();
        if (word && await isValidWord(word)) {
            words.push(word);
        } else if (word) {
            document.getElementById('result').innerText = 'Invalid word detected. Please use valid English words.';
            return;
        }
    }

    words.push(end);

    if (isValidChain(words)) {
        document.getElementById('result').innerText = 'Correct! Well done!';
        score += 100 - (inputs.length * 10);
        updateScore();
    } else {
        document.getElementById('result').innerText = 'Incorrect chain. Try again!';
    }
}

function isValidChain(words) {
    for (let i = 0; i < words.length - 1; i++) {
        if (!isOneLetterDifferent(words[i], words[i + 1])) {
            return false;
        }
    }
    return true;
}

function isOneLetterDifferent(word1, word2) {
    if (word1.length !== word2.length) return false;
    let differenceCount = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i].toLowerCase() !== word2[i].toLowerCase()) differenceCount++;
        if (differenceCount > 1) return false;
    }
    return differenceCount === 1;
}

function showHint() {
    const hintWord = wordChains[currentChainIndex].hint;
    document.getElementById('hint').innerText = `Hint: "${hintWord}"`;
}

function resetGame() {
    startGame();
}

function resetScoreboard() {
    score = 0;
    updateScore();
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Rules Modal Logic
const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.getElementById("rules-btn");
const closeModalBtn = document.querySelector(".close-btn");

function showRules() {
    rulesModal.style.display = "block";
}

function closeRulesModal() {
    rulesModal.style.display = "none";
}

window.addEventListener('click', (event) => {
    if (event.target === rulesModal) {
        closeRulesModal();
    }
});

// Event Listeners
document.getElementById('add-input-btn').addEventListener('click', addInput);
document.getElementById('remove-input-btn').addEventListener('click', removeInput);
document.getElementById('clear-btn').addEventListener('click', clearInputs);
document.getElementById('submit-btn').addEventListener('click', submitWordChain);
document.getElementById('hint-btn').addEventListener('click', showHint);
document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('reset-score-btn').addEventListener('click', resetScoreboard);
document.getElementById('rules-btn').addEventListener('click', showRules);
closeModalBtn.addEventListener('click', closeRulesModal);
window.addEventListener('click', (event) => {
    if (event.target === rulesModal) {
        closeRulesModal();
    }
});

// Initialize the game
startGame();