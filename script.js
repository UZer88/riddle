const riddle = document.getElementById('riddle');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const answersEl = document.getElementById('answers');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const lastAnswerEl = document.getElementById('last-answer-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const skip = document.getElementById('skip-container');

const riddles = [
  'Висит груша - нельзя скушать',
  'Четверо братьев под одной крышей живут',
  'Маленькая собачонка не лает, не кусает, а в дом не пускает'
];

const riddleAnswers = [
    ['лампа', 'Лампа', 'лампочка', 'Лампочка'],
    ['стол', 'Стол', 'табурет', 'Табурет', 'табуретка', 'Табуретка'],
    ['замок', 'Замок']
]

let i = 0;

let randomRiddle;
let answer;

let score = 0;
let answers = 0;

let time = 20;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomRiddle() {
  return riddles[i];
}

function getRandomAnswer() {
  return riddleAnswers[i];
}

function addRiddleToDOM() {
  randomRiddle = getRandomRiddle();
  answer = getRandomAnswer();
  riddle.innerHTML = randomRiddle;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateAnswers() {
    answers++;
    answersEl.innerHTML = answers;
  }

function updateTime() {
  time--;
  timeEl.innerHTML = time + 'с';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Время вышло</h1>
    <p>Количество правильных ответов: ${score}</p>
    <p>Всего попыток: ${answers}</p>
    <button onclick="location.reload()">Начать сначала</button>
  `;

  endgameEl.style.display = 'flex';
}

function lastAnswerRight() {
  lastAnswerEl.innerHTML = `
    <p>Вы ответили верно. Поздравляем!</p>
  `;

  lastAnswerEl.style.display = 'flex';
}

function lastAnswerWrong() {
  lastAnswerEl.innerHTML = `
    <p>Ваш последний ответ неверный. Не угадали!</p>
  `;

  lastAnswerEl.style.display = 'flex';
}

addRiddleToDOM();

skip.addEventListener('click', e => {
  updateAnswers();
  if (i >= riddleAnswers.length - 1) {
    i = 0;
  } else {
    i++;
  }
  addRiddleToDOM();
});

text.addEventListener('keydown', e => {

if(e.key === "Enter") {
  e.preventDefault();
  updateAnswers();
  if (i >= riddleAnswers.length - 1) {
    i = 0;
  } else {
    i++;
  }
  const insertedText = e.target.value;
  console.log(insertedText);

  if (answer.includes(insertedText)) {
    addRiddleToDOM();
    updateScore();
    lastAnswerRight();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  } else {
    lastAnswerWrong();
  }
}
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
