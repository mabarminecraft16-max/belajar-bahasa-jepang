// Japanese Learning Game - Game Logic with Language Support

// Language Data
const languages = {
    en: {
        title: "🇯🇵 Japanese Learning Game 日本語学習ゲーム",
        "nav-hiragana": "ひらがな (Hiragana)",
        "nav-katakana": "カタカナ (Katakana)",
        "nav-kanji": "漢字 (Kanji)",
        "hiragana-instruction": "Match the Hiragana characters with their Romanji pronunciations!",
        "katakana-instruction": "Match the Katakana characters with their Romanji pronunciations!",
        "kanji-instruction": "Match the Kanji characters with their meanings!",
        "score": "Score",
        "level": "Level",
        "new-game": "New Game",
        "check-answer": "Check Answer",
        "hint": "Hint",
        "correct": "Correct! せいかい！",
        "incorrect": "Incorrect. Try again! まちがい！",
        "level-complete": "Level Complete! Next level:",
        "select-both": "Please select both a character and an option!",
        "select-character": "Select a character first!",
        "footer": "© 2024 Japanese Learning Game - Learn Japanese through fun puzzles!",
        "nav-home": "Home",
        "home-title": "Welcome to Japanese Learning Game! 日本語学習ゲームへようこそ！",
        "home-description": "Learn Japanese characters through fun matching games! Choose from Hiragana, Katakana, or Kanji to start your journey.",
        "start-game": "Start Learning"
    },
    id: {
        title: "🇯🇵 Game Belajar Bahasa Jepang 日本語学習ゲーム",
        "nav-hiragana": "ひらがな (Hiragana)",
        "nav-katakana": "カタカナ (Katakana)",
        "nav-kanji": "漢字 (Kanji)",
        "hiragana-instruction": "Cocokkan karakter Hiragana dengan pengucapan Romanjinya!",
        "katakana-instruction": "Cocokkan karakter Katakana dengan pengucapan Romanjinya!",
        "kanji-instruction": "Cocokkan karakter Kanji dengan artinya!",
        "score": "Skor",
        "level": "Level",
        "new-game": "Game Baru",
        "check-answer": "Periksa Jawaban",
        "hint": "Petunjuk",
        "correct": "Benar! せいかい！",
        "incorrect": "Salah. Coba lagi! まちがい！",
        "level-complete": "Level Selesai! Level berikutnya:",
        "select-both": "Silakan pilih karakter dan opsi!",
        "select-character": "Pilih karakter terlebih dahulu!",
        "footer": "© 2024 Game Belajar Bahasa Jepang - Belajar Bahasa Jepang melalui teka-teki yang menyenangkan!"
    }
};

// Current language
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Language switching function
function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    currentLanguage = languageSelect.value;
    localStorage.setItem('selectedLanguage', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (languages[currentLanguage][key]) {
            element.textContent = languages[currentLanguage][key];
        }
    });

    // Update title
    document.querySelector('h1').textContent = languages[currentLanguage].title;

    // Update footer
    document.querySelector('footer p').textContent = languages[currentLanguage].footer;

    // Update game instructions and UI elements
    updateGameInstructions();
}

function updateGameInstructions() {
    // Update section headings
    const sections = ['hiragana', 'katakana', 'kanji'];
    sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (sectionElement && sectionElement.classList.contains('active')) {
            const heading = sectionElement.querySelector('h2');
            const instruction = sectionElement.querySelector('.game-info p');
            const scoreLabel = sectionElement.querySelector('.score').textContent.split(':')[0];
            const levelLabel = sectionElement.querySelector('.level').textContent.split(':')[0];

            if (heading) {
                const level = heading.textContent.match(/Level (\d+)/);
                const levelNum = level ? level[1] : '1';
                heading.textContent = getSectionTitle(section, levelNum);
            }

            if (instruction) {
                instruction.textContent = languages[currentLanguage][`${section}-instruction`];
            }

            if (scoreLabel) {
                sectionElement.querySelector('.score').textContent = `${languages[currentLanguage].score}: ${sectionElement.querySelector('.score span').textContent}`;
            }

            if (levelLabel) {
                sectionElement.querySelector('.level').textContent = `${languages[currentLanguage].level}: ${sectionElement.querySelector('.level span').textContent}`;
            }
        }
    });

    // Update buttons
    updateButtonText();
}

