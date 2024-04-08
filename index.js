import fs from 'fs';
// import {test} from './chatgpt.js';

// test()

let board = [
    [
      'ゾ', 'ぼ', 'ズ',
      'ウ', 'ぷ', 'ウ',
      'ヘ', 'わ'
    ],
    [
      'を', 'ゼ', 'せ',
      'つ', 'ョ', 'ぐ',
      'ひ', 'ヲ'
    ],
    [
      'ネ', 'ヌ', 'ぐ',
      'ジ', 'つ', 'ヒ',
      'よ', 'ウ'
    ],
    [
      'ツ', 'べ', 'シ',
      'リ', 'ブ', 'ヅ',
      'ラ', 'マ'
    ],
    [
      'キ', 'ビ', 'ヘ',
      'サ', 'ブ', 'が',
      'み', 'ワ'
    ],
    [
      'で', 'ゆ', 'ご',
      'イ', 'カ', 'メ',
      'め', 'ケ'
    ],
    [
      'ゆ', 'ぐ', 'ジ',
      'で', 'よ', 'ユ',
      'イ', 'メ'
    ],
    [
      'み', 'ご', 'ハ',
      'エ', 'ス', 'か',
      'ス', 'オ'
    ]
  ]

let directions = [
    [1, 0], [0, 1], [-1, 0], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1]
];

function isValid(x, y) {
    return x >= 0 && x < board.length && y >= 0 && y < board[0].length;
}

function findWords(x, y, currentWord, visited, path, result, maxLength = 4) {
    visited[x][y] = true;
    currentWord += board[x][y];
    path.push([x, y]);

    if (currentWord.length <= maxLength) {
        result.push({ word: currentWord, path: [...path] }); // Push the current word and its path to the result array
    }

    // Explore all 8 directions
    for (let i = 0; i < directions.length; i++) {
        let newX = x + directions[i][0];
        let newY = y + directions[i][1];

        if (isValid(newX, newY) && !visited[newX][newY] && isOnStraightLine(path, newX, newY)) {
            findWords(newX, newY, currentWord, visited, path, result, maxLength);
        }
    }

    visited[x][y] = false; // Backtrack
    path.pop();
}

function isOnStraightLine(path, x, y) {
    if (path.length < 2) return true; // First two points can always form a straight line

    let [x1, y1] = path[path.length - 2];
    let [x2, y2] = path[path.length - 1];

    return (x - x2) * (y2 - y1) === (y - y2) * (x2 - x1);
}

function getAllWords() {
    let result = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let visited = Array.from({ length: board.length }, () => Array(board[0].length).fill(false));
            let currentWord = '';
            let path = [];
            findWords(i, j, currentWord, visited, path, result, board.length);
        }
    }

    // Add reversed words and paths to the result array
    let reversedResult = result.map(item => {
        let reversedWord = item.word.split('').reverse().join('');
        let reversedPath = item.path.map(coord => [...coord].reverse());
        return { word: reversedWord, path: reversedPath };
    });
    result.push(...reversedResult);

    return result;
}

let allWords = getAllWords();

// Save to JSON file
fs.writeFileSync('words.json', JSON.stringify(allWords, null, 2));
console.log('Words and their paths have been saved to words.json');

