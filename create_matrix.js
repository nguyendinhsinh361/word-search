// Bảng kí tự katakana
const katakanaDictionary = {
    "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo", "ン": "n",
    "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go",
    "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo",
    "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do",
    "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo",
    "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po",
    "ヴ": "vu"
};

const hiraganaDictionary = {
	"あ": "a",
	"い": "i",
	"う": "u",
	"え": "e",
	"お": "o",
	"か": "ka",
	"き": "ki",
	"く": "ku",
	"け": "ke",
	"こ": "ko",
	"が": "ga",
	"ぎ": "gi",
	"ぐ": "gu",
	"げ": "ge",
	"ご": "go",
	"さ": "sa",
	"し": "shi",
	"す": "su",
	"せ": "se",
	"そ": "so",
	"ざ": "za",
	"じ": "ji",
	"ず": "zu",
	"ぜ": "ze",
	"ぞ": "zo",
	"た": "ta",
	"ち": "chi",
	"つ": "tsu",
	"て": "te",
	"と": "to",
	"だ": "da",
	"ぢ": "ji",
	"づ": "zu",
	"で": "de",
	"ど": "do",
	"な": "na",
	"に": "ni",
	"ぬ": "nu",
	"ね": "ne",
	"の": "no",
	"は": "ha",
	"ひ": "hi",
	"ふ": "fu",
	"へ": "he",
	"ほ": "ho",
	"ば": "ba",
	"び": "bi",
	"ぶ": "bu",
	"べ": "be",
	"ぼ": "bo",
	"ぱ": "pa",
	"ぴ": "pi",
	"ぷ": "pu",
	"ぺ": "pe",
	"ぽ": "po",
	"ま": "ma",
	"み": "mi",
	"む": "mu",
	"め": "me",
	"も": "mo",
	"や": "ya",
	"ゆ": "yu",
	"よ": "yo",
	"ら": "ra",
	"り": "ri",
	"る": "ru",
	"れ": "re",
	"ろ": "ro",
	"わ": "wa",
	"を": "wo",
	"ん": "n/m"
}

const jpDictionary = Object.assign({}, katakanaDictionary, hiraganaDictionary);

// Hàm tạo một số ngẫu nhiên từ min đến max (bao gồm cả max)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Kiểm tra xem từ đã được đặt ở vị trí đó chưa
function isWordPlaced(matrix, word, row, col, dx, dy) {
    for (let i = 0; i < word.length; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        if (
            newRow < 0 ||
            newRow >= matrix.length ||
            newCol < 0 ||
            newCol >= matrix[0].length ||
            matrix[newRow][newCol] !== word[i]
        ) {
            return false;
        }
    }
    return true;
}

// Tạo ma trận chứa từ có vị trí ngẫu nhiên
function createKatakanaMatrix(matrixSize, words) {
    const keys = Object.keys(jpDictionary);
    const matrix = [];

    // Tạo ma trận với các ô trống
    for (let i = 0; i < matrixSize; i++) {
        matrix.push(Array(matrixSize).fill(''));
    }

    // Tạo danh sách các vị trí có thể cho các từ
    const positions = [];
    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            positions.push([i, j]);
        }
    }

    // Trộn ngẫu nhiên danh sách vị trí
    positions.sort(() => Math.random() - 0.5);

    // Đặt các từ vào ma trận tại các vị trí hợp lệ
    for (const word of words) {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 1000) {  // Giới hạn số lần thử để tránh vòng lặp vô hạn
            const x = getRandomInt(0, matrixSize - 1);
            const y = getRandomInt(0, matrixSize - 1);
            const directions = [
                [0, 1],   // Ngang
                [1, 0],   // Dọc
                [-1, 0],  // Dọc ngược
                [0, -1],  // Ngang ngược
                [-1, -1], // Đường chéo chính ngược
                [1, 1],   // Đường chéo chính
                [-1, 1],  // Đường chéo phụ ngược
                [1, -1]   // Đường chéo phụ
            ];
            const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];

            if (x + dx * (word.length - 1) >= 0 && x + dx * (word.length - 1) < matrixSize &&
                y + dy * (word.length - 1) >= 0 && y + dy * (word.length - 1) < matrixSize) {
                if (!isWordPlaced(matrix, word, x, y, dx, dy)) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[x + i * dx][y + i * dy] = word[i];
                    }
                    placed = true;
                }
            }
            attempts++;
        }
        if (!placed) {
            console.log(`Không thể đặt từ "${word}" vào ma trận.`);
        }
    }

    // Điền các ô trống bằng kí tự ngẫu nhiên
    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            if (matrix[i][j] === '') {
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                matrix[i][j] = randomKey;
            }
        }
    }

    return matrix;
}

// Ví dụ tạo ma trận 5x5 từ bảng kí tự katakana chứa các từ "ヘビ" và "キツネ"
const n = 8;
const words = ["ヘビ", "キツネ", "ヒョウ"];
const katakanaMatrix = createKatakanaMatrix(n, words);

// In ra ma trận katakana chứa các từ "ヘビ" và "キツネ"
console.log(katakanaMatrix)