function getSectionTitle(section, level) {
    const titles = {
        hiragana: currentLanguage === 'en' ? `ひらがな (Hiragana) - Level ${level}` : `ひらがな (Hiragana) - Level ${level}`,
        katakana: currentLanguage === 'en' ? `カタカナ (Katakana) - Level ${level}` : `カタカナ (Katakana) - Level ${level}`,
        kanji: currentLanguage === 'en' ? `漢字 (Kanji) - Level ${level}` : `漢字 (Kanji) - Level ${level}`
    };
    return titles[section];
}

function updateButtonText() {
    document.querySelectorAll('.game-btn').forEach(btn => {
        const text = btn.textContent;
        if (text === 'New Game') {
            btn.textContent = languages[currentLanguage]['new-game'];
        } else if (text === 'Check Answer') {
            btn.textContent = languages[currentLanguage]['check-answer'];
        } else if (text === 'Hint') {
            btn.textContent = languages[currentLanguage]['hint'];
        }
    });
}

// Hiragana Data
const hiraganaData = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n'
};

// Katakana Data
const katakanaData = {
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n'
};

// Kanji Data (Basic level)
const kanjiData = {
    '日': 'sun/day', '月': 'moon/month', '水': 'water', '火': 'fire', '木': 'tree',
    '山': 'mountain', '川': 'river', '人': 'person', '手': 'hand', '足': 'foot',
    '目': 'eye', '耳': 'ear', '口': 'mouth', '心': 'heart', '力': 'power',
    '天': 'heaven', '地': 'ground', '上': 'up', '下': 'down', '中': 'middle',
    '大': 'big', '小': 'small', '多': 'many', '少': 'few', '新': 'new'
};

// Game state variables
let currentHiraganaGame = null;
let currentKatakanaGame = null;
let currentKanjiGame = null;
let selectedCharacter = null;
let selectedOption = null;

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.game-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to corresponding nav button
    event.target.classList.add('active');

    // Update language for the active section
    updateGameInstructions();
}

// Hiragana Game Functions
function startHiraganaGame() {
    const characters = Object.keys(hiraganaData);
    const shuffledChars = shuffleArray(characters.slice(0, 10)); // Start with 10 characters
    const shuffledOptions = shuffleArray(shuffledChars.map(char => hiraganaData[char]));

    currentHiraganaGame = {
        characters: shuffledChars,
        options: shuffledOptions,
        correctMatches: {},
        score: 0,
        level: 1
    };

    displayHiraganaGame();
    clearFeedback('hiragana-feedback');
}

function displayHiraganaGame() {
    const charactersContainer = document.getElementById('hiragana-characters');
    const optionsContainer = document.getElementById('hiragana-options');

    charactersContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    currentHiraganaGame.characters.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = char;
        charElement.onclick = () => selectCharacter(char, 'hiragana');
        charactersContainer.appendChild(charElement);
    });

    currentHiraganaGame.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(option, 'hiragana');
        optionsContainer.appendChild(optionElement);
    });
}

function selectCharacter(char, gameType) {
    // Remove previous selection
    document.querySelectorAll(`#${gameType}-characters .character`).forEach(el => {
        el.classList.remove('selected');
    });

    // Select current
    event.target.classList.add('selected');

    if (gameType === 'hiragana') {
        selectedCharacter = char;
    } else if (gameType === 'katakana') {
        selectedCharacter = char;
    } else if (gameType === 'kanji') {
        selectedCharacter = char;
    }
}

function selectOption(option, gameType) {
    // Remove previous selection
    document.querySelectorAll(`#${gameType}-options .option`).forEach(el => {
        el.classList.remove('selected');
    });

    // Select current
    event.target.classList.add('selected');

    selectedOption = option;
}

