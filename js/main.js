// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const accuracyDisplay = document.querySelector('#Accuracy');
const wpmDisplay = document.querySelector('#WPM');
const message = document.querySelector('#message');
const cpmDisplay = document.querySelector('#CPM');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

let word_count = 32
let score = 0;

// Initialize Game
function init() {
  console.log("INITIALIZED")
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Check game status
  setInterval(checkFinish, 50);
  setInterval(metrics, 1);
}

tick = 0
last_char = 0;
last_word = 0;
displacement_chars = [];
displacement_words = [];


function metrics() {
  tick += 1;
}

// Start match
function startMatch() {
  matchWords()
}

// Match currentWord to wordInput
function matchWords() {
  console.log(wordInput.value.charAt(0))
  if (matchLetter(wordInput.value.charAt(0), currentWord.innerHTML.charAt(0))) {
    currentWord.innerHTML = currentWord.innerHTML.substring(1);
  }
  wordInput.value = '';
}

function matchLetter(letter, text_letter) {
  letter = letter.charAt(0).toLowerCase()
  if (text_letter == " ") {
    if (letter === " ") {
      displacement_words.push(tick - last_word)
      last_word = tick;
      return true;
    }
  } else {
    if (letter === text_letter) {
      displacement_chars.push(tick - last_char)
      last_char = tick;
      return true;
    }
  }

  return false
}

// Pick & show random word
function showWord(words) {
  if (true) {
     // Generate random array index
  // Output random word
    let result = "click here to start, keep in mind it's a work in progress. ready? go... "
    for (var i = 0; i < word_count; i++) {
      result = result.concat(words[Math.floor(Math.random() * words.length)] + " ")
    }
    currentWord.innerHTML = result;
  } else {
    currentWord.innerHTML = "Click here to start";
}
}

// Check game status
function checkFinish() {
  console.log(document.activeElement)
  if (currentWord.innerHTML === "" || currentWord.innerHTML === " ") {
    calculate()
    showWord(words);
  }
}

function calculate() {
  char_total = 0;
  word_total = 0;
  for (var i = 0; i < displacement_chars.length; i++) {
    char_total += displacement_chars[i]
  }
  for (var i = 0; i < displacement_words.length; i++) {
    word_total += displacement_words[i]
  }

  console.log(displacement_chars)
  console.log(displacement_words)

  // wpmDisplay.innerHTML = Math.floor(60000/(2*word_total/displacement_words.length))
  // cpmDisplay.innerHTML = Math.floor(60000/(2*char_total/displacement_chars.length))
  // accuracyDisplay.innerHTML = 60000/(tick / word_count)
  tick = 0
  last_char = 0;
  last_word = 0;
  displacement_chars = [];
  displacement_words = [];
  // cpmDisplay.innerHTML = toString(char_total/displacement_chars.length)
  // wpmDisplay.innerHTML = toString(word_total/displacement_words.length)

}
