/* --- Background Animation setup --- */
const container = document.getElementById('bubbleContainer');
for (let i = 0; i < 20; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = bubble.style.height = `${Math.random() * 60 + 20}px`;
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animationDelay = `${Math.random() * 15}s`;
    bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
    container.appendChild(bubble);
}

/* --- Scroll Reveal Animation --- */
const sections = document.querySelectorAll('section');
const revealSections = () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

/* --- Lesson Modals Logic --- */
function openLesson(title, content) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('lessonModal').style.display = 'flex';
}
function closeLesson() {
    document.getElementById('lessonModal').style.display = 'none';
}

/* --- Learn More Section Toggle --- */
function toggleLearnMore() {
    const panel = document.getElementById('learnMorePanel');
    const btn = document.getElementById('learnMoreBtn');
    panel.classList.toggle('open');
    if(panel.classList.contains('open')) {
        btn.innerText = "Collapse Study Guide ☝️";
    } else {
        btn.innerText = "Expand Study Guide 👇";
    }
}

/* --- Flashcard Game Data & Logic --- */
const vocabulary = [
    { word: "Apple 🍎", def: "A round fruit that grows on trees, usually red or green." },
    { word: "Book 📚", def: "A set of printed pages fastened together inside a cover for reading." },
    { word: "Cat 🐱", def: "A small domesticated carnivorous mammal kept as a pet." },
    { word: "Teacher 👩‍🏫", def: "A person whose job is to help students learn new skills and concepts." }
];
let currentCardIndex = 0;
let isFlipped = false;

function updateCard() {
    const card = document.getElementById('flashcard');
    isFlipped = false;
    card.classList.remove('flipped');
    setTimeout(() => {
        document.getElementById('cardText').innerText = vocabulary[currentCardIndex].word;
    }, 150);
}

function flipCard() {
    const card = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    card.classList.toggle('flipped');
    
    setTimeout(() => {
        if (isFlipped) {
            document.getElementById('cardText').innerText = vocabulary[currentCardIndex].def;
            document.getElementById('cardText').style.transform = 'scaleX(-1)'; 
            document.getElementById('cardText').style.fontSize = '1.1rem';
        } else {
            document.getElementById('cardText').innerText = vocabulary[currentCardIndex].word;
            document.getElementById('cardText').style.transform = 'scaleX(1)';
            document.getElementById('cardText').style.fontSize = '2.2rem';
        }
    }, 150);
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % vocabulary.length;
    updateCard();
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + vocabulary.length) % vocabulary.length;
    updateCard();
}

/* --- Word Scramble Puzzle Logic --- */
const wordsList = ["HOUSE", "HAPPY", "SCHOOL", "FRIEND", "COFFEE", "SUMMER"];
let currentWord = "";
let scrambledWord = "";
let gameScore = 0;

function initPuzzle() {
    currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    let scrambledArray = currentWord.split('');
    for (let i = scrambledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scrambledArray[i], scrambledArray[j]] = [scrambledArray[j], scrambledArray[i]];
    }
    scrambledWord = scrambledArray.join('');
    
    if(scrambledWord === currentWord) return initPuzzle();

    document.getElementById('scrambledWord').innerText = scrambledWord;
    document.getElementById('puzzleInput').value = "";
}

function checkPuzzle() {
    const userInput = document.getElementById('puzzleInput').value.toUpperCase().trim();
    if (userInput === currentWord) {
        alert("🎉 Brilliant! That's correct.");
        gameScore += 10;
        document.getElementById('score').innerText = gameScore;
        initPuzzle();
    } else {
        alert("❌ Oops! Try looking closer at the letters.");
    }
}

// Global Initialization
initPuzzle();