function checkHiraganaAnswer() {
    if (!selectedCharacter || !selectedOption) {
        showFeedback(languages[currentLanguage]['select-both'], 'hiragana-feedback', 'incorrect');
        return;
    }

    const correctAnswer = hiraganaData[selectedCharacter];
    if (selectedOption === correctAnswer) {
        currentHiraganaGame.score += 10;
        currentHiraganaGame.correctMatches[selectedCharacter] = selectedOption;

        // Remove matched items
        document.querySelector('#hiragana-characters .character.selected').remove();
        document.querySelector('#hiragana-options .option.selected').remove();

        updateScore('hiragana-score', currentHiraganaGame.score);
        showFeedback(languages[currentLanguage]['correct'], 'hiragana-feedback', 'correct');

        // Check if game is complete
        if (document.querySelectorAll('#hiragana-characters .character').length === 0) {
            currentHiraganaGame.level++;
            updateLevel('hiragana-level', currentHiraganaGame.level);
            showFeedback(`${languages[currentLanguage]['level-complete']} ${currentHiraganaGame.level}`, 'hiragana-feedback', 'correct');
            setTimeout(startHiraganaGame, 2000);
        }
    } else {
        showFeedback(languages[currentLanguage]['incorrect'], 'hiragana-feedback', 'incorrect');
    }

    selectedCharacter = null;
    selectedOption = null;
}

function showHiraganaHint() {
    if (selectedCharacter) {
        const correctAnswer = hiraganaData[selectedCharacter];
        showFeedback(`Hint: ${selectedCharacter} is pronounced as "${correctAnswer}"`, 'hiragana-feedback', 'hint');
    } else {
        showFeedback(languages[currentLanguage]['select-character'], 'hiragana-feedback', 'hint');
    }
}

// Katakana Game Functions (Similar to Hiragana)
function startKatakanaGame() {
    const characters = Object.keys(katakanaData);
    const shuffledChars = shuffleArray(characters.slice(0, 10));
    const shuffledOptions = shuffleArray(shuffledChars.map(char => katakanaData[char]));

    currentKatakanaGame = {
        characters: shuffledChars,
        options: shuffledOptions,
        correctMatches: {},
        score: 0,
        level: 1
    };

    displayKatakanaGame();
    clearFeedback('katakana-feedback');
}

function displayKatakanaGame() {
    const charactersContainer = document.getElementById('katakana-characters');
    const optionsContainer = document.getElementById('katakana-options');

    charactersContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    currentKatakanaGame.characters.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = char;
        charElement.onclick = () => selectCharacter(char, 'katakana');
        charactersContainer.appendChild(charElement);
    });

    currentKatakanaGame.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(option, 'katakana');
        optionsContainer.appendChild(optionElement);
    });
}

function checkKatakanaAnswer() {
    if (!selectedCharacter || !selectedOption) {
        showFeedback(languages[currentLanguage]['select-both'], 'katakana-feedback', 'incorrect');
        return;
    }

    const correctAnswer = katakanaData[selectedCharacter];
    if (selectedOption === correctAnswer) {
        currentKatakanaGame.score += 10;
        currentKatakanaGame.correctMatches[selectedCharacter] = selectedOption;

        document.querySelector('#katakana-characters .character.selected').remove();
        document.querySelector('#katakana-options .option.selected').remove();

        updateScore('katakana-score', currentKatakanaGame.score);
        showFeedback(languages[currentLanguage]['correct'], 'katakana-feedback', 'correct');

        if (document.querySelectorAll('#katakana-characters .character').length === 0) {
            currentKatakanaGame.level++;
            updateLevel('katakana-level', currentKatakanaGame.level);
            showFeedback(`${languages[currentLanguage]['level-complete']} ${currentKatakanaGame.level}`, 'katakana-feedback', 'correct');
            setTimeout(startKatakanaGame, 2000);
        }
    } else {
        showFeedback(languages[currentLanguage]['incorrect'], 'katakana-feedback', 'incorrect');
    }

    selectedCharacter = null;
    selectedOption = null;
}

