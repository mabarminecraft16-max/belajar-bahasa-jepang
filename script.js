// Japanese Learning Game - Game Logic with Language Support

// Language Data
const languages = {
    en: {
        title: "🇯🇵 Japanese Learning Game 日本語学習ゲーム",
        "nav-hiragana": "ひらがな (Hiragana)",
        "nav-katakana": "カタカナ (Katakana)",
        "nav-kanji": "漢字 (Kanji)",
        "nav-wordarrange": "Susun Kata (Word Arrange)",
        "hiragana-instruction": "Match the Hiragana characters with their Romanji pronunciations!",
        "katakana-instruction": "Match the Katakana characters with their Romanji pronunciations!",
        "kanji-instruction": "Match the Kanji characters with their meanings!",
        "wordarrange-instruction": "Arrange the syllables to form the correct Japanese word!",
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

// Level persistence functions
function saveLevel(gameType, level) {
    localStorage.setItem(`${gameType}Level`, level.toString());
}

function loadLevel(gameType) {
    const savedLevel = localStorage.getItem(`${gameType}Level`);
    return savedLevel ? parseInt(savedLevel) : 1;
}

function saveScore(gameType, score) {
    localStorage.setItem(`${gameType}Score`, score.toString());
}

function loadScore(gameType) {
    const savedScore = localStorage.getItem(`${gameType}Score`);
    return savedScore ? parseInt(savedScore) : 0;
}

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
    const sections = ['hiragana', 'katakana', 'kanji', 'wordarrange'];
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

// Hiragana Data - Expanded for multiple levels
const hiraganaData = {
    // Level 1
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    // Level 2
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    // Level 3
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
};

// Katakana Data - Complete set
const katakanaData = {
    // Basic Katakana
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
    // Dakuten (voiced) versions
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    // Handakuten (semi-voiced) versions
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    // Combination characters (yōon)
    'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
    'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
    'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
    'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
    'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
    'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
    'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
    'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
    'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
    'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
    'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
    'ヴァ': 'va', 'ヴィ': 'vi', 'ヴ': 'vu', 'ヴェ': 've', 'ヴォ': 'vo',
    'ティ': 'ti', 'ディ': 'di', 'トゥ': 'tu', 'ドゥ': 'du',
    'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo',
    'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo',
    'ツァ': 'tsa', 'ツィ': 'tsi', 'ツェ': 'tse', 'ツォ': 'tso',
    'チェ': 'che', 'シェ': 'she', 'ジェ': 'je',
    'スィ': 'si', 'ズィ': 'zi', 'テュ': 'tyu', 'デュ': 'dyu'
};

// Kanji Data - Expanded for multiple levels
const kanjiData = {
    // Level 1 - Basic Nature & Elements
    '日': 'sun/day', '月': 'moon/month', '水': 'water', '火': 'fire', '木': 'tree',
    '山': 'mountain', '川': 'river', '海': 'sea/ocean', '空': 'sky', '土': 'soil/earth',
    '石': 'stone', '花': 'flower', '草': 'grass', '森': 'forest', '雨': 'rain',
    '雪': 'snow', '風': 'wind', '雲': 'cloud', '星': 'star', '太陽': 'sun',

    // Level 2 - People & Body
    '人': 'person', '男': 'man', '女': 'woman', '子': 'child', '友': 'friend',
    '手': 'hand', '足': 'foot', '目': 'eye', '耳': 'ear', '口': 'mouth',
    '鼻': 'nose', '頭': 'head', '顔': 'face', '体': 'body', '心': 'heart',
    '力': 'power', '声': 'voice', '名': 'name', '生': 'life', '死': 'death',

    // Level 3 - Numbers & Time
    '一': 'one', '二': 'two', '三': 'three', '四': 'four', '五': 'five',
    '六': 'six', '七': 'seven', '八': 'eight', '九': 'nine', '十': 'ten',
    '百': 'hundred', '千': 'thousand', '万': 'ten thousand', '時': 'time/hour', '分': 'minute',
    '秒': 'second', '今': 'now', '先': 'before', '後': 'after', '前': 'front',

    // Level 4 - Directions & Positions
    '上': 'up', '下': 'down', '左': 'left', '右': 'right', '中': 'middle',
    '内': 'inside', '外': 'outside', '東': 'east', '西': 'west', '南': 'south',
    '北': 'north', '天': 'heaven', '地': 'ground', '間': 'space/between', '辺': 'area',

    // Level 5 - Actions & Verbs
    '行': 'go', '来': 'come', '見': 'see', '聞': 'hear', '言': 'say',
    '食': 'eat', '飲': 'drink', '読': 'read', '書': 'write', '話': 'speak',
    '走': 'run', '歩': 'walk', '立': 'stand', '坐': 'sit', '休': 'rest',
    '学': 'learn', '教': 'teach', '作': 'make', '買': 'buy', '売': 'sell',

    // Level 6 - Objects & Things
    '本': 'book', '車': 'car', '家': 'house', '道': 'road', '橋': 'bridge',
    '船': 'ship', '電': 'electricity', '気': 'spirit/energy', '物': 'thing', '事': 'matter',
    '金': 'money', '国': 'country', '都': 'city', '町': 'town', '村': 'village',
    '店': 'shop', '食': 'food', '飲': 'drink', '服': 'clothes', '靴': 'shoes',

    // Level 7 - Adjectives & Descriptions
    '大': 'big', '小': 'small', '多': 'many', '少': 'few', '新': 'new',
    '古': 'old', '良': 'good', '悪': 'bad', '美': 'beautiful', '醜': 'ugly',
    '高': 'high', '低': 'low', '長': 'long', '短': 'short', '広': 'wide',
    '狭': 'narrow', '厚': 'thick', '薄': 'thin', '重': 'heavy', '軽': 'light',

    // Level 8 - Advanced Concepts
    '愛': 'love', '夢': 'dream', '希望': 'hope', '平和': 'peace', '戦争': 'war',
    '音楽': 'music', '芸術': 'art', '科学': 'science', '技術': 'technology', '文化': 'culture',
    '歴史': 'history', '未来': 'future', '過去': 'past', '現在': 'present', '永遠': 'eternal',
    '自由': 'freedom', '平等': 'equality', '正義': 'justice', '真理': 'truth', '智慧': 'wisdom'
};

// Game state variables
let currentHiraganaGame = null;
let currentKatakanaGame = null;
let currentKanjiGame = null;
let currentWordArrangeGame = null;
let selectedCharacter = null;
let selectedOption = null;
let selectedWordPiece = null;
let selectedSlot = null;

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
    const savedLevel = loadLevel('hiragana');
    const savedScore = loadScore('hiragana');
    const characters = Object.keys(hiraganaData);

    // Increase character count based on level
    const characterCount = Math.min(10 + (savedLevel - 1) * 2, characters.length);
    const shuffledChars = shuffleArray(characters.slice(0, characterCount));
    const shuffledOptions = shuffleArray(shuffledChars.map(char => hiraganaData[char]));

    currentHiraganaGame = {
        characters: shuffledChars,
        options: shuffledOptions,
        correctMatches: {},
        score: savedScore,
        level: savedLevel
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
            saveLevel('hiragana', currentHiraganaGame.level);
            saveScore('hiragana', currentHiraganaGame.score);
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
    const savedLevel = loadLevel('katakana');
    const savedScore = loadScore('katakana');
    const characters = Object.keys(katakanaData);

    // Increase character count based on level
    const characterCount = Math.min(10 + (savedLevel - 1) * 2, characters.length);
    const shuffledChars = shuffleArray(characters.slice(0, characterCount));
    const shuffledOptions = shuffleArray(shuffledChars.map(char => katakanaData[char]));

    currentKatakanaGame = {
        characters: shuffledChars,
        options: shuffledOptions,
        correctMatches: {},
        score: savedScore,
        level: savedLevel
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
            saveLevel('katakana', currentKatakanaGame.level);
            saveScore('katakana', currentKatakanaGame.score);
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
    const savedLevel = loadLevel('kanji');
    const savedScore = loadScore('kanji');
    const characters = Object.keys(kanjiData);

    // Increase character count based on level
    const characterCount = Math.min(8 + (savedLevel - 1) * 2, characters.length);
    const shuffledChars = shuffleArray(characters.slice(0, characterCount));
    const shuffledOptions = shuffleArray(shuffledChars.map(char => kanjiData[char]));

    currentKanjiGame = {
        characters: shuffledChars,
        options: shuffledOptions,
        correctMatches: {},
        score: savedScore,
        level: savedLevel
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
            saveLevel('kanji', currentKanjiGame.level);
            saveScore('kanji', currentKanjiGame.score);
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

// Word Arrangement Game Data - Expanded for multiple levels
const wordArrangeData = {
    // Level 1 - Basic greetings (2-3 syllables)
    'こんにちは': ['こ', 'ん', 'に', 'ち', 'は'],
    'ありがとう': ['あ', 'り', 'が', 'と', 'う'],
    'さようなら': ['さ', 'よ', 'う', 'な', 'ら'],
    'おはよう': ['お', 'は', 'よ', 'う'],
    'こんばんは': ['こ', 'ん', 'ば', 'ん', 'は'],
    'おめでとう': ['お', 'め', 'で', 'と', 'う'],
    'いらっしゃい': ['い', 'ら', 'っ', 'し', 'ゃ', 'い'],
    'おやすみ': ['お', 'や', 'す', 'み'],
    'はじめまして': ['は', 'じ', 'め', 'ま', 'し', 'て'],
    'よろしく': ['よ', 'ろ', 'し', 'く'],

    // Level 2 - Family & relationships (3-4 syllables)
    'おかあさん': ['お', 'か', 'あ', 'さ', 'ん'],
    'おとうさん': ['お', 'と', 'う', 'さ', 'ん'],
    'おにいさん': ['お', 'に', 'い', 'さ', 'ん'],
    'おねえさん': ['お', 'ね', 'え', 'さ', 'ん'],
    'おじいさん': ['お', 'じ', 'い', 'さ', 'ん'],
    'おばあさん': ['お', 'ば', 'あ', 'さ', 'ん'],
    'ご家族': ['ご', 'か', 'ぞ', 'く'],
    'ともだち': ['と', 'も', 'だ', 'ち'],
    'せんせい': ['せ', 'ん', 'せ', 'い'],
    'がくせい': ['が', 'く', 'せ', 'い'],

    // Level 3 - Numbers & counting (2-4 syllables)
    'いち': ['い', 'ち'], 'に': ['に'], 'さん': ['さ', 'ん'], 'し': ['し'], 'ご': ['ご'],
    'ろく': ['ろ', 'く'], 'しち': ['し', 'ち'], 'はち': ['は', 'ち'], 'きゅう': ['き', 'ゅ', 'う'], 'じゅう': ['じ', 'ゅ', 'う'],
    'ひゃく': ['ひ', 'ゃ', 'く'], 'せん': ['せ', 'ん'], 'まん': ['ま', 'ん'], 'いちまん': ['い', 'ち', 'ま', 'ん'],
    'じゅうまん': ['じ', 'ゅ', 'う', 'ま', 'ん'],

    // Level 4 - Colors & descriptions (2-4 syllables)
    'あか': ['あ', 'か'], 'あお': ['あ', 'お'], 'きいろ': ['き', 'い', 'ろ'], 'みどり': ['み', 'ど', 'り'],
    'むらさき': ['む', 'ら', 'さ', 'き'], 'ちゃいろ': ['ち', 'ゃ', 'い', 'ろ'], 'しろ': ['し', 'ろ'], 'くろ': ['く', 'ろ'],
    'ピンク': ['ピ', 'ン', 'ク'], 'オレンジ': ['オ', 'レ', 'ン', 'ジ'],

    // Level 5 - Food & drinks (3-5 syllables)
    'ごはん': ['ご', 'は', 'ん'], 'みず': ['み', 'ず'], 'ちゃ': ['ち', 'ゃ'], 'コーヒー': ['コ', 'ー', 'ヒ', 'ー'],
    'おちゃ': ['お', 'ち', 'ゃ'], 'ジュース': ['ジ', 'ュ', 'ー', 'ス'], 'ぱん': ['ぱ', 'ん'], 'たまご': ['た', 'ま', 'ご'],
    'やさい': ['や', 'さ', 'い'], 'くだもの': ['く', 'だ', 'も', 'の'], 'にく': ['に', 'く'], 'さかな': ['さ', 'か', 'な'],
    'らいす': ['ら', 'い', 'す'], 'めん': ['め', 'ん'], 'すし': ['す', 'し'],

    // Level 6 - Places & locations (3-5 syllables)
    'うち': ['う', 'ち'], 'がっこう': ['が', 'っ', 'こ', 'う'], 'かいしゃ': ['か', 'い', 'し', 'ゃ'],
    'みせ': ['み', 'せ'], 'レストラン': ['レ', 'ス', 'ト', 'ラ', 'ン'], 'ホテル': ['ホ', 'テ', 'ル'],
    'えき': ['え', 'き'], 'バスてい': ['ば', 'す', 'て', 'い'], 'ひこうき': ['ひ', 'こ', 'う', 'き'],
    'でんしゃ': ['で', 'ん', 'し', 'ゃ'], 'じてんしゃ': ['じ', 'て', 'ん', 'し', 'ゃ'], 'くるま': ['く', 'る', 'ま'],

    // Level 7 - Actions & verbs (3-5 syllables)
    'たべる': ['た', 'べ', 'る'], 'のむ': ['の', 'む'], 'いく': ['い', 'く'], 'くる': ['く', 'る'],
    'みる': ['み', 'る'], 'きく': ['き', 'く'], 'はなす': ['は', 'な', 'す'], 'よむ': ['よ', 'む'],
    'かく': ['か', 'く'], 'あるく': ['あ', 'る', 'く'], 'はしる': ['は', 'し', 'る'], 'ねる': ['ね', 'る'],
    'おきる': ['お', 'き', 'る'], 'あらう': ['あ', 'ら', 'う'], 'かう': ['か', 'う'], 'うる': ['う', 'る'],
    'べんきょう': ['べ', 'ん', 'き', 'ょ', 'う'], 'しごと': ['し', 'ご', 'と'],

    // Level 8 - Time & weather (3-5 syllables)
    'あさ': ['あ', 'さ'], 'ひる': ['ひ', 'る'], 'よる': ['よ', 'る'], 'あした': ['あ', 'し', 'た'],
    'きのう': ['き', 'の', 'う'], 'きょう': ['き', 'ょ', 'う'], 'あさって': ['あ', 'さ', 'っ', 'て'],
    'はれ': ['は', 'れ'], 'くもり': ['く', 'も', 'り'], 'あめ': ['あ', 'め'], 'ゆき': ['ゆ', 'き'],
    'かぜ': ['か', 'ぜ'], 'あつい': ['あ', 'つ', 'い'], 'さむい': ['さ', 'む', 'い'], 'あったかい': ['あ', 'っ', 'た', 'か', 'い'],
    'すずしい': ['す', 'ず', 'し', 'い'], 'いちにち': ['い', 'ち', 'に', 'ち'], 'いっしゅうかん': ['い', 'っ', 'し', 'ゅ', 'う', 'か', 'ん'],

    // Level 9 - Advanced vocabulary (4-6 syllables)
    'でんわ': ['で', 'ん', 'わ'], 'パソコン': ['パ', 'ソ', 'コ', 'ン'], 'インターネット': ['イ', 'ン', 'タ', 'ー', 'ネ', 'ッ', 'ト'],
    'スマートフォン': ['ス', 'マ', 'ー', 'ト', 'フ', 'ォ', 'ン'], 'えいご': ['え', 'い', 'ご'], 'にほんご': ['に', 'ほ', 'ん', 'ご'],
    'がっこう': ['が', 'っ', 'こ', 'う'], 'だいがく': ['だ', 'い', 'が', 'く'], 'びょういん': ['び', 'ょ', 'う', 'い', 'ん'],
    'ぎんこう': ['ぎ', 'ん', 'こ', 'う'], 'ゆうびんきょく': ['ゆ', 'う', 'び', 'ん', 'き', 'ょ', 'く'], 'コンビニ': ['コ', 'ン', 'ビ', 'ニ'],

    // Level 10 - Complex phrases (5-7 syllables)
    'おはようございます': ['お', 'は', 'よ', 'う', 'ご', 'ざ', 'い', 'ま', 'す'],
    'ありがとうございます': ['あ', 'り', 'が', 'と', 'う', 'ご', 'ざ', 'い', 'ま', 'す'],
    'いってきます': ['い', 'っ', 'て', 'き', 'ま', 'す'], 'いってらっしゃい': ['い', 'っ', 'て', 'ら', 'っ', 'し', 'ゃ', 'い'],
    'ただいま': ['た', 'だ', 'い', 'ま'], 'おかえりなさい': ['お', 'か', 'え', 'り', 'な', 'さ', 'い'],
    'いただきます': ['い', 'た', 'だ', 'き', 'ま', 'す'], 'ごちそうさま': ['ご', 'ち', 'そ', 'う', 'さ', 'ま'],
    'よろしくお願いします': ['よ', 'ろ', 'し', 'く', 'お', 'ね', 'が', 'い', 'し', 'ま', 'す'],
    'はじめまして': ['は', 'じ', 'め', 'ま', 'し', 'て'], 'どうぞよろしく': ['ど', 'う', 'ぞ', 'よ', 'ろ', 'し', 'く']
};

// Word Arrangement Game Functions
function startWordArrangeGame() {
    const savedLevel = loadLevel('wordarrange');
    const savedScore = loadScore('wordarrange');
    const words = Object.keys(wordArrangeData);

    // Select words based on level
    const wordCount = Math.min(3 + (savedLevel - 1), words.length);
    const selectedWords = shuffleArray(words.slice(0, wordCount));

    currentWordArrangeGame = {
        words: selectedWords,
        currentWordIndex: 0,
        syllables: [],
        targetWord: '',
        score: savedScore,
        level: savedLevel
    };

    displayWordArrangeGame();
    clearFeedback('wordarrange-feedback');
}

function displayWordArrangeGame() {
    const targetContainer = document.getElementById('wordarrange-target');
    const syllablesContainer = document.getElementById('wordarrange-syllables');

    targetContainer.innerHTML = '';
    syllablesContainer.innerHTML = '';

    const currentWord = currentWordArrangeGame.words[currentWordArrangeGame.currentWordIndex];
    const syllables = wordArrangeData[currentWord];

    currentWordArrangeGame.syllables = shuffleArray([...syllables]);
    currentWordArrangeGame.targetWord = currentWord;

    // Create target slots
    for (let i = 0; i < syllables.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'word-slot';
        slot.dataset.index = i;
        slot.onclick = () => selectSlot(i);
        targetContainer.appendChild(slot);
    }

    // Create syllable pieces
    currentWordArrangeGame.syllables.forEach(syllable => {
        const piece = document.createElement('div');
        piece.className = 'syllable-piece';
        piece.textContent = syllable;
        piece.onclick = () => selectWordPiece(syllable);
        syllablesContainer.appendChild(piece);
    });
}

function selectSlot(index) {
    // Remove previous selection
    document.querySelectorAll('.word-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Select current
    event.target.classList.add('selected');
    selectedSlot = index;
}

function selectWordPiece(syllable) {
    // Remove previous selection
    document.querySelectorAll('.syllable-piece').forEach(piece => {
        piece.classList.remove('selected');
    });

    // Select current
    event.target.classList.add('selected');
    selectedWordPiece = syllable;
}

function checkWordArrangeAnswer() {
    if (!selectedSlot || !selectedWordPiece) {
        showFeedback(languages[currentLanguage]['select-both'], 'wordarrange-feedback', 'incorrect');
        return;
    }

    const targetSlots = document.querySelectorAll('.word-slot');
    const currentSlot = targetSlots[selectedSlot];

    // Check if slot is already filled
    if (currentSlot.textContent) {
        showFeedback('Slot already filled! Choose an empty slot.', 'wordarrange-feedback', 'incorrect');
        return;
    }

    // Place the syllable in the slot
    currentSlot.textContent = selectedWordPiece;

    // Remove the syllable from available pieces
    document.querySelector('.syllable-piece.selected').remove();

    // Check if the word is complete
    const completedWord = Array.from(targetSlots).map(slot => slot.textContent).join('');
    if (completedWord === currentWordArrangeGame.targetWord) {
        currentWordArrangeGame.score += 20;
        updateScore('wordarrange-score', currentWordArrangeGame.score);
        saveScore('wordarrange', currentWordArrangeGame.score);
        showFeedback(languages[currentLanguage]['correct'], 'wordarrange-feedback', 'correct');

        // Move to next word or level
        currentWordArrangeGame.currentWordIndex++;
        if (currentWordArrangeGame.currentWordIndex >= currentWordArrangeGame.words.length) {
            currentWordArrangeGame.level++;
            saveLevel('wordarrange', currentWordArrangeGame.level);
            saveScore('wordarrange', currentWordArrangeGame.score);
            updateLevel('wordarrange-level', currentWordArrangeGame.level);
            showFeedback(`${languages[currentLanguage]['level-complete']} ${currentWordArrangeGame.level}`, 'wordarrange-feedback', 'correct');
            setTimeout(startWordArrangeGame, 2000);
        } else {
            setTimeout(displayWordArrangeGame, 1000);
        }
    }

    selectedSlot = null;
    selectedWordPiece = null;
}

function showWordArrangeHint() {
    if (currentWordArrangeGame.targetWord) {
        showFeedback(`Hint: The word is "${currentWordArrangeGame.targetWord}"`, 'wordarrange-feedback', 'hint');
    } else {
        showFeedback('Start a new game to get hints!', 'wordarrange-feedback', 'hint');
    }
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