function showKatakanaHint() {
    if (selectedCharacter) {
        const correctAnswer = katakanaData[selectedCharacter];
        showFeedback(`Hint: ${selectedCharacter} is pronounced as "${correctAnswer}"`, 'katakana-feedback', 'hint');
    } else {
        showFeedback(languages[currentLanguage]['select-character'], 'katakana-feedback', 'hint');
    }
}

// Kanji Game Functions
function startKanjiGame() {
    const characters = Object.keys(kanjiData);
    const shuffledChars = shuffleArray(characters.slice(0, 8)); // Start with 8 kanji
    const shuffledOptions = shuffleArray(shuffledChars.map(char => kanjiData[char]));

    currentKanjiGame = {
        characters: shuffledChars,
        options: shuffledOptions,
        correctMatches: {},
        score: 0,
        level: 1
    };

    displayKanjiGame();
    clearFeedback('kanji-feedback');
}

function displayKanjiGame() {
    const charactersContainer = document.getElementById('kanji-characters');
    const optionsContainer = document.getElementById('kanji-options');

    charactersContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    currentKanjiGame.characters.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = char;
        charElement.onclick = () => selectCharacter(char, 'kanji');
        charactersContainer.appendChild(charElement);
    });

    currentKanjiGame.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(option, 'kanji');
        optionsContainer.appendChild(optionElement);
    });
}

function checkKanjiAnswer() {
    if (!selectedCharacter || !selectedOption) {
        showFeedback(languages[currentLanguage]['select-both'], 'kanji-feedback', 'incorrect');
        return;
    }

    const correctAnswer = kanjiData[selectedCharacter];
    if (selectedOption === correctAnswer) {
        currentKanjiGame.score += 15; // Higher score for Kanji
        currentKanjiGame.correctMatches[selectedCharacter] = selectedOption;

        document.querySelector('#kanji-characters .character.selected').remove();
        document.querySelector('#kanji-options .option.selected').remove();

        updateScore('kanji-score', currentKanjiGame.score);
        showFeedback(languages[currentLanguage]['correct'], 'kanji-feedback', 'correct');

        if (document.querySelectorAll('#kanji-characters .character').length === 0) {
            currentKanjiGame.level++;
            updateLevel('kanji-level', currentKanjiGame.level);
            showFeedback(`${languages[currentLanguage]['level-complete']} ${currentKanjiGame.level}`, 'kanji-feedback', 'correct');
            setTimeout(startKanjiGame, 2000);
        }
    } else {
        showFeedback(languages[currentLanguage]['incorrect'], 'kanji-feedback', 'incorrect');
    }

    selectedCharacter = null;
    selectedOption = null;
}

function showKanjiHint() {
    if (selectedCharacter) {
        const correctAnswer = kanjiData[selectedCharacter];
        showFeedback(`Hint: ${selectedCharacter} means "${correctAnswer}"`, 'kanji-feedback', 'hint');
    } else {
        showFeedback(languages[currentLanguage]['select-character'], 'kanji-feedback', 'hint');
    }
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showFeedback(message, feedbackId, type) {
    const feedbackElement = document.getElementById(feedbackId);
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;

    // Clear feedback after 3 seconds
    setTimeout(() => {
        clearFeedback(feedbackId);
    }, 3000);
}

function clearFeedback(feedbackId) {
    const feedbackElement = document.getElementById(feedbackId);
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
}

function updateScore(scoreId, score) {
    document.getElementById(scoreId).textContent = score;
}

function updateLevel(levelId, level) {
    document.getElementById(levelId).textContent = level;
}

// Homepage function
function startFromHome() {
    // Hide homepage and show first game section (Hiragana)
    showSection('hiragana');
    startHiraganaGame();
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    document.getElementById('language-select').value = currentLanguage;
    updateLanguage();

    // Homepage is already active by default
});
